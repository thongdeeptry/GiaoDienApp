import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getDatabase, ref, onValue, set, push} from 'firebase/database';
import {firebaseConfig} from '../../../../../config';
import React, {useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
const app = initializeApp(firebaseConfig);
const data = [];
if (!app.length) {
}

const db = getDatabase();
const reference = ref(db, 'users');
onValue(reference, snapshot => {
  snapshot.forEach(childSnapshot => {
    const id = childSnapshot.child('id').exportVal();
    const name = childSnapshot.child('name').exportVal();
    const source = childSnapshot.child('avt').exportVal();
    const tuoi = childSnapshot.child('tuoi').exportVal();
    const sex = childSnapshot.child('gioitinh').exportVal();
    const diachi = childSnapshot.child('diachi').exportVal();
    const lat = childSnapshot.child('lat').exportVal();
    const long = childSnapshot.child('long').exportVal();
    const nghenghiep = childSnapshot.child('nghenghiep').exportVal();
    data.push({
      id: id,
      name: name,
      source: source,
      tuoi: tuoi,
      diachi: diachi,
      tick: childSnapshot.child('tick').exportVal(),
      sex: sex,
      lat: lat,
      long: long,
      nghenghiep: nghenghiep,
    });
  });
});
export const pets = data;
