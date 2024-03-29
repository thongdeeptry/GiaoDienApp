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
  RefreshControl,
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
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
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
  const [nameu, setnameu] = useState();
  const [avtu, setavtu] = useState();
  const [userId, setuserId] = useState();

  const { navigate, goBack } = props.navigation;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    const reference = ref(db1, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();

      setname(namepr);
      setavt(avtpr);
    });
    try {
      const { url, name, userId } = props.route.params.user;
      console.log(name);
      setnameu(name);
      setavtu(url);
      setuserId(userId);
    } catch (error) {
      const { url, name, userId } = props.route.params;
      console.log(name + "pppp");
      setnameu(name);
      setavtu(url);
      setuserId(userId);
    }
    const reference3w = ref(db, "listChat/" + userId + "/" + user);
    update(reference3w, {
      trangthai: "Đã xem",
    });
  }, []);
  const combinedId = user > userId ? user + userId : userId + user;
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
    let key = new Date().getTime();
    const reference3w = ref(db, "listChat/" + user + "/" + userId);
    update(reference3w, {
      trangthai: typedText,
    });
    const reference3ws = ref(db, "listChat/" + userId + "/" + user);
    update(reference3ws, {
      trangthai: typedText,
    });
    const docRef = ref(db1, "chats/" + combinedId + "/messages/" + key);
    set(docRef, {
      id: key,
      showUrl: true,
      messenger: typedText,
      text: typedText,
      senderId: user,
      date: serverTimestamp(),
      timestamp: serverTimestamp(),
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
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
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
        title={nameu}
        leftIconName={"arrow-left"}
        rightIconName={"ellipsis-v"}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {
          navigate("CallVideo", { combinedId, userId });
        }}
      />

      <FlatList
        style={{
          flex: 1,
          marginBottom: 20,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        inverted
        keyExtractor={(item, index) => index}
        data={DataHis == [] ? [] : DataHis.reverse()} //chatHistory.reverse()
        renderItem={({ item }) => (
          <MessengerItem
            onPress={() => {
              navigate("ProfileFriend", { id: item.senderId });
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
