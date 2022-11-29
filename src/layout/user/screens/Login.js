import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { UserContext } from "../UserContext";
import { initializeApp } from "firebase/app";
import Checkbox from "expo-checkbox";
import { firebaseConfig } from "../../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/messaging";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithCustomToken,
} from "firebase/auth";
export const Login = (props) => {
  const { navigation } = props;
  const { onLogin } = useContext(UserContext);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [sdt, setsdt] = useState();
  const [isCheckedStatus, setCheckedStatus] = useState(true);
  let app;
  useEffect(() => {
    app = initializeApp(firebaseConfig);
    if (!app.length) {
    }
  }, []);

  const auth = getAuth(app);
  const Click = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        console.log("Đăng nhập thành công");
        const user = getAuth().currentUser.uid;
        console.log("UID - " + user);

        if (isCheckedStatus == true) {
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("password", password);
        } else {
          await AsyncStorage.setItem("email", "");
          await AsyncStorage.setItem("password", "");
        }
        onLogin();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    // <KeyboardAvoidingView
    //   style={{ width: "100%", height: "100%", backgroundColor: "white" }}
    // >
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.mainplanta}>
          <Text style={styles.textplanta}>GenzLove</Text>
        </View>
        <View style={styles.mainchitiet}>
          <Text style={styles.chitiet}>Tìm kiếm 1 nửa của bạn</Text>
        </View>

        <View
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            marginTop: "10%",
            backgroundColor: "#ffffff",
            borderTopEndRadius: 30,
            borderTopLeftRadius: 30,
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                top: 28,
                left: 28,
                fontSize: 28,
                fontWeight: "700",
                fontStyle: "normal",
              }}
            >
              Chào mừng trở lại
            </Text>
            <Text
              style={{
                top: 28,
                left: 28,
                fontSize: 16,
                color: "#898A8D",
                fontWeight: "400",
              }}
            >
              Đăng nhập để tiếp tục
            </Text>
          </View>
          <View style={styles.khunghinh}>
            <View style={styles.khung}>
              <TextInput
                style={{ fontSize: 20 }}
                value={email}
                onChangeText={setemail}
                placeholder="Email hoặc Số điện thoại"
                multiline={true}
                maxLength={100}
              ></TextInput>
            </View>
            <View style={styles.khung1}>
              <TextInput
                style={{ fontSize: 20 }}
                value={password}
                onChangeText={setpassword}
                placeholder="Mật khẩu"
                multiline={true}
                maxLength={100}
                secureTextEntry={true}
                textContentType="password"
              ></TextInput>
            </View>

            <View
              style={{
                paddingTop: 15,
                width: "100%",
                height: 50,
                flexDirection: "row",
              }}
            >
              <View style={styles.checkbox}>
                <Checkbox
                  value={isCheckedStatus}
                  onValueChange={setCheckedStatus}
                  color={isCheckedStatus ? "#E94057" : undefined}
                />
                <Text style={{ left: 5 }}>Lưu mật khẩu</Text>
              </View>
            </View>

            <View style={styles.mailnut}>
              <Pressable style={styles.nut} onPress={Click}>
                <Text style={styles.nutText}>Đăng Nhập</Text>
              </Pressable>
              <View style={{ paddingTop: 10 }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#1F1F1F",
                    fontWeight: "400",
                  }}
                >
                  Bạn đã quên mật khẩu?
                </Text>
              </View>
              <View style={{ paddingTop: 5 }}>
                <Text
                  onPress={() => navigation.navigate("LoginPhone")}
                  style={{ color: "#FD397F", fontWeight: "400" }}
                >
                  Đăng nhập bằng số điện thoại
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.mailnut1}>
        <Pressable
          style={styles.nut1}
          onPress={() => navigation.navigate("Landing4")}
        >
          <Text style={styles.nutText1}>Đăng Ký</Text>
        </Pressable>
      </View>
    </ScrollView>
    //</KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    marginBottom: 8,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  mailnut: {
    position: "absolute",
    width: "100%",
    top: 145,
    height: 56,

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  nut: {
    width: "100%",
    height: 56,
    backgroundColor: "#E94057",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    borderRadius: 15,
  },
  nutText: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    fontStyle: "normal",
    color: "white",
  },

  mailnut1: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "90%",
    paddingHorizontal: 30,
  },
  nut1: {
    width: "100%",
    height: 50,

    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 15,
    borderBottomColor: "#ABABAB",
    borderLeftColor: "#ABABAB",
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightColor: "#ABABAB",
    borderTopColor: "#ABABAB",
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
  },
  nutText1: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    fontStyle: "normal",
    color: "#E94057",
  },

  khunghinh: {
    position: "absolute",
    justifyContent: "center",
    fontSize: 35,
    alignItems: "center",
    flexDirection: "column",
    width: "85%",
    marginLeft: 30,
    marginRight: 30,
    height: 50,

    top: 150,
  },
  khung: {
    margin: 20,

    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "100%",
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
  khung1: {
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "100%",
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
  khung12: {
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    width: "0%",
    height: "0%",
    borderBottomColor: "#ABABAB",
    borderLeftColor: "#ABABAB",
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightColor: "#ABABAB",
    borderTopColor: "#ABABAB",
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 8,
    opacity: 0,
  },
  mainplanta: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 100,
  },
  textplanta: {
    fontWeight: "700",
    fontSize: 50,
    textAlign: "center",
    color: "#ffffff",
  },

  mainchitiet: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 0,

    marginLeft: 52,
    marginRight: 52,
  },
  chitiet: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
    color: "#ffffff",
  },

  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#E94057",
  },
});
