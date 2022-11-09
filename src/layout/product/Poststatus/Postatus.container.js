import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import firebaseConfig from "../../../../config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import * as Permission from "expo-permissions";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import * as Animatable from "react-native-animatable";
const PostStatusContainer = () => {
  const { noidung1 } = route.params;
  console.log("" + noidung1);
  const app = initializeApp(firebaseConfig);
  const data = [];
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [tuoi, settuoi] = useState();
  const [diachi, setdiachi] = useState();
  const [ngaysinh, setngaysinh] = useState();
  const [gioitinh, setgioitinh] = useState();
  const [sothich, setsothich] = useState();
  const [location, setlocation] = useState();
  const [noidung, setnoidung] = useState();
  const [image, setImage] = useState(null);
  const [upload, setupload] = useState("");
  const [tinh, settinh] = useState();
  let id;
  let cytyy;
  if (!app.length) {
    console.log("Kết nối thành công");
  }
  const auth = getAuth(app);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  useEffect(() => {
    const reference = ref(db, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();

      setname(namepr);
      setavt(avtpr);
    });
    const reference1 = ref(db, "post/" + user);
    onValue(reference1, (childSnapshot1) => {
      id = childSnapshot1.size + 1;
    });
  });
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
    uploadImageToBucket(image, makeid(60));
  };
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
      .child("images/album/" + imageName + ".png");
    setupload(
      "https://firebasestorage.googleapis.com/v0/b/duantotnghiepreact.appspot.com/o/images/album%2F" +
        imageName +
        ".png?alt=media"
    );

    console.log("Link Anh: " + upload);

    return ref.put(blob);
  };
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
    let duong;
    diachi.find((p) => {
      country = p.country;
      city =
        p.streetNumber +
        " " +
        p.street +
        ", " +
        p.subregion +
        ", " +
        p.region +
        ", " +
        p.country;
      settinh(p.region);
      setlocation(city);
    });
    console.log("Vị Trí s: " + location);
  };

  const AddPost = () => {
    if (
      (noidung == "" && location == "") ||
      (noidung == null && location == null)
    ) {
      ToastAndroid.show("Chưa có nội dung", ToastAndroid.BOTTOM);
    } else {
      const reference13 = ref(db, "post/" + user + "/" + id);
      set(reference13, {
        name: name,
        avt: avt,
        noidung: noidung,
        checkin: location,
      });
      ToastAndroid.show("Đã đăng bài viết", ToastAndroid.BOTTOM);
      navigation.navigate("Profile");
    }
  };

  const ChonAnh = () => {};
};
export default PostStatusContainer;
