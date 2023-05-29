import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Images from "../../assets/Images";

const BottomHeader = ({ navigation, active }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.button, active == "Home" && styles.active]}
          onPress={() => alert("h")}
        >
          <Image
            source={
              active == "Home"
                ? Images.DiscoverTitleActive
                : Images.DiscoverLogo
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, active == "Chats" && styles.active]}
          onPress={() => navigation.navigate("Chats")}
        >
          <Image
            source={
              active == "Chats"
                ? Images.DiscoverTitleActive
                : Images.DiscoverTitle
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, active == "Profile" && styles.active]}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image source={Images.DiscoverUser} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default BottomHeader;
const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: "#00000029",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: "100%",
    flex: 1,
    paddingTop: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: Platform.OS == "ios" ? 0 : 12,
  },
  active: {
    borderTopWidth: 4,
    borderTopColor: "#EE4DA1",
  },
});
