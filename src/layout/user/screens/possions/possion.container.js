import { ToastAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import { firebaseConfig } from "../../../../config";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import PossionView from "./possion.view";
export const Possions = ({ route, navigation }) => {
  const { sdt } = route.params;
  const { name } = route.params;
  const { ngaysinh } = route.params;
  const { avt } = route.params;
  const { gioitinh } = route.params;
  const { user } = route.params;
  const { email } = route.params;
  const { password } = route.params;
  const { tuoi } = route.params;
  const { location } = route.params;
  const data = [];
  const [Datan, setDatan] = useState([]);
  const [number, setnumber] = useState(0);
  const [number1, setnumber1] = useState(0);
  const [number2, setnumber2] = useState(0);
  const [number3, setnumber3] = useState(0);
  const [number4, setnumber4] = useState(0);
  const [number5, setnumber5] = useState(0);
  const [number6, setnumber6] = useState(0);
  const [number7, setnumber7] = useState(0);
  const [number8, setnumber8] = useState(0);
  const [number9, setnumber9] = useState(0);
  const [number10, setnumber10] = useState(0);
  const [number11, setnumber11] = useState(0);
  const [number12, setnumber12] = useState(0);
  const [number13, setnumber13] = useState(0);
  const [tong, setTong] = useState(0);
  const [soThich, setsoThich] = useState("");
  const [soThich1, setsoThich1] = useState("");
  const [soThich2, setsoThich2] = useState("");
  const [soThich3, setsoThich3] = useState("");
  const [soThich4, setsoThich4] = useState("");
  const [soThich5, setsoThich5] = useState("");
  const [soThich6, setsoThich6] = useState("");
  const [soThich7, setsoThich7] = useState("");
  const [soThich8, setsoThich8] = useState("");
  const [soThich9, setsoThich9] = useState("");
  const [soThich10, setsoThich10] = useState("");
  const [soThich11, setsoThich11] = useState("");
  const [soThich12, setsoThich12] = useState("");
  const [soThich13, setsoThich13] = useState("");
  let soThichAll = [];

  const app = initializeApp(firebaseConfig);

  if (!app.length) {
    console.log("Kết nối thành công");
  }

  console.log("Vị Trí Mail: " + location);

  const AddData = () => {
    soThichAll.push(
      soThich,
      soThich1,
      soThich2,
      soThich3,
      soThich4,
      soThich5,
      soThich6,
      soThich7,
      soThich8,
      soThich9,
      soThich10,
      soThich11,
      soThich12,
      soThich13
    );
    console.log("List :" + soThichAll);
    if (soThich.length == 0) {
      ToastAndroid.show(
        "Vui lòng chọn ít nhất 1 sở thích",
        ToastAndroid.CENTER
      );
    } else {
      if (sdt != null) {
        console.log(
          "Select S - " +
            user +
            "sdt -" +
            sdt +
            "name -" +
            name +
            "giotinh-" +
            gioitinh +
            "avt-" +
            avt
        );
        const db = getDatabase();
        const reference = ref(db, "users/" + user);
        set(reference, {
          sdt: sdt,
          sothich: soThich,
          gioitinh: gioitinh,
          name: name,
          ngaysinh: ngaysinh,
          avt: avt,
          tuoi: tuoi,
          diachi: location,
          id: user,
        });

        navigation.navigate("Login");
      }
      if (email != "") {
        console.log(
          "Po S - " +
            user +
            "mail -" +
            email +
            "pass" +
            password +
            "name -" +
            name +
            "giotinh-" +
            gioitinh +
            "avt-" +
            avt
        );
        const db = getDatabase();
        const reference = ref(db, "users/" + user);
        set(reference, {
          email: email,
          password: password,
          gioitinh: gioitinh,
          name: name,
          ngaysinh: ngaysinh,
          avt: avt,
          tuoi: tuoi,
          diachi: location,
          id: user,
        });
        const reference1 = ref(db, "users/" + user + "/sothich");
        set(reference1, {
          soThich,
          soThich1,
          soThich2,
          soThich3,
          soThich4,
          soThich5,
          soThich6,
          soThich7,
          soThich8,
          soThich9,
          soThich10,
          soThich11,
          soThich12,
          soThich13,
        });

        navigation.navigate("Login");
      }
    }
  };
  const SetNum = () => {
    setnumber(1);
    setsoThich("Chụp hình");
  };
  const SetNum1 = () => {
    setnumber1(1);
    setsoThich1("Mua sắm");
  };
  const SetNum2 = () => {
    setnumber2(1);
    setsoThich2("Hát hò");
  };
  const SetNum3 = () => {
    setnumber3(1);
    setsoThich3("Tập yoga");
  };
  const SetNum4 = () => {
    setnumber4(1);
    setsoThich4("Nấu ăn");
  };
  const SetNum5 = () => {
    setnumber5(1);
    setsoThich5("Quần vợt");
  };
  const SetNum6 = () => {
    setnumber6(1);
    setsoThich6("Chạy bộ");
  };
  const SetNum7 = () => {
    setnumber7(1);
    setsoThich7("Bơi lội");
  };
  const SetNum8 = () => {
    setnumber8(1);
    setsoThich8("Vẽ tranh");
  };
  const SetNum9 = () => {
    setnumber9(1);
    setsoThich9("Leo núi");
  };
  const SetNum10 = () => {
    setnumber10(1);
    setsoThich10("Nhảy dù");
  };
  const SetNum11 = () => {
    setnumber11(1);
    setsoThich11("Nghe nhạc");
  };
  const SetNum12 = () => {
    setnumber12(1);
    setsoThich12("Uống nước");
  };
  const SetNum13 = () => {
    setnumber13(1);
    setsoThich13("Chơi game");
  };
};
export default PossionContainer;
