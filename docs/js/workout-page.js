import { getWorkout, LOAD_LEVELS, buildPlan, MUSCLE_LABELS } from "./data.js";
import { checkFirebaseReady, saveSession, loadAllSessions } from "./firebase-init.js";
import { bodyMapHtml, wireBodyMap, fatigueLevelLabel } from "./body-map.js";

const params = new URLSearchParams(location.search);
const workout = getWorkout(params.get("id"));

if (!workout) {
  document.querySelector(".wrap").innerHTML = `<div class="empty-state">אימון לא נמצא. <a href="index.html">חזרה ללוח האימונים</a></div>`;
} else {
  init(workout);
}

const todayIso = () => new Date().toISOString().slice(0, 10);

function videoLinkHtml(url) {
  if (!url) return "";
  return `<a class="btn-secondary" href="${url}" target="_blank" rel="noopener" style="margin-top:8px;">▶ צפו בהדגמה</a>`;
}

function fatigueWarningHtml(muscle, fatigueState) {
  const level = fatigueState[muscle];
  if (!level || level === "none") return "";
  const badgeLevel = level === "high" ? "heavy" : "medium";
  const text = level === "high" ? "אזור עם עייפות משמעותית — שקלי משקל קל יותר או לדלג" : "אזור עם עייפות קלה";
  return `<div style="margin-top:8px;"><span class="load-badge" data-level="${badgeLevel}">⚠ ${text}</span></div>`;
}

function weightInputHtml(idx) {
  if (idx == null) return "";
  return `
    <div class="field" style="margin-top:10px;">
      <label for="bw-${idx}">משקל בק"ג (לתיעוד ראשוני — לצורך נקודת ייחוס להמשך)</label>
      <input type="number" id="bw-${idx}" min="0" step="0.5" inputmode="decimal">
    </div>`;
}

function exerciseCardHtml(ex, fatigueState, weightIdx = null) {
  const isTime = ex.durationSec != null;
  const targetText = isTime ? `${ex.sets} סטים × ${ex.durationSec} שניות` : `${ex.sets} סטים × ${ex.reps} חזרות`;
  return `
  <div class="exercise-card">
    <h4>${ex.name} <span class="name-en">(${ex.nameEn})</span></h4>
    <div class="target">${targetText}${ex.note ? ` · ${ex.note}` : ""} · ${MUSCLE_LABELS[ex.muscle] || ""}</div>
    ${fatigueWarningHtml(ex.muscle, fatigueState)}
    ${videoLinkHtml(ex.youtubeUrl)}
    ${weightInputHtml(weightIdx)}
  </div>`;
}

function stretchListHtml(stretches) {
  return `<ul class="evul">${stretches
    .map((s) => `<li><b>${s.name}</b> <span class="name-en">(${s.nameEn})</span> ${videoLinkHtml(s.youtubeUrl)}</li>`)
    .join("")}</ul>`;
}

async function init(workout) {
  document.getElementById("workoutTitle").innerHTML = `${workout.label} <span class="name-en">(${workout.labelEn})</span>`;
  document.getElementById("workoutSubtitle").textContent = `דגש: ${workout.focus}`;

  const configured = checkFirebaseReady();

  // Declared before any `await` below so the body-map click handler (which
  // can fire while that fetch is still pending) never reads these mid-TDZ.
  let currentLevel = null;
  let coreVariantIndex = 0;
  // First time this workout is ever done, she gets a weight-per-exercise
  // field to establish a baseline reference point (nothing to compare future
  // sessions against otherwise). Defaults to true if history can't be
  // checked (not configured yet) - showing the field costs nothing if wrong.
  let isFirstTime = true;
  let weightedItems = []; // [{ name, idx }] for the currently-rendered plan

  const fatigueState = {};
  const bodyMapContainer = document.getElementById("bodyMapContainer");
  bodyMapContainer.innerHTML = bodyMapHtml(fatigueState);
  wireBodyMap(bodyMapContainer, fatigueState, () => {
    // If a plan is already showing, refresh its fatigue warnings live.
    if (currentLevel) renderPlan(currentLevel);
  });

  const loadPick = document.getElementById("loadPick");
  loadPick.innerHTML = LOAD_LEVELS.map((l) => `<button type="button" data-level="${l.level}">${l.label}</button>`).join("");
  // Wired immediately, before the await below — otherwise a tap on the
  // picker is silently dropped for as long as that fetch takes (which can
  // be several seconds, or never resolve, on a slow/blocked connection).
  loadPick.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    onPickLevel(btn.dataset.level);
  });
  document.getElementById("completeBtn").addEventListener("click", onCompleteWorkout);

  if (configured) {
    try {
      const sessions = await loadAllSessions();
      const pastCount = sessions.filter((s) => s.workoutId === workout.id).length;
      coreVariantIndex = pastCount % workout.coreVariants.length;
      isFirstTime = pastCount === 0;
    } catch (e) {
      console.error("Failed to load past sessions", e);
    }
  }

  function renderPlan(level) {
    const plan = buildPlan(workout, level, coreVariantIndex);
    weightedItems = [];
    let nextIdx = 0;
    const nextWeightIdx = (name) => {
      if (!isFirstTime) return null;
      const idx = nextIdx++;
      weightedItems.push({ name, idx });
      return idx;
    };

    const warmupPanel = document.getElementById("warmupPanel");
    warmupPanel.innerHTML = `<h2>חימום</h2><div class="status-note-text">${plan.warmup.minutes} דקות ${plan.warmup.name} <span class="name-en">(${plan.warmup.nameEn})</span></div>`;

    const activationPanel = document.getElementById("activationPanel");
    if (plan.activation) {
      activationPanel.innerHTML = `
        <div class="section-eyebrow">הפעלה</div>
        ${exerciseCardHtml(plan.activation, fatigueState, nextWeightIdx(plan.activation.name))}`;
    } else {
      activationPanel.innerHTML = "";
    }

    document.getElementById("exerciseList").innerHTML = plan.exercises
      .map((ex) => exerciseCardHtml(ex, fatigueState, nextWeightIdx(ex.name)))
      .join("");
    document.getElementById("coreList").innerHTML = plan.core
      .map((ex) => exerciseCardHtml(ex, fatigueState, nextWeightIdx(ex.name)))
      .join("");
    document.getElementById("stretchPanel").innerHTML = stretchListHtml(plan.stretches);

    const firstTimeNote = document.getElementById("firstTimeNote");
    if (firstTimeNote) firstTimeNote.style.display = isFirstTime ? "" : "none";

    document.getElementById("planSection").style.display = "";
    document.getElementById("pickPrompt").style.display = "none";
  }

  function onPickLevel(level) {
    loadPick.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b.dataset.level === level));
    currentLevel = level;
    renderPlan(level);
    // Picking a level only shows the plan — nothing is logged until she
    // explicitly marks the workout complete (onCompleteWorkout below).
    document.getElementById("saveConfirm").classList.remove("show");
  }

  async function onCompleteWorkout() {
    if (!currentLevel) return;

    const completeBtn = document.getElementById("completeBtn");
    const confirmEl = document.getElementById("saveConfirm");

    if (!configured) {
      confirmEl.textContent = "Firebase לא מוגדר — האימון לא ניתן לשמירה כרגע (ראו README.md).";
      confirmEl.classList.add("show");
      return;
    }

    completeBtn.disabled = true;
    completeBtn.textContent = "שומר…";
    try {
      const sessionData = {
        workoutId: workout.id,
        workoutLabel: workout.label,
        date: todayIso(),
        desiredLoad: currentLevel,
        coreVariantIndex,
        fatigue: { ...fatigueState },
        notes: document.getElementById("workoutNotes").value.trim(),
      };
      if (isFirstTime && weightedItems.length) {
        sessionData.baselineWeights = weightedItems.map(({ name, idx }) => ({
          name,
          weightKg: parseFloat(document.getElementById(`bw-${idx}`).value) || null,
        }));
      }
      await saveSession(sessionData);
      completeBtn.textContent = "✓ האימון נשמר";
      confirmEl.textContent = "האימון נרשם בהצלחה!";
      confirmEl.classList.add("show");
    } catch (e) {
      console.error("Failed to save session", e);
      completeBtn.disabled = false;
      completeBtn.textContent = "✓ סיימתי את האימון";
      confirmEl.textContent = "השמירה נכשלה — יש לבדוק את הגדרות Firebase (ראו README.md).";
      confirmEl.classList.add("show");
    }
  }
}
