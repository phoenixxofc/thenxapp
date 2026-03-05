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

const EXCLUSIVE_WORKOUTS = {
  "Push Day": {
    beginner: [
      { name: "Incline Push-ups", sets: 3, reps: "10-12" },
      { name: "Knee Dips", sets: 3, reps: "8-10" },
      { name: "Plank", sets: 3, reps: "30s" }
    ],
    intermediate: [
      { name: "Regular Push-ups", sets: 4, reps: "15-20" },
      { name: "Parallel Bar Dips", sets: 4, reps: "10-12" },
      { name: "Pike Push-ups", sets: 3, reps: "8-10" }
    ],
    advanced: [
      { name: "Archer Push-ups", sets: 4, reps: "10 per side" },
      { name: "Weighted Dips", sets: 4, reps: "8-10" },
      { name: "Wall HSPU", sets: 4, reps: "5-8" }
    ]
  },
  "Pull Day": {
    beginner: [
      { name: "Australian Pull-ups", sets: 3, reps: "10-12" },
      { name: "Scapular Pull-ups", sets: 3, reps: "12-15" },
      { name: "Dead Hang", sets: 3, reps: "30s" }
    ],
    intermediate: [
      { name: "Pull-ups", sets: 4, reps: "8-12" },
      { name: "Chin-ups", sets: 4, reps: "8-10" },
      { name: "Horizontal Rows", sets: 3, reps: "12-15" }
    ],
    advanced: [
      { name: "Muscle-ups", sets: 4, reps: "5-8" },
      { name: "Weighted Pull-ups", sets: 4, reps: "6-8" },
      { name: "L-Sit Pull-ups", sets: 3, reps: "8-10" }
    ]
  },
  "Biceps": {
    beginner: [
      { name: "Incline Rows", sets: 3, reps: "12" },
      { name: "Chin-up Negatives", sets: 3, reps: "5" }
    ],
    intermediate: [
      { name: "Chin-ups", sets: 4, reps: "10" },
      { name: "Head-bangers", sets: 3, reps: "12" }
    ],
    advanced: [
      { name: "One Arm Row", sets: 4, reps: "8 per side" },
      { name: "OAP Negatives", sets: 3, reps: "3 per side" }
    ]
  },
  "Triceps": {
    beginner: [
      { name: "Bench Dips", sets: 3, reps: "12" },
      { name: "Diamond Push-ups (Knees)", sets: 3, reps: "10" }
    ],
    intermediate: [
      { name: "Parallel Bar Dips", sets: 4, reps: "12" },
      { name: "Diamond Push-ups", sets: 4, reps: "12" }
    ],
    advanced: [
      { name: "Impossible Dip Negatives", sets: 4, reps: "5" },
      { name: "Tiger Bend Push-ups", sets: 3, reps: "8" }
    ]
  },
  "Back": {
    beginner: [
      { name: "Australian Pull-ups", sets: 3, reps: "12" },
      { name: "Superman Holds", sets: 3, reps: "30s" }
    ],
    intermediate: [
      { name: "Wide Grip Pull-ups", sets: 4, reps: "10" },
      { name: "Tuck Front Lever Hold", sets: 4, reps: "15s" }
    ],
    advanced: [
      { name: "Front Lever Pull-ups", sets: 4, reps: "6" },
      { name: "Straddle Front Lever Hold", sets: 4, reps: "10s" }
    ]
  },
  "Shoulders": {
    beginner: [
      { name: "Pike Push-ups (Floor)", sets: 3, reps: "10" },
      { name: "Planche Lean", sets: 3, reps: "20s" }
    ],
    intermediate: [
      { name: "Elevated Pike Push-ups", sets: 4, reps: "10" },
      { name: "Tuck Planche Hold", sets: 4, reps: "10s" }
    ],
    advanced: [
      { name: "Wall HSPU", sets: 4, reps: "8" },
      { name: "90 Degree Push-ups", sets: 3, reps: "5" }
    ]
  },
  "Legs": {
    beginner: [
      { name: "Air Squats", sets: 3, reps: "20" },
      { name: "Lunges", sets: 3, reps: "12 per side" }
    ],
    intermediate: [
      { name: "Bulgarian Split Squats", sets: 4, reps: "12 per side" },
      { name: "Cossack Squats", sets: 4, reps: "10 per side" }
    ],
    advanced: [
      { name: "Pistol Squats", sets: 4, reps: "8 per side" },
      { name: "Shrimp Squats", sets: 4, reps: "8 per side" }
    ]
  },
  "Abs": {
    beginner: [
      { name: "Lying Leg Raises", sets: 3, reps: "15" },
      { name: "Hollow Body Hold", sets: 3, reps: "30s" }
    ],
    intermediate: [
      { name: "Hanging Leg Raises", sets: 4, reps: "12" },
      { name: "L-Sit Hold", sets: 4, reps: "15s" }
    ],
    advanced: [
      { name: "Dragon Flag", sets: 4, reps: "8" },
      { name: "V-Sit Hold", sets: 4, reps: "10s" }
    ]
  }
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function parseNumber(input) {
  if (input === "skip" || input === "" || input == null) return 0;
  if (typeof input === "string") {
    if (input.includes("-")) {
      const [low, high] = input.split("-").map((v) => Number(v));
      if (Number.isFinite(low) && Number.isFinite(high)) {
        return (low + high) / 2;
      }
    }
    if (input.includes("+")) {
      const val = Number(input.replace("+", ""));
      return Number.isFinite(val) ? val : 0;
    }
  }
  const n = Number(input);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function getProgression(exercise, strengthScore, skillLevel = 0) {
  // strengthScore 0-100, skillLevel 0-4
  let index = Math.floor((strengthScore / 100) * exercise.progressions.length);
  // Influence index by skill level if provided
  if (skillLevel > 0) {
    index = Math.max(index, skillLevel);
  }
  return exercise.progressions[clamp(index, 0, exercise.progressions.length - 1)];
}

function generate30DayPlan(answers) {
  const { main_goal, training_days, pushups, pullups, weight, height, planche_level, front_lever_level, dragon_flag_level, hspu_level } = answers;

  // Calculate Strength Score
  let pushScore = (parseNumber(pushups) / 30) * 50;
  let pullScore = (parseNumber(pullups) / 20) * 50;

  // Strength-to-Weight Adjustment
  const h = parseNumber(height) / 100;
  const w = parseNumber(weight);
  const bmi = w / (h * h);

  const bodyweightFactor = bmi > 25 ? (bmi - 25) * 0.02 : 0;
  const totalStrengthScore = clamp((pushScore + pullScore) * (1 + bodyweightFactor), 10, 100);

  const daysPerWeek = parseInt(training_days) || 3;
  const plan = [];
  const weeklyTemplate = generateWeeklyTemplate(main_goal, daysPerWeek);

  const skills = {
    "Planche": parseNumber(planche_level),
    "Front Lever": parseNumber(front_lever_level),
    "Dragon Flag": parseNumber(dragon_flag_level),
    "HSPU": parseNumber(hspu_level)
  };

  // Generate 30 days
  let currentDay = 1;
  while (currentDay <= 30) {
    const weekNum = Math.ceil(currentDay / 7);
    const dayInWeek = (currentDay - 1) % 7;
    const volumeMultiplier = 1 + (weekNum - 1) * 0.15;

    const type = weeklyTemplate[dayInWeek];
    const workout = { day: currentDay, type };

    if (type === "Rest") {
      workout.exercises = [];
    } else {
      workout.exercises = generateExercisesForType(type, totalStrengthScore, volumeMultiplier, main_goal, skills);
    }

    // Add to the last week or create new week if needed
    let weekObj = plan.find(w => w.week === weekNum);
    if (!weekObj) {
      weekObj = { week: weekNum, workouts: [] };
      plan.push(weekObj);
    }
    weekObj.workouts.push(workout);

    currentDay++;
  }

  return plan;
}

function generateWeeklyTemplate(goal, days) {
  if (days === 3) return ["Push", "Rest", "Pull", "Rest", "Legs + Core", "Rest", "Rest"];
  if (days === 4) return ["Push", "Pull", "Rest", "Legs", "Core + Skills", "Rest", "Rest"];
  if (days === 5) return ["Push", "Pull", "Legs", "Rest", "Push", "Pull", "Rest"];
  return ["Push", "Pull", "Legs", "Skills", "Push", "Pull", "Rest"];
}

function generateExercisesForType(type, strengthScore, volumeMult, goal, skills = {}) {
  const exercises = [];
  let categories = [];

  if (type.includes("Push")) categories.push("push");
  if (type.includes("Pull")) categories.push("pull");
  if (type.includes("Legs")) categories.push("legs");
  if (type.includes("Core")) categories.push("core");
  if (type.includes("Skills")) categories = ["push", "pull"];

  categories.forEach(cat => {
    const catExs = EXERCISES[cat];
    const count = goal === "hypertrophy" ? 3 : 2;
    for (let i = 0; i < count; i++) {
      const ex = catExs[i % catExs.length];
      const skillLevel = skills[ex.name] || 0;
      const progression = getProgression(ex, strengthScore, skillLevel);

      let sets = 3;
      let reps = "8-12";

      if (goal === "strength") {
        sets = 4;
        reps = "3-5";
      } else if (goal === "weight-loss") {
        sets = 3;
        reps = "15-20";
      }

      const finalSets = Math.round(sets * (volumeMult > 1.2 ? 1.2 : 1));
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
