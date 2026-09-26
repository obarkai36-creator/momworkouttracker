// לוח האימונים של שגית — תבניות האימונים.
//
// כל אימון הוא 3 סטים × 12 חזרות לכל תרגיל, אלא אם צוין אחרת (תרגילי
// פלאנק/פלאנק צידי הם על זמן ולא על חזרות — ראו durationSec).
//
// תוכן זה עבר סקירת שרירים (ראו focus לכל אימון) והושלם ב:
//  - 2 תרגילי ליבה/בטן בסוף כל אימון (core)
//  - מתיחות מותאמות לכל אימון (stretches)
//  - קישור הדגמה ביוטיוב לכל תרגיל (youtubeUrl) — כל הקישורים אותרו
//    בחיפוש בפועל; תרגיל אחד (workout-3, "סטפ אפ בפלאנק קדימה") לא נמצא
//    לו קישור מתאים מספיק ונשאר ריק בכוונה — כדאי לצלם הדגמה עצמאית לו,
//    או לבצע אותו כשני תרגילים נפרדים (סטפ אפ + פלאנק).
//  - השלמות לכיסוי מקיף: לא היה תרגיל שוקיים או ביצפס באף אחד מ-4
//    האימונים — נוסף תרגיל שוקיים לאימון 1 ותרגיל ביצפס לאימון 2.
//  - "דחיקה" (אימון 4) הוברר כ"לחיצת רגליים"; "פולי עליון בחבל" (אימון 4)
//    הוברר כתרגיל גב (לאט פולי) ולא טריצפס.
//
// כל אימון מקבל צבע "פילר" קבוע (מתוך tokens.css) שמזהה אותו בכל האתר.
export const WORKOUTS = [
  {
    id: "workout-1",
    label: "אימון 1",
    dateLabel: "28.7",
    pillar: "pillar1",
    focus: "חזה, גב, כתפיים, רגליים, ישבן, שוקיים",
    exercises: [
      { name: "גובלט סקוואט", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=xIU3-8WqasQ" },
      { name: "היפ תראסט", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=z8WwUC_UA4w" },
      { name: "משיכה בפולי עליון", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=j9jtjL8FhPI" },
      { name: "לחיצת רגליים במכונה", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=K5n2vg3oZa4" },
      { name: "חתירה בישיבה במכונה", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=7BkgqzC6WsM" },
      { name: "הרחקות עם גומייה", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=gfEyrmxbCbw" },
      { name: "לחיצת חזה במכונה", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=rY0B8UFdne0" },
      { name: "הרמת שוקיים בעמידה", sets: 3, reps: 15, youtubeUrl: "https://www.youtube.com/watch?v=ndQc4mz4mBU", note: "נוסף — שוקיים לא היו מכוסים באף אימון אחר" },
    ],
    core: [
      { name: "פלאנק", sets: 3, durationSec: 30, youtubeUrl: "https://www.youtube.com/watch?v=mwlp75MS6Rg" },
      { name: "פיתולי בטן רוסיים עם משקולת", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=TfTUk2AjV7g" },
    ],
    stretches: [
      { name: "מתיחת ירך קדמית בעמידה", youtubeUrl: "https://www.youtube.com/watch?v=kzAsm4WQqvQ" },
      { name: "מתיחת גלוטאוס בישיבה", youtubeUrl: "https://www.youtube.com/watch?v=OcfcKXTaEkA" },
      { name: "מתיחת חזה בפתח דלת", youtubeUrl: "https://www.youtube.com/watch?v=h4M4XmCBFd8" },
      { name: "תנוחת הילד", youtubeUrl: "https://www.youtube.com/watch?v=jaCOZJPSy2g" },
    ],
  },
  {
    id: "workout-2",
    label: "אימון 2",
    dateLabel: "29.7",
    pillar: "pillar2",
    focus: "כתפיים, חזה, ישבן/רגליים, גב, ליבה, ביצפס",
    exercises: [
      { name: "לאנצ' יד קדמית", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=5V1j8nhdGt4" },
      { name: "פרפר", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=v2yOxhv1V0M" },
      { name: "היפ תראסט", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=z8WwUC_UA4w" },
      { name: "פול אובר", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=tcHaHIQStsk" },
      { name: "כפיפות בטן בשיפוע", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=gFnEw7cIgto" },
      { name: "סקוואט סומו", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=kjlfpqXnyL8" },
      { name: "כפיפת זרועות עם משקולת", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=6DeLZ6cbgWQ", note: "נוסף — ביצפס לא היה מכוסה באף אימון אחר" },
    ],
    core: [
      { name: "פלאנק צידי (לכל צד)", sets: 3, durationSec: 20, youtubeUrl: "https://www.youtube.com/watch?v=Ujf5ELfqI7o" },
      { name: "הרמות רגליים בשכיבה", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=sY2ZgV2Sj_s" },
    ],
    stretches: [
      { name: "מתיחת מכפיפי ירך בכריעה", youtubeUrl: "https://www.youtube.com/watch?v=Q4Ko275cluo" },
      { name: "מתיחת חזה בפתח דלת", youtubeUrl: "https://www.youtube.com/watch?v=h4M4XmCBFd8" },
      { name: "מתיחת חתול-פרה", youtubeUrl: "https://www.youtube.com/watch?v=xyNwxiuERXc" },
      { name: "מתיחת המסטרינג בישיבה", youtubeUrl: "https://www.youtube.com/watch?v=oJX8EKF3TqM" },
    ],
  },
  {
    id: "workout-3",
    label: "אימון 3",
    dateLabel: "2.8",
    pillar: "pillar3",
    focus: "רגליים, ישבן/המסטרינג, טריצפס, כתפיים, חזה",
    exercises: [
      { name: "סטפ אפ בפלאנק קדימה עם רגל על משוקולת", sets: 3, reps: 12, youtubeUrl: "", note: "לא נמצא קישור הדגמה מתאים לתרגיל המשולב הזה — כדאי לצלם הדגמה עצמאית, או לפצל לשני תרגילים (סטפ אפ + פלאנק) שלהם יש הדגמות רבות" },
      { name: "סקוואט עם גומייה עם התקדמות", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=CNOmK_nE5zM" },
      { name: "יד אחורית על ספסל", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=AbOUz070DC4" },
      { name: "לאנצ' על מדרגה", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=QNq2xfnX9IU" },
      { name: "מרחיקים", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=Oy9M4AoYnGA" },
      { name: "שכיבות סמיכה על מדרגה", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=4aUUcfwyfE0" },
      { name: "כתפיים בפולי עם חבל", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=p0aY0nYUno8" },
      { name: "דדליפט על ספסל – סינגל לג", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=HuJhhZX4_r0" },
    ],
    core: [
      { name: "וודצ'ופ בפולי (לכל צד)", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=Gwcf4TOj1hc" },
      { name: "כפיפות בטן אופניים", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=PAEo-zRSanM" },
    ],
    stretches: [
      { name: "מתיחת ירך קדמית בעמידה", youtubeUrl: "https://www.youtube.com/watch?v=kzAsm4WQqvQ" },
      { name: "מתיחת המסטרינג בישיבה", youtubeUrl: "https://www.youtube.com/watch?v=oJX8EKF3TqM" },
      { name: "מתיחת יד אחורית מעל הראש", youtubeUrl: "https://www.youtube.com/watch?v=cPTrm13hSSo" },
      { name: "מתיחת כתף חוצה גוף", youtubeUrl: "https://www.youtube.com/watch?v=O5bFanxcpWE" },
    ],
  },
  {
    id: "workout-4",
    label: "אימון 4",
    dateLabel: "4.8",
    pillar: "pillar4",
    focus: "ישבן, רגליים, גב, חזה, ליבה",
    exercises: [
      { name: "הרחקה בישיבה", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=5O_Y9l__iao" },
      { name: "ישבן בגומייה", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=LUMwbA5-GRc" },
      { name: "לחיצת רגליים (דחיקה)", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=K5n2vg3oZa4" },
      { name: "פולי עליון בחבל", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=duHQk2PxNos", note: "תרגיל גב (לאט) עם אחיזת חבל" },
      { name: "כפיפות בטן", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=fTxaDVXhMnw" },
      { name: "חזה בטי.אר.אקס", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=Dx1owRthj5Q" },
      { name: "היפ תראסט", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=z8WwUC_UA4w" },
      { name: "ברכיים לחזה עם משקולת", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=gP11cXEELtY" },
    ],
    core: [
      { name: "דד באג (לכל צד)", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=bxn9FBrt4-A" },
      { name: "פלאנק עם מגע בכתף", sets: 3, reps: 12, youtubeUrl: "https://www.youtube.com/watch?v=eT93C-xUZI8" },
    ],
    stretches: [
      { name: "מתיחת גלוטאוס בישיבה", youtubeUrl: "https://www.youtube.com/watch?v=OcfcKXTaEkA" },
      { name: "מתיחת מכפיפי ירך בכריעה", youtubeUrl: "https://www.youtube.com/watch?v=Q4Ko275cluo" },
      { name: "מתיחת חזה בפתח דלת", youtubeUrl: "https://www.youtube.com/watch?v=h4M4XmCBFd8" },
      { name: "מתיחת כתף חוצה גוף", youtubeUrl: "https://www.youtube.com/watch?v=O5bFanxcpWE" },
    ],
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
