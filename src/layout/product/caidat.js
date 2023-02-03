/** @format */

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  TextInput,
  ToastAndroid,
  Modal,
  Alert,
  Share,
  Linking,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../../config';
import {getAuth, signOut} from 'firebase/auth';
import {getDatabase, ref, onValue, set, push, update} from 'firebase/database';
import {UserContext} from '../user/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InAppReview from 'react-native-in-app-review';
export const CaiDat = ({route, navigation}) => {
  initializeApp(firebaseConfig);
  let noidung1 = '';
  const {onLogout} = useContext(UserContext);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [rate, setrate] = useState(true);

  useEffect(() => {
    const reference = ref(db, 'users/' + user);
    onValue(reference, childSnapshot => {
      const namepr = childSnapshot.child('name').val();
      const avtpr = childSnapshot.child('avt').val();
      setname(namepr);
      setavt(avtpr);
      setrate(childSnapshot.child('rate').val());
      console.log(rate);
      if (rate != true) {
        Alert.alert(
          'Đánh giá',
          'Bạn hãy đánh giá ứng dụng của chúng tôi để chúng tôi cho bạn một trải nghiệm tốt hơn.\nChân thành cảm ơn❤️🥰',
          [
            {
              text: 'Bỏ qua',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Đánh giá ngay',
              onPress: () => {
                const reference = ref(db, 'users/' + user);
                update(reference, {
                  rate: true,
                });
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.thanhthong0312.GiaoDienApp',
                );
              },
            },
          ],
        );
      }
    });
  });

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Bạn và tôi hãy cùng nhau trò chuyện và tìm người phù hợp ngay nào ❤ \n' +
          'Tải GenzLove - Tìm bạn hẹn hò tại:\n' +
          'https://play.google.com/store/apps/details?id=com.thanhthong0312.GiaoDienApp',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const logOut = async () => {
    const referencerrs = ref(db, 'users/' + user);
    update(referencerrs, {
      trangthai: 'Chưa Hoạt Động',
    });
    const auth = getAuth();
    await signOut(auth)
      .then(async () => {
        await AsyncStorage.setItem('email', '');
        await AsyncStorage.setItem('password', '');
        await AsyncStorage.setItem('tokenLogin', '');
        await AsyncStorage.setItem('token', '');
        console.log('LOG' + (await AsyncStorage.getItem('tokenLogin')));
        onLogout();
      })
      .catch(error => {
        // An error happened.
      });
  };
  return (
    <View style={styles.tong}>
      <Text style={styles.chuu}>Cài đặt</Text>

      <View>
        <Image style={styles.avt} source={{uri: avt}} />
        <Text style={styles.ten}>{name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.ten1}>Xem trang cá nhân</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.a}>
        <View style={styles.khung}>
          <TouchableOpacity onPress={() => navigation.navigate('Chinhsua')}>
            <Text style={styles.chu}>Chỉnh sửa thông tin</Text>
            <Image
              style={styles.edit1}
              source={require('../../image/edit.png')}
            />
            <Image
              style={styles.tiep}
              source={require('../../image/next.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{top: 60}}>
          <View style={styles.khung}>
            <TouchableOpacity onPress={onShare}>
              <Text style={styles.chu}>Mời bạn bè</Text>
              <Image
                style={styles.edit1}
                source={require('../../image/add-group.png')}
              />
              <Image
                style={styles.tiep}
                source={require('../../image/next.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{top: 191}}>
        <View style={styles.khung}>
          <TouchableOpacity onPress={() => navigation.navigate('ChangePass')}>
            <Text style={styles.chu}>Bảo vệ</Text>
            <Image
              style={styles.edit1}
              source={require('../../image/bv.png')}
            />
            <Image
              style={styles.tiep}
              source={require('../../image/next.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{top: 60}}>
          <View style={styles.khung}>
            <TouchableOpacity onPress={() => navigation.navigate('AllSuport')}>
              <Text style={styles.chu}>Đơn gửi hỗ trợ của bạn</Text>
              <Image
                style={styles.edit1}
                source={require('../../image/support.png')}
              />
              <Image
                style={styles.tiep}
                source={require('../../image/next.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{top: 120}}>
          <View style={styles.khung}>
            <TouchableOpacity onPress={() => navigation.navigate('AllReport')}>
              <Text style={styles.chu}>Đơn báo cáo của bạn</Text>
              <Image
                style={styles.edit1}
                source={require('../../image/document.png')}
              />
              <Image
                style={styles.tiep}
                source={require('../../image/next.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{top: 180}}>
          <View style={styles.khung}>
            <TouchableOpacity onPress={logOut}>
              <Text style={styles.chu}>Đăng xuất</Text>
              <Image
                style={styles.edit1}
                source={require('../../image/log-out.png')}
              />
              <Image
                style={styles.tiep}
                source={require('../../image/next.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tiep: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    top: 15,
  },
  edit1: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 20,
    top: 15,
  },
  a: {
    flexDirection: 'column',
    height: '50%',
    width: '100%',
    position: 'absolute',
    top: 200,
  },

  khung: {
    position: 'absolute',
    width: '90%',
    height: 50,
    marginHorizontal: 20,
    top: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },

  ten: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    top: 60,
  },
  ten1: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    top: 65,
    opacity: 0.7,
  },
  avt: {
    borderRadius: 20,
    width: 90,
    height: 90,
    top: 50,
    alignSelf: 'center',
  },

  tong: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'white',
  },
  chu: {
    width: '100%',
    position: 'absolute',
    left: 50,
    fontSize: 20,
    top: 13,
  },
  chuu: {
    width: '100%',
    position: 'absolute',
    color: '#E94057',
    left: 20,
    fontSize: 25,
    top: 10,
  },
});
