import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
  TextInput,
} from "react-native";
const CamXucView = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          left: 20,
          top: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Image source={require("../../image/lui.png")} />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, left: 10, opacity: 0.7 }}>
          Hoạt động của bạn
        </Text>
      </View>
      <View style={{ width: "100%", top: 70, backgroundColor: "white" }}>
        <View style={styles.main}>
          <View style={styles.iconmain}>
            <View
              style={{
                width: "50%",
                height: 60,
                borderRightColor: "#ABABAB",
                borderRightWidth: 0.6,
              }}
            >
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang chúc mừng")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/dangchucmung.png")}
                />
                <Text style={styles.icontext}>Đang chúc mừng...</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "50%",
                height: 60,
                borderRightColor: "#ABABAB",
                borderRightWidth: 0.6,
              }}
            >
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang xem")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/dangxem.png")}
                />
                <Text style={styles.icontext}>Đang xem...</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.iconmain}>
            <View
              style={{
                width: "50%",
                height: 60,
                borderRightColor: "#ABABAB",
                borderRightWidth: 0.6,
              }}
            >
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang ăn")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/dangan.png")}
                />
                <Text style={styles.icontext}>Đang ăn...</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "50%",
                height: 60,
                borderRightColor: "#ABABAB",
                borderRightWidth: 0.6,
              }}
            >
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang uống")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/danguong.png")}
                />
                <Text style={styles.icontext}>Đang uống...</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.iconmain}>
            <View
              style={{
                width: "50%",
                height: 60,
                borderRightColor: "#ABABAB",
                borderRightWidth: 0.6,
              }}
            >
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang tham gia")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/dangthamgia.png")}
                />
                <Text style={styles.icontext}>Đang tham gia...</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "50%",
                height: 60,
                borderRightColor: "#ABABAB",
                borderRightWidth: 0.6,
              }}
            >
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang đi tới")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/dangdi.png")}
                />
                <Text style={styles.icontext}>Đang đi tới...</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.iconmain}>
            <View
              style={{
                width: "50%",
                height: 60,
                borderRightColor: "#ABABAB",
                borderRightWidth: 0.6,
              }}
            >
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang nghe")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/dangnghe.png")}
                />
                <Text style={styles.icontext}>Đang nghe...</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "50%",
                height: 60,
                borderRightColor: "#ABABAB",
                borderRightWidth: 0.6,
              }}
            >
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang tìm")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/dangtim.png")}
                />
                <Text style={styles.icontext}>Đang tìm...</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.iconmain}>
            <View
              style={{
                width: "50%",
                height: 60,
                borderRightColor: "#ABABAB",
                borderRightWidth: 0.6,
              }}
            >
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang suy nghĩ")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/dangsuynghi.png")}
                />
                <Text style={styles.icontext}>Đang suy nghĩ...</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "50%",
                height: 60,
                borderRightColor: "#ABABAB",
                borderRightWidth: 0.6,
              }}
            >
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang đọc")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/dangdoc.png")}
                />
                <Text style={styles.icontext}>Đang đọc...</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.iconmain}>
            <View
              style={{
                width: "50%",
                height: 60,
                borderRightColor: "#ABABAB",
                borderRightWidth: 0.6,
              }}
            >
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang chơi")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/dangchoi.png")}
                />
                <Text style={styles.icontext}>Đang chơi...</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "50%", height: 60 }}>
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang ủng hộ")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/dangungho.png")}
                />
                <Text style={styles.icontext}>Đang ủng hộ...</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.iconmain}>
            <View
              style={{
                width: "50%",
                height: 60,
                borderRightColor: "#ABABAB",
                borderRightWidth: 0.6,
              }}
            >
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang vui")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/dangvui.png")}
                />
                <Text style={styles.icontext}>Đang vui...</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "50%", height: 60 }}>
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang buồn")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/dangbuon.png")}
                />
                <Text style={styles.icontext}>Đang buồn...</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[
              styles.iconmain,
              { borderBottomColor: "#ABABAB", borderBottomWidth: 0.6 },
            ]}
          >
            <View
              style={{
                width: "50%",
                height: 60,
                borderRightColor: "#ABABAB",
                borderRightWidth: 0.6,
              }}
            >
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang mệt mỏi")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/dangmetmoi.png")}
                />
                <Text style={styles.icontext}>Đang mệt mỏi...</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "50%", height: 60 }}>
              <TouchableOpacity
                style={styles.btnicon}
                onPress={() => ThemHoatDong("Đang hạnh phúc")}
              >
                <Image
                  style={{ left: 10 }}
                  source={require("../../image/danghanhphuc.png")}
                />
                <Text style={styles.icontext}>Đang hạnh phúc...</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                top: 80,
                height: 45,
                width: "100%",
                left: 15,
                right: 15,
                position: "absolute",
                alignItems: "center",
              }}
            >
              <TextInput
                onChangeText={setnhapnd}
                value={nhapnd}
                style={{
                  fontSize: 19,
                  opacity: 0.7,
                  borderBottomColor: "#ABABAB",
                  borderBottomWidth: 0.5,
                  borderRightColor: "#ABABAB",
                  borderRightWidth: 0.5,
                  borderLeftColor: "#ABABAB",
                  borderLeftWidth: 0.5,
                  borderTopColor: "#ABABAB",
                  borderTopWidth: 0.5,
                  paddingLeft: 10,
                  height: 45,
                  width: "90%",
                  borderRadius: 5,
                  position: "absolute",
                }}
                placeholder="Nội dung hoạt động"
              ></TextInput>
              <TouchableOpacity
                onPress={ChuyenNoiDung}
                style={{ position: "absolute", right: 50 }}
              >
                <Image source={require("../../image/next_btn.png")} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default React.memo(CamXucView);
