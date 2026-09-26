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

function init(workout) {
  document.getElementById("workoutTitle").textContent = `${workout.label} (${workout.dateLabel})`;
  document.getElementById("workoutSubtitle").textContent = `3 סטים × 12 חזרות לכל תרגיל · ${workout.exercises.length} תרגילים`;

  const configured = checkFirebaseReady();
  document.getElementById("saveBtn").disabled = !configured;

  document.getElementById("sessionDate").valueAsDate = new Date();

  const overallPick = document.getElementById("overallLoadPick");
  overallPick.innerHTML = loadPickerHtml("overall");
  wireLoadPicker(document.getElementById("detailsPanel"));

  const list = document.getElementById("exerciseList");
  list.innerHTML = workout.exercises
    .map(
      (ex, i) => `
    <div class="exercise-card" data-index="${i}">
      <h4>${ex.name}</h4>
      <div class="target">${ex.sets} סטים × ${ex.reps} חזרות</div>
      <div class="exercise-fields">
        <div class="field">
          <label for="weight-${i}">משקל (ק"ג)</label>
          <input type="number" id="weight-${i}" min="0" step="0.5" inputmode="decimal">
        </div>
        <div class="field">
          <label for="reps-${i}">חזרות שבוצעו</label>
          <input type="number" id="reps-${i}" min="0" step="1" value="${ex.reps}" inputmode="numeric">
        </div>
      </div>
      <div class="field">
        <label>עומס לתרגיל</label>
        <div class="loadpick" id="loadpick-${i}"></div>
      </div>
    </div>`
    )
    .join("");

  workout.exercises.forEach((_, i) => {
    document.getElementById(`loadpick-${i}`).innerHTML = loadPickerHtml(`ex-${i}`);
  });
  wireLoadPicker(list);

  document.getElementById("saveBtn").addEventListener("click", () => onSave(workout));
}

async function onSave(workout) {
  const saveBtn = document.getElementById("saveBtn");
  const confirmEl = document.getElementById("saveConfirm");
  saveBtn.disabled = true;
  saveBtn.textContent = "שומר…";

  const exercises = workout.exercises.map((ex, i) => {
    const pick = document.getElementById(`loadpick-${i}`);
    return {
      name: ex.name,
      targetSets: ex.sets,
      targetReps: ex.reps,
      weightKg: parseFloat(document.getElementById(`weight-${i}`).value) || null,
      repsDone: parseInt(document.getElementById(`reps-${i}`).value, 10) || null,
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
