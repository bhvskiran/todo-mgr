// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-Kw1T6pfHdSVq0XjoTwXOcvFfanF8jCA",
  authDomain: "pfm-mmt-c6732.firebaseapp.com",
  projectId: "pfm-mmt-c6732",
  storageBucket: "pfm-mmt-c6732.appspot.com",
  messagingSenderId: "34817054419",
  appId: "1:34817054419:web:c6afce5175598ef4536626",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
