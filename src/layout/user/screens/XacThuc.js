import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Pressable,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../../../config';
import {getAuth, signOut, sendSignInLinkToEmail} from 'firebase/auth';
import firebase from 'firebase/compat/app';
import {getDatabase} from 'firebase/database';
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from 'expo-firebase-recaptcha';
const XacThuc = ({navigation, route}) => {
  const {id, email, sdt} = route.params;
  initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
  const db = getDatabase();
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const {initialMinute = 0, initialSeconds = 59} = navigation;
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
  const [hide, sethide] = useState(false);
  useEffect(() => {
    if (verificationId != null) {
      console.log('da co ' + verificationId);
    }
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
  }, [verificationId]);
  const auth = getAuth();
  const sendSms = () => {
    sethide(true);
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider
        .verifyPhoneNumber(sdt, recaptchaVerifier.current)
        .then(setVerificationId);
    } catch (error) {
      alert(error);
    }
  };
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
        navigation.navigate('ChangePass');
      })
      .catch(error => {
        ToastAndroid.show('Mã sai', ToastAndroid.BOTTOM);
      });
  };
  const sendEmail = async () => {
    try {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          ToastAndroid.show(
            'Đã gửi một liên kết xác minh về email của bạn',
            ToastAndroid.BOTTOM,
          );
          navigation.navigate('Login');
        })
        .catch(error => {
          console.log(error.message);
        });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
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
      <View style={{width: '100%', paddingHorizontal: 20, top: 80}}>
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
          *Hãy chọn phương thức xác thực tài khoản để đổi mật khẩu.
        </Text>
      </View>
      <View style={{top: 110, paddingHorizontal: 20}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            height: 60,
            borderRadius: 10,
            borderColor: '#ABABAB',
            borderWidth: 0.5,
            justifyContent: 'center',
          }}
          onPress={sendSms}
          disabled={sdt != undefined ? false : true}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../../image/sms.png')}
              style={{width: 40, height: 40, left: 15}}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 15, left: 30}}>Xác thực SMS</Text>
              <Text style={{fontSize: 15, left: 30, top: 5, opacity: 0.7}}>
                {sdt != undefined ? sdt : 'Không có số điện thoại'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            height: 60,
            borderRadius: 10,
            borderColor: '#ABABAB',
            borderWidth: 0.5,
            justifyContent: 'center',
            top: 20,
          }}
          onPress={sendEmail}
          disabled={email != undefined ? false : true}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../../image/email.png')}
              style={{width: 40, height: 40, left: 15}}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontSize: 15, left: 30}}>Xác thực Email</Text>
              <Text style={{fontSize: 15, left: 30, top: 5, opacity: 0.7}}>
                {email != undefined ? email : 'Không có email nào'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {hide == true ? (
        <View style={{top: 150, paddingHorizontal: 20}}>
          <View style={styles.MOBILE}>
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
                  keyboardType="number-pad"
                  autoFocus={true}></TextInput>
              </View>
              <View style={styles.khung2}>
                <TextInput
                  style={{fontSize: 35}}
                  maxLength={1}
                  value={Code2}
                  onChangeText={setCode2}
                  keyboardType="number-pad"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    ref_input3.current.focus()
                  }></TextInput>
              </View>
              <View style={styles.khung3}>
                <TextInput
                  style={{fontSize: 35}}
                  maxLength={1}
                  value={Code3}
                  onChangeText={setCode3}
                  keyboardType="number-pad"
                  ref={ref_input3}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    ref_input4.current.focus()
                  }></TextInput>
              </View>
              <View style={styles.khung4}>
                <TextInput
                  style={{fontSize: 35}}
                  maxLength={1}
                  value={Code4}
                  onChangeText={setCode4}
                  keyboardType="number-pad"
                  ref={ref_input4}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    ref_input5.current.focus()
                  }></TextInput>
              </View>
              <View style={styles.khung3}>
                <TextInput
                  style={{fontSize: 35}}
                  maxLength={1}
                  value={Code5}
                  onChangeText={setCode5}
                  keyboardType="number-pad"
                  ref={ref_input5}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    ref_input6.current.focus()
                  }></TextInput>
              </View>
              <View style={styles.khung4}>
                <TextInput
                  keyboardType="number-pad"
                  style={{fontSize: 35}}
                  maxLength={1}
                  value={Code6}
                  onChangeText={setCode6}
                  ref={ref_input6}></TextInput>
              </View>
            </View>
            <View style={styles.mailnut}>
              <Pressable style={styles.nut} onPress={ConfimCode}>
                <Text style={styles.nutText}>Tiếp tục</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default XacThuc;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    height: 40,
    top: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mailnut: {
    position: 'absolute',
    width: '100%',
    top: 90,
    height: 56,

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  nut: {
    width: '80%',
    height: 50,
    backgroundColor: '#E94057',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
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

    top: 25,
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
  },
});
