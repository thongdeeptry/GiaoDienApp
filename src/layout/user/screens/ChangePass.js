import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../../../config';
import {getAuth, updatePassword, onAuthStateChanged} from 'firebase/auth';

import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  update,
  query,
  limitToLast,
  remove,
} from 'firebase/database';
import {UserContext} from '../UserContext';
const ChangePass = ({navigation, route}) => {
  initializeApp(firebaseConfig);
  const db = getDatabase();
  const [nhap, setnhap] = useState('');
  const [nhap1, setnhap1] = useState('');
  const {onLogin} = useContext(UserContext);
  const ChangePasss = () => {
    try {
      if (nhap == nhap1) {
        if (nhap != '' && nhap1 != '') {
          updatePassword(getAuth().currentUser, nhap).then(() => {
            const referencer = ref(db, 'users/' + getAuth().currentUser.uid);
            update(referencer, {
              password: nhap,
            });
            ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.BOTTOM);
            onLogin();
          });
        } else {
          ToastAndroid.show('Mật khẩu không để trống', ToastAndroid.BOTTOM);
        }
      } else {
        ToastAndroid.show('Mật khẩu không trùng nhau', ToastAndroid.BOTTOM);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <View style={styles.header}>
        <View
          style={{
            width: '100%',
            height: 70,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomColor: '#ABABAB',
            borderBottomWidth: 0.6,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', left: 20}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../../image/back.png')}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 23, left: 10, opacity: 0.7}}>
              Mật khẩu mới
            </Text>
          </View>
          <View style={{width: 75, height: 45}}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                right: 20,

                alignItems: 'center',
                justifyContent: 'center',
              }}></TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{width: '100%', paddingHorizontal: 20, top: 100}}>
        <Image
          style={{width: '100%', height: 200}}
          source={require('../../../image/veripass.png')}
        />
        <Text
          style={{
            fontSize: 14,
            opacity: 0.9,
            top: 10,
            textAlign: 'left',
            opacity: 0.5,
          }}>
          *Hãy tạo mật khẩu mới để vào tài khoản.
        </Text>
        <TextInput
          value={nhap}
          onChangeText={setnhap}
          maxLength={255}
          returnKeyType="next"
          placeholder="Nhập mật khẩu mới"
          style={{
            width: '100%',
            height: 50,
            borderColor: '#E94057',
            borderWidth: 0.5,
            borderRadius: 10,
            top: 40,
            paddingLeft: 10,
          }}
        />
        <TextInput
          value={nhap1}
          onChangeText={setnhap1}
          maxLength={255}
          returnKeyType="done"
          placeholder="Nhập lại mật khẩu"
          style={{
            width: '100%',
            height: 50,
            borderColor: '#E94057',
            borderWidth: 0.5,
            borderRadius: 10,
            top: 50,
            paddingLeft: 10,
          }}
        />
        <TouchableOpacity
          style={{
            top: 100,
            backgroundColor: '#E94057',
            borderWidth: 0.5,
            width: '100%',
            height: 50,
            alignItems: 'center',
            borderRadius: 20,
            justifyContent: 'center',
          }}
          onPress={ChangePasss}>
          <Text style={{fontSize: 20, color: 'white'}}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePass;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    height: 40,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
