import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  ToastAndroid,
} from "react-native";
const RegisterphoneView = () => {
  return (
    <View style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View style={styles.MOBILE}>
        <Text style={styles.MOBILEText}>Số Điện Thoại</Text>
        <Text style={styles.chitietsdt}>
          Vui lòng nhập số điện thoại hợp lệ của bạn. Chúng tôi sẽ gửi cho bạn
          một mã gồm 4 chữ số để xác minh tài khoản của bạn.
        </Text>
      </View>

      <View style={styles.khunghinh}>
        <TextInput
          style={styles.khung}
          placeholder="334233235"
          maxLength={10}
          value={sdt}
          onChangeText={setsdt}
        ></TextInput>
        <Image
          style={{ position: "relative", right: 110 }}
          source={require("../../../image/vietnam.png")}
        />
        <Text style={{ position: "relative", right: 105 }}>(+84)</Text>
      </View>
      <View style={styles.mailnut}>
        <Pressable style={styles.nut} onPress={() => SendOTP("+84" + sdt)}>
          <Text style={styles.nutText}>Tiếp tục</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default React.memo(RegisterphoneView);
