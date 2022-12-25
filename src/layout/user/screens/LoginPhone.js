import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from 'expo-firebase-recaptcha';
import {firebaseConfig} from '../../../../config';
import firebase from 'firebase/compat/app';
import {getAuth} from 'firebase/auth';

export const LoginPhone = props => {
  firebase.initializeApp(firebaseConfig);
  const {navigation} = props;
  const [sdt, setsdt] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const {initialMinute = 0, initialSeconds = 10000000000} = navigation;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    if (verificationId != null) {
      navigation.navigate('LoginCfPhone', {
        sdt,
        verificationId,
      });
    }
    return () => {};
  }, [verificationId]);

  const SendOTP = async sdtt => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider
        .verifyPhoneNumber(sdtt, recaptchaVerifier.current)
        .then(setVerificationId);
    } catch (error) {
      alert(error);
    }
  };
  // ...

  return (
    <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View style={styles.MOBILE}>
        <Text style={styles.MOBILEText}>Số Điện Thoại</Text>
        <Text style={styles.chitietsdt}>
          Vui lòng nhập số điện thoại hợp lệ của bạn. Chúng tôi sẽ gửi cho bạn
          một mã gồm 4 chữ số để xác minh tài khoản của bạn.
        </Text>
      </View>

      <View style={styles.khunghinh}>
        <TextInput
          style={styles.khung}
          placeholder="334233235"
          maxLength={10}
          value={sdt}
          onChangeText={setsdt}
          returnKeyType="done"></TextInput>
        <Image
          style={{position: 'relative', right: 110}}
          source={require('../../../image/vietnam.png')}
        />
        <Text style={{position: 'relative', right: 105}}>(+84)</Text>
      </View>
      <View style={styles.mailnut}>
        <TouchableOpacity
          style={styles.nut}
          onPress={() => SendOTP('+84' + sdt)}>
          <Text style={styles.nutText}>Tiếp tục</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 58,

    top: 250,
  },
  khung: {
    paddingLeft: 100,
    position: 'absolute',
    width: '80%',
    height: 58,
    borderBottomColor: '#ABABAB',
    borderLeftColor: '#ABABAB',
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightColor: '#ABABAB',
    borderTopColor: '#ABABAB',
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 8,
  },

  chitietsdt: {
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
  },
  MOBILEText: {
    fontSize: 34,
    fontWeight: '700',
  },
  MOBILE: {
    position: 'absolute',
    width: 295,
    height: 93,
    left: 40,
    top: 128,
  },
});
