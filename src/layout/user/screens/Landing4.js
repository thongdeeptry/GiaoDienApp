import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithCredential,
  signInWithCustomToken,
} from 'firebase/auth';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../../../config';
import firebase from 'firebase/compat/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Landing4 = props => {
  const {navigation} = props;
  firebase.initializeApp(firebaseConfig);
  GoogleSignin.configure({
    webClientId:
      '850540325665-qiil45ckdr106jv8d0804fgdhtcokrht.apps.googleusercontent.com',
  });
  initializeApp(firebaseConfig);
  const loginWithGoogle = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken, user} = await GoogleSignin.signIn();
    console.log(user.email + user.id + idToken);
    // Create a Google credential with the token
    const googleCredential =
      firebase.auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    signInWithCredential(getAuth(), googleCredential).then(async () => {
      const users = getAuth().currentUser.uid;
      console.log('UID - ' + users);
      navigation.navigate('ProfileName', {
        email: user.email,
        user: users,
        password: user.id,
      });
    });
    await AsyncStorage.setItem('tokenLogin', idToken);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMethod="auto"
          source={require('../../../image/auth.png')}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Đăng ký để tiếp tục</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.dangky}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.dangkyText}>Tiếp tục với email</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer1}>
        <Text
          style={styles.textTitle1}
          onPress={() => navigation.navigate('RegisterPhone')}>
          Sử dụng số điện thoại
        </Text>
      </View>
      <View style={styles.khac}>
        <Text style={styles.khacText}>hoặc đăng ký bằng</Text>
        <View style={styles.mainkhac}>
          {/* <TouchableOpacity style={styles.gg}>
            <Image source={require('../../../image/fbvippng.png')} />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.fb} onPress={loginWithGoogle}>
            <Image source={require('../../../image/ggvip.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.maindieukhoan}>
        <View>
          <Text style={{color: '#E94057', marginLeft: 20}}>
            Điều khoản sử dụng
          </Text>
        </View>
        <View style={styles.baomat}>
          <Text style={{color: '#E94057', marginRight: 20}}>
            Chính sách bảo mật
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  maindieukhoan: {
    position: 'absolute',
    bottom: 50,
    textAlign: 'center',
    width: '100%',
    height: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  mainkhac: {
    position: 'absolute',
    width: '40%',
    height: 57,
    bottom: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  gg: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 50,
    height: 50,
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
  fb: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 50,
    height: 50,
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

  khacText: {
    textAlign: 'center',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    bottom: 50,
  },
  khac: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 106,
    bottom: 50,
  },
  textContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textTitle1: {
    position: 'absolute',
    width: 295,
    height: 27,
    top: 485,
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    color: '#E94057',
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    top: 390,
    height: 56,

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dangky: {
    width: '80%',
    height: 56,
    backgroundColor: '#E94057',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 15,
  },
  dangkyText: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'normal',
    color: 'white',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textTitle: {
    position: 'absolute',
    width: 295,
    height: 27,
    top: 350,

    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    color: '#000000',
  },
  container: {
    backgroundColor: 'white',
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#FFFFFF',
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    height: 360,
    flexDirection: 'row',
    justifyContent: 'center',
    top: 100,
  },
  image: {
    width: 150,
    height: 150,
  },
});
