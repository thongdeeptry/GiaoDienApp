import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  RefreshControl,
} from "react-native";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../config";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  update,
} from "firebase/database";
import { UserContext } from "../user/UserContext";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export const AllUser = ({ route, navigation }) => {
  initializeApp(firebaseConfig);
  const { onLogout } = useContext(UserContext);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  const [id, setid] = useState();
  const dataFl = [];
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(async () => {
        alert("Đăng xuất thành công");
        await AsyncStorage.setItem("email", "");
        await AsyncStorage.setItem("password", "");
        onLogout();
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const referencer = ref(db, "users");
  onValue(referencer, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const id = childSnapshot.child("id").exportVal();
      const name = childSnapshot.child("name").exportVal();
      const avt = childSnapshot.child("avt").exportVal();
      const trangthai = childSnapshot.child("trangthai").exportVal();
      const follow = childSnapshot.child("follow").exportVal();
      dataFl.push({
        id: id,
        name: name,
        avt: avt,
        trangthai: trangthai,
        fl: follow,
      });
    });
  });
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingVertical: 10,
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
          <TouchableOpacity onPress={logOut}>
            <Image
              style={{ width: 35, height: 35, right: 5 }}
              source={require("../../assets/search.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Image
              style={{ width: 35, height: 35 }}
              source={require("../../image/chat.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingBottom: 30,
          borderTopColor: "#ABABAB",
          borderTopWidth: 0.3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              letterSpacing: 1,
              textAlign: "right",
              paddingVertical: 5,
              opacity: 0.8,
            }}
          >
            Đang hoạt động
          </Text>
          <Image
            style={{ top: 2, left: 3 }}
            source={require("../../image/activeIcon.png")}
          />
        </View>
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataFl}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item, index }) =>
              item.trangthai == "Hoạt Động" ? (
                <View
                  style={{
                    paddingTop: 10,
                    paddingStart: 10,
                    flexDirection: "row",
                    backgroundColor: "white",
                    elevation: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ProfileFriend", { id: item.id })
                      }
                    >
                      <Image
                        style={{
                          width: 60,
                          height: 60,
                          resizeMode: "cover",
                          borderRadius: 10,
                          marginRight: 10,
                          marginStart: 10,
                        }}
                        source={{ uri: item.avt }}
                      ></Image>
                      {item.trangthai == "Hoạt Động" ? (
                        <Image
                          style={{
                            left: 5,
                            bottom: 62,
                            width: 15,
                            height: 15,
                          }}
                          source={require("../../image/activeIcon.png")}
                        />
                      ) : (
                        <Image
                          style={{
                            left: 10,
                            bottom: 60,
                            width: 15,
                            height: 15,
                          }}
                          source={require("../../image/new-moon.png")}
                        />
                      )}
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "column",
                        top: 7,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                        }}
                      >
                        {item.name}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            fontSize: 15,
                            opacity: 0.8,
                          }}
                        >
                          Có
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            left: 3,
                            color: "#E94057",
                          }}
                        >
                          {item.fl}
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            opacity: 0.8,
                            left: 6,
                          }}
                        >
                          người yêu thích
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      top: 10,
                      right: 20,
                      elevation: 10,
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require("../../image/tim.png")}
                    />
                  </TouchableOpacity>
                </View>
              ) : null
            }
          />
        </View>
      </View>
    </View>
  );
};
