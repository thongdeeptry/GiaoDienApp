import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  TextInput,
  ToastAndroid,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { firebaseConfig } from "../../../config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import * as Permission from "expo-permissions";
import { FlatList } from "react-native-gesture-handler";

export const Mes = ({ route, navigation, props }) => {
  const { id } = route.params;
  const app = initializeApp(firebaseConfig);
  const data = [];
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [idnguoigui, setidnguoigui] = useState();
  const [idnguoinhan, setidnguoinhan] = useState();
  const [noidung, setnoidung] = useState();
  const [trangthai, settrangthai] = useState();
  const [time, settime] = useState();
  const [trangthaigui, settrangthaigui] = useState();
  const [noidunggui, setnoidunggui] = useState();
  const [sothich, setsothich] = useState([]);
  if (!app.length) {
  }
  const sothich2 = [];
  const auth = getAuth(app);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  const [namefr, setnamefr] = useState();
  const [avtfr, setavtfr] = useState();

  useEffect(() => {
    const reference = ref(db, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      const idnguoiguipr = childSnapshot.child("idnguoigui").val();

      setname(namepr);
      setavt(avtpr);
      setidnguoigui(idnguoiguipr);
      let date = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      settime(date + month + year);
      settrangthai("Đã gửi");

      setname(namepr);
      setavt(avtpr);
      setidnguoigui(idnguoiguipr);
    });

    const reference4 = ref(db, "users/" + id);
    onValue(reference4, (childSnapshot) => {
      setnamefr(childSnapshot.child("name").val());
      setavtfr(childSnapshot.child("avt").val());
    });

    firebase
      .database()
      .ref("messenger")
      .child(user)
      .child(id)
      .on("child_added", (value) => {
        setsothich(value.val());
      });
    // const reference1 = ref(db, "messenger/" + user + "/" + id);
    // onValue(reference1, (childSnapshot) => {
    //   childSnapshot.forEach((snap) => {
    //     const ndg = snap.child("noidung").exportVal();
    //     const ttg = snap.child("trangthai").exportVal();
    //     console.log("noidunggui " + snap.child("noidung").exportVal());

    //     sothich2.push({
    //       noidunggui: ndg,
    //       trangthaigui: ttg,
    //     });
    //   });
    //   console.log("noi dung fr " + sothich2.length);
    // });
  }, [sothich]);

  const messenger = () => {
    if (noidung != "") {
      let reference1 = firebase
        .database()
        .ref("messenger/" + user + "/" + id)
        .push().key;
      let updates = {};
      let messengers = {
        name: name,
        avt: avt,
        noidung: noidung,
        from: user,
        take: id,
        trangthai: trangthai,
        time: firebase.database.ServerValue.TIMESTAMP,
      };
      updates["messenger/" + user + "/" + id + "/" + reference1] = messengers;
      updates["messenger/" + id + "/" + user + "/" + reference1] = messengers;
      firebase.database().ref().update(updates);
      setnoidung("");
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: "60%",
          flexDirection: "row",
          alignSelf: item.from === user ? "flex-end" : "flex-start",
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
        <Text style={styles.textView1}>{item.noidung}</Text>
        <Text style={styles.textHours2}>{item.trangthai}</Text>
      </View>
    );
  };
  let { height, width } = Dimensions.get("window");
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        top: 20,
      }}
    >
      <View style={styles.imageBack}>
        <Image
          style={styles.backImage}
          source={require("../../image/backArrow.png")}
        />
        <Image style={styles.avatarImage} source={{ uri: avtfr }} />
        <Image
          style={styles.onlineImage}
          source={require("../../image/activeIcon.png")}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTen}>{namefr}</Text>
        <Text style={styles.textOnline}>Đang Hoạt Động</Text>
        <Image
          style={styles.iconImage}
          source={require("../../image/iconOption.png")}
        />
      </View>
      {/* <View>
        <Image
          style={styles.mesImage}
          source={require("../../image/background.png")}
        />
        <Text style={styles.textView}>Hey, Tell me something i don’t know</Text>
        <Text style={styles.textHours}>4.30 AM</Text>
      </View>
      <View>
        <Image
          style={styles.pictureImage}
          source={require("../../image/picture.png")}
        />
        <Image
          style={styles.loveImage}
          source={require("../../image/love.png")}
        />
        <Text style={styles.textHours1}>4.31 AM</Text>
      </View> */}
      <FlatList
        style={{ padding: 10, height: height * 0.8 }}
        data={sothich}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View
        style={{ width: "100%", height: 50, bottom: 40, position: "absolute" }}
      >
        <TextInput
          value={noidung}
          onChangeText={setnoidung}
          style={styles.background2Image}
          placeholder="Nhập tin nhắn..."
        ></TextInput>
        <Image
          style={styles.nhanImage}
          source={require("../../image/icon.png")}
        />
        <Text style={styles.textView2}></Text>
        <TouchableOpacity style={{ bottom: 45 }} onPress={messenger}>
          <Image
            style={styles.sendImage}
            source={require("../../image/gui.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sendImage: {
    position: "absolute",
    width: 30,
    height: 30,
    right: 25,
    bottom: 10,
    top: 30,
  },
  nhanImage: {
    position: "absolute",
    left: "8%",
  },

  background2Image: {
    position: "absolute",
    width: "90%",
    height: 55,
    left: 20,
    bottom: 20,
    top: -15,
    backgroundColor: "#FFFFFF",
    paddingLeft: 50,
    borderWidth: 0.5,
    borderRadius: 8,
  },
  textHours2: {
    position: "absolute",
    right: 0,
    top: 50,
    fontSize: 14,
    fontWeight: "400",
    color: "#969696",
  },
  textView1: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
  backgroud1Image: {
    width: "60%",
    flexDirection: "row",
    backgroundColor: "#B0B0B0",
    height: 50,
    right: 10,
    top: 370,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  textHours1: {
    position: "absolute",
    width: 47,
    height: 24,
    left: 15.2,
    right: 78.4,
    top: 336,
    fontSize: 12,
    fontWeight: "400",
    color: "#969696",
  },
  loveImage: {
    position: "absolute",
    left: "57%",
    top: 295,
  },
  pictureImage: {
    position: "absolute",
    width: 254,
    height: 113,
    left: 15.2,
    right: 78.4,
    top: 211,
  },
  textHours: {
    color: "#969696",
    position: "absolute",
    width: 47,
    height: 24,
    left: 15.2,
    right: 78.4,
    top: 165,
    fontSize: 12,
    fontWeight: "400",
  },
  textView: {
    position: "absolute",
    width: "100%",
    height: 24,
    left: 40,
    top: 117,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
  mesImage: {
    position: "absolute",
    width: 296,
    height: 50,
    left: 15.2,
    right: 78.4,
    top: 105,
  },
  iconImage: {
    position: "absolute",
    width: 5,
    height: 23,
    left: 347,
    top: 35,
  },
  textOnline: {
    position: "absolute",
    width: "100%",
    height: 100,
    left: 131,
    top: 42,
    fontSize: 14,
    fontWeight: "300",
  },
  textTen: {
    position: "absolute",
    width: "100%",
    height: 23,
    left: 131,
    top: 20,
    fontSize: 18,
    fontSize: 18,
  },
  onlineImage: {
    position: "absolute",
    width: 18,
    height: 18,
    left: 102,
    top: 50,
  },
  avatarImage: {
    position: "absolute",
    width: 42,
    height: 42,
    left: 75,
    top: 20,
    borderRadius: 20,
  },
  backImage: {
    position: "absolute",
    left: 15.2,
    right: 78.4,
    top: 40,
    bottom: 88.72,
  },
  imageBack: {},
});
