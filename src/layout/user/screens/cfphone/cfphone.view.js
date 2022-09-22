import { View, Text, Pressable, TextInput } from "react-native";
const CfPhoneView = ({
  seconds,
  Code1,
  Code2,
  Code3,
  ConfimCode,
  verificationCode,
  ...props
}) => {
  return (
    <View>
      <View style={styles.MOBILE}>
        <Text style={styles.MOBILEText}>
          {" "}
          00:{seconds < 10 ? "0" + seconds : seconds}
        </Text>
        <Text style={styles.chitietsdt}>
          Nhập mã xác minh chúng tôi đã gửi cho bạn.
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={styles.khunghinh}>
          <View style={styles.khung}>
            <TextInput
              style={{ fontSize: 35 }}
              multiline={true}
              maxLength={1}
              value={Code1}
              onChangeText={setCode1}
            ></TextInput>
          </View>
          <View style={styles.khung2}>
            <TextInput
              style={{ fontSize: 35 }}
              multiline={true}
              maxLength={1}
              value={Code2}
              onChangeText={setCode2}
            ></TextInput>
          </View>
          <View style={styles.khung3}>
            <TextInput
              style={{ fontSize: 35 }}
              multiline={true}
              maxLength={1}
              value={Code3}
              onChangeText={setCode3}
            ></TextInput>
          </View>
          <View style={styles.khung4}>
            <TextInput
              style={{ fontSize: 35 }}
              multiline={true}
              maxLength={1}
              value={Code4}
              onChangeText={setCode4}
            ></TextInput>
          </View>
          <View style={styles.khung3}>
            <TextInput
              style={{ fontSize: 35 }}
              multiline={true}
              maxLength={1}
              value={Code5}
              onChangeText={setCode5}
            ></TextInput>
          </View>
          <View style={styles.khung4}>
            <TextInput
              style={{ fontSize: 35 }}
              multiline={true}
              maxLength={1}
              value={Code6}
              onChangeText={setCode6}
            ></TextInput>
          </View>
        </View>
        <Text
          style={{
            color: "#E94057",
            fontSize: 16,
            flexDirection: "row",
            justifyContent: "center",
            textAlign: "center",
            fontWeight: "500",
            top: 750,
            fontStyle: "normal",
          }}
        >
          Gửi lại mã
        </Text>
      </View>
      <View style={styles.mailnut}>
        <Pressable style={styles.nut} onPress={ConfimCode}>
          <Text style={styles.nutText}>Tiếp tục</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default React.memo(CfPhoneView);
