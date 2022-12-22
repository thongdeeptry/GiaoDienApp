/** @format */

import 'expo-dev-client';
import React, {useState, useEffect} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {View, Image, Text, TouchableOpacity, ToastAndroid} from 'react-native';
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
const JoinLive = ({navigation, route}) => {
  const {token, channel, nameLive, thoigian, avt, luotxem, id} = route.params;
  initializeApp(firebaseConfig);
  const db = getDatabase();
  const [videoCall, setVideoCall] = useState(true);
  const [role, setRole] = useState(2); //role = 2 people follow
  const [uid, setUid] = useState(Number(luotxem) + 1);
  const [expiry, setexpiry] = useState('9999999999999999999');
  const [ngay, setNgay] = useState();
  const [view, setView] = useState(1);
  const [token1, setToken] = useState();

  useEffect(() => {
    console.log(uid);
    async function fetchData() {
      const res = await ongetTokenAgora(channel, role, 'uid', uid, expiry);
      setToken(res);
      if (token != '') {
        const referencer = ref(db, 'livestream/' + id);
        update(referencer, {
          luotxem: Number(luotxem) + 1,
        });
        ToastAndroid.show(
          'Đã tham gia phòng phát trực tiếp của ' + nameLive,
          ToastAndroid.BOTTOM,
        );
      }
    }
    fetchData();
  }, []);
  const props = {
    connectionData: {
      appId: 'e63496cfe00f42d8be5c498370e6fa27',
      channel: channel,
      uid: uid,
      token: token1,
      role: role,
    },
    rtcCallbacks: {
      EndCall: () => {
        setVideoCall(false);
        navigation.goBack();
        const referencer = ref(db, 'livestream/' + id);
        update(referencer, {
          luotxem: Number(luotxem),
        });
        ToastAndroid.show(
          'Đã thoát phòng phát trực tiếp của ' + nameLive,
          ToastAndroid.BOTTOM,
        );
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
      <Text
        style={{
          position: 'absolute',
          left: 70,
          color: 'white',
          fontSize: 20,
          top: 5,
        }}>
        {nameLive}
      </Text>
      <Text
        style={{
          position: 'absolute',
          left: 70,
          color: 'white',
          fontSize: 15,
          top: 30,
          opacity: 0.7,
        }}>
        {thoigian}
      </Text>
      <Text
        style={{
          position: 'absolute',
          right: 20,
          color: 'white',
          fontSize: 20,
          top: 10,
          opacity: 0.7,
        }}>
        {view}
      </Text>
    </View>
  ) : null;
};

export default JoinLive;
