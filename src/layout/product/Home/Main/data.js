import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, set, push } from 'firebase/database';
import { firebaseConfig } from "../../../../../config";
import React, { useState, useEffect } from 'react'
import firebase from 'firebase/compat/app'
const app = initializeApp(firebaseConfig);
        const data =[];
        if (!app.length) {

            console.log("Kết nối thành công");
        }

         
        const db = getDatabase();
        const reference = ref(db, 'users');
        onValue(reference,(snapshot)=>{
          snapshot.forEach(childSnapshot=>{
            
                const id = childSnapshot.child('id').exportVal();
                const name = childSnapshot.child('name').exportVal();
                const source = childSnapshot.child('avt').exportVal();
                const tuoi = childSnapshot.child('tuoi').exportVal();
                const diachi = childSnapshot.child('diachi').exportVal();
                data.push({
                    "id":id,
                    "name":name,
                    "source":source,
                    "tuoi":tuoi,
                    "diachi":diachi
                });
            
          });

         
          
        });           
export const pets = data;
