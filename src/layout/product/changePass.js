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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../../config';
import {getAuth, updatePassword, onAuthStateChanged} from 'firebase/auth';
import {getDatabase, ref, onValue, set, push, update} from 'firebase/database';
const ChangePass = ({navigation, route}) => {
  initializeApp(firebaseConfig);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  const [id, setid] = useState();
  const [password, setpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [repassword, setrepassword] = useState('');
  const [passwordCr, setpasswordCr] = useState('');

  const [isCheckedStatus, setCheckedStatus] = useState(false);
  useEffect(() => {
    const reference = ref(db, 'users/' + user);
    onValue(reference, childSnapshot => {
      const pass = childSnapshot.child('password').val();
      setpasswordCr(pass);
    });
  });
  const openModal = () => {
    setCheckedStatus(true);
  };
  const closeModal = () => {
    setCheckedStatus(false);
  };
  const updateProfile = () => {
    if (password == '' || newpassword == '' || repassword == '') {
      ToastAndroid.show('Thông tin không được để trống', ToastAndroid.BOTTOM);
      setCheckedStatus(false);
    } else {
      if (passwordCr == password) {
        if (repassword == newpassword) {
          updatePassword(getAuth().currentUser, newpassword)
            .then(() => {
              const duongdan = ref(db, 'users/' + user);
              update(duongdan, {
                password: newpassword,
              });
              ToastAndroid.show(
                'Cập nhật mật khẩu thành công',
                ToastAndroid.BOTTOM,
              );
              setCheckedStatus(false);
              navigation.navigator('Chinhsua');
            })
            .catch(error => {
              //   if (error.code == "auth/requires-recent-login") {
              //   }
              console.log(error);
            });
        } else {
          ToastAndroid.show(
            'Mật khẩu mới không trùng nhau',
            ToastAndroid.BOTTOM,
          );
        }
      } else {
        ToastAndroid.show('Mật khẩu cũ không đúng', ToastAndroid.BOTTOM);
      }
    }
  };
  return (
    <View style={{height: '100%', width: '100%'}}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isCheckedStatus}
          onRequestClose={() => {
            setCheckedStatus(!isCheckedStatus);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{width: '115%', position: 'absolute'}}
                onPress={closeModal}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('./../../image/remove.png')}
                />
              </TouchableOpacity>
              <Text style={styles.modalText}>
                Bạn có chắc chắn muốn thay đổi mật khẩu?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                }}>
                <TouchableOpacity
                  style={[styles.button1, styles.buttonClose]}
                  onPress={closeModal}>
                  <Text style={styles.textStyle}>Không</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={updateProfile}>
                  <Text style={styles.textStyle}>Có</Text>
                </TouchableOpacity>
              </View>
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
          onPress={() => navigation.goBack()}>
          <Image
            style={{width: 25, height: 25, tintColor: 'white', bottom: 5}}
            source={require('../../image/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.chu}>Chỉnh sửa mật khẩu </Text>
        <View style={styles.khung}>
          <Text
            style={{
              fontSize: 20,
              paddingHorizontal: 20,
              paddingTop: 20,
              fontWeight: '600',
            }}>
            Vui lòng nhập mật khẩu của bạn vào ô bên dưới
          </Text>
          <Text style={{paddingHorizontal: 20, fontSize: 12, opacity: 0.7}}>
            * Xác nhận và chắc chắn rằng bạn nhập đúng mật khẩu
          </Text>
          <TextInput
            placeholder="Nhập mật khẩu cũ của bạn"
            value={password}
            onChangeText={setpassword}
            textContentType={'password'}
            secureTextEntry={true}
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              borderColor: '#E94057',
              borderWidth: 0.5,
              borderRadius: 10,
              height: 50,
              paddingLeft: 10,
            }}></TextInput>
          <Text
            style={{
              paddingHorizontal: 20,
              top: 10,
              fontSize: 12,
              opacity: 0.7,
            }}>
            * Nhập mật khẩu mới của bạn
          </Text>
          <TextInput
            value={newpassword}
            onChangeText={setnewpassword}
            placeholder="Nhập mật khẩu mới của bạn"
            textContentType={'password'}
            secureTextEntry={true}
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              borderColor: '#E94057',
              borderWidth: 0.5,
              borderRadius: 10,
              height: 50,
              paddingLeft: 10,
            }}></TextInput>
          <TextInput
            value={repassword}
            onChangeText={setrepassword}
            placeholder="Xác minh mật khẩu mới của bạn"
            textContentType={'password'}
            secureTextEntry={true}
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              borderColor: '#E94057',
              borderWidth: 0.5,
              borderRadius: 10,
              height: 50,
              paddingLeft: 10,
            }}></TextInput>
          <TouchableOpacity style={styles.saveBtn} onPress={openModal}>
            <Text style={styles.save}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChangePass;

const styles = StyleSheet.create({
  veryPass: {
    width: 100,
    height: 30,
    textAlign: 'center',
  },
  save: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    fontSize: 17,
    color: '#E94057',
  },
  saveBtn: {
    width: '90%',
    height: 45,
    elevation: 10,
    backgroundColor: 'white',
    marginHorizontal: 20,
    top: 20,
    borderRadius: 20,
  },
  lon: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 290,
  },

  edit: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    bottom: 55,
  },
  edit1: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    bottom: 70,
  },
  q: {
    width: '90%',
    height: 100,
    left: 10,
    top: 10,
  },
  q1: {
    width: '90%',
    height: 100,
    left: 10,
    top: 10,
    color: '#E94057',
  },
  w: {
    position: 'absolute',
    width: '90%',
    height: 80,
    left: 10,
    top: 5,
  },
  wa: {
    position: 'absolute',
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  con: {
    width: '90%',
    height: 68,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  con1: {
    width: '90%',
    height: 38,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  ten: {
    top: 15,
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  id: {
    top: 10,
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.7,
    top: 15,
  },
  avt: {
    borderRadius: 15,
    width: 90,
    height: 90,
    top: 10,
    alignSelf: 'center',
  },
  khung: {
    position: 'absolute',
    width: '90%',
    height: 380,
    marginHorizontal: 20,
    top: 70,
    backgroundColor: 'white',
    opacity: 1,
    borderRadius: 20,
    elevation: 5,
  },
  tieude: {
    width: '100%',
    height: '100%',
    top: 0,
    textAlign: 'center',
    fontSize: 50,
  },
  nen: {
    width: '100%',
    height: 150,
    left: 0,
    top: 0,
    backgroundColor: '#E94057',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  chu: {
    width: '100%',
    position: 'absolute',
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    top: 10,
  },
  back: {
    position: 'absolute',
    top: 19,
    left: 20,
    width: 20,
    height: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '80%',
    elevation: 10,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 30,
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
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#E94057',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
