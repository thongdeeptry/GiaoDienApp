/** @format */

import "expo-dev-client";
import React, { useState, useEffect } from "react";
import AgoraUIKit from "agora-rn-uikit";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { ongetTokenAgora } from "../utilities/getTokenAgora.context";
import { initializeApp } from "firebase/app";
import { auth, firebaseConfig } from "../../../../../config";
import { v4 as uuid } from "uuid";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  update,
  remove,
  serverTimestamp,
} from "firebase/database";
const LiveVideo = ({ navigation, route }) => {
  initializeApp(firebaseConfig);
  const user = auth.currentUser.uid;
  const db = getDatabase();
  const [videoCall, setVideoCall] = useState(true);
  const [channel, setChannel] = useState(user);
  const [role, setRole] = useState(1); //role = 2 people follow
  const [uid, setUid] = useState(1);
  const [expiry, setexpiry] = useState("9999999999999999999");
  const [token, setToken] = useState("");
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [ngay, setNgay] = useState();
  const [view, setView] = useState();
  useEffect(() => {
    async function fetchData() {
      const referencek = ref(db, "users/" + user);
      onValue(referencek, (childSnapshot) => {
        const namepr = childSnapshot.child("name").val();
        const avtpr = childSnapshot.child("avt").val();
        setname(namepr);
        setavt(avtpr);
      });

      const res = await ongetTokenAgora(channel, role, "uid", uid, expiry);
      setToken(res);
      const referencera = ref(db, "livestream/" + user);
      set(referencera, {
        id: user,
        avt: avt,
        name: name,
        luotxem: 0,
        ngaytao: serverTimestamp(),
        token: token,
        channel: channel,
        uid: 1,
      });
      ToastAndroid.show("Đã tạo phòng phát trực tiếp", ToastAndroid.BOTTOM);
      const reference = ref(db, "livestream/" + user);
      onValue(reference, (childSnapshot) => {
        const namepr = childSnapshot.child("ngaytao").val();
        const vi = childSnapshot.child("luotxem").val();
        setNgay(namepr);
        setView(vi);
      });
    }
    fetchData();
  }, []);
  const props = {
    connectionData: {
      appId: "e63496cfe00f42d8be5c498370e6fa27",
      channel: channel,
      uid: uid,
      token: token,
      role: role,
    },
    rtcCallbacks: {
      EndCall: () => {
        setVideoCall(false);
        navigation.goBack();
        const referencer = ref(db, "livestream/" + user);
        remove(referencer).then(() => {
          ToastAndroid.show("Bạn đã tắt phòng live", ToastAndroid.BOTTOM);
        });
      },
    },
  };

  return videoCall ? (
    <View
      style={{
        width: "100%",
        height: "95%",
        paddingTop: 50,
        backgroundColor: "black",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("ProfileFriend", { id: user })}
        style={{
          width: 55,
          height: 55,
          position: "absolute",
        }}
      >
        <Image
          style={{
            width: 45,
            height: 45,
            left: 10,
            top: 5,
            borderRadius: 25,
          }}
          source={{ uri: avt }}
        />
      </TouchableOpacity>
      <AgoraUIKit
        connectionData={props.connectionData}
        rtcCallbacks={props.rtcCallbacks}
      />
      <Text
        style={{
          position: "absolute",
          left: 70,
          color: "white",
          fontSize: 20,
          top: 5,
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          position: "absolute",
          left: 70,
          color: "white",
          fontSize: 15,
          top: 30,
          opacity: 0.7,
        }}
      >
        {ngay}
      </Text>
      <Text
        style={{
          position: "absolute",
          right: 20,
          color: "white",
          fontSize: 20,
          top: 10,
          opacity: 0.7,
        }}
      >
        {view}
      </Text>
    </View>
  ) : null;
};

export default LiveVideo;
