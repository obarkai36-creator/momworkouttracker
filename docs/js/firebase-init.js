import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

const SESSIONS_COLLECTION = "sessions";

// The Firebase SDK is loaded lazily, only on the first actual save/load
// call — never at page-load time. This keeps browsing the workout list
// and the logging form fully independent of any network reachability to
// Google's CDN (e.g. if it's slow, blocked, or the phone is offline, the
// rest of the site still works; only the save/load calls will fail).
let firestoreApiPromise = null;
async function loadFirestore() {
  if (!isFirebaseConfigured()) return null;
  if (!firestoreApiPromise) {
    firestoreApiPromise = (async () => {
      const [{ initializeApp }, firestoreApi] = await Promise.all([
        import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"),
      ]);
      const app = initializeApp(firebaseConfig);
      const db = firestoreApi.getFirestore(app);
      return { db, ...firestoreApi };
    })();
  }
  return firestoreApiPromise;
}

/** Renders the "Firebase isn't set up yet" banner into any page that has
 * a #config-warning element, and returns whether saving/loading is possible. */
export function checkFirebaseReady() {
  const el = document.getElementById("config-warning");
  if (!isFirebaseConfigured()) {
    if (el) {
      el.innerHTML = `<div class="alert-row"><b>שימי לב:</b> חיבור מסד הנתונים (Firebase) עדיין לא הוגדר, כך שלא ניתן לשמור או לטעון היסטוריית אימונים כרגע. ראו את קובץ README.md להוראות הגדרה חד-פעמיות.</div>`;
      el.style.display = "block";
    }
    return false;
  }
  if (el) el.style.display = "none";
  return true;
}

/** Saves one completed workout session. Returns the new document id. */
export async function saveSession(sessionData) {
  const fb = await loadFirestore();
  if (!fb) throw new Error("Firebase is not configured");
  const docRef = await fb.addDoc(fb.collection(fb.db, SESSIONS_COLLECTION), {
    ...sessionData,
    createdAt: fb.serverTimestamp(),
  });
  return docRef.id;
}

/** Loads every saved session, most recent first. */
export async function loadAllSessions() {
  const fb = await loadFirestore();
  if (!fb) return [];
  const q = fb.query(fb.collection(fb.db, SESSIONS_COLLECTION), fb.orderBy("date", "desc"));
  const snap = await fb.getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
