import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getAutoHeightDuration } from "@mui/material/styles/createTransitions";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe3hsZ22dDrB9Kp09whSXu4jXvFWJ7mNY",
  authDomain: "react-cursos-b156a.firebaseapp.com",
  projectId: "react-cursos-b156a",
  storageBucket: "react-cursos-b156a.appspot.com",
  messagingSenderId: "1012753470516",
  appId: "1:1012753470516:web:8ca813e7434025aa65e661",
  measurementId: "G-KXG8EJKWPR"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// Para la autenticacion de los usuarios se importa getAuth y se le envia la App
export const FirebaseAuth = getAuth(FirebaseApp)
// Configuracion de la base de datos
export const FirebaseDB = getFirestore(FirebaseApp)
