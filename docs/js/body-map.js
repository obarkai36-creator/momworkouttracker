// Tappable front/back body map for ongoing soreness/fatigue. Each region's
// id matches a muscle tag in js/data.js (WORKOUTS exercises' `muscle`
// field), so workout-page.js can flag exercises that hit an already-tired
// area. Pure inline-SVG string building + DOM wiring, no dependencies.
import { MUSCLE_LABELS } from "./data.js";

export const FATIGUE_LEVELS = ["none", "mild", "high"];
const LEVEL_COLOR = { none: "var(--surface-inset)", mild: "var(--warn)", high: "var(--bad)" };
const LEVEL_LABEL = { none: "רגיל", mild: "עייפות קלה", high: "עייפות משמעותית" };

const FRONT_REGIONS = [
  {
    id: "shoulders",
    shape: `<rect x="18" y="58" width="26" height="38" rx="10"/><rect x="136" y="58" width="26" height="38" rx="10"/>`,
    labels: [{ x: 31, y: 80, text: "כתף" }, { x: 149, y: 80, text: "כתף" }],
  },
  { id: "chest", shape: `<rect x="52" y="55" width="76" height="55" rx="12"/>`, labels: [{ x: 90, y: 86, text: "חזה" }] },
  {
    id: "biceps",
    shape: `<rect x="14" y="98" width="22" height="42" rx="10"/><rect x="144" y="98" width="22" height="42" rx="10"/>`,
    labels: [{ x: 25, y: 122, text: "יד" }, { x: 155, y: 122, text: "יד" }],
  },
  { id: "core", shape: `<rect x="58" y="112" width="64" height="48" rx="10"/>`, labels: [{ x: 90, y: 140, text: "בטן" }] },
  {
    id: "quads",
    shape: `<rect x="55" y="164" width="30" height="90" rx="12"/><rect x="95" y="164" width="30" height="90" rx="12"/>`,
    labels: [{ x: 70, y: 212, text: "רגל" }, { x: 110, y: 212, text: "רגל" }],
  },
];

const BACK_REGIONS = [
  { id: "back", shape: `<rect x="52" y="55" width="76" height="60" rx="12"/>`, labels: [{ x: 90, y: 88, text: "גב" }] },
  {
    id: "triceps",
    shape: `<rect x="14" y="98" width="22" height="42" rx="10"/><rect x="144" y="98" width="22" height="42" rx="10"/>`,
    labels: [{ x: 25, y: 122, text: "יד" }, { x: 155, y: 122, text: "יד" }],
  },
  { id: "glutes", shape: `<rect x="52" y="118" width="76" height="42" rx="14"/>`, labels: [{ x: 90, y: 142, text: "ישבן" }] },
  {
    id: "hamstrings",
    shape: `<rect x="55" y="163" width="30" height="65" rx="12"/><rect x="95" y="163" width="30" height="65" rx="12"/>`,
    labels: [{ x: 70, y: 199, text: "רגל" }, { x: 110, y: 199, text: "רגל" }],
  },
  {
    id: "calves",
    shape: `<rect x="57" y="231" width="26" height="55" rx="10"/><rect x="97" y="231" width="26" height="55" rx="10"/>`,
    labels: [{ x: 70, y: 261, text: "שוק" }, { x: 110, y: 261, text: "שוק" }],
  },
];

function labelsSvg(labels) {
  return labels
    .map((l) => `<text x="${l.x}" y="${l.y}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-1)" style="pointer-events:none;">${l.text}</text>`)
    .join("");
}

function figureSvg(regions, state, viewLabel) {
  const head = `<circle cx="90" cy="30" r="20" fill="var(--surface-inset)" stroke="var(--border-strong)" stroke-width="1.5"/>`;
  const regionShapes = regions
    .map((r) => {
      const level = state[r.id] || "none";
      return `<g data-region="${r.id}" class="body-region" tabindex="0" role="button" aria-label="${MUSCLE_LABELS[r.id]}: ${LEVEL_LABEL[level]}" fill="${LEVEL_COLOR[level]}" stroke="var(--border-strong)" stroke-width="1.5">${r.shape}${labelsSvg(r.labels)}</g>`;
    })
    .join("");
  return `<svg viewBox="0 0 180 290" width="150" height="240" class="body-svg" data-view="${viewLabel}">${head}${regionShapes}</svg>`;
}

export function bodyMapHtml(state) {
  return `
  <div class="bodymap">
    <div class="bodymap-figure">${figureSvg(FRONT_REGIONS, state, "front")}<div class="bodymap-caption">קדמי</div></div>
    <div class="bodymap-figure">${figureSvg(BACK_REGIONS, state, "back")}<div class="bodymap-caption">אחורי</div></div>
  </div>
  <div class="bodymap-legend">
    <span class="bodymap-legend-item"><span class="dot" style="background:${LEVEL_COLOR.none}"></span>רגיל</span>
    <span class="bodymap-legend-item"><span class="dot" style="background:${LEVEL_COLOR.mild}"></span>עייפות קלה</span>
    <span class="bodymap-legend-item"><span class="dot" style="background:${LEVEL_COLOR.high}"></span>עייפות משמעותית</span>
  </div>`;
}

/** Wires click/keyboard handling onto a rendered bodyMapHtml() container.
 * Mutates `state` in place and calls onChange(regionId, newLevel) so the
 * caller can react (e.g. re-render exercise warnings) without a full redraw. */
export function wireBodyMap(container, state, onChange) {
  container.querySelectorAll(".body-region").forEach((el) => {
    const cycle = () => {
      const id = el.dataset.region;
      const current = state[id] || "none";
      const next = FATIGUE_LEVELS[(FATIGUE_LEVELS.indexOf(current) + 1) % FATIGUE_LEVELS.length];
      state[id] = next;
      el.setAttribute("fill", LEVEL_COLOR[next]);
      el.setAttribute("aria-label", `${MUSCLE_LABELS[id]}: ${LEVEL_LABEL[next]}`);
      onChange(id, next);
    };
    el.addEventListener("click", cycle);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        cycle();
      }
    });
  });
}

export function fatigueLevelLabel(level) {
  return LEVEL_LABEL[level] || LEVEL_LABEL.none;
}
