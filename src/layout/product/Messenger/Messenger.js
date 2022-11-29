import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import Icon from "react-native-vector-icons/FontAwesome5";
import { UIHeader } from "../../../components";
import MessengerItem from "./MessengerItem";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuid } from "uuid";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { initializeApp } from "firebase/app";

import "react-native-get-random-values";
import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import {
  auth,
  onAuthStateChanged,
  firebaseDatabaseRef,
  firebaseConfig,
  firebaseSet,
  firebaseDatabase,
  storage,
} from "../../../../config";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { async } from "@firebase/util";

function Messenger(props) {
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
  }
  const db1 = getDatabase();
  const user = auth.currentUser.uid;
  const db = getFirestore();
  const [namee, setname] = useState();
  const [avt, setavt] = useState();
  const [typedText, setTypedText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
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
    const unSub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
      doc.exists() && setChatHistory(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, []);
  const sendMess = async () => {
    if (typedText.trim().length == 0) {
      return;
    }
    let myFriendUserId = userId;
    Keyboard.dismiss();
    const docRef = doc(db, "chats", combinedId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      updateDoc(doc(db, `chats/${combinedId}`), {
        messages: arrayUnion({
          id: uuid(),
          showUrl: true,
          messenger: typedText,
          text: typedText,
          senderId: user,
          date: Timestamp.now(),
          timestamp: new Date().getTime(),
          url: avt,
          isSender: true,
        }),
      });
    } else {
      updateDoc(doc(db, `chats/${combinedId}`), {
        messages: arrayUnion({
          id: uuid(),
          showUrl: true,
          messenger: typedText,
          text: typedText,
          senderId: user,
          date: Timestamp.now(),
          timestamp: new Date().getTime(),
          url: avt,
          isSender: true,
        }),
      });
    }

    updateDoc(doc(db, "userChats", user), {
      [`${combinedId}` + ".lastMessage"]: {
        text: typedText,
      },
      [`${combinedId}` + ".date"]: serverTimestamp(),
    });

    updateDoc(doc(db, "userChats", myFriendUserId), {
      [`${combinedId}` + ".lastMessage"]: {
        text: typedText,
      },
      [`${combinedId}` + ".date"]: serverTimestamp(),
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
          alert("press right icon");
        }}
      />

      <FlatList
        style={{
          flex: 1,
          marginBottom: 20,
        }}
        inverted
        data={chatHistory.reverse()}
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
