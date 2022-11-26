import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

export const XemAnh = ({ route, navigation }) => {
  const { linkAnh } = route.params;
  console.log(linkAnh);
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
          width: 35,
          height: 35,
          top: 50,
          left: 20,
          position: "absolute",
        }}
      >
        <Image
          style={{ width: 35, height: 35 }}
          source={require("../../image/lui.png")}
        />
      </TouchableOpacity>
    </View>
  );
};
