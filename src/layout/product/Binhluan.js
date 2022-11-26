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

const Binhluan = ({ navigation }) => {
  initializeApp(firebaseConfig);
  let noidung1 = "";

  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [id, setid] = useState();
  const datapost = [];
  const dataStory = [];
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  useEffect(() => {
    const reference = ref(db, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      setname(namepr);
      setavt(avtpr);
    });
  });
  const referencer = ref(db, "post");
  onValue(referencer, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      childSnapshot.forEach((childSnapshotq) => {
        const id = childSnapshotq.child("id").exportVal();
        const name = childSnapshotq.child("name").exportVal();
        const avt = childSnapshotq.child("avt").exportVal();
        const noidung = childSnapshotq.child("noidung").exportVal();
        const trangthai = childSnapshotq.child("checkin").exportVal();
        const thoigian = childSnapshotq.child("thoigian").exportVal();
        const image = childSnapshotq.child("image").exportVal();
        datapost.push({
          id: id,
          name: name,
          avt: avt,
          noidung: noidung,
          checkin: trangthai,
          thoigian: thoigian,
          image: image,
        });
      });
    });
  });
  return (
    <View>
      <View>
        <Text style={styles.chu}>Bài viết </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.edit} source={require("../../image/back.png")} />
        </TouchableOpacity>
      </View>

      {/* <Pressable
        key={index}
        style={[
          {
            borderBottomColor: "#ABABAB",
            borderLeftColor: "#ABABAB",
            borderLeftWidth: 0.5,
            borderBottomWidth: 0.5,
            borderRightColor: "#ABABAB",
            borderTopColor: "#ABABAB",
            borderRightWidth: 0.5,
            borderTopWidth: 0.5,
            borderRadius: 15,
            marginTop: 20,
          },
          item == "" ? { width: 0, height: 0, display: "none" } : null,
        ]}
      >
        <View style={styles.info}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProfileFriend", {
                id: item.id,
              })
            }
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{ uri: item.avt }}
            />
          </TouchableOpacity>
          <View style={styles.tenmain}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                paddingRight: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: 35,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 14 }}>{item.thoigian}</Text>
              </View>
            </View>
          </View>
        </View>
        <Text
          style={{
            fontSize: 18,
            color: "black",
            paddingHorizontal: 10,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 10,
            width: "100%",
            alignSelf: "center",
            //textAlign: "center",
            fontWeight: "400",
          }}
        >
          {item.noidung}
        </Text>
        {item.image != "" ? (
          <Image
            style={{
              width: "90%",
              height: 160,
              alignItems: "center",
              alignSelf: "center",
              alignContent: "center",
              justifyContent: "center",
              borderRadius: 15,
              marginBottom: 10,
            }}
            source={{ uri: item.image }}
          />
        ) : null}
        <Text
          style={[
            {
              fontSize: 15,
              color: "black",
              paddingHorizontal: 10,
              fontWeight: "300",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 10,
              width: "100%",
              alignSelf: "center",
              //textAlign: "center",
            },
            item.checkin == "" ? { width: 0, height: 0 } : null,
          ]}
        >
          {item.checkin}
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            borderTopWidth: 0.2,
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => AddLike(item.id)}
          >
            <Image
              style={styles.iclikeContainer}
              // source={require("../assets/iclike.png")}
            />
            <Text style={{ fontSize: 17, color: "black" }}>Thích</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image
              style={styles.cmtContainer}
              // source={require("../assets/iccmt.png")}
            />

            <Text style={{ fontSize: 17 }}>Bình luận</Text>
          </TouchableOpacity> */}
      {/* </View>
      </Pressable> */}
    </View>
  );
};

export default Binhluan;

const styles = StyleSheet.create({
  edit: {
    width: 20,
    height: 20,
    position: "absolute",
    left: 10,
    top: 20,
    opacity: 0.8,
  },
  chu: {
    width: "100%",
    position: "absolute",

    textAlign: "center",
    fontSize: 20,
    top: 15,
  },
});
