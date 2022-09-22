import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

export const firebaseConfig = {
    apiKey: "AIzaSyBj7PD2ANUkOaFs3IjEUvN2qXM8KGUcr3Q",
    authDomain: "duantotnghiepreact.firebaseapp.com",
    projectId: "duantotnghiepreact",
    storageBucket: "duantotnghiepreact.appspot.com",
    messagingSenderId: "850540325665",
    appId: "1:850540325665:web:5a6d2f73f0365a9b8a2c60",
    measurementId: "G-N5QQ9NWQ8R"
  };
  
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }