import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

export const XemAnh = ({ route, navigation }) => {
  const { linkAnh } = route.params;
  return (
    <View
      style={{
        backgroundColor: "black",
        paddingBottom: 50,
        flex: 1,
      }}
    >
      <Image
        style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
        source={{ uri: linkAnh }}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: 40,
          height: 40,
          top: 20,
          left: 10,
          position: "absolute",
        }}
      >
        <Image
          style={{ width: 25, height: 25, tintColor: "white" }}
          source={require("../../image/back.png")}
        />
      </TouchableOpacity>
    </View>
  );
};
