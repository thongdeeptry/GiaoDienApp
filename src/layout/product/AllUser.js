import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../../config';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, onValue, set, push, update} from 'firebase/database';
import {sendMess} from '../../constants/sendMess';
import {UserContext} from '../user/UserContext';
import SelectDropdown from 'react-native-select-dropdown';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
export const AllUser = ({route, navigation}) => {
  initializeApp(firebaseConfig);
  const {onLogout} = useContext(UserContext);
  const idCurrent = getAuth().currentUser.uid;
  const db = getDatabase();
  const [id, setid] = useState();
  const [nameCr, setnameCr] = useState();
  const [avtCr, setavtCr] = useState();
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [daco, setdaco] = useState(false);
  const [dacod, setdacod] = useState(false);
  const [tokendvCr, settokendvCr] = useState();
  const countries = ['Bạn bè', 'Tất Cả'];
  const dataFriend = [];
  const [loc, setloc] = useState(1);
  const dataFl = [];
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    const referencecrd = ref(db, 'users/' + idCurrent);
    onValue(referencecrd, childSnapshot => {
      const avtCrư = childSnapshot.child('avt').val();
      const nameCrư = childSnapshot.child('name').val();
      setavt(avtCrư);
      setname(nameCrư);
    });
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const logOut = () => {};
  const referencebanbe = ref(db, 'banbe/' + idCurrent);
  onValue(referencebanbe, childSnapshot1 => {
    childSnapshot1.forEach(snapshot1 => {
      const id = snapshot1.child('user').val();
      dataFriend.push(id);
    });
  });
  const referencer = ref(db, 'users');
  onValue(referencer, snapshot => {
    snapshot.forEach(childSnapshot => {
      if (
        loc == 0 &&
        dataFriend.includes(childSnapshot.child('id').exportVal()) == true &&
        childSnapshot.child('id').exportVal() != idCurrent
      ) {
        if (
          childSnapshot.child('trangthai').exportVal() == 'Hoạt Động' ||
          childSnapshot.child('trangthai').exportVal() == 'Chưa Hoạt Động'
        ) {
          const id = childSnapshot.child('id').exportVal();
          const name = childSnapshot.child('name').exportVal();
          const avt = childSnapshot.child('avt').exportVal();
          const trangthai = childSnapshot.child('trangthai').exportVal();
          const follow = childSnapshot.child('follow').exportVal();
          dataFl.push({
            id: id,
            name: name,
            avt: avt,
            trangthai: trangthai,
            fl: follow,
            tick: childSnapshot.child('tick').exportVal(),
          });
        }
      } else if (
        loc == 1 &&
        childSnapshot.child('id').exportVal() != idCurrent
      ) {
        if (
          childSnapshot.child('trangthai').exportVal() == 'Hoạt Động' ||
          childSnapshot.child('trangthai').exportVal() == 'Chưa Hoạt Động'
        ) {
          const id = childSnapshot.child('id').exportVal();
          const name = childSnapshot.child('name').exportVal();
          const avt = childSnapshot.child('avt').exportVal();
          const trangthai = childSnapshot.child('trangthai').exportVal();
          const follow = childSnapshot.child('follow').exportVal();
          dataFl.push({
            id: id,
            name: name,
            avt: avt,
            trangthai: trangthai,
            fl: follow,
            tick: childSnapshot.child('tick').exportVal(),
          });
        }
      }
    });
  });

  const date = new Date();
  let thang = date.getMonth() + 1;
  const Love = (id, tickfr) => {
    let fl;
    let co;
    let dc = false;
    setdaco(false);
    const referencecr = ref(db, 'users/' + id);
    onValue(referencecr, childSnapshot => {
      const tokendv = childSnapshot.child('token').val();
      const avtCr = childSnapshot.child('avt').val();
      const nameCr = childSnapshot.child('name').val();
      settokendvCr(tokendv);
      setavtCr(avtCr);
      setnameCr(nameCr);
    });
    const reference1d1s = ref(db, 'favourite/' + id + '/' + idCurrent);
    onValue(reference1d1s, snapshot1 => {
      if (snapshot1.exists()) {
        setdaco(true);
      } else {
        setdaco(false);
      }
    });

    const reference1 = ref(db, 'users/' + id);
    onValue(reference1, childSnapshot1 => {
      co = childSnapshot1.child('follow').val();
      fl = co + 1;
    });
    console.log('số fl : ' + fl);
    const reference112 = ref(db, 'favourite/' + idCurrent);
    onValue(reference112, childSnapshot1 => {
      childSnapshot1.forEach(snapshot1 => {
        const value = snapshot1.child('user').val();
        console.log(value);
        try {
          if (id == value) {
            const reference3 = ref(db, 'banbe/' + idCurrent + '/' + id);
            set(reference3, {
              user: id,
              id: idCurrent,
              avt: avtCr,
              name: nameCr,
              tick: tickfr,
            });

            const reference3d = ref(db, 'banbe/' + id + '/' + idCurrent);
            set(reference3d, {
              user: idCurrent,
              id: id,
              avt: avt,
              name: name,
            });

            ToastAndroid.show('Đã là bạn bè của nhau', ToastAndroid.BOTTOM);
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
    if (daco == false) {
      const reference3 = ref(db, 'favourite/' + id + '/' + idCurrent);
      onValue(reference3, childSnapshot => {
        if (!childSnapshot.exists()) {
          set(reference3, {
            user: idCurrent,
          });
          const reference = ref(db, 'users/' + id);
          update(reference, {
            follow: fl,
          });
          const reference5 = ref(db, 'notification/' + id);
          push(reference5, {
            user: idCurrent,
            id: id,
            noidung: ' vừa gửi lượt thích đến bạn',
            thoigian:
              date.getHours() +
              ':' +
              date.getMinutes() +
              ' ngày ' +
              date.getDate() +
              '/' +
              thang +
              '/' +
              date.getFullYear(),
            avt: avt,
            name: name,
          });
          ToastAndroid.show('Đã gửi lượt thích', ToastAndroid.BOTTOM);
          const referencecrd = ref(db, 'users/' + id);
          onValue(referencecrd, childSnapshot => {
            const tokendv = childSnapshot.child('token').val();
            sendMess(
              tokendv,
              'Thông báo mới từ ' + name,
              name + ' vừa yêu thích bạn',
            );
          });
        } else {
          const reference = ref(db, 'users/' + id);
          update(reference, {
            follow: co,
          });
          ToastAndroid.show(
            'Bạn đã yêu thích tài khoản này rồi!',
            ToastAndroid.BOTTOM,
          );
        }
      });
    } else {
      ToastAndroid.show(
        'Bạn đã yêu thích tài khoản này rồi!',
        ToastAndroid.BOTTOM,
      );
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingVertical: 10,
        }}>
        <View>
          <Text
            style={{
              fontSize: 23,
              color: '#E94057',
              fontWeight: '600',
              letterSpacing: 1.2,
            }}>
            GenzLove
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={logOut}>
            <Image
              style={{width: 35, height: 35, right: 5}}
              source={require('../../assets/search.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Image
              style={{width: 35, height: 35}}
              source={require('../../image/chat.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingBottom: 30,
          borderTopColor: '#ABABAB',
          borderTopWidth: 0.3,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingHorizontal: 0,
          }}>
          <SelectDropdown
            data={countries}
            buttonStyle={{
              width: 100,
              height: 20,
              right: 0,
              backgroundColor: 'white',
            }}
            buttonTextStyle={{fontSize: 15, color: 'blue'}}
            rowTextStyle={{fontSize: 15}}
            rowStyle={{height: 40}}
            defaultButtonText={'Chọn lọc'}
            onSelect={(selectedItem, index) => {
              setloc(index);
              console.log(selectedItem, loc);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </View>
        <View>
          <FlatList
            style={{marginBottom: 130}}
            showsVerticalScrollIndicator={false}
            data={dataFl}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item, index}) =>
              item.trangthai != 'Khoá' ? (
                <View
                  style={{
                    paddingTop: 10,
                    paddingStart: 10,
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    elevation: 5,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('XemAnh', {linkAnh: item.avt})
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
                            left: 5,
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
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '500',
                          }}>
                          {item.name}
                        </Text>
                        {item.tick == 'true' ? (
                          <Image
                            style={{width: 20, height: 20, bottom: 2, left: 2}}
                            source={require('../../image/verify.png')}
                          />
                        ) : (
                          <></>
                        )}
                      </View>
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

                  <View
                    style={{
                      width: 40,
                      height: 40,
                      top: 20,
                      right: 20,
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: 40,
                        height: 40,
                        bottom: 5,
                      }}
                      onPress={() => Love(item.id)}>
                      <Image
                        style={{width: 40, height: 40}}
                        source={require('../../image/tim.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: 30,
                        height: 30,
                        bottom: 10,
                      }}
                      onPress={() =>
                        navigation.navigate('ProfileFriend', {id: item.id})
                      }>
                      <Image
                        style={{width: 30, height: 30}}
                        source={require('../../image/info.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null
            }
          />
        </View>
      </View>
    </View>
  );
};
