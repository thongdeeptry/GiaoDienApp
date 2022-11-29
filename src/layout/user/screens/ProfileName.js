import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { firebaseConfig } from "../../../../config";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import * as Permission from "expo-permissions";
import * as Location from "expo-location";
export const ProfileName = ({ route, navigation }) => {
  const { user } = route.params;
  const { verificationId } = route.params;
  const { email } = route.params;
  const { password } = route.params;
  const { sdt } = route.params;
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [image, setImage] = useState();
  const [ten, setten] = useState("");
  const [ho, setho] = useState("");
  const [ngaysinh, setngaysinh] = useState("");
  const [upload, setupload] = useState("");
  const [location, setlocation] = useState();
  const [city, setcity] = useState();
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  if (!app.length) {
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

    let city;
    let country;
    diachi.find((p) => {
      country = p.country;
      city = p.subregion + "," + p.region;
      setlocation(city);
    });
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
          navigation.navigate("Selectsex", {
            sdt,
            name,
            ngaysinh,
            avt,
            user,
            tuoi,
            location,
          });
        }
        if (email != "") {
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
    const storageRef = ref(storage, "images/" + imageName + ".png");
    setupload(
      "https://firebasestorage.googleapis.com/v0/b/duantotnghiepreact.appspot.com/o/images%2F" +
        imageName +
        ".png?alt=media"
    );

    console.log("Link Anh: " + upload);

    return uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={styles.MOBILE}>
        <Text style={styles.MOBILEText}>Bỏ qua</Text>
      </View>
      <View style={styles.themif}>
        <Text style={styles.themiftext}>Thêm Thông Tin</Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={styles.imageContainer}>
          {image == null ? (
            <Image
              style={styles.image}
              resizeMethod="auto"
              source={require("../../../image/avt.jpg")}
            />
          ) : (
            image && (
              <Image
                style={styles.image}
                resizeMethod="auto"
                source={{ uri: image }}
              />
            )
          )}
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={{ position: "relative", right: 10, top: 70 }}
              source={require("../../../image/camera.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <View style={styles.khunghinh}>
          <View style={styles.khung}>
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="Họ"
              multiline={true}
              maxLength={100}
              value={ho}
              onChangeText={setho}
            ></TextInput>
          </View>

          <View style={styles.khung4}>
            <TextInput
              style={{ fontSize: 20 }}
              placeholder="Tên"
              multiline={true}
              maxLength={100}
              value={ten}
              onChangeText={setten}
            ></TextInput>
          </View>
          <View style={styles.mailnut1}>
            <TouchableOpacity style={styles.nut1} onPress={showDatePicker}>
              <Image
                style={{ position: "relative", left: 30 }}
                source={require("../../../image/Calendarlich.png")}
              />
              <Text style={styles.nutText1}>{`${
                selectedDate
                  ? moment(selectedDate).format("DD/MM/YYYY")
                  : "Chọn ngày sinh"
              }`}</Text>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </View>

      <View style={styles.mailnut}>
        <TouchableOpacity
          style={styles.nut}
          onPress={() => uploadImageToBucket(image, makeid(60))}
        >
          <Text style={styles.nutText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mailnut1: {
    position: "relative",
    width: "100%",

    height: 50,
  },
  nut1: {
    width: "100%",
    height: 58,
    backgroundColor: "#E94057",
    opacity: 0.2,

    alignItems: "center",
    flexDirection: "row",

    borderRadius: 8,
  },
  nutText1: {
    left: 40,
    fontSize: 19,
    fontWeight: "900",
    fontStyle: "normal",
    color: "#E94057",
  },
  imageContainer: {
    position: "absolute",
    width: "100%",
    height: 150,

    flexDirection: "row",
    justifyContent: "center",
    top: 250,
  },
  image: {
    left: 20,
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  themif: {
    position: "absolute",
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 51,
    top: 150,
  },
  themiftext: {
    fontSize: 30,
    textAlign: "left",
    fontStyle: "normal",
    fontWeight: "700",
  },
  mailnut: {
    position: "absolute",
    width: "100%",
    bottom: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  nut: {
    width: "80%",
    height: 56,
    backgroundColor: "#E94057",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    borderRadius: 15,
  },
  nutText: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 19,
    fontWeight: "700",
    fontStyle: "normal",
    color: "white",
  },

  khunghinh: {
    position: "absolute",
    justifyContent: "center",
    fontSize: 35,
    alignItems: "center",
    flexDirection: "column",
    width: "80%",
    height: 58,

    top: 480,
  },
  khung: {
    margin: 20,

    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "100%",
    borderBottomColor: "#ABABAB",
    borderLeftColor: "#ABABAB",
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightColor: "#ABABAB",
    borderTopColor: "#ABABAB",
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 8,
  },
  khung4: {
    marginBottom: 20,

    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "100%",
    borderBottomColor: "#ABABAB",
    borderLeftColor: "#ABABAB",
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightColor: "#ABABAB",
    borderTopColor: "#ABABAB",
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 8,
  },

  MOBILEText: {
    fontSize: 16,
    color: "#E94057",
    fontWeight: "700",
  },
  MOBILE: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "90%",
    height: 24,
    top: 56,
  },
});
