import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  TextInput,
  ToastAndroid,
  Modal,
  Alert,
} from "react-native";

const Timkiem = ({ navigation }) => {
  return (
    <View>
      <View style={styles.con}>
        <TextInput style={styles.w} placeholder="Tìm kiếm bạn bè"></TextInput>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.edit} source={require("../../image/back.png")} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          top: 60,
          paddingHorizontal: 20,
        }}
      >
        <View>
          <Text style={{ opacity: 0.5 }}>Tìm kiếm gần đây </Text>
        </View>
        <View>
          <Text style={styles.chu}>Xóa</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          top: 80,
          paddingHorizontal: 35,
        }}
      >
        <View>
          <Text>Trương Công Bảo </Text>
        </View>
        <View>
          <Image
            style={{ width: 15, height: 15 }}
            source={require("../../image/cancel.png")}
          />
        </View>
      </View>
    </View>
  );
};

export default Timkiem;

const styles = StyleSheet.create({
  chu: {
    color: "#E94057",
  },
  edit: {
    width: 20,
    height: 20,
    position: "absolute",
    left: 10,
    top: 15,
    opacity: 0.8,
  },
  w: {
    position: "absolute",
    width: "90%",
    height: 50,
    left: 40,
    opacity: 0.5,
    justifyContent: "center",
  },
  con: {
    top: 50,
    width: "100%",
    height: 50,

    backgroundColor: "white",

    elevation: 5,
  },
});
