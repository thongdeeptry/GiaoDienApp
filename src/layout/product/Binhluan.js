/** @format */

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
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../config";
import { getAuth, signOut } from "firebase/auth";
import { v4 as uuid } from "uuid";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  update,
  remove,
} from "firebase/database";
import { UserContext } from "../user/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Binhluan = ({ navigation, route }) => {
  const { idPost } = route.params;
  const { userID } = route.params;
  initializeApp(firebaseConfig);
  const [binhluan, setbinhluan] = useState();
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [id, setid] = useState();
  const [nameP, setnameP] = useState();
  const [avtP, setavtP] = useState();
  const [noidung, setnoidung] = useState();
  const [trangthai, settrangthai] = useState();
  const [thoigian, setthoigian] = useState();
  const [image, setimage] = useState();
  const [checkin, setcheckin] = useState();
  const [isCheckedStatus, setCheckedStatus] = useState(false);
  const [idCmtCr, setIdCmtCr] = useState();
  const dataCmt = [];
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  useEffect(() => {
    const reference = ref(db, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      setname(namepr);
      setavt(avtpr);
    });

    const referencer = ref(db, "post/" + userID + "/" + idPost);
    onValue(referencer, (snapshot) => {
      const id = snapshot.child("id").exportVal();
      const name = snapshot.child("name").exportVal();
      const avt = snapshot.child("avt").exportVal();
      const noidung = snapshot.child("noidung").exportVal();
      const trangthai = snapshot.child("checkin").exportVal();
      const thoigian = snapshot.child("thoigian").exportVal();
      const image = snapshot.child("image").exportVal();
      setid(id);
      setnameP(name);
      setavtP(avt);
      setnoidung(noidung);
      settrangthai(trangthai);
      setthoigian(thoigian);
      setimage(image);
      setcheckin(snapshot.child("checkin").val());
    });
  });
  const referencer = ref(db, "binhluan/" + userID + "/" + idPost);
  onValue(referencer, (snapshot) => {
    snapshot.forEach((childSnapshotq) => {
      const namek = childSnapshotq.child("name").exportVal();
      const avtk = childSnapshotq.child("avt").exportVal();
      const noidungk = childSnapshotq.child("noidung").exportVal();
      const idPostk = childSnapshotq.child("idPost").exportVal();
      const thoigian = childSnapshotq.child("thoigian").exportVal();
      const userIDk = childSnapshotq.child("userID").exportVal();
      const idCmt = childSnapshotq.child("idCmt").exportVal();
      dataCmt.push({
        name: namek,
        avt: avtk,
        noidung: noidungk,
        idPost: idPostk,
        thoigian: thoigian,
        userID: userIDk,
        idCmt: idCmt,
      });
    });
  });
  const openModal = (idCmt) => {
    setCheckedStatus(true);
    setIdCmtCr(idCmt);
  };
  const closeModal = () => {
    setCheckedStatus(false);
  };
  const AddComment = () => {
    const key = uuid();
    const d = new Date();
    const ngay = d.getDate();
    const thang = d.getMonth() + 1;
    const nam = d.getFullYear();
    const referencer = ref(db, "binhluan/" + userID + "/" + idPost + "/" + key);
    set(referencer, {
      idPost: idPost,
      idCmt: key,
      id: userID,
      userID: user,
      noidung: binhluan,
      thoigian: ngay + " Tháng " + thang + " Năm " + nam,
      name: name,
      avt: avt,
    });
    ToastAndroid.show("Đã đăng bình luận", ToastAndroid.BOTTOM);
    setbinhluan("");
    Keyboard.dismiss();
  };
  const RemoveComment = () => {
    const referencer = ref(
      db,
      "binhluan/" + userID + "/" + idPost + "/" + idCmtCr
    );
    remove(referencer).then = () => {
      ToastAndroid.show("Xoá bình luận thành công", ToastAndroid.BOTTOM);
      setCheckedStatus(false);
    };
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        paddingHorizontal: 10,
      }}
    >
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isCheckedStatus}
          onRequestClose={() => {
            setCheckedStatus(!isCheckedStatus);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{ width: "115%", position: "absolute" }}
                onPress={closeModal}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("./../../image/remove.png")}
                />
              </TouchableOpacity>
              <Text style={styles.modalText}>
                Bạn có thể chỉnh sửa và xoá bình luận?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "90%",
                }}
              >
                <TouchableOpacity
                  style={[styles.button1, styles.buttonClose]}
                  onPress={closeModal}
                >
                  <Text style={styles.textStyle}>Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={RemoveComment}
                >
                  <Text style={styles.textStyle}>Xoá</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
      </View>
      <View>
        <Text style={styles.chu}>Bài viết </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.edit} source={require("../../image/back.png")} />
        </TouchableOpacity>
      </View>

      <View>
        <Pressable
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
              marginTop: 40,
              width: "98%",
            },
            id == "" ? { width: 0, height: 0, display: "none" } : null,
          ]}
        >
          <View style={styles.info}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProfileFriend", {
                  id: id,
                })
              }
            >
              <Image
                style={{ width: 40, height: 40, borderRadius: 20 }}
                source={{ uri: avtP }}
              />
            </TouchableOpacity>
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
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    {nameP}
                  </Text>
                  <Text style={{ fontSize: 14 }}>{thoigian}</Text>
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
            {noidung}
          </Text>
          {image != "" ? (
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
              source={{ uri: image }}
            />
          ) : null}
          <Text
            style={[
              {
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
              },
              checkin == "" ? { width: 0, height: 0 } : null,
            ]}
          >
            {checkin}
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
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => AddLike(id)}
            >
              <Image
                style={styles.iclikeContainer}
                source={require("../../../assets/iclike.png")}
              />
              <Text style={{ fontSize: 17, color: "black" }}>Thích</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row" }}>
              <Image
                style={styles.cmtContainer}
                source={require("../../../assets/iccmt.png")}
              />

              <Text style={{ fontSize: 17 }}>Bình luận</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </View>
      <View style={{ top: 10, left: 10, right: 10 }}>
        <Text style={{ opacity: 0.7, fontSize: 15 }}>
          Bình luận về bài viết
        </Text>
      </View>

      {/* Item Comment */}
      <FlatList
        style={{
          top: 20,
          marginHorizontal: 10,
          width: "100%",
          right: 10,
        }}
        contentContainerStyle={{
          width: "100%",
          paddingBottom: 130,
        }}
        data={dataCmt}
        renderItem={({ item }) => (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              marginVertical: 5,
              borderBottomColor: "#ABABAB",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProfileFriend", {
                  id: item.userID,
                })
              }
            >
              <Image
                style={{ width: 45, height: 45, borderRadius: 23 }}
                source={{ uri: item.avt }}
              />
            </TouchableOpacity>
            <View style={{ left: 5 }}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginRight: 60,
                  borderRadius: 10,
                  backgroundColor: "white",
                  opacity: 0.7,
                  elevation: 5,
                  padding: 2,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 5,
                    paddingTop: 2,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    {item.name}
                  </Text>
                  {item.userID == user ? (
                    <TouchableOpacity
                      style={{
                        width: "100%",
                        position: "absolute",
                        alignItems: "flex-end",
                        flexDirection: "column",
                        left: 35,
                        top: 10,
                      }}
                      onPress={() => openModal(item.idCmt)}
                    >
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={require("../../image/dots.png")}
                      />
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )}

                  {/* <Text style={{ fontSize: 10, left: 5 }}>{item.thoigian}</Text> */}
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 5,
                    opacity: 0.8,
                    paddingBottom: 3,
                  }}
                >
                  {item.noidung}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
      <View
        style={{
          position: "absolute",
          bottom: 60,
          borderRadius: 20,
          borderColor: "#E94057",
          borderWidth: 0.5,
          width: "98%",
          height: 45,
          right: 10,
          left: 10,
          paddingLeft: 10,
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <TextInput
          style={{ opacity: 0.9 }}
          placeholder="Viết bình luận của bạn..."
          value={binhluan}
          onChangeText={setbinhluan}
        />
        <TouchableOpacity
          style={{ position: "absolute", width: 40, height: 40, right: 3 }}
          onPress={AddComment}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../image/send.png")}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          height: 300,
          position: "absolute",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          bottom: 0,
        }}
      ></View>
    </View>
  );
};

export default Binhluan;

const styles = StyleSheet.create({
  mt: {
    width: 50,
    height: 20,
    left: 200,
    fontSize: 15,
    top: -38,
  },
  cmtContainer: {
    right: 5,
    top: 3,
  },
  thich: {
    width: 50,
    height: 20,
    left: 60,
    fontSize: 15,
  },
  iclikeContainer: {
    right: 5,
    top: 3,
  },
  edit: {
    width: 20,
    height: 20,
    top: 20,
    opacity: 0.8,
  },
  chu: {
    width: "100%",
    position: "absolute",
    textAlign: "center",
    fontSize: 20,
    top: 15,
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
    paddingRight: 10,
    flexDirection: "row",
  },
  centeredView: {
    position: "absolute",
    bottom: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    width: "78%",
    elevation: 10,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    elevation: 2,
    top: 10,
  },
  button1: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    elevation: 2,
    top: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#E94057",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
