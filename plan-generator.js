const EXERCISES = {
  push: [
    {
      name: "Push-ups",
      progressions: [
        { name: "Incline Push-ups", ratio: 1.5 },
        { name: "Knee Push-ups", ratio: 1.2 },
        { name: "Push-ups", ratio: 1.0 },
        { name: "Diamond Push-ups", ratio: 0.7, minBaseline: 15 },
        { name: "Archer Push-ups", ratio: 0.5, minBaseline: 25 },
        { name: "Pseudo-Planche Push-ups", ratio: 0.4, minBaseline: 30 }
      ]
    },
    {
      name: "Dips",
      progressions: [
        { name: "Bench Dips", ratio: 1.2 },
        { name: "Parallel Bar Dips", ratio: 1.0 },
        { name: "Weighted Dips", ratio: 0.7, minBaseline: 15 }
      ]
    },
    {
      name: "HSPU",
      progressions: [
        { name: "Pike Push-ups", ratio: 1.0 },
        { name: "Elevated Pike Push-ups", ratio: 0.8 },
        { name: "Wall HSPU", ratio: 0.5, minBaseline: 10 },
        { name: "Free HSPU", ratio: 0.3, minBaseline: 15 }
      ]
    }
  ],
  pull: [
    {
      name: "Pull-ups",
      progressions: [
        { name: "Australian Pull-ups", ratio: 1.5 },
        { name: "Scapular Pull-ups", ratio: 1.2 },
        { name: "Negative Pull-ups", ratio: 1.0 },
        { name: "Pull-ups", ratio: 0.8, minBaseline: 5 },
        { name: "Archer Pull-ups", ratio: 0.5, minBaseline: 12 },
        { name: "Typewriter Pull-ups", ratio: 0.4, minBaseline: 15 },
        { name: "Weighted Pull-ups", ratio: 0.4, minBaseline: 15 }
      ]
    },
    {
      name: "Rows",
      progressions: [
        { name: "Incline Rows", ratio: 1.2 },
        { name: "Horizontal Rows", ratio: 1.0 },
        { name: "Archer Rows", ratio: 0.6, minBaseline: 15 }
      ]
    }
  ],
  legs: [
    {
      name: "Squats",
      progressions: [
        { name: "Squats", ratio: 1.0 },
        { name: "Bulgarian Split Squats", ratio: 0.7 },
        { name: "Pistol Squats", ratio: 0.4, minBaseline: 30 }
      ]
    },
    {
      name: "Lunges",
      progressions: [
        { name: "Lunges", ratio: 1.0 },
        { name: "Jumping Lunges", ratio: 0.8 }
      ]
    }
  ],
  core: [
    {
      name: "Hollow Body",
      progressions: [
        { name: "Hollow Hang", ratio: 1.2 },
        { name: "Hollow Body Hold", ratio: 1.0 },
        { name: "Hollow Rocks", ratio: 0.8 }
      ]
    },
    {
      name: "Dragon Flag",
      progressions: [
        { name: "Leg Raises", ratio: 1.0 },
        { name: "Dragon Flag Negatives", ratio: 0.6, minBaseline: 15 },
        { name: "Full Dragon Flag", ratio: 0.4, minBaseline: 25 }
      ]
    }
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

/**
 * Baseline strength mapping logic.
 * Selects the best progression and estimates max reps.
 */
function getSmartProgression(exerciseData, baselineMax, skillLevel = 0) {
  const progressions = exerciseData.progressions;
  let best = progressions[0];

  // Progression unlock logic
  for (const p of progressions) {
    if (p.minBaseline && baselineMax < p.minBaseline) break;
    best = p;
  }

  // Manual skill override if provided (0-4 scale)
  if (skillLevel > 0) {
    const skillIndex = Math.min(skillLevel, progressions.length - 1);
    // Only upgrade if skill level suggests a harder variation than baseline
    if (skillIndex > progressions.indexOf(best)) {
        best = progressions[skillIndex];
    }
  }

  const estimatedMax = Math.max(1, Math.round(baselineMax * best.ratio));
  return { name: best.name, estimatedMax };
}

function generate30DayPlan(answers) {
  const { main_goal, activity, pushups, pullups, weight, height, planche_level, front_lever_level, dragon_flag_level, hspu_level } = answers;

  // Frequency Automation from Activity Level
  const frequencyMap = {
    "sitting-all-day": 3,
    "light-movement": 4,
    "works-out": 5,
    "athlete": 6
  };
  const daysPerWeek = frequencyMap[activity] || 3;

  const pushBaseline = parseNumber(pushups);
  const pullBaseline = parseNumber(pullups);

  // Bodyweight adjustment for intensity recommendations
  const h = parseNumber(height) / 100;
  const w = parseNumber(weight);
  const bmi = w / (h * h);
  const bodyweightFactor = bmi > 26 ? (bmi - 26) * 0.05 : 0; // 5% harder for every BMI pt over 26

  const skills = {
    "Planche": parseNumber(planche_level),
    "Front Lever": parseNumber(front_lever_level),
    "Dragon Flag": parseNumber(dragon_flag_level),
    "HSPU": parseNumber(hspu_level)
  };

  const plan = [];
  const weeklyTemplate = generateWeeklyTemplate(daysPerWeek);

  let currentDay = 1;
  while (currentDay <= 30) {
    const weekNum = Math.ceil(currentDay / 7);
    const dayInWeek = (currentDay - 1) % 7;

    // Weekly volume progression
    const volumeMultiplier = 1 + (weekNum - 1) * 0.15;

    const type = weeklyTemplate[dayInWeek];
    const workout = { day: currentDay, type };

    if (type === "Rest") {
      workout.exercises = [];
    } else {
      workout.exercises = generateSmartExercises(type, pushBaseline, pullBaseline, volumeMultiplier, main_goal, skills, bodyweightFactor);
    }

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

function generateWeeklyTemplate(days) {
  // Skill Day Logic: Integrated for 3-day, Standalone for 4+
  if (days === 3) return ["Push + Skills", "Rest", "Pull + Skills", "Rest", "Legs + Core", "Rest", "Rest"];
  if (days === 4) return ["Push", "Pull", "Rest", "Legs + Core", "Skills Emphasis", "Rest", "Rest"];
  if (days === 5) return ["Push", "Pull", "Legs", "Skills", "Full Body", "Rest", "Rest"];
  return ["Push", "Pull", "Legs", "Skills", "Push", "Pull", "Rest"];
}

function generateSmartExercises(type, pushBase, pullBase, volumeMult, goal, skills, bwFactor) {
  const exercises = [];
  const categories = [];

  if (type.includes("Push")) categories.push("push");
  if (type.includes("Pull")) categories.push("pull");
  if (type.includes("Legs")) categories.push("legs");
  if (type.includes("Core")) categories.push("core");
  if (type.includes("Skills")) categories.push("push", "pull"); // Skill work mixes patterns
  if (type.includes("Full Body")) categories.push("push", "pull", "legs");

  categories.forEach(cat => {
    const catData = EXERCISES[cat];
    const count = goal === "hypertrophy" ? 2 : 1;

    for (let i = 0; i < count; i++) {
      const exData = catData[i % catData.length];
      const baseline = cat === "push" ? pushBase : (cat === "pull" ? pullBase : 20);
      const skillLevel = skills[exData.name] || 0;

      const { name, estimatedMax } = getSmartProgression(exData, baseline, skillLevel);

      // Apply 60–80% training intensity
      let repPercent = 0.7; // 70% default
      let sets = 3;

      if (goal === "strength") {
        repPercent = 0.8;
        sets = 4;
      } else if (goal === "weight-loss") {
        repPercent = 0.6;
        sets = 3;
      }

      // Final calculation with volume progression and BMI adjustment
      const finalReps = Math.max(1, Math.round(estimatedMax * repPercent * volumeMult * (1 - bwFactor)));
      const finalSets = Math.round(sets * (volumeMult > 1.3 ? 1.3 : 1));

      exercises.push({
        name,
        sets: finalSets,
        reps: finalReps,
        rest: goal === "strength" ? "3 min" : "60 sec"
      });
    }
  });

  return exercises;
}
