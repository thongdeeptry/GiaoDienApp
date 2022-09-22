import { ToastAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { firebaseConfig } from "../../../../config";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import * as Permission from "expo-permissions";
import * as Location from "expo-location";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import ProfilenameView from "./profilename.view";
export const ProfileName = ({ route, navigation }) => {
  const { user } = route.params;
  const { verificationId } = route.params;
  const { email } = route.params;
  const { password } = route.params;
  const { sdt } = route.params;
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [image, setImage] = useState(null);
  const [ten, setten] = useState("");
  const [ho, setho] = useState("");
  const [ngaysinh, setngaysinh] = useState("");
  const [upload, setupload] = useState("");
  const [location, setlocation] = useState();
  const [city, setcity] = useState();
  const app = initializeApp(firebaseConfig);

  if (!app.length) {
    console.log("Kết nối thành công");
  }

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setlocation("Không có quyền truy cập vị trí");
    }
    const vitri = await Location.getCurrentPositionAsync({});
    const diachi = await Location.reverseGeocodeAsync({
      latitude: vitri.coords.latitude,
      longitude: vitri.coords.longitude,
    });
    console.log(
      "Vị Trí : " + vitri.coords.latitude + ":" + vitri.coords.longitude
    );
    let city;
    let country;
    diachi.find((p) => {
      country = p.country;
      city = p.subregion + "," + p.region;
      setlocation(city);
    });
    console.log("Vị Trí s: " + location);
  };
  getLocation();
  useEffect(() => {
    if (upload != "") {
      const avt = upload;
      const name = ho + " " + ten;
      const ngaysinh = moment(selectedDate).format("DD/MM/YYYY");
      var year = new Date().getFullYear();
      const nam = moment(selectedDate).format("YYYY");
      const tuoi = year - nam;
      if (name == "" || ngaysinh == "") {
        ToastAndroid.show("Chưa Đầy Đủ Thông Tin", ToastAndroid.CENTER);
      } else {
        if (sdt != null) {
          console.log("Link : " + avt);
          navigation.navigate("Selectsex", {
            sdt,
            name,
            ngaysinh,
            avt,
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
              "avt-" +
              avt +
              "tuoi" +
              tuoi
          );
        }
        if (email != "") {
          console.log("Link Mail: " + upload);
          navigation.navigate("Selectsex", {
            email,
            password,
            name,
            ngaysinh,
            avt,
            user,
            tuoi,
            location,
          });
          console.log(
            "Profile S - " +
              user +
              "mail -" +
              email +
              "pass" +
              password +
              "name -" +
              name +
              "avt-" +
              avt
          );
        }
      }
    }
    return () => {};
  }, [upload]);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);

    hideDatePicker();
  };

  function AddData(name, ngaysinh, avt) {
    uploadImageToBucket(image, makeid(60));
  }
  function makeid(length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  const uploadImageToBucket = async (uri, imageName) => {
    const res = await fetch(uri);
    const blob = await res.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName + ".png");
    setupload(
      "https://firebasestorage.googleapis.com/v0/b/duantotnghiepreact.appspot.com/o/images%2F" +
        imageName +
        ".png?alt=media"
    );

    console.log("Link Anh: " + upload);

    return ref.put(blob);
  };
};
export default ProfilenameContainer;
