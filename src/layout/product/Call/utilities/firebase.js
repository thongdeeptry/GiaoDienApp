import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import 'firebase/compat/firestore';
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
const app = firebase.app();
export const db = app.firestore();
