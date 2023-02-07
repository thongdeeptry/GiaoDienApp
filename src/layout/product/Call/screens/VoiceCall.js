/** @format */

import 'expo-dev-client';
import React, {useRef, useState, useEffect} from 'react';
import AgoraUIKit, { StreamFallbackOptions } from 'agora-rn-uikit';
import {View,PermissionsAndroid, Platform} from 'react-native';
import {ongetTokenAgora} from '../utilities/getTokenAgora.context';
import {initializeApp} from 'firebase/app';
import {auth, firebaseConfig} from '../../../../../config';
import messaging from '@react-native-firebase/messaging';
import {sendMess} from '../../../../constants/sendMess';
import {getDatabase, ref, onValue, set, push, update} from 'firebase/database';

import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    ChannelProfileType,
    } from 'react-native-agora';
const VoiceCall = ({route, navigation}) => {
  initializeApp(firebaseConfig);
  const db = getDatabase();
  const user = auth.currentUser.metadata;
  const {combinedId, userId} = route.params;
  const [videoCall, setVideoCall] = useState(true);
  const [channel, setChannel] = useState(combinedId);
  const [role, setRole] = useState(1);
  const [uid2, setUid] = useState(Number(user.createdAt));
  const [expiry, setexpiry] = useState(9999999999999999999);
  const [token2, setToken] = useState();
  const [tokendvCr, settokendvCr] = useState();
  const [nameCr, setnameCr] = useState();
  const [avtCr, setavtCr] = useState();
  
  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.head}>Agora Video Calling Quickstart</Text>
     
    </SafeAreaView>
  );
};

export default VoiceCall;
const styles = StyleSheet.create({
        button: {
            paddingHorizontal: 25,
            paddingVertical: 4,
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#0055cc',
            margin: 5,
        },
        main: {flex: 1, alignItems: 'center'},
        scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
        scrollContainer: {alignItems: 'center'},
        videoView: {width: '90%', height: 200},
        btnContainer: {flexDirection: 'row', justifyContent: 'center'},
        head: {fontSize: 20},
    });