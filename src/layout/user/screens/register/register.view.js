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
const RegisterView = () => {
  return (
    <KeyboardAvoidingView
      style={{ width: "100%", height: "100%", backgroundColor: "white" }}
    >
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
              height: "75%",
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
                Đăng ký để tiếp tục
              </Text>
            </View>
            <View style={styles.khunghinh}>
              <View style={styles.khung}>
                <TextInput
                  style={{ fontSize: 20 }}
                  placeholder="Email"
                  value={email}
                  onChangeText={setemail}
                  multiline={true}
                  maxLength={100}
                ></TextInput>
              </View>
              <View style={styles.khung1}>
                <TextInput
                  style={{ fontSize: 20 }}
                  placeholder="Mật khẩu"
                  value={password}
                  onChangeText={setpassword}
                  multiline={true}
                  maxLength={100}
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
                <Image
                  style={{ opacity: 0.7 }}
                  source={require("../../../image/checkbox.png")}
                />
                <Text
                  style={{
                    paddingLeft: 10,
                    fontSize: 17,
                    alignItems: "center",
                    color: "#595959",
                  }}
                >
                  Lưu mật khẩu
                </Text>
              </View>

              <View style={styles.mailnut}>
                <Pressable
                  style={styles.nut}
                  onPress={() => createUser(email, password)}
                >
                  <Text style={styles.nutText}>Đăng Ký</Text>
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
                  <Text style={{ color: "#FD397F", fontWeight: "400" }}>
                    Lấy ngay
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.mailnut1}>
          <Pressable
            style={styles.nut1}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.nutText1}>Đăng Nhập</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default React.memo(RegisterView);
