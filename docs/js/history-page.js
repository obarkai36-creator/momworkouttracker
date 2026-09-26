import { WORKOUTS, getWorkout, loadLabel, buildPlan, MUSCLE_LABELS } from "./data.js";
import { checkFirebaseReady, loadAllSessions } from "./firebase-init.js";
import { fatigueLevelLabel } from "./body-map.js";

const dateFmt = (iso) => {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y.slice(2)}`;
};

function loadBadge(level) {
  if (!level) return `<span class="load-badge" data-level="medium" style="opacity:.5">לא צוין</span>`;
  return `<span class="load-badge" data-level="${level}">${loadLabel(level)}</span>`;
}

function fatigueSummaryHtml(fatigue) {
  const entries = Object.entries(fatigue || {}).filter(([, level]) => level && level !== "none");
  if (!entries.length) return `<div class="status-note-text">לא דווחה עייפות מיוחדת</div>`;
  return `<ul class="evul">${entries
    .map(([muscle, level]) => `<li><b>${MUSCLE_LABELS[muscle] || muscle}</b> — ${fatigueLevelLabel(level)}</li>`)
    .join("")}</ul>`;
}

function sessionDetailHtml(workout, session) {
  const plan = buildPlan(workout, session.desiredLoad || "medium", session.coreVariantIndex || 0);
  const allExercises = [...(plan.activation ? [plan.activation] : []), ...plan.exercises, ...plan.core];
  const weightByName = {};
  for (const w of session.baselineWeights || []) weightByName[w.name] = w.weightKg;

  const hasWeights = Object.keys(weightByName).length > 0;
  const rows = allExercises
    .map((ex) => {
      const weightCell = hasWeights
        ? `<td class="num">${weightByName[ex.name] != null ? weightByName[ex.name] + ' ק"ג' : "—"}</td>`
        : "";
      return `
    <tr>
      <td>${ex.name} <span class="name-en">(${ex.nameEn})</span></td>
      <td class="num">${ex.durationSec != null ? ex.durationSec + " שנ'" : ex.reps + " חזרות"}</td>
      ${weightCell}
    </tr>`;
    })
    .join("");

  return `
    <div class="dgrid" style="margin-bottom:16px;">
      <div class="dpanel"><h4>עומס שנבחר</h4>${loadBadge(session.desiredLoad)}</div>
      <div class="dpanel"><h4>עייפות שדווחה לפני האימון</h4>${fatigueSummaryHtml(session.fatigue)}</div>
      <div class="dpanel span"><h4>הערות</h4><div class="status-note-text">${session.notes || "—"}</div></div>
    </div>
    ${hasWeights ? `<div class="goalline">אימון ראשון מהסוג הזה — משקלי הבסיס שנרשמו:</div>` : ""}
    <div class="scrollbox">
      <table class="datatable">
        <thead><tr><th>תרגיל</th><th>יעד</th>${hasWeights ? "<th>משקל</th>" : ""}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function openModal(workout, sessionsForWorkout) {
  document.getElementById("modalTitle").innerHTML = `${workout.label} <span class="name-en">(${workout.labelEn})</span>`;
  document.getElementById("modalSubtitle").textContent = `${sessionsForWorkout.length} אימונים תועדו`;

  const body = document.getElementById("modalBody");
  if (!sessionsForWorkout.length) {
    body.innerHTML = `<div class="empty-state">עדיין לא תועד אימון מהסוג הזה.</div>`;
  } else {
    body.innerHTML = sessionsForWorkout
      .map(
        (s, i) => `
      <div class="section-eyebrow" style="${i === 0 ? "margin-top:0" : ""}">${dateFmt(s.date)}</div>
      ${sessionDetailHtml(workout, s)}`
      )
      .join("");
  }

  document.getElementById("modalBackdrop").classList.add("open");
}

function wireModal() {
  const backdrop = document.getElementById("modalBackdrop");
  document.getElementById("modalClose").addEventListener("click", () => backdrop.classList.remove("open"));
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) backdrop.classList.remove("open");
  });
}

function workoutTile(w, sessionsForWorkout) {
  const last = sessionsForWorkout[0];
  return `
  <button type="button" class="tile tap" data-id="${w.id}" style="text-align:right; width:100%; border:1px solid var(--border); font:inherit;">
    <span class="go">‹</span>
    <h3><span class="dot" style="background:var(--${w.pillar}-b); display:inline-block; margin-inline-end:6px;"></span>${w.label} <span class="name-en">(${w.labelEn})</span></h3>
    <div class="row"><div class="num">${sessionsForWorkout.length}<small>אימונים</small></div></div>
    <div class="sub">${last ? `אחרון: ${dateFmt(last.date)}` : "עדיין לא בוצע"}</div>
  </button>`;
}

async function render() {
  const configured = checkFirebaseReady();
  const content = document.getElementById("content");

  let sessions = [];
  if (configured) {
    try {
      sessions = await loadAllSessions();
    } catch (e) {
      console.error("Failed to load sessions", e);
    }
  }

  document.getElementById("subtitle").textContent = sessions.length
    ? `${sessions.length} אימונים תועדו בסך הכול`
    : "עדיין לא תועדו אימונים";

  const byWorkout = {};
  for (const w of WORKOUTS) byWorkout[w.id] = sessions.filter((s) => s.workoutId === w.id);

  content.innerHTML = `<div class="grid">${WORKOUTS.map((w) => workoutTile(w, byWorkout[w.id])).join("")}</div>`;

  content.querySelectorAll(".tile[data-id]").forEach((tile) => {
    tile.addEventListener("click", () => {
      const w = getWorkout(tile.dataset.id);
      openModal(w, byWorkout[w.id]);
    });
  });

  wireModal();
}

render();
