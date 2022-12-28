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
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../../config';
import {getAuth, signOut} from 'firebase/auth';
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  update,
  remove,
  query,
  equalTo,
} from 'firebase/database';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const Timkiem = ({navigation, route}) => {
  initializeApp(firebaseConfig);
  const dataUser = [];
  const dataUserGoiY = [];
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  const [dulieu, setdulieu] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const reference = ref(db, 'users');
  onValue(reference, snapshot => {
    snapshot.forEach(childSnapshot => {
      if (
        childSnapshot.child('name').exportVal() == dulieu ||
        childSnapshot.child('nghenghiep').exportVal() == dulieu ||
        childSnapshot.child('diachi').exportVal() == dulieu ||
        childSnapshot.child('gioitinh').exportVal() == dulieu ||
        childSnapshot.child('tuoi').exportVal() == dulieu
      ) {
        const id = childSnapshot.child('id').exportVal();
        const name = childSnapshot.child('name').exportVal();
        const avt = childSnapshot.child('avt').exportVal();
        const tuoi = childSnapshot.child('tuoi').exportVal();
        const diachi = childSnapshot.child('diachi').exportVal();
        const nghenghiep = childSnapshot.child('nghenghiep').exportVal();
        const fl = childSnapshot.child('follow').exportVal();
        const trangthai = childSnapshot.child('trangthai').exportVal();
        dataUser.push({
          id: id,
          name: name,
          avt: avt,
          tuoi: tuoi,
          diachi: diachi,
          nghenghiep: nghenghiep,
          fl: fl,
          trangthai: trangthai,
        });
        const ganday = ref(db, 'lichsutimkiem/' + user + '/' + dulieu);
        set(ganday, {
          id: user,
          name: dulieu,
        });
      }
    });
  });
  const referencelichsu = ref(db, 'lichsutimkiem/' + user);
  onValue(referencelichsu, snapshot => {
    snapshot.forEach(childSnapshot => {
      const id = childSnapshot.child('id').exportVal();
      const name = childSnapshot.child('name').exportVal();
      dataUserGoiY.push({
        id: id,
        name: name,
      });
    });
  });

  const RemoveLichSu = id => {
    const referencelichsu = ref(db, 'lichsutimkiem/' + user + '/' + id);
    remove(referencelichsu).then = () => {
      ToastAndroid.show(
        id + ' Đã bị xoá khỏi lịch sử tìm kiếm',
        ToastAndroid.BOTTOM,
      );
    };
  };
  const RemoveAllLichSu = () => {
    const referencelichsu = ref(db, 'lichsutimkiem/' + user);
    remove(referencelichsu).then = () => {
      ToastAndroid.show(
        'Tất cả lịch sử tìm kiếm đã bị xoá',
        ToastAndroid.BOTTOM,
      );
    };
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.con}>
        <TextInput
          value={dulieu}
          onChangeText={setdulieu}
          style={styles.w}
          returnKeyType="done"
          placeholder="Tìm kiếm bạn bè"></TextInput>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.edit} source={require('../../image/back.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setdulieu('')}>
          <Image
            style={{
              width: 20,
              height: 20,
              position: 'absolute',
              right: 10,
              top: 15,
              opacity: 0.8,
            }}
            source={require('../../image/remove.png')}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          top: 20,
          paddingHorizontal: 20,
        }}>
        <View>
          <Text style={{opacity: 0.5}}>Tìm kiếm gần đây </Text>
        </View>
        <TouchableOpacity onPress={RemoveAllLichSu}>
          <Text style={styles.chu}>Xóa</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          top: 35,
          paddingHorizontal: 30,
        }}>
        <FlatList
          style={{width: '100%', height: '100%'}}
          contentContainerStyle={{
            width: '100%',
            paddingBottom: 80,
            height: '100%',
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={dataUserGoiY}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                paddingBottom: 5,
              }}>
              <TouchableOpacity onPress={() => setdulieu(item.name)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => RemoveLichSu(item.name)}>
                <Image
                  style={{width: 15, height: 15}}
                  source={require('../../image/cancel.png')}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <View
        style={{
          top: 70,
          backgroundColor: 'white',
          width: '100%',
          position: 'absolute',
          opacity: 0.8,
        }}>
        {dataUser.map((item, index) => {
          return (
            <View
              style={{
                width: '100%',
                height: 80,
                paddingTop: 10,
                paddingStart: 10,
                flexDirection: 'row',
                backgroundColor: 'white',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProfileFriend', {id: item.id})
                  }>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      resizeMode: 'cover',
                      borderRadius: 10,
                      marginRight: 10,
                      marginStart: 10,
                    }}
                    source={{uri: item.avt}}></Image>
                  {item.trangthai == 'Hoạt Động' ? (
                    <Image
                      style={{
                        left: 5,
                        bottom: 62,
                        width: 15,
                        height: 15,
                      }}
                      source={require('../../image/activeIcon.png')}
                    />
                  ) : (
                    <Image
                      style={{
                        left: 10,
                        bottom: 60,
                        width: 15,
                        height: 15,
                      }}
                      source={require('../../image/new-moon.png')}
                    />
                  )}
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'column',
                    top: 7,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    {item.name}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 15,
                        opacity: 0.8,
                      }}>
                      Có
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        left: 3,
                        color: '#E94057',
                      }}>
                      {item.fl}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        opacity: 0.8,
                        left: 6,
                      }}>
                      người yêu thích
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  top: 10,
                  right: 20,
                  elevation: 10,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../image/tim.png')}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Timkiem;

const styles = StyleSheet.create({
  chu: {
    color: '#E94057',
  },
  edit: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 10,
    top: 15,
    opacity: 0.8,
  },
  w: {
    position: 'absolute',
    width: '90%',
    height: 50,
    left: 40,
    opacity: 0.5,
    justifyContent: 'center',
  },
  con: {
    top: 10,
    width: '95%',
    height: 50,
    borderRadius: 20,
    backgroundColor: 'white',
    marginHorizontal: 10,
    elevation: 5,
  },
});
