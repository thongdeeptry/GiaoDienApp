import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  Alert,
  ToastAndroid,
} from "react-native";
const ProfileFriendView = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      style={{ width: "100%", height: 2000 }}
    >
      <View style={styles.container}>
        {isLoading == true ? (
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              marginTop: 400,
              fontSize: 30,
              color: "blue",
            }}
          >
            Loading...
          </Text>
        ) : (
          <View style={styles.mainanh}>
            <View style={{ width: "100%", height: 500, position: "absolute" }}>
              <Image style={styles.anh} source={{ uri: avt }} />
            </View>

            <View style={styles.mailchitiet}>
              <View style={styles.mainten}>
                <View style={styles.phuten}>
                  <Text style={styles.ten}>
                    {name}, {tuoi}
                  </Text>
                  <Text style={styles.gioitinh}>Full Stack Developer</Text>
                </View>

                <View style={styles.nhantin}>
                  <TouchableOpacity
                    style={{
                      width: "80%",
                      height: "90%",
                      borderBottomColor: "#ABABAB",
                      borderLeftColor: "#ABABAB",
                      borderLeftWidth: 0.5,
                      borderBottomWidth: 0.5,
                      borderRightColor: "#ABABAB",
                      borderTopColor: "#ABABAB",
                      borderRightWidth: 0.5,
                      borderTopWidth: 0.5,
                      borderRadius: 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: "60%",
                        height: "60%",
                        resizeMode: "cover",
                      }}
                      source={require("../../image/send.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.mainten, { top: 15 }]}>
                <View style={styles.phuten}>
                  <Text style={styles.diachi}>Địa chỉ</Text>
                  <Text style={styles.gioitinh}>{diachi}</Text>
                </View>

                <View style={styles.vitrii}>
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      height: "90%",
                      right: 20,
                      borderBottomColor: "#ABABAB",
                      borderLeftColor: "#ABABAB",
                      borderLeftWidth: 0.5,
                      borderBottomWidth: 0.5,
                      borderRightColor: "#ABABAB",
                      borderTopColor: "#ABABAB",
                      borderRightWidth: 0.5,
                      borderTopWidth: 0.5,
                      borderRadius: 8,
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: "30%",
                        height: "60%",
                        resizeMode: "cover",
                        left: 0,
                      }}
                      source={require("../../image/vitri.png")}
                    />
                    <Text style={{ fontSize: 13, opacity: 0.7 }}>1000Km</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.mainten, { top: 25 }]}>
                <View style={styles.phuten}>
                  <Text style={styles.diachi}>Tiểu sử</Text>
                  <Text style={styles.gioitinh}>
                    Tôi là Ngô Thành Thông tôi năm nay 21 tuổi đã có người yêu
                    rất xinh đẹp, tôi ao ước có 1 công việc ổn định để kiếm tiền
                    lo cho gia đình tôi.
                  </Text>
                </View>
              </View>
              <View style={[styles.mainten, { top: 35 }]}>
                <View style={styles.phuten}>
                  <Text style={styles.diachi}>Sở thích</Text>
                  <FlatList
                    style={{
                      left: 20,
                      top: 30,
                    }}
                    contentContainerStyle={{
                      flexDirection: "row",
                      flexWrap: "wrap-reverse",
                      marginRight: 10,
                      alignItems: "center",
                    }}
                    data={sothich2}
                    renderItem={({ item, index }) => (
                      <Pressable
                        style={[
                          styles.khungmau,
                          item == ""
                            ? { width: 0, height: 0, display: "none" }
                            : null,
                        ]}
                      >
                        <View
                          style={{
                            fontSize: 20,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            key={index}
                            style={{
                              fontSize: 16,
                              fontStyle: "normal",
                              fontWeight: "400",
                              alignItems: "center",
                              color: "white",
                            }}
                          >
                            {item}
                          </Text>
                        </View>
                      </Pressable>
                    )}
                  />
                </View>
              </View>
              <View style={[styles.mainten, { top: 45 }]}>
                <View style={styles.phuten}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.diachi}>Ảnh</Text>
                    <Text
                      style={{
                        left: 20,
                        top: 30,
                        fontSize: 15,
                        color: "red",
                      }}
                    >
                      Xem thêm
                    </Text>
                  </View>

                  <FlatList
                    style={{
                      left: 20,
                      top: 35,
                      width: "100%",
                      height: 320,
                    }}
                    contentContainerStyle={{
                      flexDirection: "row",
                      flexWrap: "wrap-reverse",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: 15,
                    }}
                    data={sothich2}
                    renderItem={() => (
                      <View
                        style={{
                          width: 170,

                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderRadius: 15,
                          marginBottom: 10,
                        }}
                      >
                        <Image
                          style={{
                            width: "100%",
                            height: 150,
                            borderRadius: 15,
                            alignItems: "center",
                          }}
                          source={{ uri: avt }}
                        />
                      </View>
                    )}
                  />
                </View>
              </View>
              <View style={[styles.mainten, { top: 55 }]}>
                <View style={styles.phuten}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.diachi}>Bạn bè</Text>
                    <Text
                      style={{
                        left: 20,
                        top: 30,
                        fontSize: 15,
                        color: "red",
                      }}
                    >
                      Xem thêm
                    </Text>
                  </View>

                  <FlatList
                    style={{
                      left: 20,
                      top: 35,
                      width: "100%",
                      height: 220,
                    }}
                    contentContainerStyle={{
                      flexDirection: "row",
                      flexWrap: "wrap-reverse",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: 15,
                    }}
                    data={sothich2}
                    renderItem={() => (
                      <View
                        style={{
                          width: 110,

                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderRadius: 15,
                          marginBottom: 10,
                        }}
                      >
                        <Image
                          style={{
                            width: "100%",
                            height: 105,
                            borderRadius: 15,
                            alignItems: "center",
                          }}
                          source={{ uri: avt }}
                        />
                        <Text
                          style={{
                            position: "absolute",
                            width: 100,
                            margin: 5,
                            fontSize: 12,
                            color: "white",
                            bottom: 3,
                          }}
                        >
                          {name}
                        </Text>
                      </View>
                    )}
                  />
                </View>
              </View>

              <View style={[styles.mainten, { top: 75 }]}>
                <View style={styles.phuten}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.diachi}>Bài viết</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        width: 90,
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          left: 20,
                          top: 30,
                          fontSize: 15,
                          width: 40,
                          height: 40,
                          backgroundColor: "white",
                          borderBottomColor: "#ABABAB",
                          borderLeftColor: "#ABABAB",
                          borderLeftWidth: 1,
                          borderBottomWidth: 1,
                          borderRightColor: "#ABABAB",
                          borderTopColor: "#ABABAB",
                          borderRightWidth: 1,
                          borderTopWidth: 1,
                          borderRadius: 8,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{ width: 30, height: 30 }}
                          source={require("../../image/vitri.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          left: 20,
                          top: 30,
                          fontSize: 15,
                          width: 40,
                          height: 40,
                          backgroundColor: "white",
                          borderBottomColor: "#ABABAB",
                          borderLeftColor: "#ABABAB",
                          borderLeftWidth: 1,
                          borderBottomWidth: 1,
                          borderRightColor: "#ABABAB",
                          borderTopColor: "#ABABAB",
                          borderRightWidth: 1,
                          borderTopWidth: 1,
                          borderRadius: 8,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{ width: 30, height: 30 }}
                          source={require("../../image/voice.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      left: 20,
                      top: 40,
                      height: 50,
                      backgroundColor: "white",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("PostStatus", noidung1)
                      }
                      style={{
                        width: "100%",
                        height: 50,
                        position: "absolute",
                        backgroundColor: "white",
                        borderBottomColor: "#ABABAB",
                        borderLeftColor: "#ABABAB",
                        borderLeftWidth: 1,
                        borderBottomWidth: 1,
                        borderRightColor: "#ABABAB",
                        borderTopColor: "#ABABAB",
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        borderRadius: 8,
                        paddingLeft: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 18, opacity: 0.7 }}>
                        Bạn muốn đăng gì?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.mainnut2}>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.containerrr}
                >
                  <Image
                    style={styles.containerrrrr}
                    source={require("../../image/lui.png")}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={{ width: 100, height: 50 }}>
                  <Image
                    style={styles.containerrrrr}
                    source={require("../../image/dots.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.mainnut}>
              <TouchableOpacity style={styles.nut1}>
                <Image
                  style={{ width: "60%", height: "60%", left: 10, top: 6 }}
                  source={require("../../image/close-cro.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.nut2} onPress={Love}>
                <Image
                  style={[
                    { width: "100%", height: "100%", top: 5 },
                    check != "true"
                      ? { width: "100%", height: "100%", top: 5, opacity: 0.5 }
                      : null,
                  ]}
                  source={require("../../image/tim.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.nut1}>
                <Image
                  style={{ width: "60%", height: "60%", left: 10, top: 6 }}
                  source={require("../../image/star.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
export default React.memo(ProfileFriendView);
