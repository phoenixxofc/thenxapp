const EXERCISES = {
  push: [
    { name: "Push-ups", level: "beginner", progressions: ["Incline Push-ups", "Knee Push-ups", "Push-ups"] },
    { name: "Dips", level: "intermediate", progressions: ["Bench Dips", "Parallel Bar Dips", "Weighted Dips"] },
    { name: "HSPU", level: "advanced", progressions: ["Pike Push-ups", "Elevated Pike Push-ups", "Wall HSPU", "Free HSPU"] },
    { name: "Planche", level: "advanced", progressions: ["Planche Leans", "Tuck Planche", "Advanced Tuck Planche", "Straddle Planche", "Full Planche"] }
  ],
  pull: [
    { name: "Rows", level: "beginner", progressions: ["Incline Rows", "Horizontal Rows", "Archer Rows"] },
    { name: "Pull-ups", level: "intermediate", progressions: ["Scapular Pull-ups", "Negative Pull-ups", "Pull-ups", "Weighted Pull-ups"] },
    { name: "Front Lever", level: "advanced", progressions: ["Tuck Front Lever", "Advanced Tuck Front Lever", "Straddle Front Lever", "Full Front Lever"] },
    { name: "OAP", level: "professional", progressions: ["Archer Pull-ups", "OAP Negatives", "OAP"] }
  ],
  legs: [
    { name: "Squats", level: "beginner", progressions: ["Squats", "Bulgarian Split Squats", "Pistol Squats"] },
    { name: "Lunges", level: "beginner", progressions: ["Lunges", "Jumping Lunges"] },
    { name: "Nordic Curls", level: "intermediate", progressions: ["Nordic Negatives", "Full Nordic Curls"] }
  ],
  core: [
    { name: "Hollow Body", level: "beginner", progressions: ["Hollow Hang", "Hollow Body Hold", "Hollow Rocks"] },
    { name: "Dragon Flag", level: "intermediate", progressions: ["Leg Raises", "Dragon Flag Negatives", "Full Dragon Flag"] },
    { name: "L-Sit", level: "intermediate", progressions: ["Tuck L-Sit", "L-Sit"] }
  ]
};

function getProgression(exercise, strengthScore) {
  // strengthScore 0-100
  const index = Math.floor((strengthScore / 100) * exercise.progressions.length);
  return exercise.progressions[clamp(index, 0, exercise.progressions.length - 1)];
}

function generate30DayPlan(answers) {
  const { main_goal, experience, training_days, pushups, pullups, weight, height } = answers;

  // Calculate Strength Score
  let pushScore = (parseNumber(pushups) / 30) * 50; // Base max 50
  let pullScore = (parseNumber(pullups) / 20) * 50; // Base max 50

  // Strength-to-Weight Adjustment
  // Heavier/Taller users often have more absolute strength but lower relative strength
  // We'll use a simple factor: (BMI or Weight/Height ratio)
  const h = parseNumber(height) / 100;
  const w = parseNumber(weight);
  const bmi = w / (h * h);

  // If BMI is higher than 25, we slightly boost the strength score for progression selection
  // because the exercises are harder at higher bodyweights
  const bodyweightFactor = bmi > 25 ? (bmi - 25) * 0.02 : 0;

  const totalStrengthScore = clamp((pushScore + pullScore) * (1 + bodyweightFactor), 10, 100);

  const daysPerWeek = parseInt(training_days) || 3;
  const plan = [];

  const weeklyTemplate = generateWeeklyTemplate(main_goal, daysPerWeek);

  for (let week = 1; week <= 4; week++) {
    const weekWorkouts = [];
    const volumeMultiplier = 1 + (week - 1) * 0.15; // 1.0, 1.15, 1.3, 1.45

    for (let day = 1; day <= 7; day++) {
      const type = weeklyTemplate[(day - 1) % 7];
      if (type === "Rest") {
        weekWorkouts.push({ day, type: "Rest", exercises: [] });
      } else {
        weekWorkouts.push({
          day,
          type,
          exercises: generateExercisesForType(type, totalStrengthScore, volumeMultiplier, main_goal)
        });
      }
    }
    plan.push({ week, workouts: weekWorkouts });
  }

  return plan;
}

function generateWeeklyTemplate(goal, days) {
  if (days === 3) return ["Push", "Rest", "Pull", "Rest", "Legs + Core", "Rest", "Rest"];
  if (days === 4) return ["Push", "Pull", "Rest", "Legs", "Core + Skills", "Rest", "Rest"];
  if (days === 5) return ["Push", "Pull", "Legs", "Rest", "Push", "Pull", "Rest"];
  return ["Push", "Pull", "Legs", "Skills", "Push", "Pull", "Rest"];
}

function generateExercisesForType(type, strengthScore, volumeMult, goal) {
  const exercises = [];
  let categories = [];

  if (type.includes("Push")) categories.push("push");
  if (type.includes("Pull")) categories.push("pull");
  if (type.includes("Legs")) categories.push("legs");
  if (type.includes("Core")) categories.push("core");
  if (type.includes("Skills")) categories = ["push", "pull"]; // Skills can be either

  categories.forEach(cat => {
    const catExs = EXERCISES[cat];
    // Pick 2-3 exercises from each relevant category
    const count = goal === "hypertrophy" ? 3 : 2;
    for (let i = 0; i < count; i++) {
      const ex = catExs[i % catExs.length];
      const progression = getProgression(ex, strengthScore);

      let sets = 3;
      let reps = "8-12";

      if (goal === "strength") {
        sets = 4;
        reps = "3-5";
      } else if (goal === "weight-loss") {
        sets = 3;
        reps = "15-20";
      }

      // Apply volume increase
      const finalSets = Math.round(sets * (volumeMult > 1.2 ? 1.2 : 1)); // Cap sets increase
      const finalReps = reps.includes("-")
        ? reps.split("-").map(r => Math.round(parseInt(r) * volumeMult)).join("-")
        : Math.round(parseInt(reps) * volumeMult);

      exercises.push({
        name: progression,
        sets: finalSets,
        reps: finalReps,
        rest: goal === "strength" ? "3 min" : "60 sec"
      });
    }
  });

  return exercises;
}
