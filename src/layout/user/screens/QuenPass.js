import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../../../config';
import {getAuth, signOut} from 'firebase/auth';
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
const QuenPass = ({navigation, route}) => {
  initializeApp(firebaseConfig);
  const db = getDatabase();
  const [nhap, setnhap] = useState('');
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [id, setid] = useState();
  const [sdt, setsdt] = useState();
  const [nghe, setnghe] = useState();
  const [email, setemail] = useState();
  useEffect(() => {
    const referencer = ref(db, 'users');
    onValue(referencer, snapshot => {
      snapshot.forEach(childSnapshot => {
        const email = childSnapshot.child('email').val();
        const namepr = childSnapshot.child('name').val();
        const sdt = childSnapshot.child('sdt').val();
        const avtpr = childSnapshot.child('avt').val();
        if (email == nhap || sdt == nhap) {
          setname(namepr);
          setavt(avtpr);
          setemail(email);
          setsdt(sdt);
          setnghe(childSnapshot.child('nghenghiep').val());
          setid(childSnapshot.child('id').val());
          console.log(name + email);
        }
      });
    });
  });
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
              Quên mật khẩu
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
          source={require('../../../image/quenmk.png')}
        />
        <Text
          style={{
            fontSize: 14,
            opacity: 0.9,
            top: 10,
            textAlign: 'left',
            opacity: 0.5,
          }}>
          *Hãy nhập Email hoặc Số điện thoại để tìm tài khoản.
        </Text>
        <TextInput
          value={nhap}
          onChangeText={setnhap}
          maxLength={255}
          placeholder="Nhập email hoặc số điện thoại"
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
        {name != undefined ? (
          <TouchableOpacity
            style={{
              top: 60,
              borderColor: '#ABABAB',
              borderWidth: 0.5,
              width: '100%',
              height: 60,

              borderRadius: 20,
            }}
            onPress={() => navigation.navigate('XacThuc', {id, email, sdt})}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                }}
                source={{uri: avt}}
              />
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{
                    textAlign: 'left',
                    top: 5,
                    fontSize: 20,
                    left: 10,
                  }}>
                  {name}
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    top: 5,
                    fontSize: 18,
                    left: 10,
                    opacity: 0.7,
                  }}>
                  {nghe}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default QuenPass;

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
