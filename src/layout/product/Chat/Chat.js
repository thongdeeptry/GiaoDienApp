import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import Icon from "react-native-vector-icons/FontAwesome5";
import { UIHeader } from "../../../components";
import ChatItem from "./ChatItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  firebaseDatabaseRef,
  firebaseDatabase,
  auth,
  db,
  onValue,
} from "../../../../config";
import {
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
function Chat(props) {
  const user = auth.currentUser.uid;
  console.log("UID - " + user);
  const [users, setUsers] = useState([
  ]);
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const handleSelect = async (ite) => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
    user > ite.userId
        ? user + ite.userId
        : ite.userId+ user;
        try {
          const res = await getDoc(doc(db, "chats", combinedId));
          console.log(res)
          if (!res.exists()) {
            console.log(combinedId)
            //create a chat in chats collection
            await setDoc(doc(db, "chats", combinedId), { messages: [] });
            await setDoc(doc(db, "userChats", user), { });
            await setDoc(doc(db, "userChats", ite.userId), { });
          }
        }catch{
        }
    
    navigate("Messenger", { user: ite });
  }
  useEffect(() => {
    onValue(
      firebaseDatabaseRef(firebaseDatabase, "users"),
      async (snapshot) => {
        debugger;
        if (snapshot.exists()) {
          let snapshotObject = snapshot.val();
          let stringUser = await AsyncStorage.getItem("user");
          let myUserId = "1";
          debugger;
          setUsers(
            Object.keys(snapshotObject)
              .filter((item) => item != myUserId)
              .map((eachKey) => {
                let eachObject = snapshotObject[eachKey];
                return {
                  //default profile url
                  url: eachObject.avt,
                  name: eachObject.name,
                  email: eachObject.email,
                  accessToken: eachObject.accessToken,
                  numberOfUnreadMessages: 0,
                  userId: eachKey,
                  message: eachObject.nghenghiep,
                };
              })
          );
          debugger;
        } else {
          console.log("No data available");
        }
      }
    );
  }, []);
  return (
    <View
      style={{
        flexDirection: "column",
      }}
    >
      <UIHeader
        title={"Tin Nhắn"}
        leftIconName={"arrow-left"}
        rightIconName={"search"}
        onPressLeftIcon={() => {
          alert("press left icon");
        }}
        onPressRightIcon={() => {
          alert("press right icon");
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingStart: 10,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: fontSizes.h6,
            marginStart: 10,
          }}
        >
          6 tin nhắn mới
        </Text>
        <Icon
          name={"search"}
          style={{ padding: 15 }}
          size={15}
          color={"black"}
          onPress={() => {
            alert("You pressed Delete");
          }}
        />
      </View>
      <FlatList
        style={{height:"75%" , }}
        data={users}
        
        renderItem={({ item }) => (
          <ChatItem
            onPress={() => {
              handleSelect(item)
            }}
            user={item}
            key={item.url}
          />
        )}
      />
    </View>
  );
}
export default Chat;
