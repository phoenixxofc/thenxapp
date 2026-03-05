function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function parseNumber(input) {
  if (input === "skip" || input === "" || input == null) return 0;
  if (typeof input === "string" && input.includes("-")) {
    const [low, high] = input.split("-").map((v) => Number(v));
    if (Number.isFinite(low) && Number.isFinite(high)) {
      return (low + high) / 2;
    }
  }
  const n = Number(input);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function experienceRank(exp) {
  if (exp === "beginner") return 1;
  if (exp === "intermediate") return 2;
  if (exp === "advanced") return 3;
  if (exp === "professional") return 4;
  return 0;
}

function build30DayPlan(formData) {
  const name = formData.get("name") || "Athlete";
  const experience = formData.get("experience");
  const activity = formData.get("activity");
  const goals = formData.getAll("goal");

  const pushups = parseNumber(formData.get("pushups"));
  const pullups = parseNumber(formData.get("pullups"));
  const dips = parseNumber(formData.get("dips"));
  const squats = parseNumber(formData.get("squats"));

  const weighted = formData.get("weighted");

  // Rough difficulty multiplier
  const baseDifficultyMap = {
    beginner: 0.5,
    intermediate: 0.8,
    advanced: 1.0,
    professional: 1.1,
  };
  const activityBonusMap = {
    "sitting-all-day": 0.8,
    "light-movement": 0.9,
    "works-out": 1.0,
    athlete: 1.05,
  };

  const base =
    (baseDifficultyMap[experience] || 0.7) *
    (activityBonusMap[activity] || 1.0);

  const volumeIncrease =
    experience === "beginner"
      ? 0.4
      : experience === "intermediate"
      ? 0.35
      : experience === "advanced"
      ? 0.3
      : 0.25; // professional

  const endPushups = Math.round(pushups * (1 + volumeIncrease));
  const endPullups = Math.round(pullups * (1 + volumeIncrease));
  const endDips = Math.round(dips * (1 + volumeIncrease));
  const endSquats = Math.round(squats * (1 + volumeIncrease + 0.1));

  const targetPushups = clamp(endPushups || 15, 10, 60);
  const targetPullups = clamp(endPullups || 6, 3, 25);
  const targetDips = clamp(endDips || 10, 5, 40);
  const targetSquats = clamp(endSquats || 40, 30, 200);

  const daysPerWeek =
    activity === "sitting-all-day"
      ? 3
      : activity === "light-movement"
      ? 4
      : activity === "works-out"
      ? 5
      : 6;

  const planSummary = [];
  planSummary.push(
    `Aim to train **${daysPerWeek} days per week** for the next 30 days.`
  );
  planSummary.push(
    `Build up to a solid set of **${targetPushups} push‑ups**, **${targetPullups} pull‑ups**, **${targetDips} dips**, and **${targetSquats} squats** by day 30.`
  );

  if (goals.includes("strength")) {
    planSummary.push(
      "Prioritize lower reps with higher difficulty progressions (e.g. harder leverages, slower tempo)."
    );
  }
  if (goals.includes("hypertrophy")) {
    planSummary.push(
      "Use moderate reps (6–15) and 2–4 working sets per exercise focusing on controlled tempo."
    );
  }
  if (goals.includes("endurance")) {
    planSummary.push(
      "Emphasize longer sets, EMOMs, and cumulative volume while keeping reps away from failure."
    );
  }
  if (goals.includes("weight-loss")) {
    planSummary.push(
      "Include short conditioning finishers (circuits / intervals) on most training days and keep rest periods tight."
    );
  }

  const weeklyStructure = [];
  if (daysPerWeek === 3) {
    weeklyStructure.push(
      "3x/week full‑body sessions: push, pull, legs, core in each workout."
    );
  } else if (daysPerWeek === 4) {
    weeklyStructure.push(
      "Upper / lower split repeated 2x each week with core on every session."
    );
  } else if (daysPerWeek === 5) {
    weeklyStructure.push(
      "2 push, 2 pull, 1 leg‑dominant day with skill and core baked into each."
    );
  } else {
    weeklyStructure.push(
      "6x/week: 3 strength‑focused days + 2 skill‑focused days + 1 lighter conditioning day."
    );
  }

  // Skill focus
  const skillFocus = [];
  const addSkill = (label, suggestion) => {
    skillFocus.push({ label, suggestion });
  };

  if (experience === "beginner") {
    addSkill(
      "Fundamentals",
      "Nail basic push‑ups, rows, bodyweight squats, and hollow body holds with perfect form."
    );
    addSkill(
      "Core",
      "Accumulate 3–5 sets of hollow/arch holds and plank variations each session."
    );
  }

  if (experience === "intermediate" || experience === "advanced" || experience === "professional") {
    const hspu = parseNumber(formData.get("hspu"));
    const backLever = parseNumber(formData.get("backLever"));
    const dragonFlag = parseNumber(formData.get("dragonFlag"));
    const planche = parseNumber(formData.get("planche"));
    const frontLever = parseNumber(formData.get("frontLever"));
    const maltese = parseNumber(formData.get("maltese"));
    const oap = parseNumber(formData.get("oap"));
    const impossibleDip = parseNumber(formData.get("impossibleDip"));

    if (hspu > 0) {
      addSkill(
        "Handstand push‑ups",
        `Progress from your current best of ${hspu} reps towards sets of ${hspu + 1}-${hspu + 3} with clean form by day 30.`
      );
    } else {
      addSkill(
        "Handstand strength",
        "Work 2–3x/week on wall handstand holds and partial range handstand push‑ups."
      );
    }

    if (backLever > 0) {
      addSkill(
        "Back lever",
        `Extend your back lever hold from ${backLever}s to about ${backLever + 5}-${backLever + 10}s using tuck/advanced tuck work and isometrics.`
      );
    }

    if (dragonFlag > 0) {
      addSkill(
        "Dragon flag",
        `Turn your ${dragonFlag} reps into stronger, slower negatives and aim for ${dragonFlag + 2}-${dragonFlag + 4} strict reps.`
      );
    }

    if (experience === "advanced" || experience === "professional") {
      if (planche > 0) {
        addSkill(
          "Planche",
          `Maintain your ${planche}s planche and aim for a ${planche + 3}-${planche + 5}s clean hold with controlled entry.`
        );
      } else {
        addSkill(
          "Planche prep",
          "Use planche leans and tuck/advanced‑tuck planche holds 2–3x/week, never to absolute failure."
        );
      }

      if (frontLever > 0) {
        addSkill(
          "Front lever",
          `Push your ${frontLever}s hold towards ${frontLever + 5}-${frontLever + 10}s via isometric sets and easier lever variations between max attempts.`
        );
      } else {
        addSkill(
          "Front lever prep",
          "Train tuck/advanced‑tuck and band‑assisted front lever holds twice per week."
        );
      }
    }

    if (experience === "professional") {
      if (maltese > 0) {
        addSkill(
          "Maltese",
          `Consolidate your maltese with isometrics and support holds, aiming to add ${3}-${5}s to your current ${maltese}s hold.`
        );
      }

      if (oap > 0) {
        addSkill(
          "One‑arm pull‑up",
          `Keep your one‑arm pull‑ups sharp with singles/doubles and add a small amount of clean volume (~${oap * 2} total reps per week).`
        );
      }

      if (impossibleDip > 0) {
        addSkill(
          "Impossible dips",
          `Maintain joint health with careful warm‑ups and keep total weekly volume moderate (≈${impossibleDip * 2}-${impossibleDip * 3} reps).`
        );
      }
    }

    if (weighted === "yes") {
      addSkill(
        "Weighted work",
        "Use weighted pull‑ups, dips, and squats 1–2x/week, keeping 2–3 reps in reserve to avoid overuse while skills also progress."
      );
    } else if (
      (experience === "advanced" || experience === "professional") &&
      weighted !== "yes"
    ) {
      addSkill(
        "Optional weighted intro",
        "Consider adding light weighted pull‑ups and dips once per week to support strength without compromising skill quality."
      );
    }
  }

  return {
    intro: `${name}, here’s a realistic 30‑day calisthenics focus based on your current level.`,
    planSummary,
    weeklyStructure,
    skillFocus,
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const googleLoginCard = document.getElementById("google-login-card");
  const intakeCard = document.getElementById("intake-card");
  const googleLoginBtn = document.getElementById("google-login-btn");
  const form = document.getElementById("intake-form");
  const planSection = document.getElementById("plan-section");
  const planIntro = document.getElementById("plan-intro");
  const planSummaryList = document.getElementById("plan-summary");
  const weeklyStructureList = document.getElementById("weekly-structure");
  const skillFocusList = document.getElementById("skill-focus");
  const questions = Array.from(
    document.querySelectorAll(".wizard-questions .question")
  );
  const progressContainer = document.getElementById("wizard-progress");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");
  const ageInput = document.getElementById("age-input");
  const ageSlider = document.getElementById("age-slider");
  const heightInput = document.getElementById("height-input");
  const heightSlider = document.getElementById("height-slider");
  const weightInput = document.getElementById("weight-input");
  const weightSlider = document.getElementById("weight-slider");
  const backLeverInput = document.getElementById("backLever-input");
  const backLeverSlider = document.getElementById("backLever-slider");
  const plancheInput = document.getElementById("planche-input");
  const plancheSlider = document.getElementById("planche-slider");
  const frontLeverInput = document.getElementById("frontLever-input");
  const frontLeverSlider = document.getElementById("frontLever-slider");
  const malteseInput = document.getElementById("maltese-input");
  const malteseSlider = document.getElementById("maltese-slider");

  let currentStepIndex = 0;

  if (googleLoginBtn && googleLoginCard && intakeCard) {
    googleLoginBtn.addEventListener("click", () => {
      // Simulate a successful Google login on click
      googleLoginCard.classList.add("hidden");
      intakeCard.classList.remove("hidden");
      intakeCard.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Sync age, height and weight inputs with sliders
  if (ageInput && ageSlider) {
    ageSlider.addEventListener("input", () => {
      ageInput.value = ageSlider.value;
    });
    ageInput.addEventListener("input", () => {
      const v = Number(ageInput.value);
      if (Number.isFinite(v)) {
        ageSlider.value = clamp(v, Number(ageSlider.min), Number(ageSlider.max));
      }
    });
  }

  if (heightInput && heightSlider) {
    heightSlider.addEventListener("input", () => {
      heightInput.value = heightSlider.value;
    });
    heightInput.addEventListener("input", () => {
      const v = Number(heightInput.value);
      if (Number.isFinite(v)) {
        heightSlider.value = clamp(v, Number(heightSlider.min), Number(heightSlider.max));
      }
    });
  }

  if (weightInput && weightSlider) {
    weightSlider.addEventListener("input", () => {
      weightInput.value = weightSlider.value;
    });
    weightInput.addEventListener("input", () => {
      const v = Number(weightInput.value);
      if (Number.isFinite(v)) {
        weightSlider.value = clamp(v, Number(weightSlider.min), Number(weightSlider.max));
      }
    });
  }

  if (backLeverInput && backLeverSlider) {
    backLeverSlider.addEventListener("input", () => {
      backLeverInput.value = backLeverSlider.value;
    });
    backLeverInput.addEventListener("input", () => {
      const v = Number(backLeverInput.value);
      if (Number.isFinite(v)) {
        backLeverSlider.value = clamp(v, Number(backLeverSlider.min), Number(backLeverSlider.max));
      }
    });
  }

  if (plancheInput && plancheSlider) {
    plancheSlider.addEventListener("input", () => {
      plancheInput.value = plancheSlider.value;
    });
    plancheInput.addEventListener("input", () => {
      const v = Number(plancheInput.value);
      if (Number.isFinite(v)) {
        plancheSlider.value = clamp(v, Number(plancheSlider.min), Number(plancheSlider.max));
      }
    });
  }

  if (frontLeverInput && frontLeverSlider) {
    frontLeverSlider.addEventListener("input", () => {
      frontLeverInput.value = frontLeverSlider.value;
    });
    frontLeverInput.addEventListener("input", () => {
      const v = Number(frontLeverInput.value);
      if (Number.isFinite(v)) {
        frontLeverSlider.value = clamp(v, Number(frontLeverSlider.min), Number(frontLeverSlider.max));
      }
    });
  }

  if (malteseInput && malteseSlider) {
    malteseSlider.addEventListener("input", () => {
      malteseInput.value = malteseSlider.value;
    });
    malteseInput.addEventListener("input", () => {
      const v = Number(malteseInput.value);
      if (Number.isFinite(v)) {
        malteseSlider.value = clamp(v, Number(malteseSlider.min), Number(malteseSlider.max));
      }
    });
  }

  function getCurrentExperience() {
    const checked = document.querySelector('input[name="experience"]:checked');
    return checked ? checked.value : "";
  }

  function isQuestionRelevant(question, exp) {
    const minExp = question.getAttribute("data-min-exp");
    if (!minExp) return true;
    if (!exp) return false;
    return experienceRank(exp) >= experienceRank(minExp);
  }

  function getVisibleQuestions() {
    const exp = getCurrentExperience();
    return questions.filter((q) => isQuestionRelevant(q, exp));
  }

  function renderProgress(visibleQuestions) {
    progressContainer.innerHTML = "";
    visibleQuestions.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = "wizard-dot" + (index === currentStepIndex ? " active" : "");
      progressContainer.appendChild(dot);
    });
  }

  function goToStep(index) {
    const visibleQuestions = getVisibleQuestions();
    if (!visibleQuestions.length) return;

    currentStepIndex = Math.max(0, Math.min(index, visibleQuestions.length - 1));

    questions.forEach((q) => q.classList.remove("active"));
    const activeQuestion = visibleQuestions[currentStepIndex];
    if (activeQuestion) {
      activeQuestion.classList.add("active");
    }

    renderProgress(visibleQuestions);

    prevBtn.disabled = currentStepIndex === 0;

    const isLast = currentStepIndex === visibleQuestions.length - 1;
    nextBtn.classList.toggle("hidden", isLast);
    submitBtn.classList.toggle("hidden", !isLast);
  }

  prevBtn.addEventListener("click", () => {
    goToStep(currentStepIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    const visibleQuestions = getVisibleQuestions();
    const activeQuestion = visibleQuestions[currentStepIndex];
    if (activeQuestion) {
      const input =
        activeQuestion.querySelector("input[required]") ||
        activeQuestion.querySelector("select[required]");
      if (input && !input.checkValidity()) {
        input.reportValidity();
        return;
      }
    }

    goToStep(currentStepIndex + 1);
  });

  // Initialize wizard
  goToStep(0);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const plan = build30DayPlan(formData);

    planIntro.textContent = plan.intro;

    planSummaryList.innerHTML = "";
    plan.planSummary.forEach((line) => {
      const li = document.createElement("li");
      li.innerHTML = line.replace(
        /\*\*(.+?)\*\*/g,
        "<span class='label'>$1</span>"
      );
      planSummaryList.appendChild(li);
    });

    weeklyStructureList.innerHTML = "";
    plan.weeklyStructure.forEach((line) => {
      const li = document.createElement("li");
      li.textContent = line;
      weeklyStructureList.appendChild(li);
    });

    skillFocusList.innerHTML = "";
    plan.skillFocus.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="label">${item.label}:</span> ${item.suggestion}`;
      skillFocusList.appendChild(li);
    });

    planSection.classList.remove("hidden");
    planSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

