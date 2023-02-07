/** @format */

import 'expo-dev-client';
import React, {useState, useEffect} from 'react';
import AgoraUIKit,{StreamFallbackOptions} from 'agora-rn-uikit';
import {View} from 'react-native';
import {ongetTokenAgora} from '../utilities/getTokenAgora.context';
import {initializeApp} from 'firebase/app';
import {auth, firebaseConfig} from '../../../../../config';
import messaging from '@react-native-firebase/messaging';
import {sendMess} from '../../../../constants/sendMess';
import {getDatabase, ref, onValue, set, push, update} from 'firebase/database';
const CallVideo = ({route, navigation}) => {
  initializeApp(firebaseConfig);
  const db = getDatabase();
  const user = auth.currentUser.metadata;
  const {combinedId, userId} = route.params;
  const [videoCall, setVideoCall] = useState(true);
  const [channel, setChannel] = useState(combinedId);
  const [role, setRole] = useState(1);
  const [uid, setUid] = useState(Number(user.createdAt));
  const [expiry, setexpiry] = useState(9999999999999999999);
  const [token, setToken] = useState();
  const [tokendvCr, settokendvCr] = useState();
  const [nameCr, setnameCr] = useState();
  const [avtCr, setavtCr] = useState();
  
  useEffect(() => {
    
    const referencecr = ref(db, 'users/' + userId);
    onValue(referencecr, childSnapshot => {
      const namepr = childSnapshot.child('name').val();
      const avtpr = childSnapshot.child('avt').val();
      const token = childSnapshot.child('token').val();
      setnameCr(namepr);
      setavtCr(avtpr);
      settokendvCr(token);
      const referencecrw = ref(db, 'users/' + auth.currentUser.uid);
        onValue(referencecrw, childSnapshotw => {
        const nameprw = childSnapshotw.child('name').val();
      async function fetchData() {
        
        const res = await ongetTokenAgora(channel, role, 'uid', uid, expiry);
        setToken(res);
        console.log(uid);
        sendMess(token, 'Bạn có cuộc gọi đến', nameprw + ' đang gọi cho bạn');
      }
      fetchData();
    });
    });
  }, []);
  const props = {
    connectionData: {
      appId: 'e63496cfe00f42d8be5c498370e6fa27',
      channel: channel,
      uid: uid,
      token: token,
      
    },
    rtcCallbacks: {
      EndCall: () => {
        setVideoCall(false);
        navigation.goBack();
      },
    },
  };

  return videoCall ? (
    <View style={{width: '100%', height: '100%', paddingBottom: 50}}>
      <AgoraUIKit
        connectionData={props.connectionData}
        rtcCallbacks={props.rtcCallbacks}
        
      />
    </View>
  ) : null;
};

export default CallVideo;
