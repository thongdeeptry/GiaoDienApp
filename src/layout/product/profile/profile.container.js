import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { firebaseConfig } from "../../../config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
const ProfileContainer = (props) => {
  const { navigation } = props;
  const app = initializeApp(firebaseConfig);
  const data = [];
  let noidung1 = "";
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [tuoi, settuoi] = useState();
  const [diachi, setdiachi] = useState();
  const [ngaysinh, setngaysinh] = useState();
  const [gioitinh, setgioitinh] = useState();
  const [sothich, setsothich] = useState();
  const [isLoading, setisLoading] = useState(false);
  if (!app.length) {
    console.log("Kết nối thành công");
  }
  const auth = getAuth(app);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();

  const sothich2 = [];
  useEffect(() => {
    setisLoading(true);
    const reference = ref(db, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      const tuoipr = childSnapshot.child("tuoi").val();
      const diachipr = childSnapshot.child("diachi").val();
      const ngaysinhpr = childSnapshot.child("ngaysinh").val();
      const gioitinhpr = childSnapshot.child("gioitinh").val();

      setname(namepr);
      setavt(avtpr);
      setdiachi(diachipr);
      settuoi(tuoipr);
      setgioitinh(gioitinhpr);
      setngaysinh(ngaysinhpr);
      setisLoading(false);
    });
  });

  const reference1 = ref(db, "users/" + user + "/sothich");
  onValue(reference1, (childSnapshot1) => {
    childSnapshot1.forEach((snapshot1) => {
      const key = snapshot1.val();
      sothich2.push(key);
    });
  });
};
export default ProfileContainer;
