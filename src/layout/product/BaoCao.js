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
import Checkbox from 'expo-checkbox';
import {v4 as uuid} from 'uuid';
const BaoCao = ({navigation, route}) => {
  const {id} = route.params;
  initializeApp(firebaseConfig);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  const [name, setname] = useState('');
  const [avt, setavt] = useState('');
  const [noidung, setnoidung] = useState('');
  useEffect(() => {
    const reference = ref(db, 'users/' + id);
    onValue(reference, childSnapshot => {
      const name = childSnapshot.child('name').val();
      setname(name);
      setavt(childSnapshot.child('avt').val());
    });
  });
  const sendHoTro = () => {
    if (noidung != '') {
      const ids = uuid();
      const reference = ref(db, 'reports/' + ids);
      set(reference, {
        id: ids,
        link: 'http://localhost:3000/#/admin/profile/' + id,
        id_send: user,
        id_vipham: id,
        noidung: noidung,
        thaotac: ids,
        trangthai: 'Chờ Xử Lý',
        phanhoi: 'Chưa có',
        avt: avt,
      });
      ToastAndroid.show('Đã gửi đơn báo cáo', ToastAndroid.BOTTOM);
      navigation.navigate('ProfileFriend', {id});
    } else {
      ToastAndroid.show('Không được để trống', ToastAndroid.BOTTOM);
    }
  };
  return (
    <View style={{height: '100%', width: '100%'}}>
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
        <Text style={styles.chu}>Báo cáo trang cá nhân</Text>
        <View style={styles.khung}>
          <Text
            style={{
              fontSize: 20,
              paddingHorizontal: 20,
              paddingTop: 20,
              fontWeight: '600',
            }}>
            Vui lòng mô tả nội dung muốn báo cáo
          </Text>
          <Text style={{paddingHorizontal: 20, fontSize: 12, opacity: 0.7}}>
            * Xác nhận và chắc chắn rằng bạn báo cáo đúng
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{paddingLeft: 20, fontSize: 16, opacity: 0.7}}>
              Bạn đang báo cáo :
            </Text>
            <Text
              style={{paddingHorizontal: 5, fontSize: 18, color: '#E94057'}}>
              {name}
            </Text>
          </View>
          <TextInput
            placeholder="Nhập mô tả nội dung bạn muốn báo cáo"
            value={noidung}
            onChangeText={setnoidung}
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              borderColor: '#E94057',
              borderWidth: 0.5,
              borderRadius: 10,
              height: 100,
              paddingLeft: 10,
              paddingBottom: 70,
            }}></TextInput>

          <TouchableOpacity style={styles.saveBtn} onPress={sendHoTro}>
            <Text style={styles.save}>Báo cáo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BaoCao;

const styles = StyleSheet.create({
  checkbox: {
    marginTop: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    left: 20,
  },
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
    height: 300,
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
