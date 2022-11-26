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
export const AnhUser = ({ route, navigation }) => {
  const { idFr } = route.params;
  initializeApp(firebaseConfig);
  const db = getDatabase();
  const dataImage = [];
  const referenceImage = ref(db, "post/" + idFr);
  onValue(referenceImage, (snapshot) => {
    snapshot.forEach((ImageSnapshot) => {
      const id = ImageSnapshot.child("id").exportVal();
      const image = ImageSnapshot.child("image").exportVal();
      dataImage.push({
        id: id,
        image: image,
      });
    });
  });
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingBottom: 100 }}>
      <View
        style={{
          paddingHorizontal: 20,
          top: 40,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingBottom: 50,
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
              fontSize: 20,
              color: "#E94057",
              fontWeight: "600",
              letterSpacing: 1.2,
            }}
          >
            Album Ảnh
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
            style={{
              paddingHorizontal: 20,
              top: 5,
              width: "100%",
              paddingBottom: 100,
            }}
            contentContainerStyle={{
              justifyContent: "space-between",
              borderRadius: 15,
            }}
            data={dataImage}
            renderItem={({ item, index }) =>
              item.image != "" ? (
                <TouchableOpacity
                  style={{
                    width: 180,
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 15,
                    marginBottom: 5,
                    paddingLeft: 5,
                  }}
                  onPress={() =>
                    navigation.navigate("XemAnh", { linkAnh: item.image })
                  }
                >
                  {item.image != "" ? (
                    <Image
                      style={{
                        width: "100%",
                        height: 180,
                        borderRadius: 15,
                      }}
                      source={{ uri: item.image }}
                    />
                  ) : null}
                </TouchableOpacity>
              ) : null
            }
            numColumns={2}
          />
        </View>
      </View>
    </View>
  );
};
