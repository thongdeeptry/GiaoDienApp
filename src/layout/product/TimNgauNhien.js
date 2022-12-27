import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../../config';
import {getAuth, signOut} from 'firebase/auth';
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  update,
  remove,
} from 'firebase/database';
import LottieView from 'lottie-react-native';
import {v4 as uuid} from 'uuid';
export const TimNgauNhien = ({route, navigation}) => {
  initializeApp(firebaseConfig);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  const [name, setname] = useState();
  const [id, setuid] = useState();
  const [avt, setavt] = useState();
  const [tick, settick] = useState();
  const [tuoi, settuoi] = useState();
  const [nghe, setnghe] = useState();
  const [gioitinh, setgioitinh] = useState();
  const [diachi, setdiachi] = useState();
  const [randomid, setrandomid] = useState();
  const dataFl = [];
  let dataghep = [];
  const dataghepq = [];
  const [hienthi, sethienthi] = useState(0);
  const [randomidd, setrandomidd] = useState('');
  const [nameh, setnameh] = useState();
  const [idh, setuidh] = useState();
  const [avth, setavth] = useState();
  const [tickh, settickh] = useState();
  const [tuoih, settuoih] = useState();
  const [ngheh, setngheh] = useState();
  const [gioitinhh, setgioitinhh] = useState();
  const [diachih, setdiachih] = useState();
  const [ghepdoi, setghepdoi] = useState(false);
  const [show, setShow] = useState(false);
  const referencer = ref(db, 'users');
  onValue(referencer, snapshot => {
    snapshot.forEach(childSnapshot => {
      if (childSnapshot.child('gioitinh').val() != gioitinh) {
        const id = childSnapshot.child('id').val();
        dataFl.push(id);
      }
      dataghep.push(childSnapshot.child('id').val());
    });
  });
  useEffect(() => {
    const reference = ref(db, 'users/' + user);
    onValue(reference, childSnapshot => {
      const namepr = childSnapshot.child('name').val();
      const avtpr = childSnapshot.child('avt').val();
      setname(namepr);
      setavt(avtpr);
      setnghe(childSnapshot.child('nghenghiep').val());
      settick(childSnapshot.child('tick').val());
      settuoi(childSnapshot.child('tuoi').val());
      setdiachi(childSnapshot.child('diachi').val());
      setuid(childSnapshot.child('id').val());
      setgioitinh(childSnapshot.child('gioitinh').val());
    });
    if (ghepdoi == true) {
      setShow(true);
      setTimeout(() => {
        const randomID = Math.floor(Math.random() * dataFl.length);
        setrandomid(dataFl[randomID]);
        const referencea = ref(db, 'users/' + randomid);
        onValue(referencea, childSnapshot => {
          const namepr = childSnapshot.child('name').val();
          const avtpr = childSnapshot.child('avt').val();
          setnameh(namepr);
          setavth(avtpr);
          setgioitinhh(childSnapshot.child('gioitinh').val());
          settickh(childSnapshot.child('tick').val());
          settuoih(childSnapshot.child('tuoi').val());
          setdiachih(childSnapshot.child('diachi').val());
          setuidh(childSnapshot.child('id').val());
        });
        console.log('tuoi toi ' + tuoi);
        console.log('tuoi bạn ' + tuoih + gioitinhh);

        if (
          gioitinhh != gioitinh &&
          Number(tuoi) >= Number(tuoih) &&
          gioitinhh != null &&
          gioitinhh != undefined &&
          tuoih != null &&
          tuoih != undefined
        ) {
          setghepdoi(false);
          setShow(false);
          ToastAndroid.show('Đã kết nối với 1 người lạ', ToastAndroid.BOTTOM);
          navigation.navigate('SayHello', {
            id: idh,
          });
        }
      }, 3000);
    }
  }, [ghepdoi]);

  const Timkiem = () => {
    const randomID = Math.floor(Math.random() * dataghep.length);
    setrandomid(dataghep[randomID]);
    const reference = ref(db, 'users/' + randomid);
    onValue(reference, childSnapshot => {
      const namepr = childSnapshot.child('name').val();
      const avtpr = childSnapshot.child('avt').val();
      setnameh(namepr);
      setavth(avtpr);
      setgioitinhh(childSnapshot.child('gioitinh').val());
      setngheh(childSnapshot.child('nghenghiep').val());
      settickh(childSnapshot.child('tick').val());
      settuoih(childSnapshot.child('tuoi').val());
      setdiachih(childSnapshot.child('diachi').val());
      setuidh(childSnapshot.child('id').val());
    });
  };

  const GhepCap = () => {
    setghepdoi(true);
  };

  return (
    <View style={styles.tong}>
      <Image
        style={[
          styles.hinh,
          show == true ? {width: '100%', height: '100%', opacity: 0.2} : null,
        ]}
        source={require('../../image/timkiemrd.png')}
        resizeMode="cover"></Image>
      {show == true ? (
        <View style={styles.tongx}>
          <LottieView
            source={require('../../../chimnghenhac.json')}
            style={styles.animation}
            autoPlay
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: '#E94057',
              fontWeight: '600',
            }}>
            Đang tìm người phù hợp với bạn...
          </Text>
        </View>
      ) : (
        <></>
      )}
      <View style={styles.custominfo}>
        <Image
          style={{
            width: 70,
            height: 70,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
          }}
          source={{uri: avth}}
        />
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 20, fontWeight: '500', top: 5, left: 10}}>
              {nameh}
            </Text>
            {tickh == 'true' ? (
              <Image
                style={{width: 20, height: 20, top: 6, left: 13}}
                source={require('../..//image/verify.png')}
              />
            ) : (
              <></>
            )}
            <Text style={{fontSize: 20, fontWeight: '500', top: 5, left: 15}}>
              {randomid != undefined ? ',' : ''} {tuoih}
            </Text>
          </View>
          <Text style={{fontSize: 15, fontWeight: '400', top: 5, left: 10}}>
            {ngheh}
          </Text>
          <Text style={{fontSize: 15, fontWeight: '400', top: 5, left: 10}}>
            {diachih}
          </Text>
        </View>
        {nameh != undefined ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('SayHello', {idh})}
            style={{position: 'absolute', right: 5}}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                top: 20,
              }}
              source={require('../../image/next.png')}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          height: 40,
          bottom: 70,
          position: 'absolute',
        }}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 40,
            borderRadius: 15,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onPress={Timkiem}>
          <Text style={{fontSize: 18, color: '#E94057', fontWeight: '500'}}>
            Ngẫu Nhiên
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 100,
            height: 40,
            borderRadius: 15,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onPress={GhepCap}>
          <Text style={{fontSize: 18, color: '#E94057', fontWeight: '500'}}>
            Ghép đôi
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tongx: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  custominfo: {
    width: '90%',
    marginHorizontal: 20,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 15,
    opacity: 0.9,
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
  },
  hinh: {
    width: '100%',
    height: '100%',
  },
  tong: {
    width: '100%',
    height: '100%',
  },
});
