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
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../config";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  update,
} from "firebase/database";
const Chinhsua = ({ navigation, route }) => {
  initializeApp(firebaseConfig);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  const [id, setid] = useState();
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [diachi, setdiachi] = useState();
  const [ngaysinh, setngaysinh] = useState();
  const [gioitinh, setgioitinh] = useState();
  const [nghenghiep, setnghenghiep] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [repassword, setrepassword] = useState();
  const [isCheckedStatus, setCheckedStatus] = useState(false);
  useEffect(() => {
    const reference = ref(db, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const idpr = childSnapshot.child("id").val();
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();
      const email = childSnapshot.child("email").val();
      const diachipr = childSnapshot.child("diachi").val();
      const ngaysinhpr = childSnapshot.child("ngaysinh").val();
      const gioitinhpr = childSnapshot.child("gioitinh").val();
      const nghenghiep = childSnapshot.child("nghenghiep").val();
      setname(namepr);
      setavt(avtpr);
      setdiachi(diachipr);
      setgioitinh(gioitinhpr);
      setngaysinh(ngaysinhpr);
      setnghenghiep(nghenghiep);
      setemail(email);
      setid(idpr);
      setrepassword(childSnapshot.child("password").val());
    });
  },[]);
  const openModal = () => {
    setCheckedStatus(true);
  };
  const closeModal = () => {
    setCheckedStatus(false);
  };
  const updateProfile = () => {
    if (repassword == password) {
      if (
        email == "" ||
        diachi == "" ||
        gioitinh == "" ||
        ngaysinh == "" ||
        nghenghiep == "" ||
        name == ""
      ) {
        ToastAndroid.show("Thông tin không được để trống", ToastAndroid.BOTTOM);
      } else {
        const duongdan = ref(db, "users/" + user);
        update(duongdan, {
          name: name,
          email: email,
          diachi: diachi,
          nghenghiep: nghenghiep,
          ngaysinh: ngaysinh,
          gioitinh: gioitinh,
        });
        ToastAndroid.show("Cập nhật thông tin thành công", ToastAndroid.BOTTOM);
        setCheckedStatus(false);
      }
    } else {
      ToastAndroid.show("Mật khẩu không đúng", ToastAndroid.BOTTOM);
    }
  };
  return (
    <View style={{ height: "100%", width: "100%" }}>
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
                style={{ width: "85%", position: "absolute" }}
                onPress={closeModal}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("./../../image/remove.png")}
                />
              </TouchableOpacity>
              <Text style={styles.modalText}>
                Vui lòng xác minh mật khẩu để thay đổi!
              </Text>
              <TextInput
                style={styles.veryPass}
                placeholder="Nhập mật khẩu"
                textContentType="password"
                secureTextEntry={true}
                value={password}
                onChangeText={setpassword}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={updateProfile}
              >
                <Text style={styles.textStyle}>Thay Đổi</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
      </View>
      <View style={styles.tieude}>
        <View style={styles.nen}></View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            style={{ width: 25, height: 25, bottom: 5, tintColor: "white" }}
            source={require("../../image/back.png")}
          />
        </TouchableOpacity>
        <Text style={styles.chu}>Chỉnh sửa thông tin </Text>
        <View style={styles.khung}>
          <Image style={styles.avt} source={{ uri: avt }} />

          <TextInput
            style={styles.ten}
            value={name}
            onChangeText={setname}
            textContentType={"name"}
          ></TextInput>
          <Text style={styles.id}>{id}</Text>
        </View>
      </View>
      <View style={styles.lon}>
        <View>
          <View style={styles.con}>
            <Text style={styles.q}>Email</Text>
            <TextInput
              style={styles.w}
              placeholder="abc@gmail.com"
              value={email}
              onChangeText={setemail}
              textContentType={"emailAddress"}
            ></TextInput>
            <TouchableOpacity onPress={() => setemail("")}>
              <Image
                style={styles.edit}
                source={require("../../image/edit.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ top: 10 }}>
          <View style={styles.con}>
            <Text style={styles.q}>Địa chỉ</Text>
            <TextInput
              style={styles.w}
              placeholder="Hồ chí minh"
              value={diachi}
              onChangeText={setdiachi}
              textContentType={"fullStreetAddress"}
            ></TextInput>
            <TouchableOpacity onPress={() => setdiachi("")}>
              <Image
                style={styles.edit}
                source={require("../../image/edit.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ top: 20 }}>
          <View style={styles.con}>
            <Text style={styles.q}>Nghề nghiệp</Text>
            <TextInput
              style={styles.w}
              placeholder="Lập trình viên"
              value={nghenghiep}
              onChangeText={setnghenghiep}
            ></TextInput>
            <TouchableOpacity onPress={() => setnghenghiep("")}>
              <Image
                style={styles.edit}
                source={require("../../image/edit.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ top: 30 }}>
          <View style={styles.con}>
            <Text style={styles.q}>Ngày sinh</Text>
            <TextInput
              style={styles.w}
              placeholder="03/12/2002"
              value={ngaysinh}
              onChangeText={setngaysinh}
            ></TextInput>
            <TouchableOpacity onPress={() => setngaysinh("")}>
              <Image
                style={styles.edit}
                source={require("../../image/edit.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ top: 40 }}>
          <View style={styles.con}>
            <Text style={styles.q}>Giới tính</Text>
            <TextInput
              style={styles.w}
              placeholder="Nam"
              value={gioitinh}
              onChangeText={setgioitinh}
              textContentType={"name"}
            ></TextInput>
            <TouchableOpacity onPress={() => setgioitinh("")}>
              <Image
                style={styles.edit}
                source={require("../../image/edit.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ top: 50 }}>
          <View style={styles.con1}>
            <Text style={styles.q1}>Đổi mật khẩu</Text>

            <TouchableOpacity onPress={() => navigation.navigate("ChangePass")}>
              <Image
                style={styles.edit1}
                source={require("../../image/edit.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ top: 50 }}>
          <TouchableOpacity style={styles.saveBtn} onPress={openModal}>
            <Text style={styles.save}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Chinhsua;

const styles = StyleSheet.create({
  veryPass: {
    width: 100,
    height: 30,
    textAlign: "center",
  },
  save: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    top: 10,
    fontSize: 17,
    color: "#E94057",
  },
  saveBtn: {
    width: "90%",
    height: 45,
    elevation: 10,
    backgroundColor: "white",
    marginHorizontal: 20,
    top: 10,
    borderRadius: 20,
  },
  lon: {
    flexDirection: "column",
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 250,
  },

  edit: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 10,
    bottom: 55,
  },
  edit1: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 10,
    bottom: 70,
  },
  q: {
    width: "90%",
    height: 100,
    left: 10,
    top: 10,
  },
  q1: {
    width: "90%",
    height: 100,
    left: 10,
    top: 10,
    color: "#E94057",
  },
  w: {
    position: "absolute",
    width: "90%",
    height: 80,
    left: 10,
    top: 5,
  },
  wa: {
    position: "absolute",
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  con: {
    width: "90%",
    height: 68,
    left: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  con1: {
    width: "90%",
    height: 38,
    left: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  ten: {
    top: 15,
    color: "black",
    textAlign: "center",
    fontSize: 20,
  },
  id: {
    top: 10,
    color: "black",
    textAlign: "center",
    fontSize: 14,
    opacity: 0.7,
    top: 15,
  },
  avt: {
    borderRadius: 15,
    width: 90,
    height: 90,
    top: 10,
    alignSelf: "center",
  },
  khung: {
    position: "absolute",
    width: "90%",
    height: 170,
    marginHorizontal: 20,
    top: 50,
    backgroundColor: "white",
    opacity: 1,
    borderRadius: 20,
    elevation: 5,
  },
  tieude: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: 50,
  },
  nen: {
    width: "100%",
    height: 150,
    left: 0,
    top: 0,
    backgroundColor: "#E94057",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  chu: {
    width: "100%",
    position: "absolute",
    color: "white",
    textAlign: "center",
    fontSize: 20,
    top: 10,
  },
  back: {
    position: "absolute",
    top: 19,
    left: 20,
    width: 20,
    height: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 40,
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
