import { WORKOUTS, loadLabel } from "./data.js";
import { checkFirebaseReady, loadAllSessions } from "./firebase-init.js";

const dateFmt = (iso) => {
  if (!iso) return null;
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y.slice(2)}`;
};

function workoutTile(w, lastSession) {
  const lastText = lastSession ? `בוצע לאחרונה: ${dateFmt(lastSession.date)}` : "עדיין לא בוצע";
  return `
  <a class="tile tap" href="workout.html?id=${w.id}" style="text-decoration:none; display:block;">
    <span class="go">‹</span>
    <h3><span class="dot" style="background:var(--${w.pillar}-b); display:inline-block; margin-inline-end:6px;"></span>${w.label} <span class="muted small">(${w.dateLabel})</span></h3>
    <div class="row"><div class="num">${w.exercises.length}<small>תרגילים</small></div></div>
    <div class="sub">${lastText}</div>
  </a>`;
}

function utilityTile({ href, title, sub }) {
  return `
  <a class="tile tap" href="${href}" style="text-decoration:none; display:block;">
    <span class="go">‹</span>
    <h3>${title}</h3>
    <div class="sub">${sub}</div>
  </a>`;
}

function infoTile({ title, sub }) {
  return `
  <div class="tile">
    <h3>${title}</h3>
    <div class="sub">${sub}</div>
  </div>`;
}

async function render() {
  const grid = document.getElementById("workoutGrid");
  const configured = checkFirebaseReady();

  let sessions = [];
  if (configured) {
    try {
      sessions = await loadAllSessions();
    } catch (e) {
      console.error("Failed to load sessions", e);
    }
  }

  const lastByWorkout = {};
  for (const s of sessions) {
    if (!lastByWorkout[s.workoutId]) lastByWorkout[s.workoutId] = s;
  }

  document.getElementById("subtitle").textContent = `${WORKOUTS.length} אימונים לבחירה`;

  const chipsEl = document.getElementById("heroChips");
  if (sessions.length) {
    const last = sessions[0];
    chipsEl.innerHTML = `
      <span class="trend-pill flat">סה״כ אימונים שתועדו: ${sessions.length}</span>
      <span class="trend-pill flat">אימון אחרון: ${dateFmt(last.date)} · ${loadLabel(last.overallLoad)}</span>`;
  } else {
    chipsEl.innerHTML = `<span class="trend-pill flat">עדיין לא תועדו אימונים</span>`;
  }

  const tiles = WORKOUTS.map((w) => workoutTile(w, lastByWorkout[w.id]));
  tiles.push(utilityTile({ href: "history.html", title: "היסטוריה", sub: "כל האימונים שתועדו" }));
  tiles.push(infoTile({ title: "פרופיל מתאמנת", sub: "שגית · גיל 54 · מתאמנת ותיקה" }));
  grid.innerHTML = tiles.join("");
}

render();
