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
    console.log("Kết nối thành công");
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
  useEffect(() => {
    setisLoading(true);
    const reference = ref(db, "notification/" + user);
    onValue(reference, (childSnapshot) => {
      childSnapshot.forEach((snapshot) => {
        const id = childSnapshot.child("id").val();
        const noidung = childSnapshot.child("noidung").val();
        const thoigian = childSnapshot.child("thoigian").val();
        const users = childSnapshot.child("user").val();
        const avt = childSnapshot.child("avt").val();
        const name = childSnapshot.child("name").val();
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
    setisLoading(false);
    console.log(dataTB);
  });
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "column",
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
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>
                      {item.name} {item.noidung}ALo1234
                    </Text>
                    <Text style={{ fontSize: 14 }}>{item.thoigian}</Text>
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
    backgroundColor: "red",
  },
});
