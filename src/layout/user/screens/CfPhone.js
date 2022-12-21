import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  ToastAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from 'expo-firebase-recaptcha';
import {firebaseConfig} from '../../../../config';
import firebase from 'firebase/compat/app';
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
export const CfPhone = ({route, navigation}) => {
  const app = initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
  const {verificationId} = route.params;
  const {sdt} = route.params;
  const {initialMinute = 0, initialSeconds = 59} = navigation;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [verificationCode, setVerificationCode] = useState('');
  const [Code1, setCode1] = useState('');
  const [Code2, setCode2] = useState('');
  const [Code3, setCode3] = useState('');
  const [Code4, setCode4] = useState('');
  const [Code5, setCode5] = useState('');
  const [Code6, setCode6] = useState('');
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          navigation.navigate('RegisterPhone');
        } else {
          setMinutes(minutes - 1);
          setSeconds(0);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const ConfimCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      Code1 + Code2 + Code3 + Code4 + Code5 + Code6,
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setCode1('');
        setCode2('');
        setCode3('');
        setCode4('');
        setCode5('');
        setCode6('');
        ToastAndroid.show('Đã xác nhận mã', ToastAndroid.BOTTOM);
        const user = getAuth(app).currentUser.uid;
        navigation.navigate('ProfileName', {
          verificationId,
          sdt,
          user,
        });
      })
      .catch(error => {
        ToastAndroid.show('Mã sai', ToastAndroid.BOTTOM);
      });
  };

  return (
    <View>
      <View style={styles.MOBILE}>
        <Text style={styles.MOBILEText}>
          {' '}
          00:{seconds < 10 ? '0' + seconds : seconds}
        </Text>
        <Text style={styles.chitietsdt}>
          Nhập mã xác minh chúng tôi đã gửi cho bạn.
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View style={styles.khunghinh}>
          <View style={styles.khung}>
            <TextInput
              style={{fontSize: 35}}
              maxLength={1}
              value={Code1}
              onChangeText={setCode1}
              autoFocus={true}></TextInput>
          </View>
          <View style={styles.khung2}>
            <TextInput
              style={{fontSize: 35}}
              maxLength={1}
              value={Code2}
              onChangeText={setCode2}
              returnKeyType="next"
              onSubmitEditing={() => ref_input3.current.focus()}></TextInput>
          </View>
          <View style={styles.khung3}>
            <TextInput
              style={{fontSize: 35}}
              maxLength={1}
              value={Code3}
              onChangeText={setCode3}
              ref={ref_input3}
              returnKeyType="next"
              onSubmitEditing={() => ref_input4.current.focus()}></TextInput>
          </View>
          <View style={styles.khung4}>
            <TextInput
              style={{fontSize: 35}}
              maxLength={1}
              value={Code4}
              onChangeText={setCode4}
              ref={ref_input4}
              returnKeyType="next"
              onSubmitEditing={() => ref_input5.current.focus()}></TextInput>
          </View>
          <View style={styles.khung3}>
            <TextInput
              style={{fontSize: 35}}
              maxLength={1}
              value={Code5}
              onChangeText={setCode5}
              ref={ref_input5}
              returnKeyType="next"
              onSubmitEditing={() => ref_input6.current.focus()}></TextInput>
          </View>
          <View style={styles.khung4}>
            <TextInput
              style={{fontSize: 35}}
              maxLength={1}
              value={Code6}
              onChangeText={setCode6}
              ref={ref_input6}></TextInput>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterPhone')}>
          <Text
            style={{
              color: '#E94057',
              fontSize: 16,
              flexDirection: 'row',
              justifyContent: 'center',
              textAlign: 'center',
              fontWeight: '500',
              top: 750,
              fontStyle: 'normal',
            }}>
            Gửi lại mã
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mailnut}>
        <Pressable style={styles.nut} onPress={ConfimCode}>
          <Text style={styles.nutText}>Tiếp tục</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mailnut: {
    position: 'absolute',
    width: '100%',
    top: 390,
    height: 56,

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  nut: {
    width: '80%',
    height: 56,
    backgroundColor: '#E94057',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 15,
  },
  nutText: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '700',
    fontStyle: 'normal',
    color: 'white',
  },

  khunghinh: {
    position: 'absolute',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
    height: 58,

    top: 250,
  },
  khung: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '15%',
    height: 50,
    borderBottomColor: '#E94057',
    borderLeftColor: '#E94057',
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightColor: '#E94057',
    borderTopColor: '#E94057',
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 8,
  },
  khung4: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '15%',
    height: 50,
    borderBottomColor: '#E94057',
    borderLeftColor: '#E94057',
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightColor: '#E94057',
    borderTopColor: '#E94057',
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 8,
  },
  khung2: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '15%',
    height: 50,
    borderBottomColor: '#E94057',
    borderLeftColor: '#E94057',
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightColor: '#E94057',
    borderTopColor: '#E94057',
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 8,
  },
  khung3: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '15%',
    height: 50,
    borderBottomColor: '#E94057',
    borderLeftColor: '#E94057',
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightColor: '#E94057',
    borderTopColor: '#E94057',
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 8,
  },

  chitietsdt: {
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '400',

    fontStyle: 'normal',
  },
  MOBILEText: {
    fontSize: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '700',
  },
  MOBILE: {
    position: 'absolute',
    width: '80%',
    height: 93,
    left: 40,
    top: 128,
  },
});
