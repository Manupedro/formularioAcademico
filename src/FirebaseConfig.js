// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASroNyzA4hY-mLsZweflFKL-ge1kZdmh0",
  authDomain: "formularioacademico.firebaseapp.com",
  projectId: "formularioacademico",
  storageBucket: "formularioacademico.appspot.com",
  messagingSenderId: "519228758832",
  appId: "1:519228758832:web:b7fc5ae2dcfaeda5a886f5",
  measurementId: "G-1KQCGTGK0G",
  //databaseURL: "https://formularioacademico-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

export default app;