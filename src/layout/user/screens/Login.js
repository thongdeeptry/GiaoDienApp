import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {UserContext} from '../UserContext';
import {initializeApp} from 'firebase/app';
import Checkbox from 'expo-checkbox';
import {firebaseConfig} from '../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import {Formik} from 'formik';
import * as Yup from 'yup';
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email không đúng định dạng').required('nhap'),
  password: Yup.string().min(6).max(100).required('nhap'),
});
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithCustomToken,
} from 'firebase/auth';
export const Login = props => {
  const formikRef = useRef(null);
  const {navigation} = props;
  const {onLogin} = useContext(UserContext);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [sdt, setsdt] = useState();
  const [isCheckedStatus, setCheckedStatus] = useState(true);
  let app;
  useEffect(() => {
    app = initializeApp(firebaseConfig);
    if (!app.length) {
    }
  }, []);
  const db = getDatabase();
  const auth = getAuth(app);
  const Click = async () => {
    await signInWithEmailAndPassword(
      auth,
      formikRef.current?.values?.email,
      formikRef.current?.values?.password,
    )
      .then(async () => {
        console.log('Đăng nhập thành công');
        const user = getAuth().currentUser.uid;
        console.log('UID - ' + user);
        const referencerrs = ref(db, 'users/' + user);
        update(referencerrs, {
          password: formikRef.current?.values?.password,
        });
        if (isCheckedStatus == true) {
          await AsyncStorage.setItem('email', formikRef.current?.values?.email);
          await AsyncStorage.setItem(
            'password',
            formikRef.current?.values?.password,
          );
        } else {
          await AsyncStorage.setItem('email', '');
          await AsyncStorage.setItem('password', '');
        }
        const reference = ref(db, 'users/' + user);
        onValue(reference, childSnapshot => {
          const trangthai = childSnapshot.child('trangthai').val();
          console.log(trangthai);
          if (trangthai == 'Khóa') {
            navigation.navigate('VoHieuHoa');
          } else {
            onLogin();
          }
        });
      })
      .catch(error => {
        ToastAndroid.show(
          'Email hoặc mật khẩu không đúng',
          ToastAndroid.BOTTOM,
        );
      });
  };
  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}>
      {({
        values,
        errors,
        touched,
        handleSubmit,
        isValid,
        handleChange,
        setFieldTouched,
      }) => (
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          style={{width: '100%', height: '100%'}}>
          <KeyboardAvoidingView
            style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
            <View style={styles.container}>
              <View style={styles.mainplanta}>
                <Text style={styles.textplanta}>GenzLove</Text>
              </View>
              <View style={styles.mainchitiet}>
                <Text style={styles.chitiet}>Tìm kiếm 1 nửa của bạn</Text>
              </View>

              <View
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  marginTop: '10%',
                  backgroundColor: '#ffffff',
                  borderTopEndRadius: 30,
                  borderTopLeftRadius: 30,
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      top: 28,
                      left: 28,
                      fontSize: 28,
                      fontWeight: '700',
                      fontStyle: 'normal',
                    }}>
                    Chào mừng trở lại
                  </Text>
                  <Text
                    style={{
                      top: 28,
                      left: 28,
                      fontSize: 16,
                      color: '#898A8D',
                      fontWeight: '400',
                    }}>
                    Đăng nhập để tiếp tục
                  </Text>
                </View>
                <View style={styles.khunghinh}>
                  <View
                    style={[
                      styles.khung,
                      errors.email ? styles.khungerr : null,
                    ]}>
                    <TextInput
                      style={{fontSize: 20, width: '95%', height: '100%'}}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      placeholder="Email hoặc Số điện thoại"
                      multiline={true}
                      maxLength={100}></TextInput>
                  </View>
                  <View
                    style={[
                      styles.khung1,
                      errors.password ? styles.khung1err : null,
                    ]}>
                    <TextInput
                      style={{fontSize: 20, width: '95%', height: '100%'}}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      placeholder="Mật khẩu"
                      textContentType="password"
                      secureTextEntry={true}
                      maxLength={100}></TextInput>
                  </View>

                  <View
                    style={{
                      paddingTop: 15,
                      width: '100%',
                      height: 50,
                      flexDirection: 'row',
                    }}>
                    <View style={styles.checkbox}>
                      <Checkbox
                        value={isCheckedStatus}
                        onValueChange={setCheckedStatus}
                        color={isCheckedStatus ? '#E94057' : undefined}
                      />
                      <Text style={{left: 5}}>Lưu mật khẩu</Text>
                    </View>
                  </View>

                  <View style={styles.mailnut}>
                    <TouchableOpacity style={styles.nut} onPress={Click}>
                      <Text style={styles.nutText}>Đăng Nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{paddingTop: 10}}
                      onPress={() => navigation.navigate('QuenPass')}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: '#1F1F1F',
                          fontWeight: '400',
                        }}>
                        Bạn đã quên mật khẩu?
                      </Text>
                    </TouchableOpacity>
                    <View style={{paddingTop: 5}}>
                      <Text
                        onPress={() => navigation.navigate('LoginPhone')}
                        style={{color: '#FD397F', fontWeight: '400'}}>
                        Đăng nhập bằng số điện thoại
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.mailnut1}>
            <TouchableOpacity
              style={styles.nut1}
              onPress={() => navigation.navigate('Landing4')}>
              <Text style={styles.nutText1}>Đăng Ký</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    marginBottom: 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  mailnut: {
    position: 'absolute',
    width: '100%',
    top: 145,
    height: 56,

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  nut: {
    width: '100%',
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
    fontSize: 22,
    fontWeight: '700',
    fontStyle: 'normal',
    color: 'white',
  },

  mailnut1: {
    width: '100%',
    paddingHorizontal: 30,
    bottom: 20,
    position: 'absolute',
  },
  nut1: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    borderBottomColor: '#ABABAB',
    borderLeftColor: '#ABABAB',
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightColor: '#ABABAB',
    borderTopColor: '#ABABAB',
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
  },
  nutText1: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    fontStyle: 'normal',
    color: '#E94057',
  },

  khunghinh: {
    position: 'absolute',
    justifyContent: 'center',
    fontSize: 35,
    alignItems: 'center',
    flexDirection: 'column',
    width: '85%',
    marginLeft: 30,
    marginRight: 30,
    height: 50,

    top: 150,
  },
  khung: {
    margin: 20,

    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
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
  khungerr: {
    margin: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
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
  khung1err: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
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
  khung1: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
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
  khung12: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '0%',
    height: '0%',
    borderBottomColor: '#ABABAB',
    borderLeftColor: '#ABABAB',
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightColor: '#ABABAB',
    borderTopColor: '#ABABAB',
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 8,
    opacity: 0,
  },
  mainplanta: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 100,
  },
  textplanta: {
    fontWeight: '700',
    fontSize: 50,
    textAlign: 'center',
    color: '#ffffff',
  },

  mainchitiet: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 0,

    marginLeft: 52,
    marginRight: 52,
  },
  chitiet: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    color: '#ffffff',
  },

  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#E94057',
  },
});
