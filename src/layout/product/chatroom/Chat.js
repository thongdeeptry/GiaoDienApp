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
  Animated,
  Easing,
} from "react-native";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { firebaseConfig } from "../../../../config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import * as Permission from "expo-permissions";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import * as Animatable from "react-native-animatable";

export const Chat = () => {
  let data = [];
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
    console.log("Kết nối thành công");
  }
  const auth = getAuth(app);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  useEffect(() => {
    const reference1 = ref(db, "messenger/" + user);
    onValue(reference1, (childSnapshot) => {
      childSnapshot.forEach((snapshot) => {
        const avt = snapshot.child("avt").val();
        const name = snapshot.child("name").val();
        data.push({ avt });
      });
    });
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        top: 20,
      }}
    >
      <View>
        <Text style={styles.chutinnhan}>Tin nhắn</Text>
      </View>
      <View>
        <TextInput
          style={styles.background2Image}
          placeholder="Tìm kiếm"
        ></TextInput>
        <TouchableOpacity>
          <Image
            style={styles.nhanImage}
            source={require("../../../image/ictimkiem.png")}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <View
            style={{ position: "absolute", width: 347, height: 56, left: 6 }}
          >
            <TouchableOpacity>
              <Image
                style={styles.avt}
                source={require("../../../image/ADD.jpg")}
              />
              <Text
                key={index}
                style={{
                  position: "absolute",
                  height: 24.43,
                  left: 91.27,
                  top: 126.03,
                }}
              >
                {item.name}{" "}
              </Text>
              <View
                style={{
                  position: "absolute",
                  width: 10.45,
                  height: 10.06,
                  left: 318.55,
                  top: 133.21,
                  backgroundColor: "#04C100",
                  borderRadius: 5,
                }}
              ></View>

              <Text
                style={{
                  position: "absolute",
                  height: 24.43,
                  left: 91.27,
                  top: 150,
                  opacity: 0.5,
                }}
              >
                Nội dung tin nhắn
              </Text>

              <Text
                style={{
                  position: "absolute",
                  height: 24.43,
                  right: 40,
                  top: 150,
                  opacity: 0.5,
                }}
              >
                00.00
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View>
        <TouchableOpacity>
          <Image
            style={styles.THEM}
            source={require("../../../image/them.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  THEM: {
    position: "absolute",
    width: 63,
    height: 63,
    left: 290,
    top: 570,
  },
  avt: {
    position: "absolute",
    width: 52.84,
    height: 53.16,
    left: 26.3,
    top: 121,
    borderRadius: 25,
  },

  nhanImage: {
    position: "absolute",
    width: 22,
    height: 22,
    left: 320,
    top: 61,
  },
  background2Image: {
    position: "absolute",
    width: 347,
    height: 30,
    left: 6,
    top: 57,
    backgroundColor: "#FFFFFF",
    paddingLeft: 50,
    borderWidth: 0.5,
    borderRadius: 8,
  },

  chutinnhan: {
    position: "absolute",
    width: 256,
    height: 35,
    left: 52,
    top: 22,
    fontSize: 20,
  },
});
