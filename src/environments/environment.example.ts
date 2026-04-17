// Copy this file to environment.ts (dev) and environment.prod.ts (prod)
// and fill in your Firebase project credentials from the Firebase Console.
// https://console.firebase.google.com → Project settings → Your apps → SDK setup

export const environment = {
  production: false, // set to true in environment.prod.ts
  firebaseConfig: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  }
};
