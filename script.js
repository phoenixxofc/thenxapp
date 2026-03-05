const QUESTIONS = [
  {
    id: "name",
    title: "What’s your name?",
    type: "text",
    name: "name",
    required: true,
    help: "This is just to personalize your plan."
  },
  {
    id: "age",
    title: "How old are you?",
    type: "number-slider",
    name: "age",
    min: 8,
    max: 80,
    required: true,
    help: "Age doesn’t limit progress, but it slightly influences how aggressive we should be with progression."
  },
  {
    id: "height",
    title: "What’s your height in cm?",
    type: "number-slider",
    name: "height",
    min: 100,
    max: 230,
    required: true,
    help: "Height and weight together help estimate leverage and difficulty for some skills."
  },
  {
    id: "weight",
    title: "What’s your current bodyweight in kg?",
    type: "number-slider",
    name: "weight",
    min: 30,
    max: 200,
    required: true,
    help: "Calisthenics is all about relative strength: strength compared to your bodyweight."
  },
  {
    id: "activity",
    title: "What best describes your usual day?",
    type: "choice",
    name: "activity",
    options: [
      { label: "Sitting all day", value: "sitting-all-day" },
      { label: "On feet sometimes", value: "light-movement" },
      { label: "Works out 3–4x/week", value: "works-out" },
      { label: "Athlete / very active", value: "athlete" }
    ],
    required: true,
    help: "This helps decide how many days per week your 30‑day plan should use."
  },
  {
    id: "main-goal",
    title: "What’s your primary goal?",
    type: "choice",
    name: "main_goal",
    options: [
      { label: "Strength & skills", value: "strength" },
      { label: "Muscle & aesthetics", value: "hypertrophy" },
      { label: "Weight loss & health", value: "weight-loss" }
    ],
    required: true,
    help: "Focusing on one main goal allows for a more effective 30-day program."
  },
  // Branching for Strength
  {
    id: "experience",
    title: "Calisthenics experience level?",
    type: "choice",
    name: "experience",
    options: [
      { label: "Beginner – just starting", value: "beginner" },
      { label: "Intermediate – basics solid", value: "intermediate" },
      { label: "Advanced – skill-focused", value: "advanced" }
    ],
    required: true,
    condition: (answers) => answers.main_goal === "strength" || answers.main_goal === "hypertrophy",
    help: "This determines which skill progressions we'll include."
  },
  {
    id: "pushups",
    title: "Max push‑ups in a row?",
    type: "choice",
    name: "pushups",
    options: [
      { label: "0", value: "0" },
      { label: "1–5", value: "1-5" },
      { label: "6–10", value: "6-10" },
      { label: "11–20", value: "11-20" },
      { label: "21–30", value: "21-30" },
      { label: "30+", value: "30+" }
    ],
    required: true,
    condition: (answers) => answers.main_goal === "strength",
    help: "Full range of motion reps only."
  },
  {
    id: "pullups",
    title: "Max pull‑ups in a row?",
    type: "choice",
    name: "pullups",
    options: [
      { label: "0", value: "0" },
      { label: "1–5", value: "1-5" },
      { label: "6–10", value: "6-10" },
      { label: "11–20", value: "11-20" },
      { label: "21–30", value: "21-30" },
      { label: "30+", value: "30+" }
    ],
    required: true,
    condition: (answers) => answers.main_goal === "strength",
    help: "Strict reps, no kipping."
  },
  {
    id: "planche-level",
    title: "Planche experience?",
    type: "choice",
    name: "planche_level",
    options: [
      { label: "None", value: "0" },
      { label: "Planche Leans", value: "1" },
      { label: "Tuck Planche", value: "2" },
      { label: "Advanced Tuck", value: "3" },
      { label: "Straddle", value: "4" }
    ],
    required: true,
    condition: (answers) => (answers.main_goal === "strength" || answers.main_goal === "hypertrophy") && answers.experience !== "beginner",
    help: "Select your current highest static hold for Planche."
  },
  {
    id: "front-lever-level",
    title: "Front Lever experience?",
    type: "choice",
    name: "front_lever_level",
    options: [
      { label: "None", value: "0" },
      { label: "Tuck Front Lever", value: "1" },
      { label: "Advanced Tuck", value: "2" },
      { label: "Straddle", value: "3" },
      { label: "Full Front Lever", value: "4" }
    ],
    required: true,
    condition: (answers) => (answers.main_goal === "strength" || answers.main_goal === "hypertrophy") && answers.experience !== "beginner",
    help: "Select your current highest static hold for Front Lever."
  },
  {
    id: "dragon-flag-level",
    title: "Dragon Flag experience?",
    type: "choice",
    name: "dragon_flag_level",
    options: [
      { label: "None", value: "0" },
      { label: "Leg Raises", value: "1" },
      { label: "Dragon Flag Negatives", value: "2" },
      { label: "Full Dragon Flag", value: "3" }
    ],
    required: true,
    condition: (answers) => (answers.main_goal === "strength" || answers.main_goal === "hypertrophy") && answers.experience !== "beginner",
    help: "Select your current proficiency with the Dragon Flag."
  },
  {
    id: "hspu-level",
    title: "Handstand Push‑up level?",
    type: "choice",
    name: "hspu_level",
    options: [
      { label: "None", value: "0" },
      { label: "Pike Push-ups", value: "1" },
      { label: "Elevated Pike", value: "2" },
      { label: "Wall HSPU", value: "3" },
      { label: "Free HSPU", value: "4" }
    ],
    required: true,
    condition: (answers) => (answers.main_goal === "strength" || answers.main_goal === "hypertrophy") && answers.experience !== "beginner",
    help: "Select your current proficiency with vertical pushing."
  },
  // Branching for Weight Loss
  {
    id: "cardio-pref",
    title: "What's your cardio preference?",
    type: "choice",
    name: "cardio_preference",
    options: [
      { label: "Running / Walking", value: "running" },
      { label: "HIIT Circuits", value: "hiit" },
      { label: "Jump Rope", value: "jump-rope" },
      { label: "Low Impact", value: "low-impact" }
    ],
    required: true,
    condition: (answers) => answers.main_goal === "weight-loss",
    help: "We'll blend this with your strength work."
  },
  // Equipment for Muscle Gain
  {
    id: "equipment",
    title: "What equipment do you have?",
    type: "choice-multiple",
    name: "equipment",
    options: [
      { label: "Pull-up Bar", value: "pullup-bar" },
      { label: "Dip Station / P-Bars", value: "dips" },
      { label: "Gymnastic Rings", value: "rings" },
      { label: "Resistance Bands", value: "bands" },
      { label: "None (Bodyweight only)", value: "none" }
    ],
    required: true,
    condition: (answers) => answers.main_goal === "hypertrophy",
    help: "More equipment allows for more varied hypertrophy exercises."
  },
  {
    id: "training-days",
    title: "How many days can you train?",
    type: "choice",
    name: "training_days",
    options: [
      { label: "3 Days", value: "3" },
      { label: "4 Days", value: "4" },
      { label: "5 Days", value: "5" },
      { label: "6 Days", value: "6" }
    ],
    required: true,
    help: "Consistency is more important than frequency."
  }
];

class WizardController {
  constructor() {
    this.currentStepIndex = 0;
    this.answers = {};
    this.visibleQuestions = [];

    this.container = document.getElementById("question-container");
    this.progressContainer = document.getElementById("wizard-progress");
    this.prevBtn = document.getElementById("prev-btn");
    this.nextBtn = document.getElementById("next-btn");
    this.submitBtn = document.getElementById("submit-btn");

    this.init();
  }

  init() {
    this.updateVisibleQuestions();
    this.renderStep();

    this.prevBtn.onclick = () => this.prev();
    this.nextBtn.onclick = () => this.next();
  }

  updateVisibleQuestions() {
    this.visibleQuestions = QUESTIONS.filter(q => {
      if (!q.condition) return true;
      return q.condition(this.answers);
    });
  }

  renderStep() {
    const question = this.visibleQuestions[this.currentStepIndex];
    if (!question) return;

    this.container.innerHTML = "";

    const questionEl = document.createElement("div");
    questionEl.className = "question";

    const title = document.createElement("h3");
    title.className = "question-title";
    title.textContent = question.title;
    questionEl.appendChild(title);

    const inputContainer = document.createElement("div");
    inputContainer.className = "input-container";

    if (question.type === "text") {
      const input = document.createElement("input");
      input.type = "text";
      input.name = question.name;
      input.value = this.answers[question.name] || "";
      input.placeholder = "Enter here...";
      input.setAttribute("aria-label", question.title);
      inputContainer.appendChild(input);

      input.addEventListener("input", (e) => {
        this.answers[question.name] = e.target.value;
        this.clearError();
      });
    }
    else if (question.type === "number-slider") {
      const sliderContainer = document.createElement("div");
      sliderContainer.className = "number-with-slider";

      const numInput = document.createElement("input");
      numInput.type = "number";
      numInput.name = question.name;
      numInput.min = question.min;
      numInput.max = question.max;
      numInput.value = this.answers[question.name] || Math.floor((question.min + question.max) / 2);

      const rangeInput = document.createElement("input");
      rangeInput.type = "range";
      rangeInput.min = question.min;
      rangeInput.max = question.max;
      rangeInput.value = numInput.value;
      rangeInput.setAttribute("aria-label", `${question.title} slider`);

      sliderContainer.appendChild(numInput);
      sliderContainer.appendChild(rangeInput);
      inputContainer.appendChild(sliderContainer);

      this.answers[question.name] = numInput.value;

      rangeInput.addEventListener("input", (e) => {
        numInput.value = e.target.value;
        this.answers[question.name] = e.target.value;
      });

      numInput.addEventListener("input", (e) => {
        rangeInput.value = e.target.value;
        this.answers[question.name] = e.target.value;
      });
    }
    else if (question.type === "choice" || question.type === "choice-multiple") {
      const choiceRow = document.createElement("div");
      choiceRow.className = "choice-row";

      question.options.forEach(opt => {
        const label = document.createElement("label");
        label.className = "choice-chip";

        const input = document.createElement("input");
        input.type = question.type === "choice" ? "radio" : "checkbox";
        input.name = question.name;
        input.value = opt.value;

        if (question.type === "choice") {
          if (this.answers[question.name] === opt.value) {
            label.classList.add("selected");
            input.checked = true;
          }
        } else {
          const vals = this.answers[question.name] || [];
          if (vals.includes(opt.value)) {
            label.classList.add("selected");
            input.checked = true;
          }
        }

        const span = document.createElement("span");
        span.textContent = opt.label;

        label.appendChild(input);
        label.appendChild(span);
        choiceRow.appendChild(label);

        label.addEventListener("click", (e) => {
          if (question.type === "choice") {
            this.answers[question.name] = opt.value;
            this.container.querySelectorAll(".choice-chip").forEach(c => c.classList.remove("selected"));
            label.classList.add("selected");
          } else {
            let vals = this.answers[question.name] || [];
            if (input.checked) {
              if (!vals.includes(opt.value)) vals.push(opt.value);
            } else {
              vals = vals.filter(v => v !== opt.value);
            }
            this.answers[question.name] = vals;
            label.classList.toggle("selected", input.checked);
          }
          this.clearError();
        });
      });
      inputContainer.appendChild(choiceRow);
    }

    questionEl.appendChild(inputContainer);

    const errorEl = document.createElement("div");
    errorEl.className = "error-message";
    errorEl.id = "error-message";
    questionEl.appendChild(errorEl);

    const help = document.createElement("p");
    help.className = "question-help";
    help.textContent = question.help;
    questionEl.appendChild(help);

    this.container.appendChild(questionEl);

    const firstInput = questionEl.querySelector("input");
    if (firstInput) firstInput.focus();

    this.renderProgress();
    this.updateNav();
  }

  renderProgress() {
    this.progressContainer.innerHTML = "";
    this.visibleQuestions.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = `wizard-dot ${i === this.currentStepIndex ? 'active' : ''}`;
      this.progressContainer.appendChild(dot);
    });
  }

  updateNav() {
    this.prevBtn.disabled = this.currentStepIndex === 0;
    const isLast = this.currentStepIndex === this.visibleQuestions.length - 1;
    this.nextBtn.classList.toggle("hidden", isLast);
    this.submitBtn.classList.toggle("hidden", !isLast);
  }

  validate() {
    const question = this.visibleQuestions[this.currentStepIndex];
    const val = this.answers[question.name];

    if (question.required) {
      if (!val || (Array.isArray(val) && val.length === 0)) {
        this.showError(`${question.title} is required`);
        return false;
      }
    }

    if (question.type === "number-slider") {
      const num = Number(val);
      if (num < question.min || num > question.max) {
        this.showError(`Please enter a value between ${question.min}–${question.max}`);
        return false;
      }
    }

    return true;
  }

  showError(msg) {
    const err = document.getElementById("error-message");
    if (err) err.textContent = msg;
  }

  clearError() {
    const err = document.getElementById("error-message");
    if (err) err.textContent = "";
  }

  next() {
    if (this.validate()) {
      this.updateVisibleQuestions();
      if (this.currentStepIndex < this.visibleQuestions.length - 1) {
        this.currentStepIndex++;
        this.renderStep();
      }
    }
  }

  prev() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.renderStep();
    }
  }
}

let wizardInstance;
let selectedLibraryWorkout = null;

document.addEventListener("DOMContentLoaded", () => {
  const getStartedBtn = document.getElementById("get-started-btn");
  const heroSection = document.getElementById("hero-section");
  const dashboardSection = document.getElementById("dashboard-section");
  const intakeCard = document.getElementById("intake-card");
  const start30dayBtn = document.getElementById("start-30day-btn");
  const backToDashboard = document.getElementById("back-to-dashboard");
  const libraryGrid = document.getElementById("workout-library");
  const levelModal = document.getElementById("level-modal");
  const closeLevelModal = document.getElementById("close-level-modal");

  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", () => {
      heroSection.classList.add("hidden");
      dashboardSection.classList.remove("hidden");
    });
  }

  if (start30dayBtn) {
    start30dayBtn.addEventListener("click", () => {
      const savedPlan = localStorage.getItem("thx_plan");
      if (savedPlan) {
        showPlanSection();
      } else {
        dashboardSection.classList.add("hidden");
        intakeCard.classList.remove("hidden");
        if (!wizardInstance) {
          wizardInstance = new WizardController();
        }
      }
    });
  }

  if (backToDashboard) {
    backToDashboard.addEventListener("click", () => {
      document.getElementById("plan-section").classList.add("hidden");
      dashboardSection.classList.remove("hidden");
      updateDashboardProgress();
    });
  }

  // Populate Library
  Object.keys(EXCLUSIVE_WORKOUTS).forEach(name => {
    const card = document.createElement("div");
    card.className = "library-card";
    card.innerHTML = `<h4>${name}</h4>`;
    card.onclick = () => {
      selectedLibraryWorkout = name;
      levelModal.classList.remove("hidden");
    };
    libraryGrid.appendChild(card);
  });

  if (closeLevelModal) {
    closeLevelModal.onclick = () => levelModal.classList.add("hidden");
  }

  document.querySelectorAll(".level-btn").forEach(btn => {
    btn.onclick = () => {
      const level = btn.getAttribute("data-level");
      levelModal.classList.add("hidden");
      dashboardSection.classList.add("hidden");
      showLibraryWorkout(selectedLibraryWorkout, level);
    };
  });

  const form = document.getElementById("intake-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const planSection = document.getElementById("plan-section");
      const loading = document.getElementById("plan-loading");
      const content = document.getElementById("plan-content");

      intakeCard.classList.add("hidden");
      planSection.classList.remove("hidden");
      loading.classList.remove("hidden");
      content.classList.add("hidden");

      setTimeout(() => {
        const plan = generate30DayPlan(wizardInstance.answers);
        localStorage.setItem("thx_plan", JSON.stringify(plan));
        localStorage.setItem("thx_answers", JSON.stringify(wizardInstance.answers));
        loading.classList.add("hidden");
        content.classList.remove("hidden");
        displayPlan(plan, wizardInstance.answers);
      }, 2000);
    });
  }
});

function showPlanSection() {
  const dashboardSection = document.getElementById("dashboard-section");
  const planSection = document.getElementById("plan-section");
  dashboardSection.classList.add("hidden");
  planSection.classList.remove("hidden");
  const plan = JSON.parse(localStorage.getItem("thx_plan"));
  const answers = JSON.parse(localStorage.getItem("thx_answers"));
  displayPlan(plan, answers);
}

function showLibraryWorkout(name, level) {
  const planSection = document.getElementById("plan-section");
  const calendar = document.getElementById("calendar-view");
  const libraryView = document.getElementById("library-workout-view");
  const libraryExs = document.getElementById("library-exercises");
  const intro = document.getElementById("plan-intro");

  planSection.classList.remove("hidden");
  calendar.classList.add("hidden");
  libraryView.classList.remove("hidden");

  intro.textContent = `${name} - ${level.toUpperCase()}`;
  libraryExs.innerHTML = "";

  const exercises = EXCLUSIVE_WORKOUTS[name][level];
  exercises.forEach(ex => {
    const exEl = document.createElement("div");
    exEl.className = "exercise-item";
    exEl.innerHTML = `
      <div class="exercise-preview"><div class="preview-animation"></div></div>
      <div class="exercise-header">
        <strong>${ex.name}</strong>
        <span>Target: ${ex.sets}x${ex.reps}</span>
      </div>
    `;
    libraryExs.appendChild(exEl);
  });
}

document.getElementById("close-library-workout").onclick = () => {
  document.getElementById("library-workout-view").classList.add("hidden");
  document.getElementById("calendar-view").classList.remove("hidden");
  document.getElementById("plan-section").classList.add("hidden");
  document.getElementById("dashboard-section").classList.remove("hidden");
};

function displayPlan(plan, answers) {
  const intro = document.getElementById("plan-intro");
  const calendar = document.getElementById("calendar-view");
  const libraryView = document.getElementById("library-workout-view");

  calendar.classList.remove("hidden");
  libraryView.classList.add("hidden");

  intro.textContent = `Hello ${answers.name}, here is your custom 30-day ${answers.main_goal} plan. Each week intensity increases.`;
  calendar.innerHTML = "";
  const completedWorkouts = JSON.parse(localStorage.getItem("thx_completed") || "{}");

  plan.forEach(week => {
    week.workouts.forEach(workout => {
      const dayNum = workout.day;
      const dayCard = document.createElement("div");
      dayCard.className = `day-card ${workout.type === "Rest" ? "rest" : ""}`;
      if (completedWorkouts[dayNum]) dayCard.classList.add("completed");
      dayCard.innerHTML = `
        <div class="day-num">Day ${dayNum}</div>
        <div class="day-type">${workout.type}</div>
      `;
      if (workout.type !== "Rest") {
        dayCard.onclick = () => openWorkoutModal(workout, dayNum);
      }
      calendar.appendChild(dayCard);
    });
  });
}

function openWorkoutModal(workout, dayNum) {
  const modal = document.getElementById("workout-modal");
  const title = document.getElementById("modal-title");
  const exerciseContainer = document.getElementById("modal-exercises");
  const saveBtn = document.getElementById("save-workout");

  title.textContent = `Day ${dayNum} - ${workout.type}`;
  exerciseContainer.innerHTML = "";
  workout.exercises.forEach((ex, idx) => {
    const exEl = document.createElement("div");
    exEl.className = "exercise-item";
    exEl.innerHTML = `
      <div class="exercise-preview"><div class="preview-animation"></div></div>
      <div class="exercise-header">
        <strong>${ex.name}</strong>
        <span>Target: ${ex.sets}x${ex.reps}</span>
      </div>
      <div class="exercise-inputs">
        <input type="number" placeholder="Sets" class="sets-done" value="${ex.sets}">
        <input type="text" placeholder="Reps" class="reps-done" value="${ex.reps}">
      </div>
    `;
    exerciseContainer.appendChild(exEl);
  });

  saveBtn.onclick = () => {
    const completed = JSON.parse(localStorage.getItem("thx_completed") || "{}");
    completed[dayNum] = {
      timestamp: new Date().getTime(),
      exercises: Array.from(exerciseContainer.querySelectorAll(".exercise-item")).map(el => ({
        name: el.querySelector("strong").textContent,
        sets: el.querySelector(".sets-done").value,
        reps: el.querySelector(".reps-done").value
      }))
    };
    localStorage.setItem("thx_completed", JSON.stringify(completed));
    modal.classList.add("hidden");
    const plan = JSON.parse(localStorage.getItem("thx_plan"));
    const answers = JSON.parse(localStorage.getItem("thx_answers"));
    displayPlan(plan, answers);
  };
  modal.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const closeModal = document.getElementById("close-modal");
  if (closeModal) {
    closeModal.onclick = () => {
      document.getElementById("workout-modal").classList.add("hidden");
    };
  }

  const savedPlan = localStorage.getItem("thx_plan");
  const savedAnswers = localStorage.getItem("thx_answers");
  if (savedPlan && savedAnswers) {
    document.getElementById("hero-section").classList.add("hidden");
    document.getElementById("dashboard-section").classList.remove("hidden");
    updateDashboardProgress();
  }
});

function updateDashboardProgress() {
  const completed = JSON.parse(localStorage.getItem("thx_completed") || "{}");
  const count = Object.keys(completed).length;
  const total = 30; // 30-day program
  const percentage = Math.round((count / total) * 100);

  const container = document.getElementById("program-progress-container");
  const fill = document.getElementById("program-progress-fill");
  const text = document.getElementById("program-progress-text");

  if (container) {
    container.classList.remove("hidden");
    fill.style.width = `${percentage}%`;
    text.textContent = `${percentage}% Complete`;
  }
}
