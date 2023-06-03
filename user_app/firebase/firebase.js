import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCj9QZz5UBoYxNjp-jvmuFMb1JfXmESY3k",
  authDomain: "sir-park-allot.firebaseapp.com",
  projectId: "sir-park-allot",
  storageBucket: "sir-park-allot.appspot.com",
  messagingSenderId: "85253185174",
  appId: "1:85253185174:web:8000910671ff97e65d2cb7",
  measurementId: "G-ZN8MH32XVV",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase;
export const auth = getAuth(app);
