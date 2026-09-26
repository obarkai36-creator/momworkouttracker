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
// זרימת השימוש (עודכן): שגית לא ממלאת משקל/חזרות בפועל לכל תרגיל בנפרד.
// במקום זאת:
//  1. מסמנת על מפת גוף אילו אזורים עדיין עייפים/כואבים מאימון קודם.
//  2. בוחרת עומס רצוי אחד לכל האימון (קל/בינוני/כבד) — רק מציג תוכנית,
//     עדיין לא נשמר שום דבר בשלב הזה.
//  3. מקבלת את "תוכנית האימון הסופית": כל התרגילים עם מספר חזרות/משך מותאם
//     לעומס שבחרה (buildPlan למטה), ותרגילים שפוגעים באזור שסימנה כעייף
//     מסומנים באזהרה קלה.
//  4. בסוף האימון בפועל, לוחצת "סיימתי את האימון" (עם אפשרות להערה חופשית) —
//     רק ברגע הזה נשמרת רשומת אימון (ראו js/workout-page.js: onCompleteWorkout).
//     בחירת עומס בלבד, בלי ללחוץ "סיימתי", לא נרשמת בהיסטוריה.
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
//    זה מאבד את תבנית התנועה של כפיפת ירך (hip-hinge) מהאימון לגמרי. שווה
//    לשקול אם המכון כן מאפשר תבנית hip-hinge כלשהי (רומנית עם משקולות,
//    גם-גוד-מורנינג וכו').
//  - "כפיפת ברכיים בשכיבה במכונה" הוסר (המכון לא כולל מכונת שכיבה) והוחלף
//    ב"בעיטה אחורית בישבן במכונה" — שימו לב שזה מעביר את הכיסוי מהמסטרינג
//    לישבן (גלוטאוס כבר מכוסה היטב באימון הזה עם 3-4 תרגילים; המסטרינג נשאר
//    עם תרגיל בידוד יחיד בלבד — כפיפת ברכיים בישיבה).
export const WORKOUTS = [
  {
    id: "upper-body",
    label: "אימון עליון",
    labelEn: "Upper Body Workout",
    pillar: "pillar1",
    focus: "חזה, גב (3 זוויות), כתפיים (קדמי/צדדי/אחורי), טריצפס, ביצפס",
    warmup: { name: "הליכון — הליכה או הליכה בשיפוע", nameEn: "Treadmill — Walking or Incline Walking", minutes: 10 },
    activation: null,
    exercises: [
      { name: "לחיצת חזה במכונה", nameEn: "Machine Chest Press", muscle: "chest", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=rY0B8UFdne0" },
      { name: "שכיבות סמיכה על מדרגה", nameEn: "Elevated Push-Up", muscle: "chest", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=4aUUcfwyfE0" },
      { name: "משיכה בפולי עליון", nameEn: "Lat Pulldown", muscle: "back", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=j9jtjL8FhPI" },
      { name: "חתירה בישיבה במכונה", nameEn: "Seated Cable Row", muscle: "back", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=7BkgqzC6WsM" },
      { name: "פול אובר", nameEn: "Pullover", muscle: "back", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=tcHaHIQStsk" },
      { name: "הרמות צד עם משקולות", nameEn: "Dumbbell Lateral Raise", muscle: "shoulders", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=Y29xKcze8Ik", note: "כתף — צדדי (הוחלף מגומייה)" },
      { name: "כתפיים בפולי עם חבל", nameEn: "Cable Rope Front Raise", muscle: "shoulders", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=p0aY0nYUno8", note: "כתף — קדמי" },
      { name: "הרמות קדמיות עם משקולות", nameEn: "Dumbbell Front Raise", muscle: "shoulders", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=CH9JzDStL3U", note: "כתף — קדמי (הוחלף מפייס פול; כפילות זווית עם התרגיל שמעליו — ראו הערה למטה)" },
      { name: "יד אחורית על ספסל", nameEn: "Bench Tricep Kickback", muscle: "triceps", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=AbOUz070DC4" },
      { name: "כפיפת זרועות עם משקולת", nameEn: "Dumbbell Bicep Curl", muscle: "biceps", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=6DeLZ6cbgWQ" },
    ],
    coreVariants: [
      [
        { name: "פלאנק", nameEn: "Plank", muscle: "core", sets: 3, durationSec: 30, youtubeUrl: "https://www.youtube.com/watch?v=mwlp75MS6Rg" },
        { name: "כפיפות בטן אופניים", nameEn: "Bicycle Crunch", muscle: "core", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=PAEo-zRSanM" },
      ],
      [
        { name: "פלאנק צידי (לכל צד)", nameEn: "Side Plank (each side)", muscle: "core", sets: 3, durationSec: 20, youtubeUrl: "https://www.youtube.com/watch?v=Ujf5ELfqI7o" },
        { name: "וודצ'ופ בפולי (לכל צד)", nameEn: "Cable Woodchop (each side)", muscle: "core", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=Gwcf4TOj1hc" },
      ],
    ],
    stretches: [
      { name: "מתיחת חזה בפתח דלת", nameEn: "Doorway Chest Stretch", youtubeUrl: "https://www.youtube.com/watch?v=h4M4XmCBFd8" },
      { name: "מתיחת כתף חוצה גוף", nameEn: "Cross-Body Shoulder Stretch", youtubeUrl: "https://www.youtube.com/watch?v=O5bFanxcpWE" },
      { name: "מתיחת יד אחורית מעל הראש", nameEn: "Overhead Triceps Stretch", youtubeUrl: "https://www.youtube.com/watch?v=cPTrm13hSSo" },
      { name: "מתיחת חתול-פרה", nameEn: "Cat-Cow Stretch", youtubeUrl: "https://www.youtube.com/watch?v=xyNwxiuERXc" },
    ],
  },
  {
    id: "lower-body",
    label: "אימון תחתון",
    labelEn: "Lower Body Workout",
    pillar: "pillar2",
    focus: "רגליים (קוואד + המסטרינג), ישבן (3 זוויות), שוקיים",
    warmup: { name: "הליכון — הליכה או הליכה בשיפוע", nameEn: "Treadmill — Walking or Incline Walking", minutes: 10 },
    activation: {
      name: "סקוואט עם גומייה עם התקדמות",
      nameEn: "Banded Squat Walk",
      muscle: "glutes",
      sets: 2,
      reps: 15,
      note: "תרגיל הפעלה לפני התרגילים העיקריים — לא מושפע מהעומס שנבחר",
      youtubeUrl: "https://www.youtube.com/watch?v=CNOmK_nE5zM",
    },
    exercises: [
      { name: "גובלט סקוואט", nameEn: "Goblet Squat", muscle: "quads", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=xIU3-8WqasQ" },
      { name: "סקוואט סומו", nameEn: "Sumo Squat", muscle: "glutes", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=kjlfpqXnyL8" },
      { name: "לחיצת רגליים במכונה", nameEn: "Leg Press Machine", muscle: "quads", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=K5n2vg3oZa4" },
      { name: "היפ תראסט", nameEn: "Hip Thrust", muscle: "glutes", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=z8WwUC_UA4w" },
      { name: "הרחקה בישיבה", nameEn: "Seated Hip Abduction", muscle: "glutes", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=5O_Y9l__iao" },
      { name: "לאנצ' על מדרגה", nameEn: "Step Lunge", muscle: "quads", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=QNq2xfnX9IU" },
      { name: "כפיפת ברכיים בישיבה במכונה", nameEn: "Seated Leg Curl Machine", muscle: "hamstrings", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=t9sTSr-JYSs", note: "הוחלף מדדליפט על ספסל" },
      { name: "בעיטה אחורית בישבן במכונה", nameEn: "Glute Kickback Machine", muscle: "glutes", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=24pvhNOoK80", note: "נוסף במקום כפיפת ברכיים בשכיבה שהוסרה" },
      { name: "הרמת שוקיים בעמידה", nameEn: "Standing Calf Raise", muscle: "calves", sets: 3, reps: 15, youtubeUrl: "https://www.youtube.com/watch?v=ndQc4mz4mBU", note: "ברך ישרה — גסטרוקנמיוס" },
      { name: "הרמת שוקיים בישיבה במכונה", nameEn: "Seated Calf Raise Machine", muscle: "calves", sets: 3, reps: 15, youtubeUrl: "https://www.youtube.com/watch?v=I1uQtobaNRQ", note: "נוסף — ברך כפופה, סוליאוס (משלים ולא כפול לתרגיל שמעליו)" },
    ],
    coreVariants: [
      [
        { name: "דד באג (לכל צד)", nameEn: "Dead Bug (each side)", muscle: "core", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=bxn9FBrt4-A" },
        { name: "הרמות רגליים בשכיבה", nameEn: "Lying Leg Raise", muscle: "core", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=sY2ZgV2Sj_s" },
      ],
      [
        { name: "פלאנק עם מגע בכתף", nameEn: "Plank Shoulder Taps", muscle: "core", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=eT93C-xUZI8" },
        { name: "פיתולי בטן רוסיים עם משקולת", nameEn: "Weighted Russian Twist", muscle: "core", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=TfTUk2AjV7g" },
      ],
    ],
    stretches: [
      { name: "מתיחת ירך קדמית בעמידה", nameEn: "Standing Quad Stretch", youtubeUrl: "https://www.youtube.com/watch?v=kzAsm4WQqvQ" },
      { name: "מתיחת גלוטאוס בישיבה", nameEn: "Seated Glute Stretch", youtubeUrl: "https://www.youtube.com/watch?v=OcfcKXTaEkA" },
      { name: "מתיחת המסטרינג בישיבה", nameEn: "Seated Hamstring Stretch", youtubeUrl: "https://www.youtube.com/watch?v=oJX8EKF3TqM" },
      { name: "מתיחת מכפיפי ירך בכריעה", nameEn: "Kneeling Hip Flexor Stretch", youtubeUrl: "https://www.youtube.com/watch?v=Q4Ko275cluo" },
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
