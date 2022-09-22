import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
const SayhelloView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.Image}>
        <Image
          style={styles.Image2}
          source={require("../../../image/avt.jpg")}
        />
        <Image
          style={styles.Image1}
          source={require("../../../image/avt.jpg")}
        />
        <Image
          style={styles.Image3}
          source={require("../../../image/like.png")}
        />
        <Image
          style={styles.Image4}
          source={require("../../../image/like.png")}
        />
      </View>
      <View style={styles.MOBILE}>
        <Text style={styles.MOBILEText}>Kết nối bạn và Bảo</Text>
        <Text style={styles.chitietsdt}>
          Bắt đầu cuộc trò chuyện với nhau ngay bây giờ
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: 150,
          bottom: 20,
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity style={styles.nut}>
          <Text style={styles.nutText}>Nhắn tin</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nut1}>
          <Text style={styles.nutText1}>Xem trang cá nhân</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default React.memo(SayhelloView);
