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
export const BanBe = ({ route, navigation }) => {
  const { idFr } = route.params;
  initializeApp(firebaseConfig);
  const db = getDatabase();
  const dataFriend = [];
  const referencebanbe = ref(db, "banbe/" + idFr);
  onValue(referencebanbe, (childSnapshot1) => {
    childSnapshot1.forEach((snapshot1) => {
      const id = snapshot1.child("id").val();
      const user = snapshot1.child("user").val();
      const name = snapshot1.child("name").val();
      const avt = snapshot1.child("avt").val();
      dataFriend.push({
        id: id,
        user: user,
        name: name,
        avt: avt,
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
          paddingBottom: 30,
        }}
      >
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", width: 50, height: 50 }}
          >
            <Image
              style={{ width: 35, height: 35 }}
              source={require("../../image/lui.png")}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontSize: 23,
              color: "#E94057",
              fontWeight: "600",
              letterSpacing: 1.2,
            }}
          >
            Bạn bè
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingBottom: 30,
          borderTopColor: "#ABABAB",
          borderTopWidth: 0.3,
        }}
      >
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataFriend}
            renderItem={({ item, index }) => (
              <View
                style={{
                  padding: 10,
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
                      navigation.navigate("ProfileFriend", { id: item.user })
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
                        Các bạn đã là
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          left: 3,
                          color: "#E94057",
                        }}
                      >
                        bạn bè
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
            )}
          />
        </View>
      </View>
    </View>
  );
};
