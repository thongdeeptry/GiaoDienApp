import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  onAuthStateChanged,
  firebaseDatabaseRef,
  firebaseSet,
  firebaseDatabase,
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  child,
  get,
  db,
  onValue,
} from "../../../../config";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
function ChatItem(props) {
  const user = auth.currentUser.uid;
  console.log("UID - " + user);
  let { name, url, message, numberOfUnreadMessages, userId } = props.user; //destructuring an object
  const { onPress } = props;
  const combinedId =
    user > userId
        ? user + userId
        : userId + user;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 80,
        paddingTop: 20,
        paddingStart: 10,
        flexDirection: "row",
      }}
    >
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            resizeMode: "cover",
            borderRadius: 25,
            marginRight: 15,
            marginStart: 10,
          }}
          source={{
            uri: url,
          }}
        />
        {numberOfUnreadMessages > 0 && (
          <Text
            style={{
              backgroundColor: "red",
              position: "absolute",
              right: 7,
              fontSize: fontSizes.h6 * 0.8,
              borderRadius: 10,
              paddingHorizontal: numberOfUnreadMessages > 9 ? 2 : 4,
              color: "white",
            }}
          >
            {numberOfUnreadMessages}
          </Text>
        )}
      </View>
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: fontSizes.h6,
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: fontSizes.h6,
            color: colors.inactive,
          }}
        >
          {message}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: fontSizes.h6 * 0.8,
            marginRight: 10,
          }}
        >
          4 phút trước
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export default ChatItem;
