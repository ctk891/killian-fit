(function () {
  "use strict";

  const STORAGE_KEY = "killianFitState.v1";
  const SNAPSHOT_VERSION = 1;
  const SUPABASE_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
  const ROUTES = [
    ["dashboard", "Dashboard"],
    ["today", "Today's Workout"],
    ["program", "Program"],
    ["progress", "Progress"],
    ["analytics", "Analytics"],
    ["photos", "Photos"],
    ["nutrition", "Nutrition"],
    ["settings", "Settings"]
  ];

  const PROGRAM = [
    {
      key: "monday",
      day: 1,
      label: "Monday",
      title: "Push",
      focus: ["Chest", "Shoulders", "Triceps"],
      exercises: [
        exercise("Bench Press", 4, "6-8", ["Chest", "Triceps"], 235),
        exercise("Incline DB Press", 4, "8-10", ["Chest", "Shoulders"], 80),
        exercise("Seated DB Shoulder Press", 4, "8-10", ["Shoulders"], 70),
        exercise("Weighted Dips", 3, "8-12", ["Chest", "Triceps"], 45),
        exercise("Cable Lateral Raises", 4, "12-15", ["Shoulders"], 25),
        exercise("Machine Chest Fly", 3, "12-15", ["Chest"], 140),
        exercise("Rope Pushdowns", 4, "10-15", ["Triceps"], 75),
        exercise("Push-Up Finisher", 2, "failure", ["Chest", "Triceps"], 0, true)
      ]
    },
    {
      key: "tuesday",
      day: 2,
      label: "Tuesday",
      title: "Pull",
      focus: ["Back", "Biceps"],
      exercises: [
        exercise("Weighted Pull-Ups", 4, "6-10", ["Back", "Biceps"], 45),
        exercise("Barbell Rows", 4, "8-10", ["Back"], 205),
        exercise("Chest-Supported Rows", 4, "10-12", ["Back"], 115),
        exercise("Lat Pulldown", 3, "10-12", ["Back"], 165),
        exercise("Face Pulls", 3, "15", ["Rear Delts", "Back"], 60),
        exercise("Barbell Curls", 4, "8-10", ["Biceps"], 95),
        exercise("Incline DB Curls", 3, "10-12", ["Biceps"], 35),
        exercise("Hammer Curls", 3, "12", ["Biceps", "Forearms"], 45),
        exercise("Pull-Up Burnout", 1, "failure", ["Back", "Biceps"], 0, true)
      ]
    },
    {
      key: "wednesday",
      day: 3,
      label: "Wednesday",
      title: "Legs",
      focus: ["Quads", "Hamstrings", "Calves", "Core"],
      exercises: [
        exercise("Back Squat", 5, "5-8", ["Quads", "Glutes"], 315),
        exercise("Romanian Deadlift", 4, "8-10", ["Hamstrings", "Glutes"], 275),
        exercise("Walking Lunges", 3, "20 steps", ["Quads", "Glutes"], 55),
        exercise("Leg Press", 4, "12", ["Quads"], 540),
        exercise("Leg Curl", 4, "12", ["Hamstrings"], 125),
        exercise("Leg Extension", 4, "15", ["Quads"], 150),
        exercise("Standing Calf Raise", 5, "15-20", ["Calves"], 220),
        exercise("Hanging Leg Raises", 4, "15", ["Core"], 0)
      ]
    },
    {
      key: "thursday",
      day: 4,
      label: "Thursday",
      title: "Arms",
      focus: ["Biceps", "Triceps", "Forearms"],
      exercises: [
        exercise("Barbell Curl", 4, "8-10", ["Biceps"], 95),
        exercise("Incline DB Curl", 4, "10-12", ["Biceps"], 35),
        exercise("Preacher Curl", 3, "12", ["Biceps"], 80),
        exercise("Hammer Curl", 3, "12", ["Biceps", "Forearms"], 45),
        exercise("Skull Crushers", 4, "8-10", ["Triceps"], 95),
        exercise("Rope Pushdowns", 4, "12", ["Triceps"], 75),
        exercise("Overhead Cable Extensions", 4, "12", ["Triceps"], 70),
        exercise("Bench Dips", 3, "failure", ["Triceps"], 0, true),
        exercise("Reverse Curl", 3, "15", ["Forearms", "Biceps"], 55),
        exercise("Wrist Curl Superset", 3, "20", ["Forearms"], 45),
        exercise("Farmer Carries", 3, "heavy rounds", ["Forearms", "Core"], 90),
        exercise("Arm Finisher", 1, "100 total reps", ["Biceps", "Triceps"], 30)
      ]
    },
    {
      key: "friday",
      day: 5,
      label: "Friday",
      title: "Upper Power",
      focus: ["Chest", "Back", "Shoulders", "Arms"],
      exercises: [
        exercise("Bench Press", 5, "5", ["Chest", "Triceps"], 255),
        exercise("Weighted Pull-Ups", 5, "5", ["Back", "Biceps"], 55),
        exercise("Barbell Row", 4, "6-8", ["Back"], 225),
        exercise("Standing OHP", 4, "6-8", ["Shoulders"], 155),
        exercise("Weighted Dips", 3, "8", ["Chest", "Triceps"], 55),
        exercise("EZ Bar Curl", 3, "10", ["Biceps"], 95),
        exercise("Skull Crushers", 3, "10", ["Triceps"], 100),
        exercise("Lateral Raises", 3, "15", ["Shoulders"], 30)
      ]
    },
    {
      key: "saturday",
      day: 6,
      label: "Saturday",
      title: "Legs + Athleticism",
      focus: ["Legs", "Power", "Conditioning"],
      exercises: [
        exercise("Front Squat", 4, "6-8", ["Quads", "Core"], 245),
        exercise("Bulgarian Split Squat", 4, "10 each leg", ["Quads", "Glutes"], 60),
        exercise("Romanian Deadlift", 4, "8", ["Hamstrings", "Glutes"], 285),
        exercise("Box Jumps", 5, "5", ["Power"], 0),
        exercise("Walking Lunges", 3, "20 steps", ["Quads", "Glutes"], 55),
        exercise("Sled Push", 8, "rounds", ["Conditioning", "Legs"], 180),
        exercise("Standing Calves", 5, "20", ["Calves"], 225),
        exercise("Ab Circuit", 3, "rounds", ["Core"], 0)
      ]
    },
    {
      key: "sunday",
      day: 0,
      label: "Sunday",
      title: "Recovery",
      focus: ["Walk", "Mobility", "Stretching", "Optional Zone 2"],
      exercises: [
        exercise("Walk", 1, "30-60 min", ["Recovery"], 0),
        exercise("Mobility", 1, "15-20 min", ["Recovery"], 0),
        exercise("Stretching", 1, "10-20 min", ["Recovery"], 0),
        exercise("Optional Zone 2", 1, "20-40 min", ["Conditioning"], 0)
      ]
    }
  ];

  const CONDITIONING_TYPES = ["HIIT", "Zone 2", "Easy run", "Recovery walk", "Rest"];
  const MEASUREMENT_FIELDS = ["Chest", "Arms", "Waist", "Quads", "Shoulders"];
  const PHOTO_ANGLES = ["Front", "Side", "Back", "Detail"];

  let state = loadState();
  let route = getRoute();
  let cloudClient = null;
  let cloudClientKey = "";
  let cloudUser = null;
  let restTimer = {
    duration: Number(state.settings.restSeconds) || 120,
    endAt: 0,
    interval: null
  };

  const app = document.getElementById("app");
  const toast = document.getElementById("toast");
  const modalRoot = document.getElementById("modalRoot");

  renderNavigation();
  render();
  window.addEventListener("hashchange", () => {
    route = getRoute();
    render();
  });
  document.addEventListener("click", handleClick);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleChange);
  registerServiceWorker();
  initCloudSession();

  function exercise(name, sets, reps, muscles, defaultWeight, failureTarget) {
    return {
      id: slug(name),
      name,
      sets,
      reps,
      muscles,
      defaultWeight,
      failureTarget: Boolean(failureTarget)
    };
  }

  function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return mergeState(defaultState(), JSON.parse(saved));
      } catch (error) {
        console.warn("Unable to parse saved Killian Fit state", error);
      }
    }
    const seeded = defaultState();
    saveState(seeded);
    return seeded;
  }

  function defaultState() {
    const today = startOfDay(new Date());
    const logs = seedTrainingLogs(today);
    return {
      profile: {
        name: "Cody Killian",
        goal: "Lean muscle gain after marathon base",
        readiness: 82,
        recovery: 78
      },
      logs,
      completedWorkouts: seedCompletions(today, logs),
      conditioning: seedConditioning(today),
      bodyweight: seedBodyweight(today),
      measurements: {
        latest: {
          Chest: 43.2,
          Arms: 16.4,
          Waist: 32.1,
          Quads: 24.7,
          Shoulders: 50.8
        },
        history: [
          {
            date: iso(addDays(today, -21)),
            Chest: 42.6,
            Arms: 16.0,
            Waist: 32.8,
            Quads: 24.1,
            Shoulders: 50.1
          },
          {
            date: iso(addDays(today, -7)),
            Chest: 43.0,
            Arms: 16.3,
            Waist: 32.3,
            Quads: 24.6,
            Shoulders: 50.6
          }
        ]
      },
      photos: [],
      nutrition: seedNutrition(today),
      cloud: {
        supabaseUrl: "",
        anonKey: "",
        email: "",
        userId: "",
        lastSyncAt: "",
        lastPullAt: ""
      },
      ui: {
        activeExerciseIndex: {},
        lastCompletion: null,
        moreMenuOpen: false
      },
      settings: {
        units: "lb",
        restSeconds: 120,
        volumeIncludesWarmups: false
      }
    };
  }

  function mergeState(base, saved) {
    return {
      ...base,
      ...saved,
      profile: { ...base.profile, ...(saved.profile || {}) },
      measurements: {
        ...base.measurements,
        ...(saved.measurements || {}),
        latest: { ...base.measurements.latest, ...((saved.measurements || {}).latest || {}) },
        history: (saved.measurements || {}).history || base.measurements.history
      },
      settings: { ...base.settings, ...(saved.settings || {}) },
      cloud: { ...base.cloud, ...(saved.cloud || {}) },
      ui: { ...base.ui, ...(saved.ui || {}), moreMenuOpen: false },
      logs: Array.isArray(saved.logs) ? saved.logs : base.logs,
      completedWorkouts: Array.isArray(saved.completedWorkouts) ? saved.completedWorkouts : base.completedWorkouts,
      conditioning: Array.isArray(saved.conditioning) ? saved.conditioning : base.conditioning,
      bodyweight: Array.isArray(saved.bodyweight) ? saved.bodyweight : base.bodyweight,
      photos: Array.isArray(saved.photos) ? saved.photos : base.photos,
      nutrition: Array.isArray(saved.nutrition) ? saved.nutrition : base.nutrition
    };
  }

  function saveState(nextState = state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }

  function seedTrainingLogs(today) {
    const logs = [];
    for (let offset = -13; offset <= -1; offset += 1) {
      const date = addDays(today, offset);
      const workout = workoutForDate(date);
      if (workout.day === 0) continue;
      workout.exercises.forEach((item, exerciseIndex) => {
        const loggedSets = Math.min(item.sets, exerciseIndex > 6 ? Math.max(1, item.sets - 1) : item.sets);
        for (let setIndex = 0; setIndex < loggedSets; setIndex += 1) {
          const repTarget = estimatedReps(item.reps, setIndex);
          const fatigueDrop = setIndex > 1 ? 5 : 0;
          const weight = item.defaultWeight ? Math.max(0, item.defaultWeight - 5 - fatigueDrop + (offset > -7 ? 5 : 0)) : 0;
          const failure = item.failureTarget || (setIndex === loggedSets - 1 && exerciseIndex % 4 === 0);
          logs.push({
            id: uid(),
            date: iso(date),
            dayKey: workout.key,
            workoutTitle: workout.title,
            exerciseId: item.id,
            exerciseName: item.name,
            setType: failure ? "failure" : "working",
            weight,
            reps: repTarget,
            rir: failure ? 0 : Math.max(1, 3 - (setIndex % 3)),
            failure,
            pr: offset > -7 && setIndex === 0 && exerciseIndex % 5 === 0,
            notes: "",
            volume: volumeFor(weight, repTarget)
          });
        }
      });
    }
    return logs;
  }

  function seedCompletions(today, logs) {
    const dates = unique(logs.map((entry) => entry.date));
    return dates.map((date) => {
      const workout = workoutForDate(new Date(`${date}T12:00:00`));
      return {
        id: uid(),
        date,
        dayKey: workout.key,
        title: workout.title,
        notes: "Logged with intent.",
        completedAt: `${date}T19:15:00`
      };
    });
  }

  function seedConditioning(today) {
    const sessions = [];
    const options = ["Zone 2", "Recovery walk", "HIIT", "Easy run", "Rest"];
    for (let offset = -13; offset <= -1; offset += 1) {
      const date = addDays(today, offset);
      const type = options[Math.abs(offset) % options.length];
      sessions.push({
        id: uid(),
        date: iso(date),
        type,
        duration: type === "Rest" ? 0 : type === "HIIT" ? 18 : 34 + (Math.abs(offset) % 12),
        effort: type === "HIIT" ? 9 : type === "Rest" ? 1 : 5,
        notes: "",
        completed: type !== "Rest"
      });
    }
    return sessions;
  }

  function seedBodyweight(today) {
    const points = [];
    const weights = [188.8, 188.4, 188.9, 188.1, 187.8, 188.0, 187.5, 187.2, 187.6, 187.1, 186.9, 187.0, 186.7, 186.5];
    weights.forEach((weight, index) => {
      points.push({ id: uid(), date: iso(addDays(today, index - weights.length + 1)), weight });
    });
    return points;
  }

  function seedNutrition(today) {
    const entries = [];
    for (let offset = -6; offset <= -1; offset += 1) {
      entries.push({
        id: uid(),
        date: iso(addDays(today, offset)),
        calories: 2860 + (Math.abs(offset) % 3) * 80,
        protein: 202 + (Math.abs(offset) % 4) * 5,
        carbs: 285 + (Math.abs(offset) % 5) * 18,
        fat: 78 + (Math.abs(offset) % 2) * 7,
        notes: ""
      });
    }
    return entries;
  }

  function getRoute() {
    const raw = window.location.hash.replace("#", "") || "dashboard";
    return ROUTES.some(([key]) => key === raw) ? raw : "dashboard";
  }

  function renderNavigation() {
    const rail = document.getElementById("railNav");
    const bottom = document.getElementById("bottomNav");
    const nav = ROUTES.map(([key, label]) => navItem(key, label)).join("");
    rail.innerHTML = nav;
    bottom.innerHTML = renderBottomNav();
  }

  function navItem(key, label) {
    return `
      <a class="nav-item ${route === key ? "active" : ""}" href="#${key}">
        <span class="nav-glyph glyph-${key}" aria-hidden="true"></span>
        <span>${escapeHtml(shortLabel(label))}</span>
      </a>
    `;
  }

  function renderBottomNav() {
    const primary = [
      ["dashboard", "Home"],
      ["today", "Train"],
      ["program", "Plan"],
      ["progress", "Progress"]
    ];
    const isMoreActive = ["analytics", "photos", "nutrition", "settings"].includes(route);
    return `
      ${primary.map(([key, label]) => navItem(key, label)).join("")}
      <button class="nav-item mobile-more-button ${isMoreActive || state.ui.moreMenuOpen ? "active" : ""}" type="button" data-action="open-more">
        <span class="nav-glyph glyph-more" aria-hidden="true"></span>
        <span>More</span>
      </button>
    `;
  }

  function shortLabel(label) {
    return label.replace("Today's Workout", "Today");
  }

  function render() {
    renderNavigation();
    document.querySelectorAll(".nav-item").forEach((item) => {
      const href = item.getAttribute("href") || "";
      if (href) item.classList.toggle("active", href === `#${route}`);
    });

    const routes = {
      dashboard: renderDashboard,
      today: renderToday,
      program: renderProgram,
      progress: renderProgress,
      analytics: renderAnalytics,
      photos: renderPhotos,
      nutrition: renderNutrition,
      settings: renderSettings
    };
    app.innerHTML = routes[route]();
    app.focus({ preventScroll: true });
    renderModal();
    updateTimerDisplay();
  }

  function renderDashboard() {
    const today = startOfDay(new Date());
    const workout = workoutForDate(today);
    const todayLogs = logsForDate(iso(today));
    const weekLogs = logsBetween(weekStart(today), addDays(weekStart(today), 6));
    const completed = completionForDate(iso(today));
    const conditioning = conditioningForDate(iso(today));
    const currentVolume = sumVolume(weekLogs);
    const failureSets = weekLogs.filter((entry) => entry.failure || entry.setType === "failure").length;
    const body = latestBodyweight();
    const bodyDelta = bodyweightDelta(7);
    const streak = completionStreak(today);
    const completionPct = weeklyCompletionPct(today);
    const loggedWorkoutSets = todayLogs.filter((entry) => entry.dayKey === workout.key).length;
    const plannedSets = workout.exercises.reduce((sum, item) => sum + item.sets, 0);
    const progress = plannedSets ? Math.min(100, Math.round((loggedWorkoutSets / plannedSets) * 100)) : 0;

    return `
      <section class="command-card surface">
        <div class="command-content">
          <div>
            <p class="eyebrow">${formatDateLong(today)} / ${escapeHtml(state.profile.name)}</p>
            <div class="workout-title">
              <h1>${escapeHtml(workout.title)}</h1>
              <span class="pill ${completed ? "green" : "blue"}">${completed ? "Complete" : "Today"}</span>
            </div>
            <p class="lede">Train Hard. Track Everything. Become Unrecognizable.</p>
            <div class="actions">
              <a class="button" href="#today">${workout.day === 0 ? "Open Recovery" : "Start Workout"}</a>
              <a class="ghost-button" href="#progress">Log Bodyweight</a>
              <a class="ghost-button" href="#photos">Progress Photos</a>
            </div>
            <div class="stat-stack">
              ${metric("Week Volume", compactNumber(currentVolume), `${weekLogs.length} sets logged`)}
              ${metric("Failure Sets", failureSets, "High-intensity work")}
              ${metric("Completion", `${completionPct}%`, `${streak} day streak`)}
            </div>
          </div>
          <div class="grid">
            <div class="surface panel readiness-gauge">
              <div class="gauge" style="--value:${safeNumber(state.profile.readiness, 0, 100)}" data-value="${safeNumber(state.profile.readiness, 0, 100)}"></div>
              <div>
                <p class="eyebrow">Manual Readiness</p>
                <h2>${readinessLabel(state.profile.readiness)}</h2>
                <p class="muted small">Recovery score ${safeNumber(state.profile.recovery, 0, 100)}. Adjust it in Settings before training.</p>
              </div>
            </div>
            <div class="surface panel">
              <div class="row-between">
                <div>
                  <p class="eyebrow">Morning Conditioning</p>
                  <h3>${conditioning ? escapeHtml(conditioning.type) : "Not Logged"}</h3>
                </div>
                <span class="status-pill ${conditioning && conditioning.completed ? "done" : "pending"}">${conditioning && conditioning.completed ? "Done" : "Open"}</span>
              </div>
              <p class="muted small">${conditioning ? `${conditioning.duration} min / effort ${conditioning.effort}` : "HIIT, Zone 2, easy run, recovery walk, or rest."}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="grid grid-4 section-band priority-metrics">
        ${metric("Bodyweight", body ? `${body.weight} ${state.settings.units}` : "--", body ? `${signed(bodyDelta)} ${state.settings.units} / 7 days` : "No weigh-ins")}
        ${metric("Today's Sets", `${loggedWorkoutSets}/${plannedSets}`, `${progress}% of target work`)}
        ${metric("Average RIR", averageRir(weekLogs), "Weekly logged sets")}
        ${metric("PR Sets", weekLogs.filter((entry) => entry.pr || entry.setType === "pr").length, "This week")}
      </section>

      <section class="grid grid-2 section-band">
        <div class="surface panel">
          <div class="row-between">
            <div>
              <p class="eyebrow">Weekly Split</p>
              <h2>Execution Map</h2>
            </div>
            <a class="ghost-button" href="#program">Program</a>
          </div>
          ${renderSplitStrip(today)}
        </div>
        <div class="surface panel">
          <div class="row-between">
            <div>
              <p class="eyebrow">Bodyweight Trend</p>
              <h2>${body ? `${body.weight} ${state.settings.units}` : "No Data"}</h2>
            </div>
            <a class="ghost-button" href="#progress">Progress</a>
          </div>
          <div class="mini-chart">${lineChart(state.bodyweight.slice(-14).map((entry) => entry.weight), { color: "var(--gold)" })}</div>
        </div>
      </section>
    `;
  }

  function renderToday() {
    const today = startOfDay(new Date());
    const todayIso = iso(today);
    const workout = workoutForDate(today);
    const activeIndex = getActiveExerciseIndex(workout);
    const activeExercise = workout.exercises[activeIndex] || workout.exercises[0];
    const todayLogs = logsForDate(todayIso).filter((entry) => entry.dayKey === workout.key);
    const exerciseLogs = todayLogs.filter((entry) => entry.exerciseId === activeExercise.id || entry.exerciseName === activeExercise.name);
    const completed = completionForDate(todayIso);
    const previous = previousWeekExercise(activeExercise, today);
    const currentVolume = sumVolume(exerciseLogs);
    const beat = currentVolume > 0 && currentVolume >= previous.volume;
    const plannedSets = workout.exercises.reduce((sum, item) => sum + item.sets, 0);
    const loggedSets = todayLogs.length;
    const workoutVolume = sumVolume(todayLogs);

    if (workout.day === 0) {
      return renderRecoveryDay(workout, todayIso);
    }

    return `
      ${screenHeader("Today's Workout", `${escapeHtml(workout.label)} - ${escapeHtml(workout.title)}`, "Current target, set tracker, previous week, and rest timer in one place.")}
      <section class="workout-layout">
        <div class="grid">
          <div class="surface panel">
            <div class="row-between">
              <div>
                <p class="eyebrow">Workout Progress</p>
                <h2>${loggedSets}/${plannedSets} sets / ${compactNumber(workoutVolume)} volume</h2>
              </div>
              <span class="status-pill ${completed ? "done" : "pending"}">${completed ? "Finished" : `${Math.round((loggedSets / plannedSets) * 100)}%`}</span>
            </div>
            <div class="progress-rail" aria-hidden="true"><span style="--progress:${Math.min(100, (loggedSets / plannedSets) * 100)}%"></span></div>
          </div>
          <div class="exercise-list">
            ${workout.exercises.map((item, index) => renderExerciseSelect(item, index, activeIndex, todayIso)).join("")}
          </div>
        </div>

        <aside class="surface panel log-panel">
          <div class="current-lift">
            <div>
              <p class="eyebrow">Current Exercise</p>
              <h2>${escapeHtml(activeExercise.name)}</h2>
              <div class="exercise-meta">
                <span>${activeExercise.sets} sets</span>
                <span>${escapeHtml(activeExercise.reps)} reps</span>
                <span>${escapeHtml(activeExercise.muscles.join(" / "))}</span>
              </div>
            </div>

            <div class="surface panel">
              <div class="row-between">
                <div>
                  <p class="eyebrow">Previous Week</p>
                  <h3>${previous.bestSet}</h3>
                </div>
                <span class="pill ${beat ? "green" : "gold"}">${beat ? "Beat Last Week" : `${compactNumber(previous.volume)} vol`}</span>
              </div>
            </div>

            <div class="timer">
              <div>
                <p class="eyebrow">Rest Timer</p>
                <span id="timerTime" class="timer-time">${formatSeconds(restTimer.duration)}</span>
              </div>
              <button class="ghost-button" type="button" data-action="start-rest">Start</button>
              <button class="ghost-button" type="button" data-action="reset-rest">Reset</button>
            </div>

            <form id="logSetForm" class="grid" data-form="log-set">
              <div class="form-grid">
                ${field("Weight", "weight", "number", activeExercise.defaultWeight || 0, "0.5")}
                ${field("Reps", "reps", "number", estimatedReps(activeExercise.reps, exerciseLogs.length), "1")}
                ${field("RIR", "rir", "number", activeExercise.failureTarget ? 0 : 2, "1")}
              </div>
              <div class="field">
                <span class="label">Set Type</span>
                ${segmented("setType", [
                  ["warmup", "Warm-up"],
                  ["working", "Working"],
                  ["failure", "Failure"],
                  ["pr", "PR"]
                ], activeExercise.failureTarget ? "failure" : "working")}
              </div>
              <label class="switch-row">
                <span>
                  <strong>Failure set</strong>
                  <span class="muted small">Near-zero RIR, logged as high-intensity work.</span>
                </span>
                <input type="checkbox" name="failure" ${activeExercise.failureTarget ? "checked" : ""}>
              </label>
              <div class="field">
                <label for="setNotes">Notes</label>
                <textarea id="setNotes" name="notes" placeholder="Grip, tempo, pain, setup, cue."></textarea>
              </div>
              <button class="button green" type="submit">Log Set</button>
            </form>

            <div>
              <p class="eyebrow">Logged Sets</p>
              ${renderSetTable(exerciseLogs)}
            </div>

            <form class="grid" data-form="finish-workout">
              <div class="field">
                <label for="sessionNotes">Session Notes</label>
                <textarea id="sessionNotes" name="notes" placeholder="What moved, what fought back, what changes next week."></textarea>
              </div>
              <button class="button gold" type="submit" ${loggedSets === 0 ? "disabled" : ""}>Finish Workout</button>
            </form>
          </div>
        </aside>
      </section>
    `;
  }

  function renderRecoveryDay(workout, todayIso) {
    const conditioning = conditioningForDate(todayIso);
    const completed = completionForDate(todayIso);
    return `
      ${screenHeader("Recovery", "Sunday - Recovery", "Walk, mobility, stretching, and optional Zone 2. Keep the system ready for Monday.")}
      <section class="grid grid-2">
        <div class="surface panel">
          <p class="eyebrow">Recovery Work</p>
          <h2>Keep The Floor High</h2>
          <ul class="exercise-lines">
            ${workout.exercises.map((item) => `<li><span>${escapeHtml(item.name)}</span><strong>${escapeHtml(item.reps)}</strong></li>`).join("")}
          </ul>
          <form class="grid" data-form="finish-workout">
            <div class="field">
              <label for="sessionNotes">Recovery Notes</label>
              <textarea id="sessionNotes" name="notes" placeholder="Mobility, walk, soreness, sleep, stress."></textarea>
            </div>
            <button class="button green" type="submit">${completed ? "Update Recovery" : "Mark Recovery Complete"}</button>
          </form>
        </div>
        <div class="surface panel">
          <p class="eyebrow">Morning Conditioning</p>
          <h2>${conditioning ? escapeHtml(conditioning.type) : "Not Logged"}</h2>
          ${renderConditioningForm()}
        </div>
      </section>
    `;
  }

  function renderExerciseSelect(item, index, activeIndex, date) {
    const logs = logsForDate(date).filter((entry) => entry.exerciseId === item.id || entry.exerciseName === item.name);
    const volume = sumVolume(logs);
    const progress = Math.min(100, (logs.length / item.sets) * 100);
    return `
      <button class="exercise-card ${index === activeIndex ? "active" : ""}" type="button" data-action="set-active-exercise" data-index="${index}">
        <div class="exercise-head">
          <div>
            <h3>${escapeHtml(item.name)}</h3>
            <div class="exercise-meta">
              <span>${item.sets}x${escapeHtml(item.reps)}</span>
              <span>${escapeHtml(item.muscles.join(" / "))}</span>
            </div>
          </div>
          <span class="pill ${logs.length >= item.sets ? "green" : logs.length ? "blue" : ""}">${logs.length}/${item.sets}</span>
        </div>
        <div class="progress-rail" aria-hidden="true"><span style="--progress:${progress}%"></span></div>
        <div class="row-between small">
          <span class="muted">${compactNumber(volume)} volume</span>
          <span class="muted">${logs.filter((entry) => entry.failure).length} failure</span>
        </div>
      </button>
    `;
  }

  function renderSetTable(logs) {
    if (!logs.length) {
      return `<p class="muted small">No sets logged for this exercise yet.</p>`;
    }
    return `
      <div class="set-table">
        ${logs.map((entry, index) => `
          <div class="set-row">
            <span class="set-number">${index + 1}</span>
            <span class="set-detail">
              <strong>${entry.weight} x ${entry.reps}</strong>
              <span>RIR ${entry.rir}</span>
              <span>${compactNumber(entry.volume)} vol</span>
            </span>
            <span class="set-badge ${entry.setType}">${setTypeLabel(entry)}</span>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderProgram() {
    return `
      ${screenHeader("Program", "6-Day Bodybuilding + Conditioning Split", "Preloaded exactly for the current lean muscle gain block.")}
      <section class="program-grid">
        ${PROGRAM.map((day) => `
          <article class="surface program-day">
            <div class="row-between">
              <div>
                <p class="eyebrow">${escapeHtml(day.label)}</p>
                <h2>${escapeHtml(day.title)}</h2>
              </div>
              <span class="pill blue">${day.exercises.length} moves</span>
            </div>
            <p class="muted small">${escapeHtml(day.focus.join(" / "))}</p>
            <ul class="exercise-lines">
              ${day.exercises.map((item) => `
                <li>
                  <span>${escapeHtml(item.name)}</span>
                  <strong>${item.sets}x${escapeHtml(item.reps)}</strong>
                </li>
              `).join("")}
            </ul>
          </article>
        `).join("")}
      </section>
    `;
  }

  function renderProgress() {
    const body = latestBodyweight();
    const weekLogs = logsBetween(weekStart(new Date()), addDays(weekStart(new Date()), 6));
    return `
      ${screenHeader("Progress", "Body, Strength, Conditioning", "Manual inputs with trend lines and training accountability.")}
      <section class="grid grid-2">
        <div class="surface panel">
          <div class="row-between">
            <div>
              <p class="eyebrow">Bodyweight</p>
              <h2>${body ? `${body.weight} ${state.settings.units}` : "No Weigh-In"}</h2>
            </div>
            <span class="pill gold">${signed(bodyweightDelta(14))} / 14d</span>
          </div>
          <div class="mini-chart">${lineChart(state.bodyweight.slice(-21).map((entry) => entry.weight), { color: "var(--gold)" })}</div>
          <form class="grid section-band" data-form="bodyweight">
            <div class="form-grid two">
              ${field("Date", "date", "date", iso(new Date()))}
              ${field(`Weight (${state.settings.units})`, "weight", "number", body ? body.weight : "", "0.1")}
            </div>
            <button class="button" type="submit">Log Bodyweight</button>
          </form>
        </div>

        <div class="surface panel">
          <p class="eyebrow">Measurements</p>
          <h2>Current Tape</h2>
          <form class="grid" data-form="measurements">
            <div class="form-grid two">
              ${MEASUREMENT_FIELDS.map((name) => field(`${name} (in)`, name, "number", state.measurements.latest[name] || "", "0.1")).join("")}
            </div>
            <button class="button" type="submit">Update Measurements</button>
          </form>
        </div>
      </section>

      <section class="grid grid-3 section-band">
        <div class="surface panel">
          <p class="eyebrow">Strength PRs</p>
          <h2>Top Sets</h2>
          <div class="data-list">${renderPrRows().join("")}</div>
        </div>
        <div class="surface panel">
          <p class="eyebrow">Conditioning</p>
          <h2>Morning Work</h2>
          ${renderConditioningForm()}
        </div>
        <div class="surface panel">
          <p class="eyebrow">Accountability</p>
          <h2>${weeklyCompletionPct(new Date())}% Complete</h2>
          <div class="data-list">
            ${dataRow("Weekly Volume", compactNumber(sumVolume(weekLogs)))}
            ${dataRow("Average RIR", averageRir(weekLogs))}
            ${dataRow("Conditioning Done", conditioningCompletionCount(7))}
            ${dataRow("Photos", state.photos.length)}
          </div>
          <div class="actions">
            <a class="ghost-button" href="#photos">Open Photos</a>
            <a class="ghost-button" href="#nutrition">Nutrition</a>
          </div>
        </div>
      </section>
    `;
  }

  function renderConditioningForm() {
    const today = iso(new Date());
    const current = conditioningForDate(today);
    return `
      <form class="grid" data-form="conditioning">
        <div class="form-grid two">
          <div class="field">
            <label for="conditioningType">Type</label>
            <select id="conditioningType" name="type">
              ${CONDITIONING_TYPES.map((type) => `<option value="${escapeHtml(type)}" ${current && current.type === type ? "selected" : ""}>${escapeHtml(type)}</option>`).join("")}
            </select>
          </div>
          ${field("Duration", "duration", "number", current ? current.duration : 30, "1")}
          ${field("Effort", "effort", "number", current ? current.effort : 5, "1")}
          ${field("Date", "date", "date", current ? current.date : today)}
        </div>
        <label class="switch-row">
          <span>
            <strong>Completed</strong>
            <span class="muted small">Morning conditioning status.</span>
          </span>
          <input type="checkbox" name="completed" ${!current || current.completed ? "checked" : ""}>
        </label>
        <div class="field">
          <label for="conditioningNotes">Notes</label>
          <textarea id="conditioningNotes" name="notes" placeholder="Route, intervals, pace, soreness.">${current ? escapeHtml(current.notes || "") : ""}</textarea>
        </div>
        <button class="button" type="submit">Save Conditioning</button>
      </form>
    `;
  }

  function renderAnalytics() {
    const today = new Date();
    const lastEightWeeks = weeklyVolumeSeries(today, 8);
    const muscleVolume = muscleGroupVolume(logsBetween(addDays(today, -27), today));
    const consistency = consistencySeries(today, 14);
    const failureTrend = failureSeries(today, 8);
    const readiness = readinessSeries();
    const benchSeries = exerciseStrengthSeries("Bench Press", 8);
    return `
      ${screenHeader("Analytics", "Performance Intelligence", "Clean signals: volume, muscle balance, readiness, and consistency.")}
      <section class="grid grid-2">
        ${chartPanel("Weekly Lifting Volume", "Last 8 weeks", barChart(lastEightWeeks.map((entry) => entry.value), { labels: lastEightWeeks.map((entry) => entry.label), color: "var(--blue)" }))}
        ${chartPanel("Muscle Group Volume", "Last 28 days", barChart(muscleVolume.map((entry) => entry.value), { labels: muscleVolume.map((entry) => entry.label), color: "var(--green)" }))}
        ${chartPanel("Strength Progression", "Bench Press top estimated 1RM", lineChart(benchSeries.map((entry) => entry.value), { color: "var(--gold)", labels: benchSeries.map((entry) => entry.label), height: 220 }))}
        ${chartPanel("Bodyweight Trend", "Recent weigh-ins", lineChart(state.bodyweight.slice(-21).map((entry) => entry.weight), { color: "var(--gold)", height: 220 }))}
        ${chartPanel("Training Consistency", "Last 14 days", barChart(consistency.map((entry) => entry.value), { labels: consistency.map((entry) => entry.label), color: "var(--green)", max: 1 }))}
        ${chartPanel("Failure Frequency", "Failure sets by week", barChart(failureTrend.map((entry) => entry.value), { labels: failureTrend.map((entry) => entry.label), color: "var(--red)" }))}
      </section>
      <section class="grid grid-3 section-band">
        <div class="surface panel">
          <p class="eyebrow">Recovery Trend</p>
          <h2>${state.profile.recovery}/100</h2>
          <div class="mini-chart">${lineChart(readiness, { color: "var(--green)" })}</div>
        </div>
        <div class="surface panel">
          <p class="eyebrow">Set Quality</p>
          <h2>${averageRir(logsBetween(addDays(today, -13), today))} Avg RIR</h2>
          <div class="data-list">
            ${dataRow("Failure Sets", logsBetween(addDays(today, -13), today).filter((entry) => entry.failure).length)}
            ${dataRow("PR Sets", logsBetween(addDays(today, -13), today).filter((entry) => entry.pr || entry.setType === "pr").length)}
          </div>
        </div>
        <div class="surface panel">
          <p class="eyebrow">Streak</p>
          <h2>${completionStreak(today)} Days</h2>
          <p class="muted small">Built from completed workouts and logged recovery days.</p>
        </div>
      </section>
    `;
  }

  function chartPanel(title, caption, chart) {
    return `
      <article class="surface panel">
        <div class="row-between">
          <div>
            <p class="eyebrow">${escapeHtml(caption)}</p>
            <h2>${escapeHtml(title)}</h2>
          </div>
        </div>
        <div class="chart">${chart}</div>
      </article>
    `;
  }

  function renderPhotos() {
    return `
      ${screenHeader("Photos", "Visual Proof", "Upload progress photos by date and angle. Everything stays in this browser.")}
      <section class="grid grid-2">
        <div class="surface panel">
          <p class="eyebrow">Progress Photo</p>
          <h2>New Check-In</h2>
          <form class="grid" data-form="photo">
            <div class="form-grid two">
              ${field("Date", "date", "date", iso(new Date()))}
              <div class="field">
                <label for="photoAngle">Angle</label>
                <select id="photoAngle" name="angle">
                  ${PHOTO_ANGLES.map((angle) => `<option>${escapeHtml(angle)}</option>`).join("")}
                </select>
              </div>
            </div>
            <div class="field">
              <label for="photoFile">Image</label>
              <input id="photoFile" name="photo" type="file" accept="image/*">
            </div>
            <div class="field">
              <label for="photoNote">Note</label>
              <textarea id="photoNote" name="notes" placeholder="Lighting, pump, bodyweight, timing."></textarea>
            </div>
            <button class="button" type="submit">Save Photo</button>
          </form>
        </div>
        <div class="surface panel">
          <p class="eyebrow">Photo Log</p>
          <h2>${state.photos.length} Entries</h2>
          <p class="muted small">Use consistent lighting, angles, and time of day so the trend is honest.</p>
        </div>
      </section>
      <section class="photo-grid section-band">
        ${state.photos.length ? state.photos.slice().reverse().map(renderPhotoCard).join("") : `
          <div class="surface panel">
            <div class="photo-placeholder">No Photos Yet</div>
            <div class="photo-meta">
              <strong>Start the visual log</strong>
              <span class="muted small">Front, side, back, and detail angles.</span>
            </div>
          </div>
        `}
      </section>
    `;
  }

  function renderPhotoCard(photo) {
    return `
      <article class="photo-card">
        <img src="${photo.dataUrl}" alt="${escapeHtml(photo.angle)} progress photo from ${escapeHtml(photo.date)}">
        <div class="photo-meta">
          <div class="row-between">
            <strong>${escapeHtml(photo.angle)}</strong>
            <span class="muted small">${formatDateShort(photo.date)}</span>
          </div>
          <span class="muted small">${escapeHtml(photo.notes || "No note")}</span>
          <button class="danger-button" type="button" data-action="delete-photo" data-id="${photo.id}">Delete</button>
        </div>
      </article>
    `;
  }

  function renderNutrition() {
    const today = iso(new Date());
    const current = nutritionForDate(today);
    const averages = nutritionAverages(7);
    return `
      ${screenHeader("Nutrition", "Manual Calories + Macros", "Fast manual entry for recomposition accountability.")}
      <section class="grid grid-2">
        <div class="surface panel">
          <p class="eyebrow">Today's Intake</p>
          <h2>${current ? `${current.calories} calories` : "Not Logged"}</h2>
          <form class="grid" data-form="nutrition">
            <div class="form-grid two">
              ${field("Date", "date", "date", today)}
              ${field("Calories", "calories", "number", current ? current.calories : 2900, "1")}
              ${field("Protein", "protein", "number", current ? current.protein : 205, "1")}
              ${field("Carbs", "carbs", "number", current ? current.carbs : 320, "1")}
              ${field("Fat", "fat", "number", current ? current.fat : 80, "1")}
            </div>
            <div class="field">
              <label for="nutritionNotes">Notes</label>
              <textarea id="nutritionNotes" name="notes" placeholder="Meal timing, hunger, digestion, training fuel.">${current ? escapeHtml(current.notes || "") : ""}</textarea>
            </div>
            <button class="button" type="submit">Save Nutrition</button>
          </form>
        </div>
        <div class="surface panel">
          <p class="eyebrow">7-Day Average</p>
          <h2>${averages.calories} calories</h2>
          <div class="macro-stack">
            ${macroRow("Protein", averages.protein, 220, "var(--green)")}
            ${macroRow("Carbs", averages.carbs, 360, "var(--blue)")}
            ${macroRow("Fat", averages.fat, 100, "var(--gold)")}
          </div>
          <div class="data-list section-band">
            ${dataRow("Logged Days", averages.days)}
            ${dataRow("Protein Target", `${averages.protein}/220 g`)}
            ${dataRow("Training Fuel", `${averages.carbs}/360 g carbs`)}
          </div>
        </div>
      </section>
    `;
  }

  function renderSettings() {
    const cloudConfigured = Boolean(state.cloud.supabaseUrl && state.cloud.anonKey);
    const cloudSignedIn = Boolean(state.cloud.userId || cloudUser);
    return `
      ${screenHeader("Settings", "Profile + System Controls", "Keep the app tuned to the way you train.")}
      <section class="grid grid-2">
        <div class="surface panel">
          <p class="eyebrow">Profile</p>
          <h2>${escapeHtml(state.profile.name)}</h2>
          <form class="grid" data-form="settings">
            <div class="form-grid two">
              ${field("Name", "name", "text", state.profile.name)}
              ${field("Goal", "goal", "text", state.profile.goal)}
              ${field("Readiness", "readiness", "range", state.profile.readiness, "1", "0", "100")}
              ${field("Recovery", "recovery", "range", state.profile.recovery, "1", "0", "100")}
              ${field("Rest Timer Seconds", "restSeconds", "number", state.settings.restSeconds, "5")}
              <div class="field">
                <label for="units">Units</label>
                <select id="units" name="units">
                  <option value="lb" ${state.settings.units === "lb" ? "selected" : ""}>lb</option>
                  <option value="kg" ${state.settings.units === "kg" ? "selected" : ""}>kg</option>
                </select>
              </div>
            </div>
            <label class="switch-row">
              <span>
                <strong>Include warm-ups in volume</strong>
                <span class="muted small">Default keeps volume focused on working sets.</span>
              </span>
              <input type="checkbox" name="volumeIncludesWarmups" ${state.settings.volumeIncludesWarmups ? "checked" : ""}>
            </label>
            <button class="button" type="submit">Save Settings</button>
          </form>
        </div>
        <div class="surface panel">
          <p class="eyebrow">Data</p>
          <h2>Local + Cloud</h2>
          <p class="muted small">Local data stays fast on this device. Supabase sync stores one secure snapshot per signed-in user.</p>
          <div class="actions">
            <button class="ghost-button" type="button" data-action="export-data">Export Data</button>
            <button class="danger-button" type="button" data-action="reset-data">Reset App</button>
          </div>
          <div class="data-list section-band">
            ${dataRow("Workout Sets", state.logs.length)}
            ${dataRow("Conditioning", state.conditioning.length)}
            ${dataRow("Bodyweight Entries", state.bodyweight.length)}
            ${dataRow("Nutrition Entries", state.nutrition.length)}
          </div>
        </div>
        <div class="surface panel">
          <p class="eyebrow">Supabase</p>
          <h2>${cloudSignedIn ? "Cloud Sync Active" : cloudConfigured ? "Project Connected" : "Connect Project"}</h2>
          <div class="cloud-status ${cloudSignedIn ? "online" : cloudConfigured ? "ready" : ""}">
            <strong>${escapeHtml(cloudStatusLabel())}</strong>
            <span class="muted small">${escapeHtml(cloudStatusDetail())}</span>
          </div>
          <form class="grid section-band" data-form="cloud-config">
            <div class="field">
              <label for="supabaseUrl">Project URL</label>
              <input id="supabaseUrl" name="supabaseUrl" type="url" value="${escapeHtml(state.cloud.supabaseUrl || "")}" placeholder="https://your-project.supabase.co">
            </div>
            <div class="field">
              <label for="anonKey">Publishable / anon key</label>
              <input id="anonKey" name="anonKey" type="password" value="${escapeHtml(state.cloud.anonKey || "")}" placeholder="eyJhbGciOi...">
            </div>
            <button class="button" type="submit">Save Supabase Project</button>
          </form>
        </div>
        <div class="surface panel">
          <p class="eyebrow">Account</p>
          <h2>${cloudSignedIn ? escapeHtml(state.cloud.email || "Signed In") : "Sign In"}</h2>
          <form class="grid" data-form="cloud-auth">
            <div class="form-grid two">
              ${field("Email", "email", "email", state.cloud.email || "")}
              ${field("Password", "password", "password", "")}
            </div>
            <div class="actions">
              <button class="button green" type="submit" name="cloudAction" value="signin" ${cloudConfigured ? "" : "disabled"}>Sign In</button>
              <button class="ghost-button" type="submit" name="cloudAction" value="signup" ${cloudConfigured ? "" : "disabled"}>Create Account</button>
              <button class="ghost-button" type="button" data-action="cloud-signout" ${cloudSignedIn ? "" : "disabled"}>Sign Out</button>
            </div>
          </form>
          <div class="actions">
            <button class="button" type="button" data-action="cloud-push" ${cloudSignedIn ? "" : "disabled"}>Push to Cloud</button>
            <button class="ghost-button" type="button" data-action="cloud-pull" ${cloudSignedIn ? "" : "disabled"}>Pull from Cloud</button>
          </div>
          <div class="data-list section-band">
            ${dataRow("Last Push", state.cloud.lastSyncAt ? formatDateTime(state.cloud.lastSyncAt) : "Never")}
            ${dataRow("Last Pull", state.cloud.lastPullAt ? formatDateTime(state.cloud.lastPullAt) : "Never")}
            ${dataRow("User ID", state.cloud.userId ? `${state.cloud.userId.slice(0, 8)}...` : "--")}
          </div>
        </div>
      </section>
    `;
  }

  function screenHeader(eyebrow, title, lede) {
    return `
      <header class="screen-header">
        <div>
          <p class="eyebrow">${escapeHtml(eyebrow)}</p>
          <h1>${escapeHtml(title)}</h1>
          <p class="lede">${escapeHtml(lede)}</p>
        </div>
      </header>
    `;
  }

  function metric(label, value, foot) {
    return `
      <div class="metric">
        <span class="metric-label">${escapeHtml(label)}</span>
        <strong class="metric-value">${escapeHtml(String(value))}</strong>
        <div class="metric-foot">${escapeHtml(String(foot))}</div>
      </div>
    `;
  }

  function field(label, name, type, value, step = "", min = "", max = "") {
    const id = `${name}_${slug(label)}`;
    const attrs = [
      `id="${id}"`,
      `name="${escapeHtml(name)}"`,
      `type="${escapeHtml(type)}"`,
      `value="${escapeHtml(value == null ? "" : value)}"`
    ];
    if (step) attrs.push(`step="${escapeHtml(step)}"`);
    if (min !== "") attrs.push(`min="${escapeHtml(min)}"`);
    if (max !== "") attrs.push(`max="${escapeHtml(max)}"`);
    return `
      <div class="field">
        <label for="${id}">${escapeHtml(label)}</label>
        <input ${attrs.join(" ")}>
      </div>
    `;
  }

  function segmented(name, options, selected) {
    return `
      <div class="segmented">
        ${options.map(([value, label]) => `
          <label>
            <input type="radio" name="${escapeHtml(name)}" value="${escapeHtml(value)}" ${selected === value ? "checked" : ""}>
            <span>${escapeHtml(label)}</span>
          </label>
        `).join("")}
      </div>
    `;
  }

  function dataRow(label, value) {
    return `
      <div class="data-row">
        <span class="muted small">${escapeHtml(label)}</span>
        <strong>${escapeHtml(String(value))}</strong>
      </div>
    `;
  }

  function macroRow(label, value, target, color) {
    const width = Math.min(100, Math.round((Number(value) / target) * 100));
    return `
      <div class="macro-row">
        <strong>${escapeHtml(label)}</strong>
        <div class="macro-bar"><span style="--width:${width}%; --color:${color}"></span></div>
        <span class="muted small">${escapeHtml(String(value))} g</span>
      </div>
    `;
  }

  function renderSplitStrip(today) {
    const todayProgram = workoutForDate(today);
    const start = weekStart(today);
    return `
      <div class="split-strip">
        ${PROGRAM.map((day) => {
          const date = day.day === 0 ? addDays(start, 6) : addDays(start, day.day - 1);
          const complete = Boolean(completionForDate(iso(date)));
          return `
            <a class="split-day ${day.key === todayProgram.key ? "active" : ""} ${complete ? "complete" : ""}" href="${day.key === todayProgram.key ? "#today" : "#program"}">
              <strong>${escapeHtml(day.label.slice(0, 3))}</strong>
              <span>${escapeHtml(day.title)}</span>
              <span class="status-pill ${complete ? "done" : "pending"}">${complete ? "Done" : day.day === 0 ? "Recover" : `${day.exercises.length} lifts`}</span>
            </a>
          `;
        }).join("")}
      </div>
    `;
  }

  function handleClick(event) {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;
    if (action === "set-active-exercise") {
      const workout = workoutForDate(new Date());
      state.ui.activeExerciseIndex[workout.key] = Number(target.dataset.index) || 0;
      saveState();
      render();
    }
    if (action === "start-rest" || action === "quick-rest") startRestTimer();
    if (action === "reset-rest") resetRestTimer();
    if (action === "open-more") {
      state.ui.moreMenuOpen = true;
      renderNavigation();
      renderModal();
    }
    if (action === "close-more") {
      state.ui.moreMenuOpen = false;
      renderNavigation();
      renderModal();
    }
    if (action === "more-route") {
      state.ui.moreMenuOpen = false;
    }
    if (action === "close-modal") {
      state.ui.lastCompletion = null;
      saveState();
      renderModal();
    }
    if (action === "delete-photo") {
      state.photos = state.photos.filter((photo) => photo.id !== target.dataset.id);
      saveState();
      toastMessage("Photo deleted.");
      render();
    }
    if (action === "reset-data") {
      const confirmed = window.confirm("Reset Killian Fit local data?");
      if (confirmed) {
        state = defaultState();
        saveState();
        toastMessage("App reset.");
        render();
      }
    }
    if (action === "export-data") exportData();
    if (action === "cloud-push") cloudPush();
    if (action === "cloud-pull") cloudPull();
    if (action === "cloud-signout") cloudSignOut();
  }

  async function handleSubmit(event) {
    const form = event.target.closest("form[data-form]");
    if (!form) return;
    event.preventDefault();
    let data;
    try {
      data = new FormData(form, event.submitter || undefined);
    } catch (error) {
      data = new FormData(form);
      if (event.submitter && event.submitter.name) data.append(event.submitter.name, event.submitter.value);
    }
    const kind = form.dataset.form;
    if (kind === "log-set") submitLogSet(data);
    if (kind === "finish-workout") submitFinishWorkout(data);
    if (kind === "bodyweight") submitBodyweight(data);
    if (kind === "measurements") submitMeasurements(data);
    if (kind === "conditioning") submitConditioning(data);
    if (kind === "photo") await submitPhoto(form, data);
    if (kind === "nutrition") submitNutrition(data);
    if (kind === "settings") submitSettings(data);
    if (kind === "cloud-config") await submitCloudConfig(data);
    if (kind === "cloud-auth") await submitCloudAuth(data);
  }

  function handleInput(event) {
    if (event.target.matches('input[type="range"]')) {
      event.target.setAttribute("aria-valuenow", event.target.value);
    }
  }

  function handleChange(event) {
    if (event.target.matches('input[name="setType"]')) {
      const failureToggle = document.querySelector('input[name="failure"]');
      if (failureToggle && (event.target.value === "failure" || event.target.value === "pr")) {
        failureToggle.checked = event.target.value === "failure" ? true : failureToggle.checked;
      }
    }
  }

  function submitLogSet(data) {
    const today = startOfDay(new Date());
    const workout = workoutForDate(today);
    const activeExercise = workout.exercises[getActiveExerciseIndex(workout)] || workout.exercises[0];
    const weight = Number(data.get("weight")) || 0;
    const reps = Number(data.get("reps")) || 0;
    const rir = clamp(Number(data.get("rir")) || 0, 0, 10);
    const setType = String(data.get("setType") || "working");
    const failure = data.get("failure") === "on" || setType === "failure";
    const pr = setType === "pr";
    state.logs.push({
      id: uid(),
      date: iso(today),
      dayKey: workout.key,
      workoutTitle: workout.title,
      exerciseId: activeExercise.id,
      exerciseName: activeExercise.name,
      setType,
      weight,
      reps,
      rir,
      failure,
      pr,
      notes: String(data.get("notes") || "").trim(),
      volume: volumeFor(weight, reps)
    });
    saveState();
    startRestTimer();
    toastMessage(`${activeExercise.name}: set logged.`);
    render();
  }

  function submitFinishWorkout(data) {
    const today = startOfDay(new Date());
    const workout = workoutForDate(today);
    const todayIso = iso(today);
    const todayLogs = logsForDate(todayIso).filter((entry) => entry.dayKey === workout.key);
    const existing = completionForDate(todayIso);
    const completion = {
      id: existing ? existing.id : uid(),
      date: todayIso,
      dayKey: workout.key,
      title: workout.title,
      notes: String(data.get("notes") || "").trim(),
      completedAt: new Date().toISOString()
    };
    state.completedWorkouts = state.completedWorkouts.filter((entry) => entry.date !== todayIso);
    state.completedWorkouts.push(completion);
    state.ui.lastCompletion = {
      title: workout.day === 0 ? "Recovery Complete" : "Session Complete",
      subtitle: workout.day === 0 ? "System restored for the next block." : "Another Brick Laid",
      volume: sumVolume(todayLogs),
      sets: todayLogs.length,
      failure: todayLogs.filter((entry) => entry.failure).length,
      prs: todayLogs.filter((entry) => entry.pr || entry.setType === "pr").length
    };
    saveState();
    toastMessage("Workout finished.");
    render();
  }

  function submitBodyweight(data) {
    const date = String(data.get("date") || iso(new Date()));
    const weight = Number(data.get("weight"));
    if (!weight) {
      toastMessage("Enter bodyweight.");
      return;
    }
    state.bodyweight = state.bodyweight.filter((entry) => entry.date !== date);
    state.bodyweight.push({ id: uid(), date, weight });
    state.bodyweight.sort((a, b) => a.date.localeCompare(b.date));
    saveState();
    toastMessage("Bodyweight logged.");
    render();
  }

  function submitMeasurements(data) {
    const latest = {};
    MEASUREMENT_FIELDS.forEach((fieldName) => {
      latest[fieldName] = Number(data.get(fieldName)) || 0;
    });
    state.measurements.latest = latest;
    state.measurements.history.push({ date: iso(new Date()), ...latest });
    saveState();
    toastMessage("Measurements updated.");
    render();
  }

  function submitConditioning(data) {
    const date = String(data.get("date") || iso(new Date()));
    const entry = {
      id: uid(),
      date,
      type: String(data.get("type") || "Rest"),
      duration: Number(data.get("duration")) || 0,
      effort: clamp(Number(data.get("effort")) || 1, 1, 10),
      completed: data.get("completed") === "on",
      notes: String(data.get("notes") || "").trim()
    };
    state.conditioning = state.conditioning.filter((item) => item.date !== date);
    state.conditioning.push(entry);
    state.conditioning.sort((a, b) => a.date.localeCompare(b.date));
    saveState();
    toastMessage("Conditioning saved.");
    render();
  }

  async function submitPhoto(form, data) {
    const file = data.get("photo");
    if (!file || !file.size) {
      toastMessage("Choose a photo first.");
      return;
    }
    try {
      const dataUrl = await compressImageFile(file);
      state.photos.push({
        id: uid(),
        date: String(data.get("date") || iso(new Date())),
        angle: String(data.get("angle") || "Front"),
        notes: String(data.get("notes") || "").trim(),
        name: file.name,
        dataUrl
      });
      saveState();
      form.reset();
      toastMessage("Photo saved.");
      render();
    } catch (error) {
      console.error(error);
      toastMessage("Photo could not be processed.");
    }
  }

  function submitNutrition(data) {
    const date = String(data.get("date") || iso(new Date()));
    const entry = {
      id: uid(),
      date,
      calories: Number(data.get("calories")) || 0,
      protein: Number(data.get("protein")) || 0,
      carbs: Number(data.get("carbs")) || 0,
      fat: Number(data.get("fat")) || 0,
      notes: String(data.get("notes") || "").trim()
    };
    state.nutrition = state.nutrition.filter((item) => item.date !== date);
    state.nutrition.push(entry);
    state.nutrition.sort((a, b) => a.date.localeCompare(b.date));
    saveState();
    toastMessage("Nutrition saved.");
    render();
  }

  function submitSettings(data) {
    state.profile.name = String(data.get("name") || "Cody Killian").trim();
    state.profile.goal = String(data.get("goal") || "").trim();
    state.profile.readiness = clamp(Number(data.get("readiness")) || 0, 0, 100);
    state.profile.recovery = clamp(Number(data.get("recovery")) || 0, 0, 100);
    state.settings.units = String(data.get("units") || "lb");
    state.settings.restSeconds = Math.max(15, Number(data.get("restSeconds")) || 120);
    state.settings.volumeIncludesWarmups = data.get("volumeIncludesWarmups") === "on";
    restTimer.duration = state.settings.restSeconds;
    saveState();
    toastMessage("Settings saved.");
    render();
  }

  async function submitCloudConfig(data) {
    state.cloud.supabaseUrl = String(data.get("supabaseUrl") || "").trim().replace(/\/$/, "");
    state.cloud.anonKey = String(data.get("anonKey") || "").trim();
    cloudClient = null;
    cloudClientKey = "";
    saveState();
    toastMessage("Supabase project saved.");
    await initCloudSession();
    render();
  }

  async function submitCloudAuth(data) {
    const action = String(data.get("cloudAction") || "signin");
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");
    if (!email || !password) {
      toastMessage("Enter email and password.");
      return;
    }
    try {
      const client = await getCloudClient();
      if (!client) return;
      const response = action === "signup"
        ? await client.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: authRedirectUrl()
          }
        })
        : await client.auth.signInWithPassword({ email, password });
      if (response.error) throw response.error;
      const user = response.data.user || response.data.session?.user || null;
      cloudUser = user;
      state.cloud.email = email;
      state.cloud.userId = user ? user.id : state.cloud.userId;
      saveState();
      toastMessage(action === "signup" ? "Account created. Check your email if confirmation is enabled." : "Signed in.");
      render();
    } catch (error) {
      console.error(error);
      toastMessage(error.message || "Supabase auth failed.");
    }
  }

  async function initCloudSession() {
    if (!state.cloud.supabaseUrl || !state.cloud.anonKey) return;
    try {
      const client = await getCloudClient();
      if (!client) return;
      const { data, error } = await client.auth.getUser();
      if (error && error.name !== "AuthSessionMissingError") throw error;
      cloudUser = data?.user || null;
      if (cloudUser) {
        state.cloud.userId = cloudUser.id;
        state.cloud.email = cloudUser.email || state.cloud.email;
        saveState();
        if (route === "settings") render();
      }
    } catch (error) {
      console.warn("Supabase session unavailable", error);
    }
  }

  async function getCloudClient() {
    if (!state.cloud.supabaseUrl || !state.cloud.anonKey) {
      toastMessage("Save Supabase project settings first.");
      return null;
    }
    const key = `${state.cloud.supabaseUrl}|${state.cloud.anonKey}`;
    if (cloudClient && cloudClientKey === key) return cloudClient;
    await loadSupabaseScript();
    cloudClient = window.supabase.createClient(state.cloud.supabaseUrl, state.cloud.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    cloudClientKey = key;
    return cloudClient;
  }

  function loadSupabaseScript() {
    if (window.supabase && window.supabase.createClient) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${SUPABASE_CDN}"]`);
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = SUPABASE_CDN;
      script.async = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error("Could not load Supabase client."));
      document.head.appendChild(script);
    });
  }

  async function requireCloudUser() {
    const client = await getCloudClient();
    if (!client) return null;
    const { data, error } = await client.auth.getUser();
    if (error || !data?.user) {
      toastMessage("Sign in to Supabase first.");
      return null;
    }
    cloudUser = data.user;
    state.cloud.userId = data.user.id;
    state.cloud.email = data.user.email || state.cloud.email;
    saveState();
    return { client, user: data.user };
  }

  async function cloudPush() {
    try {
      const session = await requireCloudUser();
      if (!session) return;
      const snapshot = createCloudSnapshot();
      const { error } = await session.client
        .from("killian_fit_snapshots")
        .upsert({
          user_id: session.user.id,
          data: snapshot,
          updated_at: new Date().toISOString()
        }, { onConflict: "user_id" });
      if (error) throw error;
      state.cloud.lastSyncAt = new Date().toISOString();
      saveState();
      toastMessage("Pushed to Supabase.");
      render();
    } catch (error) {
      console.error(error);
      toastMessage(error.message || "Cloud push failed.");
    }
  }

  async function cloudPull() {
    try {
      const session = await requireCloudUser();
      if (!session) return;
      const { data, error } = await session.client
        .from("killian_fit_snapshots")
        .select("data, updated_at")
        .eq("user_id", session.user.id)
        .limit(1);
      if (error) throw error;
      const row = data && data[0];
      if (!row) {
        toastMessage("No cloud snapshot yet.");
        return;
      }
      const currentCloud = { ...state.cloud };
      const pulled = mergeState(defaultState(), row.data || {});
      state = {
        ...pulled,
        cloud: {
          ...currentCloud,
          userId: session.user.id,
          email: session.user.email || currentCloud.email,
          lastPullAt: new Date().toISOString(),
          lastSyncAt: row.updated_at || currentCloud.lastSyncAt
        }
      };
      saveState();
      toastMessage("Pulled from Supabase.");
      render();
    } catch (error) {
      console.error(error);
      toastMessage(error.message || "Cloud pull failed.");
    }
  }

  async function cloudSignOut() {
    try {
      const client = await getCloudClient();
      if (client) await client.auth.signOut();
      cloudUser = null;
      state.cloud.userId = "";
      saveState();
      toastMessage("Signed out.");
      render();
    } catch (error) {
      console.error(error);
      toastMessage("Sign out failed.");
    }
  }

  function createCloudSnapshot() {
    return {
      version: SNAPSHOT_VERSION,
      updatedAt: new Date().toISOString(),
      profile: state.profile,
      logs: state.logs,
      completedWorkouts: state.completedWorkouts,
      conditioning: state.conditioning,
      bodyweight: state.bodyweight,
      measurements: state.measurements,
      photos: state.photos,
      nutrition: state.nutrition,
      settings: state.settings,
      ui: {
        activeExerciseIndex: state.ui.activeExerciseIndex || {}
      }
    };
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    if (location.protocol === "file:") return;
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch((error) => {
        console.warn("Service worker registration failed", error);
      });
    });
  }

  async function compressImageFile(file) {
    const dataUrl = await readFileAsDataUrl(file);
    const image = await loadImage(dataUrl);
    const maxSize = 1200;
    const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.78);
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  function loadImage(dataUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = dataUrl;
    });
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `killian-fit-export-${iso(new Date())}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toastMessage("Data exported.");
  }

  function renderModal() {
    const completion = state.ui.lastCompletion;
    const completionHtml = completion ? `
      <div class="modal-backdrop">
        <div class="modal">
          <p class="eyebrow">Volume Logged</p>
          <h2>${escapeHtml(completion.title)}</h2>
          <p class="lede">${escapeHtml(completion.subtitle)}</p>
          <div class="grid grid-4 section-band">
            ${metric("Volume", compactNumber(completion.volume), "Total")}
            ${metric("Sets", completion.sets, "Completed")}
            ${metric("Failure", completion.failure, "High intent")}
            ${metric("PRs", completion.prs, "Marked")}
          </div>
          <div class="actions">
            <button class="button green" type="button" data-action="close-modal">Done</button>
            <a class="ghost-button" href="#analytics" data-action="close-modal">Analytics</a>
          </div>
        </div>
      </div>
    ` : "";
    const moreHtml = state.ui.moreMenuOpen ? `
      <div class="more-backdrop">
        <button class="more-scrim" type="button" data-action="close-more" aria-label="Close menu"></button>
        <div class="more-sheet">
          <div class="row-between">
            <div>
              <p class="eyebrow">More</p>
              <h2>Tools</h2>
            </div>
            <button class="ghost-button more-close" type="button" data-action="close-more">Done</button>
          </div>
          <div class="more-grid">
            ${moreItem("analytics", "Analytics", "Charts and consistency")}
            ${moreItem("photos", "Photos", "Progress check-ins")}
            ${moreItem("nutrition", "Nutrition", "Calories and macros")}
            ${moreItem("settings", "Settings", "Profile and cloud sync")}
          </div>
        </div>
      </div>
    ` : "";
    modalRoot.innerHTML = `${completionHtml}${moreHtml}`;
  }

  function moreItem(key, label, caption) {
    return `
      <a class="more-item" href="#${key}" data-action="more-route">
        <span class="nav-glyph glyph-${key}" aria-hidden="true"></span>
        <span>
          <strong>${escapeHtml(label)}</strong>
          <small>${escapeHtml(caption)}</small>
        </span>
      </a>
    `;
  }

  function startRestTimer() {
    restTimer.duration = Number(state.settings.restSeconds) || 120;
    restTimer.endAt = Date.now() + restTimer.duration * 1000;
    if (restTimer.interval) clearInterval(restTimer.interval);
    restTimer.interval = setInterval(updateTimerDisplay, 250);
    updateTimerDisplay();
  }

  function resetRestTimer() {
    if (restTimer.interval) clearInterval(restTimer.interval);
    restTimer.endAt = 0;
    restTimer.duration = Number(state.settings.restSeconds) || 120;
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    const timerEl = document.getElementById("timerTime");
    const remaining = restTimer.endAt ? Math.max(0, Math.ceil((restTimer.endAt - Date.now()) / 1000)) : restTimer.duration;
    if (timerEl) timerEl.textContent = formatSeconds(remaining);
    if (restTimer.endAt && remaining === 0) {
      clearInterval(restTimer.interval);
      restTimer.endAt = 0;
      toastMessage("Rest complete.");
    }
  }

  function workoutForDate(date) {
    const day = startOfDay(date).getDay();
    return PROGRAM.find((item) => item.day === day) || PROGRAM[0];
  }

  function getActiveExerciseIndex(workout) {
    const index = Number(state.ui.activeExerciseIndex[workout.key]) || 0;
    return clamp(index, 0, workout.exercises.length - 1);
  }

  function logsForDate(date) {
    return state.logs.filter((entry) => entry.date === date);
  }

  function logsBetween(start, end) {
    const startIso = iso(start);
    const endIso = iso(end);
    return state.logs.filter((entry) => entry.date >= startIso && entry.date <= endIso);
  }

  function completionForDate(date) {
    return state.completedWorkouts.find((entry) => entry.date === date);
  }

  function conditioningForDate(date) {
    return state.conditioning.find((entry) => entry.date === date);
  }

  function nutritionForDate(date) {
    return state.nutrition.find((entry) => entry.date === date);
  }

  function previousWeekExercise(item, date) {
    const start = addDays(weekStart(date), -7);
    const end = addDays(start, 6);
    const logs = logsBetween(start, end).filter((entry) => entry.exerciseId === item.id || entry.exerciseName === item.name);
    const volume = sumVolume(logs);
    const best = logs.slice().sort((a, b) => estimatedOneRepMax(b.weight, b.reps) - estimatedOneRepMax(a.weight, a.reps))[0];
    return {
      volume,
      bestSet: best ? `${best.weight} x ${best.reps} / RIR ${best.rir}` : "No previous set"
    };
  }

  function latestBodyweight() {
    return state.bodyweight.slice().sort((a, b) => a.date.localeCompare(b.date)).at(-1) || null;
  }

  function bodyweightDelta(days) {
    const latest = latestBodyweight();
    if (!latest) return 0;
    const cutoff = iso(addDays(new Date(), -days));
    const previous = state.bodyweight.filter((entry) => entry.date <= cutoff).sort((a, b) => a.date.localeCompare(b.date)).at(-1);
    return previous ? round(latest.weight - previous.weight, 1) : 0;
  }

  function sumVolume(logs) {
    return logs.reduce((sum, entry) => {
      if (!state.settings.volumeIncludesWarmups && entry.setType === "warmup") return sum;
      return sum + (Number(entry.volume) || volumeFor(entry.weight, entry.reps));
    }, 0);
  }

  function volumeFor(weight, reps) {
    return Math.round((Number(weight) || 0) * (Number(reps) || 0));
  }

  function averageRir(logs) {
    const valid = logs.filter((entry) => Number.isFinite(Number(entry.rir)));
    if (!valid.length) return "--";
    return round(valid.reduce((sum, entry) => sum + Number(entry.rir), 0) / valid.length, 1);
  }

  function weeklyCompletionPct(date) {
    const start = weekStart(date);
    const today = startOfDay(date);
    const eligible = PROGRAM.filter((day) => {
      const dayDate = day.day === 0 ? addDays(start, 6) : addDays(start, day.day - 1);
      return dayDate <= today;
    });
    if (!eligible.length) return 0;
    const completed = eligible.filter((day) => {
      const dayDate = day.day === 0 ? addDays(start, 6) : addDays(start, day.day - 1);
      return completionForDate(iso(dayDate));
    }).length;
    return Math.round((completed / eligible.length) * 100);
  }

  function completionStreak(date) {
    let streak = 0;
    for (let i = 0; i < 60; i += 1) {
      const day = addDays(startOfDay(date), -i);
      const workout = workoutForDate(day);
      const completion = completionForDate(iso(day));
      if (workout.day === 0) {
        if (completion || i === 0) streak += completion ? 1 : 0;
        else break;
      } else if (completion) {
        streak += 1;
      } else {
        break;
      }
    }
    return streak;
  }

  function conditioningCompletionCount(days) {
    const cutoff = iso(addDays(new Date(), -days + 1));
    return state.conditioning.filter((entry) => entry.date >= cutoff && entry.completed).length;
  }

  function renderPrRows() {
    const lifts = ["Bench Press", "Back Squat", "Weighted Pull-Ups", "Romanian Deadlift", "Standing OHP"];
    return lifts.map((lift) => {
      const top = state.logs
        .filter((entry) => entry.exerciseName === lift)
        .sort((a, b) => estimatedOneRepMax(b.weight, b.reps) - estimatedOneRepMax(a.weight, a.reps))[0];
      return dataRow(lift, top ? `${top.weight} x ${top.reps}` : "--");
    });
  }

  function weeklyVolumeSeries(date, count) {
    const currentStart = weekStart(date);
    const series = [];
    for (let i = count - 1; i >= 0; i -= 1) {
      const start = addDays(currentStart, -7 * i);
      const end = addDays(start, 6);
      series.push({
        label: `${start.getMonth() + 1}/${start.getDate()}`,
        value: sumVolume(logsBetween(start, end))
      });
    }
    return series;
  }

  function muscleGroupVolume(logs) {
    const buckets = new Map();
    logs.forEach((entry) => {
      const item = findExercise(entry.exerciseName);
      const muscles = item ? item.muscles : ["Other"];
      muscles.forEach((muscle) => buckets.set(muscle, (buckets.get(muscle) || 0) + volumeFor(entry.weight, entry.reps) / muscles.length));
    });
    return Array.from(buckets, ([label, value]) => ({ label, value: Math.round(value) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }

  function consistencySeries(date, days) {
    const series = [];
    for (let i = days - 1; i >= 0; i -= 1) {
      const day = addDays(startOfDay(date), -i);
      series.push({
        label: day.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 1),
        value: completionForDate(iso(day)) ? 1 : 0
      });
    }
    return series;
  }

  function failureSeries(date, count) {
    const currentStart = weekStart(date);
    const series = [];
    for (let i = count - 1; i >= 0; i -= 1) {
      const start = addDays(currentStart, -7 * i);
      const end = addDays(start, 6);
      const value = logsBetween(start, end).filter((entry) => entry.failure || entry.setType === "failure").length;
      series.push({ label: `${start.getMonth() + 1}/${start.getDate()}`, value });
    }
    return series;
  }

  function readinessSeries() {
    const base = Number(state.profile.recovery) || 75;
    return Array.from({ length: 12 }, (_, index) => clamp(base - 8 + ((index * 7) % 15), 45, 98));
  }

  function exerciseStrengthSeries(exerciseName, count) {
    const currentStart = weekStart(new Date());
    const series = [];
    for (let i = count - 1; i >= 0; i -= 1) {
      const start = addDays(currentStart, -7 * i);
      const end = addDays(start, 6);
      const logs = logsBetween(start, end).filter((entry) => entry.exerciseName === exerciseName);
      const best = logs.reduce((max, entry) => Math.max(max, estimatedOneRepMax(entry.weight, entry.reps)), 0);
      series.push({ label: `${start.getMonth() + 1}/${start.getDate()}`, value: Math.round(best) });
    }
    return series;
  }

  function nutritionAverages(days) {
    const cutoff = iso(addDays(new Date(), -days + 1));
    const entries = state.nutrition.filter((entry) => entry.date >= cutoff);
    if (!entries.length) return { days: 0, calories: 0, protein: 0, carbs: 0, fat: 0 };
    const total = entries.reduce((sum, entry) => ({
      calories: sum.calories + Number(entry.calories || 0),
      protein: sum.protein + Number(entry.protein || 0),
      carbs: sum.carbs + Number(entry.carbs || 0),
      fat: sum.fat + Number(entry.fat || 0)
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
    return {
      days: entries.length,
      calories: Math.round(total.calories / entries.length),
      protein: Math.round(total.protein / entries.length),
      carbs: Math.round(total.carbs / entries.length),
      fat: Math.round(total.fat / entries.length)
    };
  }

  function findExercise(name) {
    for (const day of PROGRAM) {
      const found = day.exercises.find((item) => item.name === name || item.id === slug(name));
      if (found) return found;
    }
    return null;
  }

  function barChart(values, options = {}) {
    const width = 720;
    const height = 220;
    const pad = 28;
    const labels = options.labels || [];
    const max = options.max || Math.max(...values, 1);
    const color = options.color || "var(--blue)";
    const slot = (width - pad * 2) / Math.max(values.length, 1);
    const bars = values.map((value, index) => {
      const barHeight = max ? ((value / max) * (height - pad * 2 - 22)) : 0;
      const x = pad + index * slot + slot * 0.18;
      const y = height - pad - barHeight - 16;
      const w = Math.max(8, slot * 0.64);
      return `
        <rect x="${x}" y="${y}" width="${w}" height="${barHeight}" rx="4" fill="${color}" opacity="0.9"></rect>
        <text x="${x + w / 2}" y="${height - 14}" text-anchor="middle" fill="#687385" font-size="16">${escapeHtml(labels[index] || "")}</text>
      `;
    }).join("");
    return `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bar chart">
        <line x1="${pad}" y1="${height - pad - 16}" x2="${width - pad}" y2="${height - pad - 16}" stroke="rgba(255,255,255,.12)" />
        ${bars}
      </svg>
    `;
  }

  function lineChart(values, options = {}) {
    const width = 720;
    const height = options.height || 120;
    const pad = 24;
    const color = options.color || "var(--green)";
    if (!values.length) {
      return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="No chart data"></svg>`;
    }
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const step = (width - pad * 2) / Math.max(values.length - 1, 1);
    const points = values.map((value, index) => {
      const x = pad + index * step;
      const y = height - pad - ((value - min) / range) * (height - pad * 2);
      return [round(x, 2), round(y, 2)];
    });
    const polyline = points.map((point) => point.join(",")).join(" ");
    const circles = points.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${color}"></circle>`).join("");
    return `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart">
        <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" stroke="rgba(255,255,255,.1)" />
        <polyline points="${polyline}" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></polyline>
        ${circles}
      </svg>
    `;
  }

  function estimatedReps(repRange, setIndex) {
    const text = String(repRange);
    if (text.includes("failure")) return Math.max(8, 18 - setIndex * 2);
    const matches = text.match(/\d+/g);
    if (!matches) return 10;
    const high = Number(matches[matches.length - 1]);
    return Math.max(1, high - Math.min(setIndex, 3));
  }

  function estimatedOneRepMax(weight, reps) {
    return Number(weight || 0) * (1 + Number(reps || 0) / 30);
  }

  function readinessLabel(value) {
    const score = Number(value) || 0;
    if (score >= 86) return "Attack";
    if (score >= 72) return "Train Hard";
    if (score >= 58) return "Measured Push";
    return "Manage Load";
  }

  function cloudStatusLabel() {
    if (state.cloud.userId || cloudUser) return "Signed in and ready to sync";
    if (state.cloud.supabaseUrl && state.cloud.anonKey) return "Supabase project saved";
    return "Local mode";
  }

  function cloudStatusDetail() {
    if (state.cloud.userId || cloudUser) return state.cloud.email || "Authenticated Supabase session detected.";
    if (state.cloud.supabaseUrl && state.cloud.anonKey) return "Sign in or create an account, then push your current data.";
    return "Add your Supabase Project URL and publishable/anon key to enable cloud sync.";
  }

  function authRedirectUrl() {
    return `${window.location.origin}${window.location.pathname}`;
  }

  function setTypeLabel(entry) {
    if (entry.setType === "pr" || entry.pr) return "PR";
    if (entry.setType === "failure" || entry.failure) return "Failure";
    if (entry.setType === "warmup") return "Warm-up";
    return "Working";
  }

  function startOfDay(date) {
    const next = new Date(date);
    next.setHours(0, 0, 0, 0);
    return next;
  }

  function addDays(date, days) {
    const next = startOfDay(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  function weekStart(date) {
    const next = startOfDay(date);
    const day = next.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    return addDays(next, diff);
  }

  function iso(date) {
    return startOfDay(date).toISOString().slice(0, 10);
  }

  function formatDateLong(date) {
    return startOfDay(date).toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric"
    });
  }

  function formatDateShort(date) {
    return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric"
    });
  }

  function formatDateTime(value) {
    return new Date(value).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  }

  function formatSeconds(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }

  function compactNumber(value) {
    const number = Number(value) || 0;
    if (number >= 1000000) return `${round(number / 1000000, 1)}M`;
    if (number >= 1000) return `${round(number / 1000, 1)}k`;
    return String(Math.round(number));
  }

  function signed(value) {
    const number = Number(value) || 0;
    return `${number > 0 ? "+" : ""}${number}`;
  }

  function round(number, places = 0) {
    const factor = 10 ** places;
    return Math.round(Number(number) * factor) / factor;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function safeNumber(value, min, max) {
    return clamp(Math.round(Number(value) || 0), min, max);
  }

  function slug(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function uid() {
    if (globalThis.crypto && globalThis.crypto.randomUUID) return globalThis.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function unique(values) {
    return Array.from(new Set(values));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function toastMessage(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toast.dataset.timer);
    toast.dataset.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
  }
}());
