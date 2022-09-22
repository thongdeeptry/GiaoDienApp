import { ToastAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { firebaseConfig } from "../../../../config";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
export const Selectsex = ({ route, navigation }) => {
  const { sdt } = route.params;
  const { name } = route.params;
  const { email } = route.params;
  const { password } = route.params;
  const { ngaysinh } = route.params;
  const { avt } = route.params;
  const { tuoi } = route.params;
  const { user } = route.params;
  const { location } = route.params;
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [image, setImage] = useState(null);
  const [number, setnumber] = useState(0);
  const [number1, setnumber1] = useState(0);
  const [number2, setnumber2] = useState(0);
  const [gioitinh, setgioitinh] = useState("");

  const app = initializeApp(firebaseConfig);

  if (!app.length) {
    console.log("Kết nối thành công");
  }
  console.log("Vị Trí : " + location);
  function AddData() {
    if (gioitinh == "") {
      ToastAndroid.show("Chưa Đầy Đủ Thông Tin", ToastAndroid.CENTER);
    } else {
      if (sdt != null) {
        navigation.navigate("Possions", {
          sdt,
          name,
          ngaysinh,
          avt,
          gioitinh,
          user,
          tuoi,
          location,
        });
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
      }
      if (email != "") {
        navigation.navigate("Possions", {
          email,
          password,
          name,
          ngaysinh,
          avt,
          gioitinh,
          user,
          tuoi,
          location,
        });
        console.log(
          "Select S - " +
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
      }
    }
  }
  const SetNum = () => {
    setnumber(1);
    setnumber1(0);
    setnumber2(0);
    setgioitinh("Nam");
  };
  const SetNum1 = () => {
    setnumber1(1);
    setnumber(0);
    setnumber2(0);
    setgioitinh("Nữ");
  };
  const SetNum2 = () => {
    setnumber2(1);
    setnumber1(0);
    setnumber(0);
    setgioitinh("Khác");
  };
};

export default SelectsexContainer;
