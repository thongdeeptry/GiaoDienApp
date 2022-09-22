import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { firebaseConfig } from "../../../config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
const ProfileFriendContainer = ({ route, navigation }) => {
  const { id } = route.params;
  console.log("ID : " + id);
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
  const [email, setemail] = useState();
  const [pass, setpass] = useState();
  const [daco, setdaco] = useState("false");
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
    const reference = ref(db, "users/" + id);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      const tuoipr = childSnapshot.child("tuoi").val();
      const diachipr = childSnapshot.child("diachi").val();
      const ngaysinhpr = childSnapshot.child("ngaysinh").val();
      const gioitinhpr = childSnapshot.child("gioitinh").val();
      const ưmail = childSnapshot.child("email").val();
      const passs = childSnapshot.child("pass").val();
      setname(namepr);
      setavt(avtpr);
      setdiachi(diachipr);
      settuoi(tuoipr);
      setgioitinh(gioitinhpr);
      setngaysinh(ngaysinhpr);
      setemail(ưmail);
      setpass(passs);
      setisLoading(false);
    });
  });
  let check;
  const reference11 = ref(db, "favourite/" + id);
  onValue(reference11, (childSnapshot1) => {
    try {
      childSnapshot1.forEach((snapshot1) => {
        const value = snapshot1.child("user").exportVal();
        try {
          if (user + "" == value + "") {
            check = "true";

            throw "break-loop";
          }
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
  const reference1 = ref(db, "users/" + id + "/sothich");
  onValue(reference1, (childSnapshot1) => {
    childSnapshot1.forEach((snapshot1) => {
      const key = snapshot1.val();
      sothich2.push(key);
    });
  });

  const Love = () => {
    let fl;
    let co;
    let dc = "false";

    const reference11 = ref(db, "favourite/" + id);
    onValue(reference11, (childSnapshot1) => {
      try {
        childSnapshot1.forEach((snapshot1) => {
          const value = snapshot1.child("user").exportVal();
          try {
            if (user + "" == value + "") {
              dc = "true";

              throw "break-loop";
            }
          } catch (error) {
            console.log(error);
          }
        });
      } catch (error) {
        console.log(error);
      }
      setdaco(dc);
    });
    const reference1 = ref(db, "users/" + id);
    onValue(reference1, (childSnapshot1) => {
      co = childSnapshot1.child("follow").exportVal();
      fl = co + 1;
    });
    console.log("số fl : " + fl);

    if (daco == "false") {
      const reference = ref(db, "users/" + id);
      set(reference, {
        id: id,
        avt: avt,
        name: name,
        ngaysinh: ngaysinh,
        tuoi: tuoi,
        diachi: diachi,
        gioitinh: gioitinh,
        email: email,
        password: pass,
        sothich: sothich2,
        follow: fl,
      });
      const reference3 = ref(db, "favourite/" + id);
      push(reference3, {
        user: user,
      });
      ToastAndroid.show("Đã gửi lượt thích", ToastAndroid.BOTTOM);
    }
    if (daco == "true") {
      const reference = ref(db, "users/" + id);
      set(reference, {
        id: id,
        avt: avt,
        name: name,
        ngaysinh: ngaysinh,
        tuoi: tuoi,
        diachi: diachi,
        gioitinh: gioitinh,
        email: email,
        password: pass,
        sothich: sothich2,
        follow: co,
      });
    }
  };
};
export default ProfileFriendContainer;
