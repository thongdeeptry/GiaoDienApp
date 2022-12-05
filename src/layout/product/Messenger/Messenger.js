/** @format */

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Keyboard,
  TextInput,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import Icon from "react-native-vector-icons/FontAwesome5";
import { UIHeader } from "../../../components";
import MessengerItem from "./MessengerItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuid } from "uuid";
import "react-native-get-random-values";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  update,
  serverTimestamp,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import { auth, firebaseConfig } from "../../../../config";

function Messenger(props) {
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
  }
  const DataHis = [];
  const db1 = getDatabase();
  const user = auth.currentUser.uid;
  const [namee, setname] = useState();
  const [avt, setavt] = useState();
  const [typedText, setTypedText] = useState("");
  const [chatHistory, setChatHistory] = useState(DataHis);
  const { url, name, userId } = props.route.params.user;
  const { navigate, goBack } = props.navigation;
  const combinedId = user > userId ? user + userId : userId + user;

  useEffect(() => {
    const reference = ref(db1, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();

      setname(namepr);
      setavt(avtpr);
    });
  }, []);
  const unSub = ref(db1, "chats/" + combinedId + "/messages");
  onValue(unSub, (datasnap) => {
    datasnap.forEach((datasnapP) => {
      DataHis.push({
        id: datasnapP.child("id").exportVal(),
        date: datasnapP.child("date").exportVal(),
        isSender: datasnapP.child("isSender").exportVal(),
        messenger: datasnapP.child("messenger").exportVal(),
        senderId: datasnapP.child("senderId").exportVal(),
        showUrl: datasnapP.child("showUrl").exportVal(),
        text: datasnapP.child("text").exportVal(),
        timestamp: datasnapP.child("timestamp").exportVal(),
        url: datasnapP.child("url").exportVal(),
      });
    });
  });
  const sendMess = () => {
    if (typedText.trim().length == 0) {
      return;
    }
    let myFriendUserId = userId;
    Keyboard.dismiss();
    let key = uuid();
    const docRef = ref(db1, "chats/" + combinedId + "/messages/" + key);
    set(docRef, {
      id: key,
      showUrl: true,
      messenger: typedText,
      text: typedText,
      senderId: user,
      date: serverTimestamp(),
      timestamp: new Date().getTime(),
      url: avt,
      isSender: true,
    });
    const docRefd = ref(
      db1,
      "userChats/" + user + "/" + combinedId + "/lastMessage"
    );
    update(docRefd, {
      text: typedText,
    });
    const docRefdds = ref(db1, "userChats/" + user + "/" + combinedId);
    update(docRefdds, {
      date: serverTimestamp(),
    });
    const docRefdd = ref(
      db1,
      "userChats/" + myFriendUserId + "/" + combinedId + "/lastMessage"
    );
    update(docRefdd, {
      text: typedText,
    });
    const docRefddss = ref(
      db1,
      "userChats/" + myFriendUserId + "/" + combinedId
    );
    update(docRefddss, {
      date: serverTimestamp(),
    });
    setTypedText("");
  };
  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        paddingBottom: 100,
      }}
    >
      <UIHeader
        title={name}
        leftIconName={"arrow-left"}
        rightIconName={"ellipsis-v"}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {
          navigate("CallVideo", { combinedId });
        }}
      />

      <FlatList
        style={{
          flex: 1,
          marginBottom: 20,
        }}
        inverted
        data={DataHis == [] ? chatHistory : DataHis.reverse()} //chatHistory.reverse()
        renderItem={({ item }) => (
          <MessengerItem
            onPress={() => {
              alert(`You press item's name: ${item.timestamp}`);
            }}
            item={item}
            key={`${item.timestamp}`}
          />
        )}
      />
      <View
        style={{
          height: 50,
          position: "absolute",
          bottom: 60,
          left: 10,
          right: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          borderBottomColor: "#ABABAB",
          borderLeftColor: "#ABABAB",
          borderLeftWidth: 1,
          borderBottomWidth: 1,
          borderRightColor: "#ABABAB",
          borderTopColor: "#ABABAB",
          borderRightWidth: 1,
          borderTopWidth: 1,
          borderRadius: 8,
        }}
      >
        <TextInput
          onChangeText={(typedText) => {
            setTypedText(typedText);
          }}
          style={{
            color: "black",
            paddingStart: 10,
          }}
          placeholder="Nhập nội dung tin nhắn"
          value={typedText}
          placeholderTextColor={colors.placeholder}
        />
        <TouchableOpacity onPress={sendMess}>
          <Icon
            style={{
              padding: 10,
            }}
            name="paper-plane"
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Messenger;
