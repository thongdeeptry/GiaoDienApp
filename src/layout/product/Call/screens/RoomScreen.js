/** @format */

import 'expo-dev-client';
import React, {useState, useEffect} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from 'react-native';
import {ongetTokenAgora} from '../utilities/getTokenAgora.context';
import {initializeApp} from 'firebase/app';
import {auth, firebaseConfig} from '../../../../../config';
import {v4 as uuid} from 'uuid';
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  update,
  remove,
  serverTimestamp,
} from 'firebase/database';
const RoomCall = ({navigation, route}) => {
  initializeApp(firebaseConfig);
  const user = auth.currentUser.uid;
  const db = getDatabase();
  const [videoCall, setVideoCall] = useState(true);
  const [channel, setChannel] = useState(user);
  const [role, setRole] = useState(1); //role = 2 people follow
  const [uid, setUid] = useState(1);
  const [expiry, setexpiry] = useState('9999999999999999999');
  const [token, setToken] = useState('');
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [ngay, setNgay] = useState();
  const [view, setView] = useState();
  const [nameRoom, setNameRoom] = useState();
  useEffect(() => {
    async function fetchData() {
      const reference = ref(db, 'users/' + user);
      onValue(reference, childSnapshot => {
        const namepr = childSnapshot.child('name').val();
        const avtpr = childSnapshot.child('avt').val();
        setname(namepr);
        setavt(avtpr);
      });

      const res = await ongetTokenAgora(channel, role, 'uid', uid, expiry);
      setToken(res);
    }
    fetchData();
  }, []);
  const d = new Date();
  const ngayht = d.getDate();
  const thang = d.getMonth() + 1;
  const nam = d.getFullYear();
  const BatDau = () => {
    const referencer = ref(db, 'roomCall/' + user);
    set(referencer, {
      id: user,
      avt: avt,
      name: nameRoom,
      songuoi: 1,
      ngaytao: ngayht + ' Tháng ' + thang + ' Năm ' + nam,
      token: token,
      channel: channel,
      uid: 1,
    });
    ToastAndroid.show('Đã tạo phòng trò chuyện', ToastAndroid.BOTTOM);
    const reference = ref(db, 'roomCall/' + user);
    onValue(reference, childSnapshot => {
      const namepr = childSnapshot.child('ngaytao').val();
      const vi = childSnapshot.child('songuoi').val();
      setNgay(namepr);
      setView(vi);
    });
  };
  const props = {
    connectionData: {
      appId: 'e63496cfe00f42d8be5c498370e6fa27',
      channel: channel,
      uid: uid,
      token: token,
      role: role,
    },
    rtcCallbacks: {
      EndCall: () => {
        setVideoCall(false);
        navigation.goBack();
        const referencer = ref(db, 'roomCall/' + user);
        remove(referencer).then(() => {
          ToastAndroid.show('Bạn đã tắt phòng trò chuyện', ToastAndroid.BOTTOM);
        });
      },
    },
  };

  return videoCall ? (
    <View
      style={{
        width: '100%',
        height: '95%',
        paddingTop: 50,
        backgroundColor: 'black',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileFriend', {id: user})}
        style={{
          width: 55,
          height: 55,
          position: 'absolute',
        }}>
        <Image
          style={{
            width: 45,
            height: 45,
            left: 10,
            top: 5,
            borderRadius: 25,
          }}
          source={{uri: avt}}
        />
      </TouchableOpacity>
      <AgoraUIKit
        connectionData={props.connectionData}
        rtcCallbacks={props.rtcCallbacks}
      />
      <TextInput
        style={{
          position: 'absolute',
          left: 70,
          backgroundColor: 'white',
          fontSize: 20,
          top: 10,
          height: 40,
          width: 250,
          borderRadius: 10,
          paddingLeft: 10,
        }}
        placeholder="Nhập tên phòng"
        value={nameRoom}
        returnKeyType="done"
        onChangeText={setNameRoom}></TextInput>

      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 10,
          height: 40,
        }}
        onPress={BatDau}>
        <Text
          style={{
            color: '#E94057',
            fontSize: 20,
            top: 20,
          }}>
          Bắt đầu
        </Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

export default RoomCall;
