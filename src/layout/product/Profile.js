import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { firebaseConfig } from "../../../config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
export const Profile = (props) => {
  const { navigation } = props;
  const app = initializeApp(firebaseConfig);
  const data = [];
  let noidung1 = "";
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [tuoi, settuoi] = useState();
  const [diachi, setdiachi] = useState();
  const [ngaysinh, setngaysinh] = useState();
  const [gioitinh, setgioitinh] = useState();
  const [sothich, setsothich] = useState();
  const [isLoading, setisLoading] = useState(false);
  if (!app.length) {
    console.log("Kết nối thành công");
  }
  const auth = getAuth(app);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();

  const sothich2 = [];
  useEffect(() => {
    setisLoading(true);
    const reference = ref(db, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      const tuoipr = childSnapshot.child("tuoi").val();
      const diachipr = childSnapshot.child("diachi").val();
      const ngaysinhpr = childSnapshot.child("ngaysinh").val();
      const gioitinhpr = childSnapshot.child("gioitinh").val();

      setname(namepr);
      setavt(avtpr);
      setdiachi(diachipr);
      settuoi(tuoipr);
      setgioitinh(gioitinhpr);
      setngaysinh(ngaysinhpr);
      setisLoading(false);
    });
  });

  const reference1 = ref(db, "users/" + user + "/sothich");
  onValue(reference1, (childSnapshot1) => {
    childSnapshot1.forEach((snapshot1) => {
      const key = snapshot1.val();
      sothich2.push(key);
    });
  });

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      style={{ width: "100%", height: 2000 }}
    >
      <View style={styles.container}>
        {isLoading == true ? (
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              marginTop: 400,
              fontSize: 30,
              color: "blue",
            }}
          >
            Loading...
          </Text>
        ) : (
          <View style={styles.mainanh}>
            <View style={{ width: "100%", height: 500, position: "absolute" }}>
              <Image style={styles.anh} source={{ uri: avt }} />
            </View>

            <View style={styles.mailchitiet}>
              <View style={styles.mainten}>
                <View style={styles.phuten}>
                  <Text style={styles.ten}>
                    {name}, {tuoi}
                  </Text>
                  <Text style={styles.gioitinh}>Full Stack Developer</Text>
                </View>
              </View>
              <View style={[styles.mainten, { top: 15 }]}>
                <View style={styles.phuten}>
                  <Text style={styles.diachi}>Địa chỉ</Text>
                  <Text style={styles.gioitinh}>{diachi}</Text>
                </View>
              </View>
              <View style={[styles.mainten, { top: 25 }]}>
                <View style={styles.phuten}>
                  <Text style={styles.diachi}>Tiểu sử</Text>
                  <Text style={styles.gioitinh}>
                    Tôi là Ngô Thành Thông tôi năm nay 21 tuổi đã có người yêu
                    rất xinh đẹp, tôi ao ước có 1 công việc ổn định để kiếm tiền
                    lo cho gia đình tôi.
                  </Text>
                </View>
              </View>
              <View style={[styles.mainten, { top: 35 }]}>
                <View style={styles.phuten}>
                  <Text style={styles.diachi}>Sở thích</Text>
                  <FlatList
                    style={{
                      left: 20,
                      top: 30,
                    }}
                    contentContainerStyle={{
                      flexDirection: "row",
                      flexWrap: "wrap-reverse",
                      marginRight: 10,
                      alignItems: "center",
                    }}
                    data={sothich2}
                    renderItem={({ item, index }) => (
                      <Pressable
                        style={[
                          styles.khungmau,
                          item == ""
                            ? { width: 0, height: 0, display: "none" }
                            : null,
                        ]}
                      >
                        <View
                          style={{
                            fontSize: 20,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            key={index}
                            style={{
                              fontSize: 16,
                              fontStyle: "normal",
                              fontWeight: "400",
                              alignItems: "center",
                              color: "white",
                            }}
                          >
                            {item}
                          </Text>
                        </View>
                      </Pressable>
                    )}
                  />
                </View>
              </View>
              <View style={[styles.mainten, { top: 45 }]}>
                <View style={styles.phuten}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.diachi}>Ảnh</Text>
                    <Text
                      style={{
                        left: 20,
                        top: 30,
                        fontSize: 15,
                        color: "red",
                      }}
                    >
                      Xem thêm
                    </Text>
                  </View>

                  <FlatList
                    style={{
                      left: 20,
                      top: 35,
                      width: "100%",
                      height: 320,
                    }}
                    contentContainerStyle={{
                      flexDirection: "row",
                      flexWrap: "wrap-reverse",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: 15,
                    }}
                    data={sothich2}
                    renderItem={() => (
                      <View
                        style={{
                          width: 160,

                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderRadius: 15,
                          marginBottom: 10,
                        }}
                      >
                        <Image
                          style={{
                            width: "100%",
                            height: 150,
                            borderRadius: 15,
                            alignItems: "center",
                          }}
                          source={{ uri: avt }}
                        />
                      </View>
                    )}
                  />
                </View>
              </View>
              <View style={[styles.mainten, { top: 55 }]}>
                <View style={styles.phuten}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.diachi}>Bạn bè</Text>
                    <Text
                      style={{
                        left: 20,
                        top: 30,
                        fontSize: 15,
                        color: "red",
                      }}
                    >
                      Xem thêm
                    </Text>
                  </View>

                  <FlatList
                    style={{
                      left: 20,
                      top: 35,
                      width: "100%",
                      height: 220,
                    }}
                    contentContainerStyle={{
                      flexDirection: "row",
                      flexWrap: "wrap-reverse",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: 15,
                    }}
                    data={sothich2}
                    renderItem={() => (
                      <View
                        style={{
                          width: 105,

                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderRadius: 15,
                          marginBottom: 10,
                        }}
                      >
                        <Image
                          style={{
                            width: "100%",
                            height: 105,
                            borderRadius: 15,
                            alignItems: "center",
                          }}
                          source={{ uri: avt }}
                        />
                        <Text
                          style={{
                            position: "absolute",
                            width: 100,
                            margin: 5,
                            fontSize: 12,
                            color: "white",
                            bottom: 3,
                          }}
                        >
                          {name}
                        </Text>
                      </View>
                    )}
                  />
                </View>
              </View>

              <View style={[styles.mainten, { top: 75 }]}>
                <View style={styles.phuten}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.diachi}>Bài viết</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        width: 90,
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          left: 20,
                          top: 30,
                          fontSize: 15,
                          width: 40,
                          height: 40,
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
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{ width: 30, height: 30 }}
                          source={require("../../image/vitri.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          left: 20,
                          top: 30,
                          fontSize: 15,
                          width: 40,
                          height: 40,
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
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{ width: 30, height: 30 }}
                          source={require("../../image/voice.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      left: 20,
                      top: 40,
                      height: 50,
                      backgroundColor: "white",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("PostStatus", noidung1)
                      }
                      style={{
                        width: "100%",
                        height: 50,
                        position: "absolute",
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
                        paddingLeft: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 18, opacity: 0.7 }}>
                        Bạn muốn đăng gì?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.mainnut2}>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.containerrr}
                >
                  <Image
                    style={styles.containerrrrr}
                    source={require("../../image/lui.png")}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={{ width: 100, height: 50 }}>
                  <Image
                    style={[styles.containerrrrr, { borderRadius: 12 }]}
                    source={require("../../image/dots.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerr: {
    position: "absolute",

    width: 40,
    height: 40,
    top: 50,
  },
  khungmau: {
    marginRight: 5,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    position: "relative",
    backgroundColor: "#E94057",
    height: 35,
    borderBottomColor: "#ABABAB",
    borderLeftColor: "#ABABAB",
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightColor: "#ABABAB",
    borderTopColor: "#ABABAB",
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 8,
  },
  containerrr: {
    position: "absolute",
    width: 50,
    height: 50,
  },
  containerrrrr: {
    width: 50,
    height: 50,
  },
  vitrii: {
    width: 80,
    right: 40,
    height: 42,
    top: 35,
    elevation: 10,
  },
  imagelui: {
    position: "absolute",
    width: 52,
    height: 52,
  },
  phuten: {
    width: "87%",
  },
  nhantin: {
    width: "15%",
    right: 30,
    height: 52,
    top: 35,
    elevation: 10,
  },
  mainten: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nut2: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },

  nut1: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
    elevation: 10,
  },
  mainnut: {
    left: "7%",
    width: "85%",
    height: 70,
    position: "absolute",
    top: 435,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mainnut2: {
    left: "4%",
    width: "100%",
    height: 70,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 30,
    opacity: 0.5,
  },
  mailchitiet: {
    width: "100%",
    height: 4000,
    position: "absolute",
    top: 470,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  ngaysinh: {
    fontSize: 20,
    left: 20,
    top: 30,
  },
  sothich: {
    fontSize: 20,
    left: 20,
    top: 30,
  },
  gioitinh: {
    fontSize: 16,
    left: 20,
    top: 30,
    opacity: 0.7,
  },
  diachi: {
    fontSize: 20,
    left: 20,
    top: 30,
  },
  diachi: {
    fontSize: 20,
    left: 20,
    top: 30,
    fontStyle: "normal",
  },
  ten: {
    fontSize: 25,
    left: 20,
    top: 30,
    fontStyle: "normal",
  },
  anh: {
    width: "100%",
    height: "100%",
  },
  mainanh: {
    width: "100%",
    height: "100%",
  },
  container: {
    width: "100%",
    height: 5000,
    backgroundColor: "white",
  },
});
