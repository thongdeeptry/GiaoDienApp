import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set, push ,update} from "firebase/database";
export const Profile = (props) => {
  const { navigation } = props;
  const app = initializeApp(firebaseConfig);
  const dataImage = [];
  const datas = [];
  let noidung1 = "";
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [tuoi, settuoi] = useState();
  const [diachi, setdiachi] = useState();
  const [ngaysinh, setngaysinh] = useState();
  const [gioitinh, setgioitinh] = useState();
  const [sothich, setsothich] = useState();
  const [nghenghiep, setnghenghiep] = useState();
  const [isLoading, setisLoading] = useState(false);
  if (!app.length) {
    console.log("Kết nối thành công");
  }
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  const [daco, setdaco] = useState();
  const [dacod, setdacod] = useState();
  // function requestPermission() {
  //   console.log("Requesting permission...");
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       console.log("Notification permission granted.");
  //     }
  //   });
  // }
  // requestPermission;
  const sothich2 = [];
  useEffect(() => {
    // getToken(messaging, {
    //   vapidKey:
    //     "BJOk3-aJz3mJW1mTd3g-ZJ3XwQk0bYzjLnqta-QU4T19-SIRWbFx4u8y2Y0xMemfjhDetjxXznxXLSctNPmXlQ8",
    // })
    //   .then((currentToken) => {
    //     if (currentToken) {
    //       console.log(currentToken + "TOKEN====================?>");
    //     } else {
    //       // Show permission request UI
    //       console.log(
    //         "No registration token available. Request permission to generate one."
    //       );
    //       // ...
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("An error occurred while retrieving token. ", err);
    //     // ...
    //   });
    const reference1d1 = ref(db, "tuongtac/" + user);
    onValue(reference1d1, (snapshot1) => {
      snapshot1.forEach((childSnapshot) => {
          const value = childSnapshot.child(user).child("like").val();
          console.log("du lieu "+value)
            if (value == true) {
              setdacod(true);
              //throw "break-loop";
            } else if(value!=true){
              setdacod(false);
            }
          });
    });
    setisLoading(true);
    const reference = ref(db, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      const tuoipr = childSnapshot.child("tuoi").val();
      const diachipr = childSnapshot.child("diachi").val();
      const ngaysinhpr = childSnapshot.child("ngaysinh").val();
      const gioitinhpr = childSnapshot.child("gioitinh").val();
      const nghenghiep = childSnapshot.child("nghenghiep").val();
      setname(namepr);
      setavt(avtpr);
      setdiachi(diachipr);
      settuoi(tuoipr);
      setgioitinh(gioitinhpr);
      setngaysinh(ngaysinhpr);
      setnghenghiep(nghenghiep);
      setisLoading(false);
    });
  });
  const referencer = ref(db, "post/" + user);
  onValue(referencer, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const id = childSnapshot.child("id").exportVal();
      const name = childSnapshot.child("name").exportVal();
      const avt = childSnapshot.child("avt").exportVal();
      const noidung = childSnapshot.child("noidung").exportVal();
      const trangthai = childSnapshot.child("checkin").exportVal();
      const thoigian = childSnapshot.child("thoigian").exportVal();
      const image = childSnapshot.child("image").exportVal();
      datas.push({
        id: id,
        name: name,
        avt: avt,
        noidung: noidung,
        checkin: trangthai,
        thoigian: thoigian,
        image: image,
      });
    });
    console.log("User Posst: ", datas);
  });

  const reference1 = ref(db, "users/" + user + "/sothich");
  onValue(reference1, (childSnapshot1) => {
    childSnapshot1.forEach((snapshot1) => {
      const key = snapshot1.val();
      sothich2.push(key);
    });
  });
  const referenceImage = ref(db, "post/" + user);
  onValue(referenceImage, (snapshot) => {
    snapshot.forEach((ImageSnapshot) => {
      const id = ImageSnapshot.child("id").exportVal();
      const image = ImageSnapshot.child("image").exportVal();

      dataImage.push({
        id: id,
        image: image,
      });
    });

    console.log("User data: ", dataImage);
  });
  const AddLike = (idP) => {
    
    let like;
    let co;
    let dc = false;
    
    const reference11 = ref(db, "tuongtac/" + user+"/"+idP+ "/" + user);
    onValue(reference11, (snapshot1) => {
          const value = snapshot1.child("like").exportVal();
            if (value == true) {
              setdaco(true);
              //throw "break-loop";
            } else if(value!=true){
              setdaco(false);
            }
    });
    const reference1 = ref(db, "post/" +user+"/"+idP);
    onValue(reference1, (childSnapshot1) => {
      co = childSnapshot1.child("like").exportVal();
      like = co + 1;
    });
    if (daco != true) {
      const reference = ref(db, "post/" + user+"/"+idP);
      update(reference, {
        like: like,
      });
      console.log("so like :"+like)
      const reference13 = ref(db, "tuongtac/" +user +"/"+ idP + "/" + user);
    set(reference13, {
      like: true,
    });
    }
    
  }
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
                  <Text style={styles.gioitinh}>{nghenghiep}</Text>
                </View>
              </View>
              <View style={[styles.mainten, { top: 15 }]}>
                <View style={styles.phuten}>
                  <Text style={styles.diachi}>Địa chỉ</Text>
                  <Text style={styles.gioitinh}>{diachi}</Text>
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
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: 15,
                    }}
                    data={dataImage}
                    renderItem={({ item, index }) => (
                      <View
                      key={index}
                        style={{
                          width: 170,

                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderRadius: 15,
                          marginBottom: 10,
                        }}
                      >
                        {item.image != "" ? (
                          <Image
                            style={{
                              width: "100%",
                              height: 150,
                              borderRadius: 15,
                              alignItems: "center",
                            }}
                            source={{ uri: item.image }}
                          />
                        ) : null}
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
                          width: 105,

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
              <View
                style={{
                  width: "100%",
                  top: 133,
                  marginHorizontal: 20,
                }}
              >
                <Text style={{ fontSize: 19 }}>Bài viết và hoạt động</Text>
                <View style={{ width: "90%" }}>
                  <FlatList
                    contentContainerStyle={{
                      flexDirection: "column",
                    }}
                    data={datas}
                    renderItem={({ item, index }) => (
                      <Pressable
                        key={index}
                        style={[
                          {
                            borderBottomColor: "#ABABAB",
                            borderLeftColor: "#ABABAB",
                            borderLeftWidth: 0.5,
                            borderBottomWidth: 0.5,
                            borderRightColor: "#ABABAB",
                            borderTopColor: "#ABABAB",
                            borderRightWidth: 0.5,
                            borderTopWidth: 0.5,
                            borderRadius: 15,
                            marginTop: 20,
                          },
                          item == ""
                            ? { width: 0, height: 0, display: "none" }
                            : null,
                        ]}
                      >
                        <View style={styles.info}>
                          <Image
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                            source={{ uri: avt }}
                          />
                          <View style={styles.tenmain}>
                            <View
                              style={{
                                flexDirection: "row",
                                width: "100%",
                                paddingRight: 5,
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                  height: 35,
                                }}
                              >
                                <Text
                                  style={{ fontSize: 16, fontWeight: "500" }}
                                >
                                  {name}
                                </Text>
                                <Text style={{ fontSize: 14 }}>
                                  {item.thoigian}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <Text
                          style={{
                            fontSize: 18,
                            color: "black",
                            paddingHorizontal: 10,
                            marginTop: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingBottom: 10,
                            width: "100%",
                            alignSelf: "center",
                            //textAlign: "center",
                            fontWeight: "400",
                          }}
                        >
                          {item.noidung}
                        </Text>

                        {item.image != "" ? (
                          <Image
                            style={{
                              width: "90%",
                              height: 160,
                              alignItems: "center",
                              alignSelf: "center",
                              alignContent: "center",
                              justifyContent: "center",
                              borderRadius: 15,
                              marginBottom: 10,
                            }}
                            source={{ uri: item.image }}
                          />
                        ) : null}
                        <Text
                          style={[{
                            fontSize: 15,
                            color: "black",
                            paddingHorizontal: 10,
                            fontWeight: "300",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingBottom: 10,
                            width: "100%",
                            alignSelf: "center",
                            //textAlign: "center",
                          },item.checkin==""?{width:0,height:0}:null]}
                        >
                          {item.checkin}
                        </Text>
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            borderTopWidth: 0.2,
                            paddingVertical: 10,
                          }}
                        >
                        <TouchableOpacity style={{flexDirection:'row' }} onPress={()=>AddLike(item.id)}>
                          <Image style={styles.iclikeContainer} source={require('../../../assets/iclike.png')} />
                            <Text style={{ fontSize: 17,color:"black" }}>Thích</Text>
                          </TouchableOpacity>
                          <TouchableOpacity  style={{flexDirection:'row' }}>
                          <Image style={styles.cmtContainer} source={require('../../../assets/iccmt.png')} />

                            <Text style={{ fontSize: 17 }}>Bình luận</Text>

                          </TouchableOpacity>
                        </View>
                      </Pressable>
                    )}
                  />
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
                    style={[styles.containerrrrr, { borderRadius: 12 }]}
                    source={require("../../image/dots.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cmtContainer:{
    right:5,
     top:3
  },
  
  
  iclikeContainer: {
     right:5,
     top:3
  },
  tenmain: {
    width: "100%",
    height: 50,
    left: 10,
  },
  info: {
    width: "100%",
    height: 50,
    left: 10,
    top: 5,
    paddingRight: 20,
    flexDirection: "row",
  },
  containerr: {
    position: "absolute",

    width: 40,
    height: 40,
    top: 50,
  },
  khungmau: {
    marginRight: 5,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    position: "relative",
    backgroundColor: "#E94057",
    height: 35,
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
  containerrr: {
    position: "absolute",
    width: 50,
    height: 50,
  },
  containerrrrr: {
    width: 50,
    height: 50,
  },
  vitrii: {
    width: 80,
    right: 40,
    height: 42,
    top: 35,
    elevation: 10,
  },
  imagelui: {
    position: "absolute",
    width: 52,
    height: 52,
  },
  phuten: {
    width: "87%",
  },
  nhantin: {
    width: "15%",
    right: 30,
    height: 52,
    top: 35,
    elevation: 10,
  },
  mainten: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nut2: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },

  nut1: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
    elevation: 10,
  },
  mainnut: {
    left: "7%",
    width: "85%",
    height: 70,
    position: "absolute",
    top: 435,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mainnut2: {
    left: "4%",
    width: "100%",
    height: 70,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 30,
    opacity: 0.5,
  },
  mailchitiet: {
    width: "100%",

    position: "absolute",
    top: 470,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  ngaysinh: {
    fontSize: 20,
    left: 20,
    top: 30,
  },
  sothich: {
    fontSize: 20,
    left: 20,
    top: 30,
  },
  gioitinh: {
    fontSize: 16,
    left: 20,
    top: 30,
    opacity: 0.7,
  },
  diachi: {
    fontSize: 20,
    left: 20,
    top: 30,
  },
  diachi: {
    fontSize: 20,
    left: 20,
    top: 30,
    fontStyle: "normal",
  },
  ten: {
    fontSize: 25,
    left: 20,
    top: 30,
    fontStyle: "normal",
  },
  anh: {
    width: "100%",
    height: "100%",
  },
  mainanh: {
    width: "100%",
    height: "100%",
  },
  container: {
    width: "100%",
    height: 5000,
    backgroundColor: "white",
  },
});
