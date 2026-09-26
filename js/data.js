// לוח האימונים של שגית — תבניות האימונים.
//
// כל אימון הוא 3 סטים × 12 חזרות לכל תרגיל (אלא אם צוין אחרת בעתיד).
// שדות "core" (תרגילי בטן) ו-"stretches" (מתיחות) מכוונים להתמלא בהמשך,
// כחלק מסקירת התרגילים למניעת שרירים מתפספסים + קישורי יוטיוב לכל תרגיל —
// זו עבודת תוכן נפרדת שתיעשה לאחר שהשלד הבסיסי והעיצוב יהיו מוכנים.
// שדה youtubeUrl בכל תרגיל ריק כרגע מאותה סיבה.
//
// כל אימון מקבל צבע "פילר" קבוע (מתוך tokens.css) שמזהה אותו בכל האתר.
export const WORKOUTS = [
  {
    id: "workout-1",
    label: "אימון 1",
    dateLabel: "28.7",
    pillar: "pillar1",
    exercises: [
      { name: "גובלט סקוואט", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "היפ תראסט", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "משיכה בפולי עליון", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "לחיצת רגליים במכונה", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "חתירה בישיבה במכונה", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "הרחקות עם גומייה", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "לחיצת חזה במכונה", sets: 3, reps: 12, youtubeUrl: "" },
    ],
    core: [],
    stretches: [],
  },
  {
    id: "workout-2",
    label: "אימון 2",
    dateLabel: "29.7",
    pillar: "pillar2",
    exercises: [
      { name: "לאנצ' יד קדמית", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "פרפר", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "היפ תראסט", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "פול אובר", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "כפיפות בטן בשיפוע", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "סקוואט סומו", sets: 3, reps: 12, youtubeUrl: "" },
    ],
    core: [],
    stretches: [],
  },
  {
    id: "workout-3",
    label: "אימון 3",
    dateLabel: "2.8",
    pillar: "pillar3",
    exercises: [
      { name: "סטפ אפ בפלאנק קדימה עם רגל על משוקולת", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "סקוואט עם גומייה עם התקדמות", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "יד אחורית על ספסל", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "לאנצ' על מדרגה", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "מרחיקים", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "שכיבות סמיכה על מדרגה", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "כתפיים בפולי עם חבל", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "דדליפט על ספסל – סינגל לג", sets: 3, reps: 12, youtubeUrl: "" },
    ],
    core: [],
    stretches: [],
  },
  {
    id: "workout-4",
    label: "אימון 4",
    dateLabel: "4.8",
    pillar: "pillar4",
    exercises: [
      { name: "הרחקה בישיבה", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "ישבן בגומייה", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "דחיקה", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "פולי עליון בחבל", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "כפיפות בטן", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "חזה בטי.אר.אקס", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "היפ תראסט", sets: 3, reps: 12, youtubeUrl: "" },
      { name: "ברכיים לחזה עם משקולת", sets: 3, reps: 12, youtubeUrl: "" },
    ],
    core: [],
    stretches: [],
  },
];

export const LOAD_LEVELS = [
  { level: "light", label: "קל" },
  { level: "medium", label: "בינוני" },
  { level: "heavy", label: "כבד" },
];

export function getWorkout(id) {
  return WORKOUTS.find((w) => w.id === id) || null;
}

export function loadLabel(level) {
  return LOAD_LEVELS.find((l) => l.level === level)?.label || "—";
}
