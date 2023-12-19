// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider, signInWithPopup , signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALMEEp-fAwJdNVpBOujBp0PyHs_Z-SD5c",
  authDomain: "dictie-39f88.firebaseapp.com",
  projectId: "dictie-39f88",
  storageBucket: "dictie-39f88.appspot.com",
  messagingSenderId: "60606905217",
  appId: "1:60606905217:web:1237c8382a9ced5a4c0680",
  measurementId: "G-H7VN1K77YX"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out', error);
  }
};


export const setUserArray = async (userId: string, idExercise: string[]) => {
  const db = getFirestore(app);
  try {
    await setDoc(doc(db, 'users', userId), { idExercise }, { merge: true });
    console.log('Array set for user', userId);
  } catch (error) {
    console.error('Error setting array for user', error);
    throw error;
  }
};

