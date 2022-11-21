import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
export default notifiCation = () => {
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
  }
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  const [id, setid] = useState();
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [noidung, setnoidung] = useState();
  const [thoigian, setthoigian] = useState();
  const [users, setusers] = useState();
  const [isLoading, setisLoading] = useState(false);
  const dataTB = [];

  const reference = ref(db, "notification/" + user);
  onValue(reference, (childSnapshot) => {
    childSnapshot.forEach((snapshot) => {
      const id = snapshot.child("id").val();
      const noidung = snapshot.child("noidung").val();
      const thoigian = snapshot.child("thoigian").val();
      const users = snapshot.child("user").val();
      const avt = snapshot.child("avt").val();
      const name = snapshot.child("name").val();
      dataTB.push({
        id: id,
        noidung: noidung,
        thoigian: thoigian,
        user: users,
        avt: avt,
        name: name,
      });
    });
  });
  console.log(dataTB);
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginTop: 40,
        }}
      >
        <Text style={{ fontSize: 17 }}>Thông báo</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 17 }}>Đã đọc tất cả</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dataMap}>
        {dataTB.map((item, index) => (
          <Pressable
            key={index}
            style={{
              borderBottomColor: "#ABABAB",
              borderLeftColor: "#ABABAB",
              borderLeftWidth: 0.5,
              borderBottomWidth: 0.5,
              borderRightColor: "#ABABAB",
              borderTopColor: "#ABABAB",
              borderRightWidth: 0.5,
              borderTopWidth: 0.5,
              borderRadius: 15,
              paddingVertical: 5,
              marginTop: 10,
            }}
          >
            <View style={styles.info}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 20 }}
                source={{ uri: item.avt }}
              />
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
                      width: "100%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        width: "85%",
                      }}
                    >
                      {item.name} {item.noidung}
                    </Text>
                    <Text style={{ fontSize: 11 }}>{item.thoigian}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dataMap: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tenmain: {
    width: "100%",
    height: 50,
    left: 10,
  },
  info: {
    width: "100%",
    height: 50,
    left: 10,
    top: 5,
    flexDirection: "row",
  },
});
