/** @format */

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  TextInput,
  ToastAndroid,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../config";
import { getAuth, signOut } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  update,
} from "firebase/database";
import { UserContext } from "../user/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CaiDat = ({ route, navigation }) => {
  initializeApp(firebaseConfig);
  let noidung1 = "";
  const { onLogout } = useContext(UserContext);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  useEffect(() => {
    const reference = ref(db, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      setname(namepr);
      setavt(avtpr);
    });
  });
  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(async () => {
        alert("Đăng xuất thành công");
        await AsyncStorage.setItem("email", "");
        await AsyncStorage.setItem("password", "");
        onLogout();
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <View style={styles.tong}>
      <Text style={styles.chuu}>Cài đặt</Text>

      <View>
        <Image style={styles.avt} source={{ uri: avt }} />
        <Text style={styles.ten}>{name}</Text>
      </View>
      <View style={styles.a}>
        <View style={styles.khung}>
          <TouchableOpacity onPress={() => navigation.navigate("Chinhsua")}>
            <Text style={styles.chu}>Chỉnh sửa thông tin</Text>

            <Image
              style={styles.edit1}
              source={require("../../image/edit.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ top: 70 }}>
          <View style={styles.khung}>
            <TouchableOpacity onPress={() => navigation.navigate("Chinhsua")}>
              <Text style={styles.chu}>Mời bạn bè</Text>

              <Image
                style={styles.edit1}
                source={require("../../image/add-group.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ top: 225 }}>
        <View style={styles.khung}>
          <TouchableOpacity onPress={() => navigation.navigate("AllRoomCall")}>
            <Text style={styles.chu}>Bảo vệ</Text>

            <Image
              style={styles.edit1}
              source={require("../../image/bv.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ top: 70 }}>
          <View style={styles.khung}>
            <TouchableOpacity onPress={logOut}>
              <Text style={styles.chu}>Đăng xuất</Text>
              <Image
                style={styles.edit1}
                source={require("../../image/log-out.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  edit1: {
    width: 20,
    height: 20,
    position: "absolute",
    left: 20,
    top: 20,
  },
  a: {
    flexDirection: "column",
    height: "50%",
    width: "100%",
    position: "absolute",
    top: 200,
  },

  khung: {
    position: "absolute",
    width: "90%",
    height: 60,
    marginHorizontal: 20,
    top: 40,
    backgroundColor: "white",

    borderRadius: 10,
    elevation: 5,
  },

  ten: {
    top: 15,
    color: "black",
    textAlign: "center",
    fontSize: 20,
    top: 80,
  },
  avt: {
    borderRadius: 50,
    width: 90,
    height: 90,
    top: 70,
    alignSelf: "center",
  },

  tong: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: 50,
  },
  chu: {
    width: "100%",
    position: "absolute",

    left: 50,
    fontSize: 20,
    top: 16,
  },
  chuu: {
    width: "100%",
    position: "absolute",
    color: "#E94057",
    left: 20,
    fontSize: 20,
    top: 16,
  },
});
