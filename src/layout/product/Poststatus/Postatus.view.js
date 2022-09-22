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
  Animated,
  Easing,
} from "react-native";
const PostStatusView = () => {
  return (
    <View style={styles.tong}>
      <View style={styles.e}>
        <View
          style={{
            width: "100%",
            height: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor: "#ABABAB",
            borderBottomWidth: 0.6,
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", left: 20 }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Image source={require("../../image/lui.png")} />
            </TouchableOpacity>
            <Text style={{ fontSize: 23, left: 10, opacity: 0.7 }}>
              Tạo bài viết
            </Text>
          </View>
          <View style={{ width: 75, height: 45, opacity: 0.4 }}>
            <TouchableOpacity
              onPress={AddPost}
              style={{
                width: "100%",
                height: "100%",
                right: 20,
                backgroundColor: "#DCDCDC",
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>ĐĂNG</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.infomain}>
        <View style={styles.info}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 35 }}
            source={{ uri: avt }}
          />
          <View style={styles.tenmain}>
            <View
              style={{ flexDirection: "row", width: "90%", paddingRight: 5 }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {name}{" "}
                {(noidung1 != "") & (noidung1 != null) &&
                noidung1 != "undefined"
                  ? "- " + noidung1
                  : null}
                <Text style={{ fontSize: 16 }}>
                  {tinh != "" && tinh != null ? " tại " : null}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {tinh != "" ? tinh : null}{" "}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.mainnhap}>
          <View
            style={{
              width: "90%",
              height: 100,
              borderBottomColor: "#ABABAB",
              borderBottomWidth: 0.5,
              borderRightColor: "#ABABAB",
              borderRightWidth: 0.5,
              borderLeftColor: "#ABABAB",
              borderLeftWidth: 0.5,
              borderTopColor: "#ABABAB",
              borderTopWidth: 0.5,
              left: "5%",
              borderRadius: 10,
            }}
          >
            <TextInput
              value={noidung}
              onChangeText={setnoidung}
              style={{ left: 20, width: "90%", top: 5 }}
              multiline={true}
              placeholder="Bạn đang nghĩ gì?"
            ></TextInput>
          </View>
          {image == null ? (
            <Image style={{ width: 0, height: 0 }} resizeMethod="auto" />
          ) : (
            image && (
              <Image
                style={styles.image}
                resizeMethod="auto"
                source={{ uri: image }}
              />
            )
          )}
          <View
            style={{
              width: "90%",
              height: 35,

              right: 0,
              left: "5%",
              top: 20,
            }}
          >
            <TouchableOpacity
              onPress={pickImage}
              style={{ flexDirection: "row", alignItems: "center", left: 5 }}
            >
              <Image
                style={{ width: 30, height: 30, right: 10 }}
                source={require("../../image/image.png")}
              />
              <Text style={{ fontSize: 16, width: 100 }}>Ảnh/video</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
              height: 35,

              right: 0,
              justifyContent: "center",
              left: "5%",
              top: 20,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", left: 5 }}
            >
              <Image
                style={{ width: 30, height: 30, right: 10 }}
                source={require("../../image/friend.png")}
              />
              <Text style={{ fontSize: 16, width: 200 }}>Gắn thẻ bạn bè</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
              height: 35,

              right: 0,
              justifyContent: "center",
              left: "5%",
              top: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Camxuc")}
              style={{ flexDirection: "row", alignItems: "center", left: 5 }}
            >
              <Image
                style={{ width: 30, height: 30, right: 10 }}
                source={require("../../image/camxúc.png")}
              />
              <Text style={{ fontSize: 16, width: 200 }}>
                Cảm xúc/hoạt động
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
              height: 35,

              right: 0,
              justifyContent: "center",
              left: "5%",
              top: 20,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", left: 5 }}
            >
              <Image
                style={{ width: 30, height: 30, right: 10 }}
                source={require("../../image/live.png")}
              />
              <Text style={{ fontSize: 16, width: 100 }}>Phát trực tiếp</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
              height: 35,

              right: 0,
              justifyContent: "center",
              left: "5%",
              top: 20,
            }}
          >
            <TouchableOpacity
              onPress={getLocation}
              style={{ flexDirection: "row", alignItems: "center", left: 5 }}
            >
              <Image
                style={{ width: 30, height: 30, right: 10 }}
                source={require("../../image/map.png")}
              />
              <Text style={{ fontSize: 16, width: 100 }}>Vị trí hiện tại</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={AddPost}
            style={{
              width: "90%",
              height: 50,
              top: 40,
              alignItems: "center",
              left: "5%",
              backgroundColor: "#E94057",
              justifyContent: "center",
              borderRadius: 15,
            }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>ĐĂNG</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default React.memo(PostStatusView);
