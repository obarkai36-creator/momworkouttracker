import { getWorkout, LOAD_LEVELS } from "./data.js";
import { checkFirebaseReady, saveSession } from "./firebase-init.js";

const params = new URLSearchParams(location.search);
const workout = getWorkout(params.get("id"));

if (!workout) {
  document.querySelector(".wrap").innerHTML = `<div class="empty-state">אימון לא נמצא. <a href="index.html">חזרה ללוח האימונים</a></div>`;
} else {
  init(workout);
}

function loadPickerHtml(name) {
  return LOAD_LEVELS.map(
    (l) => `<button type="button" data-level="${l.level}" data-name="${name}">${l.label}</button>`
  ).join("");
}

function wireLoadPicker(container) {
  container.querySelectorAll(".loadpick").forEach((pick) => {
    pick.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      pick.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      pick.dataset.value = btn.dataset.level;
    });
  });
}

function videoLinkHtml(url) {
  if (!url) return "";
  return `<a class="btn-secondary" href="${url}" target="_blank" rel="noopener" style="margin-top:8px;">▶ צפו בהדגמה</a>`;
}

/** Renders one loggable exercise card (used for both main exercises and
 * the end-of-workout core/ab exercises — same fields, same saving logic). */
function exerciseCardHtml(ex, i) {
  const isTime = ex.durationSec != null;
  const targetText = isTime ? `${ex.sets} סטים × ${ex.durationSec} שניות` : `${ex.sets} סטים × ${ex.reps} חזרות`;
  const secondField = isTime
    ? `<div class="field"><label for="reps-${i}">משך בפועל (שניות)</label><input type="number" id="reps-${i}" min="0" step="1" value="${ex.durationSec}" inputmode="numeric"></div>`
    : `<div class="field"><label for="reps-${i}">חזרות שבוצעו</label><input type="number" id="reps-${i}" min="0" step="1" value="${ex.reps}" inputmode="numeric"></div>`;

  return `
  <div class="exercise-card" data-index="${i}">
    <h4>${ex.name}</h4>
    <div class="target">${targetText}${ex.note ? ` · ${ex.note}` : ""}</div>
    <div class="exercise-fields">
      <div class="field">
        <label for="weight-${i}">משקל (ק"ג)</label>
        <input type="number" id="weight-${i}" min="0" step="0.5" inputmode="decimal">
      </div>
      ${secondField}
    </div>
    <div class="field">
      <label>עומס לתרגיל</label>
      <div class="loadpick" id="loadpick-${i}"></div>
    </div>
    ${videoLinkHtml(ex.youtubeUrl)}
  </div>`;
}

function stretchListHtml(stretches) {
  return `<ul class="evul">${stretches
    .map((s) => `<li><b>${s.name}</b> ${videoLinkHtml(s.youtubeUrl)}</li>`)
    .join("")}</ul>`;
}

function init(workout) {
  document.getElementById("workoutTitle").textContent = `${workout.label} (${workout.dateLabel})`;
  document.getElementById("workoutSubtitle").textContent = `3 סטים × 12 חזרות לכל תרגיל · דגש: ${workout.focus}`;

  const configured = checkFirebaseReady();
  document.getElementById("saveBtn").disabled = !configured;

  document.getElementById("sessionDate").valueAsDate = new Date();

  const overallPick = document.getElementById("overallLoadPick");
  overallPick.innerHTML = loadPickerHtml("overall");
  wireLoadPicker(document.getElementById("detailsPanel"));

  // Main exercises and the end-of-workout core/ab exercises are logged the
  // same way, so they're indexed as one continuous list (loggableExercises)
  // even though they render into two separate sections on the page.
  const loggableExercises = [...workout.exercises, ...workout.core];
  const coreStartIndex = workout.exercises.length;

  document.getElementById("exerciseList").innerHTML = workout.exercises
    .map((ex, i) => exerciseCardHtml(ex, i))
    .join("");
  document.getElementById("coreList").innerHTML = workout.core
    .map((ex, i) => exerciseCardHtml(ex, coreStartIndex + i))
    .join("");
  document.getElementById("stretchPanel").innerHTML = stretchListHtml(workout.stretches);

  loggableExercises.forEach((_, i) => {
    document.getElementById(`loadpick-${i}`).innerHTML = loadPickerHtml(`ex-${i}`);
  });
  wireLoadPicker(document.getElementById("exerciseList"));
  wireLoadPicker(document.getElementById("coreList"));

  document.getElementById("saveBtn").addEventListener("click", () => onSave(workout, loggableExercises));
}

async function onSave(workout, loggableExercises) {
  const saveBtn = document.getElementById("saveBtn");
  const confirmEl = document.getElementById("saveConfirm");
  saveBtn.disabled = true;
  saveBtn.textContent = "שומר…";

  const exercises = loggableExercises.map((ex, i) => {
    const pick = document.getElementById(`loadpick-${i}`);
    const isTime = ex.durationSec != null;
    return {
      name: ex.name,
      targetSets: ex.sets,
      targetReps: isTime ? null : ex.reps,
      targetDurationSec: isTime ? ex.durationSec : null,
      weightKg: parseFloat(document.getElementById(`weight-${i}`).value) || null,
      repsDone: isTime ? null : parseInt(document.getElementById(`reps-${i}`).value, 10) || null,
      durationDoneSec: isTime ? parseInt(document.getElementById(`reps-${i}`).value, 10) || null : null,
      loadTag: pick?.dataset.value || null,
    };
  });

  const overallPick = document.getElementById("overallLoadPick");

  const sessionData = {
    workoutId: workout.id,
    workoutLabel: workout.label,
    date: document.getElementById("sessionDate").value,
    exercises,
    overallLoad: overallPick.dataset.value || null,
    notes: document.getElementById("sessionNotes").value.trim(),
  };

  try {
    await saveSession(sessionData);
    confirmEl.textContent = "האימון נשמר בהצלחה! ✓";
    confirmEl.classList.add("show");
    saveBtn.textContent = "נשמר ✓";
  } catch (e) {
    console.error("Failed to save session", e);
    confirmEl.textContent = "שמירה נכשלה — יש לבדוק את הגדרות Firebase (ראו README.md).";
    confirmEl.classList.add("show");
    saveBtn.disabled = false;
    saveBtn.textContent = "שמירת האימון";
  }
}
