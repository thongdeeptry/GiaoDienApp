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
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export const AnhUser = ({ route, navigation }) => {
  const { idT } = route.params;
  initializeApp(firebaseConfig);
  const db = getDatabase();
  const dataImage = [];
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const referenceImage = ref(db, "post/" + idT);
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
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingBottom: 25,
        }}
      >
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", width: 50, height: 50, top: 10 }}
          >
            <Image
              style={{ width: 25, height: 25, tintColor: "black" }}
              source={require("../../image/back.png")}
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
              top: 10,
            }}
          >
            Album Ảnh
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingBottom: 10,
          borderTopColor: "#ABABAB",
          borderTopWidth: 0.3,
        }}
      >
        <Text style={{ textAlign: "center", top: 10 }}>
          {dataImage.length == 0 ? "Không có ảnh nào" : ""}
        </Text>
        <View>
          <FlatList
            style={{
              paddingHorizontal: 15,
              top: 5,
              width: "100%",
              paddingBottom: 100,
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
