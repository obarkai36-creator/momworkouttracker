// לוח האימונים של שגית — תבניות האימונים.
//
// מבנה: 2 אימונים (עליון/תחתון), כל אחד:
//  - warmup: חימום קבוע של 10 דק' הליכון (הליכה/שיפוע) — מוצג כמידע בלבד.
//  - activation (רק באימון תחתון): תרגיל הפעלה קליל לפני התרגילים העיקריים.
//  - exercises: כל תרגיל מתויג ב-muscle (לצורך מפת העייפות, ראו body-map.js).
//  - coreVariants: שני זוגות תרגילי ליבה שמתחלפים לבד בין אימון לאימון (לפי
//    מספר האימונים שכבר תועדו לתבנית הזו — ראו js/workout-page.js).
//  - stretches: מתיחות מותאמות לשרירים שהאימון מכסה.
//
// זרימת השימוש (עודכן): שגית לא ממלאת משקל/חזרות בפועל בכלל. במקום זאת:
//  1. מסמנת על מפת גוף אילו אזורים עדיין עייפים/כואבים מאימון קודם.
//  2. בוחרת עומס רצוי אחד לכל האימון (קל/בינוני/כבד) — הקלט היחיד שלה.
//  3. מקבלת את "תוכנית האימון הסופית": כל התרגילים עם מספר חזרות/משך מותאם
//     לעומס שבחרה (buildPlan למטה), ותרגילים שפוגעים באזור שסימנה כעייף
//     מסומנים באזהרה קלה. אין שום שלב מילוי נוסף אחרי סיום האימון.
//
// היגיון ההתאמה: בתרגילי כוח (עם משקל חיצוני) עומס "כבד" = פחות חזרות
// (כי היא תבחר משקל כבד יותר בהתאם) ועומס "קל" = יותר חזרות. בתרגילי ליבה
// ללא משקל חיצוני זה הפוך: "כבד" = יותר חזרות/משך (כי אין משקל להוסיף,
// הקושי עולה עם הזמן/הכמות).
//
// עדכון לפי ציוד המכון בפועל (הוחלף בבקשת המשתמש):
//  - "הרחקות עם גומייה" → "הרמות צד עם משקולות" (המכון לא כולל את הגומייה).
//  - "פייס פול" → "הרמות קדמיות עם משקולות". שימו לב: זה יוצר כפילות זווית
//    עם "כתפיים בפולי עם חבל" (שניהם כתף קדמית) ומאבד לגמרי את זווית הכתף
//    האחורית שפייס פול נתן. אם יש למכון פתרון חלופי לכתף אחורית (למשל
//    ריר דלט פליי/Reverse fly), כדאי להציע כתחליף.
//  - "ישבן בגומייה" הוסר לגמרי (ללא תחליף שהתבקש).
//  - "דדליפט על ספסל – סינגל לג" → "כפיפת ברכיים בישיבה במכונה". שימו לב:
//    זה מאבד את תבנית התנועה של כפיפת ירך (hip-hinge) מהאימון לגמרי, ויוצר
//    כפילות עם "כפיפת ברכיים בשכיבה במכונה" הקיים (שניהם בידוד המסטרינג
//    בכיפוף ברך). שווה לשקול אם המכון כן מאפשר תבנית hip-hinge כלשהי
//    (רומנית עם משקולות, גם-גוד-מורנינג וכו').
export const WORKOUTS = [
  {
    id: "upper-body",
    label: "אימון עליון",
    pillar: "pillar1",
    focus: "חזה, גב (3 זוויות), כתפיים (קדמי/צדדי/אחורי), טריצפס, ביצפס",
    warmup: { name: "הליכון — הליכה או הליכה בשיפוע", minutes: 10 },
    activation: null,
    exercises: [
      { name: "לחיצת חזה במכונה", muscle: "chest", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=rY0B8UFdne0" },
      { name: "שכיבות סמיכה על מדרגה", muscle: "chest", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=4aUUcfwyfE0" },
      { name: "משיכה בפולי עליון", muscle: "back", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=j9jtjL8FhPI" },
      { name: "חתירה בישיבה במכונה", muscle: "back", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=7BkgqzC6WsM" },
      { name: "פול אובר", muscle: "back", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=tcHaHIQStsk" },
      { name: "הרמות צד עם משקולות", muscle: "shoulders", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=Y29xKcze8Ik", note: "כתף — צדדי (הוחלף מגומייה)" },
      { name: "כתפיים בפולי עם חבל", muscle: "shoulders", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=p0aY0nYUno8", note: "כתף — קדמי" },
      { name: "הרמות קדמיות עם משקולות", muscle: "shoulders", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=CH9JzDStL3U", note: "כתף — קדמי (הוחלף מפייס פול; כפילות זווית עם התרגיל שמעליו — ראו הערה למטה)" },
      { name: "יד אחורית על ספסל", muscle: "triceps", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=AbOUz070DC4" },
      { name: "כפיפת זרועות עם משקולת", muscle: "biceps", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=6DeLZ6cbgWQ" },
    ],
    coreVariants: [
      [
        { name: "פלאנק", muscle: "core", sets: 3, durationSec: 30, youtubeUrl: "https://www.youtube.com/watch?v=mwlp75MS6Rg" },
        { name: "כפיפות בטן אופניים", muscle: "core", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=PAEo-zRSanM" },
      ],
      [
        { name: "פלאנק צידי (לכל צד)", muscle: "core", sets: 3, durationSec: 20, youtubeUrl: "https://www.youtube.com/watch?v=Ujf5ELfqI7o" },
        { name: "וודצ'ופ בפולי (לכל צד)", muscle: "core", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=Gwcf4TOj1hc" },
      ],
    ],
    stretches: [
      { name: "מתיחת חזה בפתח דלת", youtubeUrl: "https://www.youtube.com/watch?v=h4M4XmCBFd8" },
      { name: "מתיחת כתף חוצה גוף", youtubeUrl: "https://www.youtube.com/watch?v=O5bFanxcpWE" },
      { name: "מתיחת יד אחורית מעל הראש", youtubeUrl: "https://www.youtube.com/watch?v=cPTrm13hSSo" },
      { name: "מתיחת חתול-פרה", youtubeUrl: "https://www.youtube.com/watch?v=xyNwxiuERXc" },
    ],
  },
  {
    id: "lower-body",
    label: "אימון תחתון",
    pillar: "pillar2",
    focus: "רגליים (קוואד + המסטרינג), ישבן (3 זוויות), שוקיים",
    warmup: { name: "הליכון — הליכה או הליכה בשיפוע", minutes: 10 },
    activation: {
      name: "סקוואט עם גומייה עם התקדמות",
      muscle: "glutes",
      sets: 2,
      reps: 15,
      note: "תרגיל הפעלה לפני התרגילים העיקריים — לא מושפע מהעומס שנבחר",
      youtubeUrl: "https://www.youtube.com/watch?v=CNOmK_nE5zM",
    },
    exercises: [
      { name: "גובלט סקוואט", muscle: "quads", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=xIU3-8WqasQ" },
      { name: "סקוואט סומו", muscle: "glutes", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=kjlfpqXnyL8" },
      { name: "לחיצת רגליים במכונה", muscle: "quads", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=K5n2vg3oZa4" },
      { name: "היפ תראסט", muscle: "glutes", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=z8WwUC_UA4w" },
      { name: "הרחקה בישיבה", muscle: "glutes", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=5O_Y9l__iao" },
      { name: "לאנצ' על מדרגה", muscle: "quads", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=QNq2xfnX9IU" },
      { name: "כפיפת ברכיים בישיבה במכונה", muscle: "hamstrings", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=t9sTSr-JYSs", note: "הוחלף מדדליפט על ספסל" },
      { name: "כפיפת ברכיים בשכיבה במכונה", muscle: "hamstrings", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=vl5nUdE9mWM", note: "המסטרינג בבידוד — כפילות זווית עם התרגיל שמעליו, ראו הערה למטה" },
      { name: "הרמת שוקיים בעמידה", muscle: "calves", sets: 3, reps: 15, youtubeUrl: "https://www.youtube.com/watch?v=ndQc4mz4mBU" },
    ],
    coreVariants: [
      [
        { name: "דד באג (לכל צד)", muscle: "core", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=bxn9FBrt4-A" },
        { name: "הרמות רגליים בשכיבה", muscle: "core", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=sY2ZgV2Sj_s" },
      ],
      [
        { name: "פלאנק עם מגע בכתף", muscle: "core", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=eT93C-xUZI8" },
        { name: "פיתולי בטן רוסיים עם משקולת", muscle: "core", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=TfTUk2AjV7g" },
      ],
    ],
    stretches: [
      { name: "מתיחת ירך קדמית בעמידה", youtubeUrl: "https://www.youtube.com/watch?v=kzAsm4WQqvQ" },
      { name: "מתיחת גלוטאוס בישיבה", youtubeUrl: "https://www.youtube.com/watch?v=OcfcKXTaEkA" },
      { name: "מתיחת המסטרינג בישיבה", youtubeUrl: "https://www.youtube.com/watch?v=oJX8EKF3TqM" },
      { name: "מתיחת מכפיפי ירך בכריעה", youtubeUrl: "https://www.youtube.com/watch?v=Q4Ko275cluo" },
    ],
  },
];

export const LOAD_LEVELS = [
  { level: "light", label: "קל" },
  { level: "medium", label: "בינוני" },
  { level: "heavy", label: "כבד" },
];

// Muscle tags used both by exercises above and by the body-fatigue map
// (js/body-map.js uses these same ids for its clickable regions).
export const MUSCLE_LABELS = {
  chest: "חזה",
  back: "גב",
  shoulders: "כתפיים",
  biceps: "ביצפס",
  triceps: "טריצפס",
  quads: "קוואדריספס",
  glutes: "ישבן",
  hamstrings: "המסטרינג",
  calves: "שוקיים",
  core: "ליבה/בטן",
};

export function getWorkout(id) {
  return WORKOUTS.find((w) => w.id === id) || null;
}

export function loadLabel(level) {
  return LOAD_LEVELS.find((l) => l.level === level)?.label || "—";
}

// Weighted exercises: heavier chosen intensity -> fewer prescribed reps
// (she picks a heavier weight to match, autoregulating by feel).
const STRENGTH_REP_DELTA = { light: 3, medium: 0, heavy: -3 };
// Bodyweight core work: no external weight to adjust, so harder = more
// reps/longer hold instead.
const CORE_REP_DELTA = { light: -2, medium: 0, heavy: 3 };
const DURATION_MULT = { light: 0.7, medium: 1, heavy: 1.5 };

function scale(ex, repDelta, durationMult) {
  if (ex.durationSec != null) {
    const sec = Math.max(10, Math.round((ex.durationSec * (durationMult[ex._level] ?? 1)) / 5) * 5);
    return { ...ex, durationSec: sec };
  }
  return { ...ex, reps: Math.max(6, ex.reps + (repDelta[ex._level] ?? 0)) };
}

/** Resolves a workout template + chosen intensity level + which core-variant
 * index into the exact, final plan to display/log — no other input needed. */
export function buildPlan(workout, level, coreVariantIndex = 0) {
  const withLevel = (ex) => ({ ...ex, _level: level });
  const core = workout.coreVariants[coreVariantIndex % workout.coreVariants.length];
  return {
    warmup: workout.warmup,
    activation: workout.activation ? scale(withLevel(workout.activation), { light: 0, medium: 0, heavy: 0 }, DURATION_MULT) : null,
    exercises: workout.exercises.map((ex) => scale(withLevel(ex), STRENGTH_REP_DELTA, DURATION_MULT)),
    core: core.map((ex) => scale(withLevel(ex), CORE_REP_DELTA, DURATION_MULT)),
    stretches: workout.stretches,
  };
}
