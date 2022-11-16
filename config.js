import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  //read data from Firebase
} from "firebase/auth";
//ref = reference to a "collection"
import {
  getDatabase,
  ref as firebaseDatabaseRef,
  set as firebaseSet,
  child,
  get,
  onValue,
} from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyBj7PD2ANUkOaFs3IjEUvN2qXM8KGUcr3Q",
  authDomain: "duantotnghiepreact.firebaseapp.com",
  databaseURL: "https://duantotnghiepreact-default-rtdb.firebaseio.com",
  projectId: "duantotnghiepreact",
  storageBucket: "duantotnghiepreact.appspot.com",
  messagingSenderId: "850540325665",
  appId: "1:850540325665:web:392fe9ff0bca99d18a2c60",
  measurementId: "G-6N96C6V7LY",
};
initializeApp(firebaseConfig);
const auth = getAuth();
const firebaseDatabase = getDatabase();
export {
  auth,
  firebaseDatabase,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  firebaseSet,
  firebaseDatabaseRef,
  sendEmailVerification,
  child,
  get,
  onValue, //reload when online DB changed
  signInWithEmailAndPassword,
  
};
export const storage = getStorage();
export const db = getFirestore()