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
  Animated,
  Easing,
  Alert,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {initializeApp} from 'firebase/app';
import firebase from 'firebase/compat';
import {firebaseConfig, firebaseDatabaseRef} from '../../../config';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {
  getDatabase,
  onValue,
  set,
  push,
  serverTimestamp,
} from 'firebase/database';
import * as Permission from 'expo-permissions';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';
import {getStorage, ref, uploadBytes, uploadString} from 'firebase/storage';
import {v4 as uuid} from 'uuid';
export const PostStatus = ({route, navigation}) => {
  const app = initializeApp(firebaseConfig);
  const data = [];
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [tuoi, settuoi] = useState();
  const [tick, settick] = useState();
  const [diachi, setdiachi] = useState();
  const [ngaysinh, setngaysinh] = useState();
  const [gioitinh, setgioitinh] = useState();
  const [sothich, setsothich] = useState();
  const [location, setlocation] = useState();
  const [noidung, setnoidung] = useState('');
  const [image, setImage] = useState(null);
  const [upload, setupload] = useState('');
  const [uplink, setuplink] = useState();
  const [tinh, settinh] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [isCheckedStatus, setCheckedStatus] = useState(true);
  const [isCheckedStory, setCheckedStory] = useState(false);
  const auth = getAuth(app);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  const storage = getStorage(app);
  const [noidung1, setnoidung1] = useState();
  useEffect(() => {
    try {
      const {hoatdong} = route.params;
      setnoidung1(hoatdong);
    } catch (error) {}
    const reference = firebaseDatabaseRef(db, 'users/' + user);
    onValue(reference, childSnapshot => {
      const namepr = childSnapshot.child('name').val();
      const avtpr = childSnapshot.child('avt').val();
      settick(childSnapshot.child('tick').val());
      setname(namepr);
      setavt(avtpr);
    });
  });
  function makeid(length) {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.uri);
      let idk = makeid(60);
      uploadImageToBucket(result.uri, idk);
      setuplink(idk + '.png?alt=media');
      console.log(uplink);
    }
  };
  const uploadImageToBucket = async (uri, imageName) => {
    const res = await fetch(uri);
    const blob = await res.blob();
    const storageRef = ref(
      storage,
      'images/album/' + user + '/' + imageName + '.png',
    );
    setuplink(imageName + '.png?alt=media');
    uploadBytes(storageRef, blob).then(snapshot => {
      console.log('Uploaded a blob or file!' + snapshot.metadata.name);
      return snapshot.metadata.name;
    });
  };

  const getLocation = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setlocation('Không có quyền truy cập vị trí');
    }
    const vitri = await Location.getCurrentPositionAsync({});
    const diachi = await Location.reverseGeocodeAsync({
      latitude: vitri.coords.latitude,
      longitude: vitri.coords.longitude,
    });
    console.log(
      'Vị Trí : ' + vitri.coords.latitude + ':' + vitri.coords.longitude,
    );
    let city;
    let country;
    let duong;
    diachi.find(p => {
      country = p.country;
      city =
        p.streetNumber == null
          ? ''
          : p.streetNumber + ' ' + p.street == null
          ? ''
          : p.street + ', ' + p.subregion == null
          ? ''
          : p.subregion + ', ' + p.region == null
          ? ''
          : p.region + ', ' + p.country;
      settinh(p.region);
      setlocation(city);
    });
  };
  const openModal = () => {
    setModalVisible(true);
  };
  const AddPost = () => {
    const id = new Date().getTime();
    setModalVisible(false);
    const d = new Date();
    const ngay = d.getDate();
    const thang = d.getMonth() + 1;
    const nam = d.getFullYear();
    if (
      noidung == '' ||
      (noidung == null && image == null && location == undefined)
    ) {
      ToastAndroid.show('Chưa có nội dung', ToastAndroid.BOTTOM);
    } else {
      if (isCheckedStatus == true) {
        const reference13 = firebaseDatabaseRef(db, 'post/' + user + '/' + id);
        set(reference13, {
          name: name,
          avt: avt,
          id: id,
          noidung: noidung,
          checkin: location == undefined ? '' : location,
          image:
            uplink != undefined
              ? 'https://firebasestorage.googleapis.com/v0/b/duantotnghiepreact.appspot.com/o/images%2Falbum%2F' +
                user +
                '%2F' +
                uplink
              : '',
          thoigian: ngay + ' Tháng ' + thang + ' Năm ' + nam,
          user: user,
          hoatdong: noidung1 != undefined ? noidung1 : '',
          tick: tick,
          like: 0,
        });
      }
      if (isCheckedStory == true && uplink != undefined) {
        const reference13 = firebaseDatabaseRef(db, 'story/' + user + '/' + id);
        set(reference13, {
          name: name,
          avt: avt,
          id: id,
          noidung: noidung,
          checkin: location == undefined ? '' : location,
          image:
            uplink != undefined
              ? 'https://firebasestorage.googleapis.com/v0/b/duantotnghiepreact.appspot.com/o/images%2Falbum%2F' +
                user +
                '%2F' +
                uplink
              : '',
          thoigian: ngay + ' Tháng ' + thang + ' Năm ' + nam,
          user: user,
          hoatdong: noidung1 != undefined ? noidung1 : '',
          tick: tick,
          like: 0,
        });
      }
      ToastAndroid.show('Đã chia sẻ bài viết', ToastAndroid.BOTTOM);
      navigation.navigate('Profile');
    }
  };

  const ChonAnh = () => {};
  return (
    <View style={styles.tong}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Bạn muốn chia sẻ bài viết ở đâu!
              </Text>
              <View style={styles.checkbox}>
                <Checkbox
                  value={isCheckedStatus}
                  onValueChange={setCheckedStatus}
                  color={isCheckedStatus ? '#E94057' : undefined}
                />
                <Text style={{left: 5}}>Dòng thời gian</Text>
              </View>
              <View style={styles.checkbox}>
                <Checkbox
                  value={isCheckedStory}
                  onValueChange={setCheckedStory}
                  color={isCheckedStory ? '#E94057' : undefined}
                />
                <Text style={{left: 5}}>Khoảnh khắc mới</Text>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={AddPost}>
                <Text style={styles.textStyle}>Chia Sẻ</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
      </View>
      <View style={styles.e}>
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
                source={require('../../image/back.png')}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 23, left: 10, opacity: 0.7}}>
              Tạo bài viết
            </Text>
          </View>
          <View style={{width: 75, height: 45, opacity: 0.4}}>
            <TouchableOpacity
              onPress={openModal}
              style={{
                width: '100%',
                height: '100%',
                right: 20,
                backgroundColor: '#DCDCDC',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 16}}>ĐĂNG</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.infomain}>
        <View style={styles.info}>
          <Image
            style={{width: 60, height: 60, borderRadius: 35}}
            source={{uri: avt}}
          />
          <View style={styles.tenmain}>
            <View style={{flexDirection: 'row', width: '90%', paddingRight: 5}}>
              <Text style={{fontSize: 18, fontWeight: '500'}}>
                {name + ' '} {noidung1}
                <Text style={{fontSize: 16}}>
                  {tinh != '' && tinh != null ? ' tại ' : null}
                </Text>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  {tinh != '' ? tinh : null}{' '}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.mainnhap}>
          <View
            style={{
              width: '90%',
              height: 100,
              borderBottomColor: '#ABABAB',
              borderBottomWidth: 0.5,
              borderRightColor: '#ABABAB',
              borderRightWidth: 0.5,
              borderLeftColor: '#ABABAB',
              borderLeftWidth: 0.5,
              borderTopColor: '#ABABAB',
              borderTopWidth: 0.5,
              left: '5%',
              borderRadius: 10,
            }}>
            <TextInput
              value={noidung}
              onChangeText={setnoidung}
              style={{
                left: 20,
                width: '90%',
                top: 5,
              }}
              returnKeyType="done"
              multiline={true}
              placeholder="Bạn đang nghĩ gì?"></TextInput>
          </View>
          {image == null ? (
            <Image style={{width: 0, height: 0}} resizeMethod="auto" />
          ) : (
            image && (
              <Image
                style={styles.image}
                resizeMethod="auto"
                source={{uri: image}}
              />
            )
          )}
          <View
            style={{
              width: '90%',
              height: 35,

              right: 0,
              left: '5%',
              top: 20,
            }}>
            <TouchableOpacity
              onPress={pickImage}
              style={{flexDirection: 'row', alignItems: 'center', left: 5}}>
              <Image
                style={{width: 30, height: 30, right: 10}}
                source={require('../../image/image.png')}
              />
              <Text style={{fontSize: 16, width: 100}}>Ảnh/video</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '90%',
              height: 35,

              right: 0,
              justifyContent: 'center',
              left: '5%',
              top: 20,
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', left: 5}}
              onPress={() => navigation.navigate('RoomCall')}>
              <Image
                style={{width: 30, height: 30, right: 10}}
                source={require('../../image/friend.png')}
              />
              <Text style={{fontSize: 16, width: 200}}>Phòng họp mặt</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '90%',
              height: 35,
              right: 0,
              justifyContent: 'center',
              left: '5%',
              top: 20,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Camxuc')}
              style={{flexDirection: 'row', alignItems: 'center', left: 5}}>
              <Image
                style={{width: 30, height: 30, right: 10}}
                source={require('../../image/camxúc.png')}
              />
              <Text style={{fontSize: 16, width: 200}}>Cảm xúc/hoạt động</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '90%',
              height: 35,

              right: 0,
              justifyContent: 'center',
              left: '5%',
              top: 20,
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', left: 5}}
              onPress={() => navigation.navigate('LiveVideo')}>
              <Image
                style={{width: 30, height: 30, right: 10}}
                source={require('../../image/live.png')}
              />
              <Text style={{fontSize: 16, width: 100}}>Phát trực tiếp</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '90%',
              height: 35,

              right: 0,
              justifyContent: 'center',
              left: '5%',
              top: 20,
            }}>
            <TouchableOpacity
              onPress={getLocation}
              style={{flexDirection: 'row', alignItems: 'center', left: 5}}>
              <Image
                style={{width: 30, height: 30, right: 10}}
                source={require('../../image/map.png')}
              />
              <Text style={{fontSize: 16, width: 100}}>Vị trí hiện tại</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={openModal}
            style={{
              width: '90%',
              height: 50,
              top: 40,
              alignItems: 'center',
              left: '5%',
              backgroundColor: '#E94057',
              justifyContent: 'center',
              borderRadius: 15,
            }}>
            <Text style={{fontSize: 18, color: 'white'}}>ĐĂNG</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 8,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#E94057',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  image: {
    left: 20,
    width: 100,
    height: 100,
    borderRadius: 20,
    top: 10,
  },
  mainnhap: {
    flexDirection: 'column',
    width: '100%',
    top: 20,
    height: '100%',
  },
  infomain: {
    top: 75,
    width: '100%',
    height: '100%',
  },
  tenmain: {
    width: '100%',
    height: 60,
    left: 10,
  },
  info: {
    width: '90%',
    height: 60,
    left: 20,
    paddingRight: 20,
    flexDirection: 'row',
  },
  r: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    fontSize: 20,
  },
  e: {
    position: 'absolute',
    width: '100%',
    height: 40,

    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  w: {
    position: 'absolute',
    width: '100%',
    height: 100,
    left: 20,
    top: 90,
    fontSize: 20,
    opacity: 0.3,
  },
  q: {
    position: 'absolute',
    width: '100%',
    height: 100,
  },
  tong: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});
