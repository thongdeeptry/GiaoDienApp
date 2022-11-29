import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { firebaseConfig } from "../../../../config";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
export const Selectsex = ({ route, navigation }) => {
  const { sdt } = route.params;
  const { name } = route.params;
  const { email } = route.params;
  const { password } = route.params;
  const { ngaysinh } = route.params;
  const { avt } = route.params;
  const { tuoi } = route.params;
  const { user } = route.params;
  const { location } = route.params;
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [image, setImage] = useState(null);
  const [number, setnumber] = useState(0);
  const [number1, setnumber1] = useState(0);
  const [number2, setnumber2] = useState(0);
  const [gioitinh, setgioitinh] = useState("");

  const app = initializeApp(firebaseConfig);

  if (!app.length) {
  }
  function AddData() {
    if (gioitinh == "") {
      ToastAndroid.show("Chưa Đầy Đủ Thông Tin", ToastAndroid.CENTER);
    } else {
      if (sdt != null) {
        navigation.navigate("Possions", {
          sdt,
          name,
          ngaysinh,
          avt,
          gioitinh,
          user,
          tuoi,
          location,
        });
      }
      if (email != "") {
        navigation.navigate("Possions", {
          email,
          password,
          name,
          ngaysinh,
          avt,
          gioitinh,
          user,
          tuoi,
          location,
        });
      }
    }
  }
  const SetNum = () => {
    setnumber(1);
    setnumber1(0);
    setnumber2(0);
    setgioitinh("Nam");
  };
  const SetNum1 = () => {
    setnumber1(1);
    setnumber(0);
    setnumber2(0);
    setgioitinh("Nữ");
  };
  const SetNum2 = () => {
    setnumber2(1);
    setnumber1(0);
    setnumber(0);
    setgioitinh("Khác");
  };
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={styles.MOBILE}>
        <Text style={styles.MOBILEText}>Bỏ qua</Text>
      </View>
      <View style={styles.themif}>
        <Text style={styles.themiftext}>Tôi là</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <View style={styles.khunghinh}>
          <View style={styles.khung}>
            <TouchableOpacity
              onPress={SetNum1}
              style={[
                {
                  fontSize: 20,
                  width: "100%",
                  height: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 8,
                },
                number1 > 0
                  ? {
                      fontSize: 20,
                      width: "100%",
                      height: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#E94057",
                      borderRadius: 8,
                    }
                  : null,
              ]}
              placeholder=""
              multiline={true}
              maxLength={100}
            >
              <Text
                style={[
                  { fontSize: 20, alignItems: "center", paddingLeft: 20 },
                  number1 > 0
                    ? {
                        fontSize: 20,
                        alignItems: "center",
                        paddingLeft: 20,
                        color: "#ffffff",
                      }
                    : null,
                ]}
              >
                Nữ
              </Text>
              <Image
                style={{ position: "relative", paddingRight: 20, right: 20 }}
                source={require("../../../image/tit.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.khung4}>
            <TouchableOpacity
              onPress={SetNum}
              style={[
                {
                  fontSize: 20,
                  width: "100%",
                  height: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 8,
                },
                number > 0
                  ? {
                      fontSize: 20,
                      width: "100%",
                      height: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#E94057",
                      borderRadius: 8,
                    }
                  : null,
              ]}
              placeholder="Tên"
              multiline={true}
              maxLength={100}
            >
              <Text
                style={[
                  { fontSize: 20, alignItems: "center", paddingLeft: 20 },
                  number > 0
                    ? {
                        fontSize: 20,
                        alignItems: "center",
                        paddingLeft: 20,
                        color: "#ffffff",
                      }
                    : null,
                ]}
              >
                Nam
              </Text>
              <Image
                style={{ position: "relative", paddingRight: 20, right: 20 }}
                source={require("../../../image/tit.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.mailnut1}>
            <TouchableOpacity
              style={[
                {
                  fontSize: 20,
                  width: "100%",
                  height: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 8,
                },
                number2 > 0
                  ? {
                      fontSize: 20,
                      width: "100%",
                      height: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#E94057",
                      borderRadius: 8,
                    }
                  : null,
              ]}
              onPress={SetNum2}
            >
              <Text
                style={[
                  { fontSize: 20, alignItems: "center", paddingLeft: 20 },
                  number2 > 0
                    ? {
                        fontSize: 20,
                        alignItems: "center",
                        paddingLeft: 20,
                        color: "#ffffff",
                      }
                    : null,
                ]}
              >
                Khác
              </Text>
              <Image
                style={{ position: "relative", paddingRight: 20, right: 20 }}
                source={require("../../../image/tit.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.mailnut}>
        <TouchableOpacity style={styles.nut} onPress={AddData}>
          <Text style={styles.nutText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lui}>
        <TouchableOpacity onPress={() => navigation.navigate("Possions")}>
          <Image
            style={{ position: "relative", paddingRight: 10, right: 10 }}
            source={require("../../../image/lui.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lui: {
    position: "absolute",
    width: 52,
    height: 52,
    left: 40,
    top: 44,
  },
  mailnut1: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    height: 50,
  },
  nut1: {
    position: "relative",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  nutText1: {
    left: 40,
    fontSize: 19,
    fontWeight: "900",
    fontStyle: "normal",
    color: "#E94057",
  },
  imageContainer: {
    position: "absolute",
    width: "100%",
    height: 150,

    flexDirection: "row",
    justifyContent: "center",
    top: 250,
  },
  image: {
    left: 20,
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  themif: {
    position: "absolute",
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 51,
    top: 150,
  },
  themiftext: {
    fontSize: 30,
    textAlign: "left",
    fontStyle: "normal",
    fontWeight: "700",
  },
  mailnut: {
    position: "absolute",
    width: "100%",
    bottom: 150,
    height: 56,

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  nut: {
    width: "80%",
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
    fontSize: 19,
    fontWeight: "700",
    fontStyle: "normal",
    color: "white",
  },

  khunghinh: {
    position: "absolute",
    justifyContent: "center",
    fontSize: 35,
    alignItems: "center",
    flexDirection: "column",
    width: "80%",
    height: 58,

    top: 350,
  },
  khung: {
    margin: 20,
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
  khung4: {
    marginBottom: 20,

    position: "relative",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
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

  MOBILEText: {
    fontSize: 16,
    color: "#E94057",
    fontWeight: "700",
  },
  MOBILE: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "90%",
    height: 24,
    top: 56,
  },
});
