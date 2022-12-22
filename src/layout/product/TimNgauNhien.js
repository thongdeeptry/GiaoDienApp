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
  const [diachi, setdiachi] = useState();
  const [randomid, setrandomid] = useState();
  const dataFl = [];
  let dataghep = [];
  const dataghepq = [];
  const [hienthi, sethienthi] = useState(0);
  const [randomidd, setrandomidd] = useState('');
  useEffect(() => {
    const referencer = ref(db, 'users');
    onValue(referencer, snapshot => {
      snapshot.forEach(childSnapshot => {
        const id = childSnapshot.child('id').val();
        dataFl.push(id);
      });
    });
    const reference = ref(db, 'users/' + randomid);
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
    });
  });
  const Timkiem = () => {
    const randomID = Math.floor(Math.random() * dataFl.length);
    setrandomid(dataFl[randomID]);
  };
  const GhepDoi = () => {
    dataghep.splice(0, dataghep.length);
    dataghep = [];
    let ids = user;

    const referencer = ref(db, 'hangcho');
    onValue(referencer, snapshot => {
      snapshot.forEach(childSnapshot => {
        const id = childSnapshot.key;
        dataghep.push(id);
      });
      console.log(dataghep.length);
    });

    if (dataghep.length == 0) {
      dataghep.splice(0, dataghep.length);
      dataghep = [];
      const reference = ref(db, 'hangcho/' + ids + '/' + user);
      update(reference, {
        id: user,
        hienthi: hienthi,
      });
    }
    console.log('dataghep' + dataghep);

    if (dataghep.length > 0) {
      const randomID = Math.floor(Math.random() * dataghep.length);
      setrandomidd(dataghep[randomID]);
      console.log('randomid = ' + randomidd);
      if (
        randomidd != '' &&
        randomidd != null &&
        randomidd != undefined &&
        dataghep.length != 0
      ) {
        const reference = ref(db, 'hangcho/' + randomidd + '/' + user);
        update(reference, {
          id: user,
          hienthi: hienthi,
        });
        const referencerd = ref(db, 'hangcho/' + randomidd);
        onValue(referencerd, snapshot => {
          snapshot.forEach(childSnapshot => {
            if (childSnapshot.size == 2) {
              dataghepq.push(childSnapshot.key);
            }
            // const combinedId =
            //   dataghepq[0] > dataghepq[1]
            //     ? dataghepq[0] + dataghepq[1]
            //     : dataghepq[1] + dataghepq[0];
          });
          if (dataghepq.length == 2) {
            setrandomid(dataghepq[0] == user ? dataghepq[1] : dataghepq[0]);
            const referencerd = ref(db, 'hangcho/' + randomidd);
            remove(referencerd).then(() => {
              ToastAndroid.show(
                'Đã kết nối với 1 người lạ',
                ToastAndroid.BOTTOM,
              );
            });
            navigation.navigate('Messenger', {
              url: '',
              name: '',
              userId: dataghepq[0] == user ? dataghepq[1] : dataghepq[0],
            });
          } else {
            ToastAndroid.show(
              'Chưa tìm thấy, vui lòng tìm lại',
              ToastAndroid.BOTTOM,
            );
          }
        });
      }
    }

    dataghepq.splice(0, dataghepq.length);
    // const randomid = uuid();
  };
  return (
    <View style={styles.tong}>
      <Image
        style={styles.hinh}
        source={require('../../image/timkiemrd.png')}
        resizeMode="cover"></Image>

      <View style={styles.custominfo}>
        <Image
          style={{
            width: 70,
            height: 70,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
          }}
          source={{uri: avt}}
        />
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 20, fontWeight: '500', top: 5, left: 10}}>
              {name}
            </Text>
            {tick == 'true' ? (
              <Image
                style={{width: 20, height: 20, top: 6, left: 13}}
                source={require('../..//image/verify.png')}
              />
            ) : (
              <></>
            )}
            <Text style={{fontSize: 20, fontWeight: '500', top: 5, left: 15}}>
              {randomid != undefined ? ',' : ''} {tuoi}
            </Text>
          </View>
          <Text style={{fontSize: 15, fontWeight: '400', top: 5, left: 10}}>
            {nghe}
          </Text>
          <Text style={{fontSize: 15, fontWeight: '400', top: 5, left: 10}}>
            {diachi}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('SayHello', {id})}
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
            Tìm kiếm
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
          onPress={GhepDoi}>
          <Text style={{fontSize: 18, color: '#E94057', fontWeight: '500'}}>
            Ghép đôi
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
