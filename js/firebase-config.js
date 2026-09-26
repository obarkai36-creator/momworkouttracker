// ⚠️ ONE-TIME SETUP NEEDED — see README.md ("הגדרת Firebase") for the
// step-by-step guide in Hebrew. Until this object holds a real project's
// keys, the site works for browsing but cannot save or load workout logs
// (a banner on every page will say so).
//
// Where to get these values: console.firebase.google.com → create a
// project → build a Web App inside it → the config object is shown to you
// automatically → paste its values here.
export const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME.firebaseapp.com",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME.appspot.com",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME",
};

export const isFirebaseConfigured = () => firebaseConfig.apiKey !== "REPLACE_ME";
