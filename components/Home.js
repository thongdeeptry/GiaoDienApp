/** @format */

import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
  SafeAreaView,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config";
import { getAuth, signOut } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  update,
  query,
  limitToLast,
} from "firebase/database";
import { UserContext } from "../src/layout/user/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendMess } from "../src/constants/sendMess";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const Home = ({ route, navigation }) => {
  initializeApp(firebaseConfig);
  let noidung1 = "";
  const { onLogout } = useContext(UserContext);
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [tokendvCr, settokendvCr] = useState();
  const [id, setid] = useState();
  const [daco, setdaco] = useState();
  const [dacod, setdacod] = useState(false);
  const datapost = [];
  const dataStory = [];
  const dataLive = [];
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  useEffect(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    const reference = ref(db, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      setname(namepr);
      setavt(avtpr);
    });
    const getTokenDv = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log("Token Dv : " + token);
      const referencerrs = ref(db, "users/" + user);
      update(referencerrs, {
        token: token,
      });
    };
    getTokenDv();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
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
        const user = childSnapshotq.child("user").exportVal();

        datapost.push({
          id: id,
          name: name,
          avt: avt,
          noidung: noidung,
          checkin: trangthai,
          thoigian: thoigian,
          image: image,
          user: user,
        });
      });
    });
  });
  const referencerr = ref(db, "story");
  onValue(referencerr, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      childSnapshot.forEach((childSnapshotq) => {
        const id = childSnapshotq.child("id").exportVal();
        const name = childSnapshotq.child("name").exportVal();
        const avt = childSnapshotq.child("avt").exportVal();
        const noidung = childSnapshotq.child("noidung").exportVal();
        const trangthai = childSnapshotq.child("checkin").exportVal();
        const thoigian = childSnapshotq.child("thoigian").exportVal();
        const image = childSnapshotq.child("image").exportVal();
        dataStory.push({
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
  const referencerrs = ref(db, "livestream");
  onValue(referencerrs, (snapshot) => {
    snapshot.forEach((childSnapshotq) => {
      const id = childSnapshotq.child("id").exportVal();
      const name = childSnapshotq.child("name").exportVal();
      const avt = childSnapshotq.child("avt").exportVal();
      const token = childSnapshotq.child("token").exportVal();
      const channel = childSnapshotq.child("channel").exportVal();
      const thoigian = childSnapshotq.child("ngaytao").exportVal();
      const luotxem = childSnapshotq.child("luotxem").exportVal();
      dataLive.push({
        id: id,
        name: name,
        avt: avt,
        token: token,
        channel: channel,
        thoigian: thoigian,
        luotxem: luotxem,
      });
    });
  });
  const AddLike = (idP, id) => {
    let like;
    let co;
    let dc = false;
    const referencecr = ref(db, "users/" + id);
    onValue(referencecr, (childSnapshot) => {
      const tokendv = childSnapshot.child("token").val();
      settokendvCr(tokendv);
    });
    const reference11 = ref(db, "tuongtac/" + id + "/" + idP + "/" + id);
    onValue(reference11, (snapshot1) => {
      const value = snapshot1.child("like").exportVal();
      console.log(value);
      if (value == true) {
        setdacod(true);
        //throw "break-loop";
      } else {
        setdacod(false);
      }
    });
    const reference1 = ref(db, "post/" + id + "/" + idP);
    onValue(reference1, (childSnapshot1) => {
      co = childSnapshot1.child("like").exportVal();
      like = co + 1;
    });
    if (dacod == false) {
      const reference = ref(db, "post/" + id + "/" + idP);
      update(reference, {
        like: like,
      });
      const reference13 = ref(db, "tuongtac/" + id + "/" + idP + "/" + id);
      set(reference13, {
        like: true,
      });
      ToastAndroid.show("Đã gửi lượt thích bài viết", ToastAndroid.BOTTOM);
      sendMess(
        tokendvCr,
        "Thông báo mới từ " + name,
        name + " đã thích bài viết của bạn"
      );
    } else {
      ToastAndroid.show("Bạn đã thích bài viết này rồi", ToastAndroid.BOTTOM);
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <Pressable
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
                id: item.user,
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Binhluan", {
              idPost: item.id,
              userID: item.user,
            })
          }
        >
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
        </TouchableOpacity>
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
            onPress={() => AddLike(item.id, item.user)}
          >
            <Image
              style={styles.iclikeContainer}
              source={require("../assets/iclike.png")}
            />
            <Text style={{ fontSize: 17, color: "black" }}>Thích</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() =>
              navigation.navigate("Binhluan", {
                idPost: item.id,
                userID: item.user,
              })
            }
          >
            <Image
              style={styles.cmtContainer}
              source={require("../assets/iccmt.png")}
            />

            <Text style={{ fontSize: 17 }}>Bình luận</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={{ height: "100%", width: "100%", backgroundColor: "white" }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          top: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingBottom: 20,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 23,
              color: "#E94057",
              fontWeight: "600",
              letterSpacing: 1.2,
            }}
          >
            GenzLove
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Timkiem")}>
            <Image
              style={{ width: 35, height: 35, right: 5 }}
              source={require("../src/assets/search.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("CaiDat")}>
            <Image
              style={{ width: 35, height: 35 }}
              source={require("../src/image/setting.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{
          marginBottom: 52,
          borderTopColor: "#ABABAB",
          borderTopWidth: 0.3,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingBottom: 30 }}>
          <View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: 90,
                  justifyContent: "space-between",
                }}
              ></View>
            </View>
            <View
              style={{
                width: "90%",
                left: 20,
                top: 10,
                height: 50,
                backgroundColor: "white",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image
                  style={{ width: 45, height: 45, borderRadius: 10 }}
                  source={{ uri: avt }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("PostStatus", noidung1)}
                style={{
                  width: "85%",
                  height: 45,
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
                  paddingLeft: 15,
                  left: 10,
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 18, opacity: 0.7 }}>
                  Bạn muốn đăng gì?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <FlatList
              horizontal
              style={styles.addContainer}
              showsHorizontalScrollIndicator={false}
              data={dataStory}
              renderItem={({ item, index }) => (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Story", {
                        id: item.id,
                        image: item.image,
                        avt: item.avt,
                        name: item.name,
                        noidung: item.noidung,
                      })
                    }
                  >
                    <View>
                      <Image
                        style={styles.str1Container}
                        source={{ uri: item.image }}
                      />
                    </View>
                    <View>
                      <Image
                        style={styles.nameContainer}
                        source={{ uri: item.avt }}
                      />
                    </View>
                    <View>
                      <Text style={styles.textContainer}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
        {/* <View style={styles.addContainer}>
                </View> */}

        <View style={{}}>
          <Text style={{ fontSize: 19, paddingHorizontal: 20 }}>
            Bài viết và hoạt động
          </Text>
          <View>
            <FlatList
              horizontal
              style={[{}, dataLive.length > 0 ? styles.addContainerlive : null]}
              showsHorizontalScrollIndicator={false}
              data={dataLive}
              renderItem={({ item, index }) => (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("JoinLive", {
                        token: item.token,
                        channel: item.channel,
                        nameLive: item.name,
                        thoigian: item.thoigian,
                        avt: item.avt,
                        id: item.id,
                        luotxem: item.luotxem,
                      })
                    }
                  >
                    <View>
                      <Image
                        style={styles.str1Container1}
                        source={{ uri: item.avt }}
                      />
                    </View>
                    <View>
                      <Image
                        style={styles.nameContainer}
                        source={require("../src/image/live.png")}
                      />
                    </View>
                    <View>
                      <Text style={styles.textContainer}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View style={{ width: "100%", paddingHorizontal: 20 }}>
            <FlatList
              data={datapost}
              renderItem={renderItem}
              keyExtractor={(item) => Math.random()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
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
    paddingRight: 20,
    flexDirection: "row",
  },
  mes: {
    left: 340,
    top: -78,
  },
  mesContainer: {
    width: 21,
    height: 21,
    left: 310,
    top: -61,
  },
  cmt: {
    width: 50,
    height: 20,
    left: 200,
    fontSize: 15,
    top: -38,
  },
  cmtContainer: {
    right: 5,
    top: 3,
  },
  thich: {
    width: 50,
    height: 20,
    left: 60,
    fontSize: 15,
  },
  iclikeContainer: {
    right: 5,
    top: 3,
  },
  comment: {
    width: 60,
    height: 13,
    left: 310,
    top: -85,
  },
  nguoilike: {
    width: 187,
    height: 20,
    left: 51,
    top: -63,
  },
  likeContainer: {
    width: 17,
    height: 17,
    left: 20,
    top: -49,
  },
  bgrContainer: {
    width: "100%",
    height: 250,
  },
  baidangContainer: {
    width: 120,
    height: 17,
    left: 21,
    top: -20,
  },
  iconContainer: {
    width: 9,
    height: 9,
    left: 170,
    top: -45,
  },
  shareContainer: {
    width: 15,
    height: 1,
    left: 367,
    top: -35,
  },
  hourContainer: {
    width: 140,
    height: 20,
    left: 87,
    top: -35,
  },
  userName: {
    width: 193,
    height: 34,
    top: -30,
    left: 86,
    fontSize: 20,
  },
  tenContainer: {
    width: 50,
    height: 50,
    top: 20,
    left: 21,
    borderRadius: 10,
  },
  gachContainer: {
    width: "100%",
  },
  textContainer: {
    width: 100,
    height: 20,
    fontSize: 13,
    top: -50,
    color: "white",
    left: 5,
  },
  nameContainer: {
    width: 25,
    height: 25,
    left: 5,
    top: -125,
    borderRadius: 15,
  },
  str1Container: {
    width: 90,
    height: 130,
    borderRadius: 15,
  },
  str1Container1: {
    width: 90,
    height: 130,
    borderRadius: 15,
    borderColor: "#E94057",
    borderWidth: 2,
  },
  addContainer: {
    height: 135,
    top: 20,
    marginHorizontal: 20,
  },
  addContainerlive: {
    height: 135,
    top: 10,
    marginHorizontal: 20,
  },
  avtContainer: {
    width: 50,
    height: 50,
    top: 90,
    left: 20,
    borderRadius: 30,
  },
  avt: {},
});
