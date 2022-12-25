import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ToastAndroid,
  Pressable,
} from 'react-native';
import {getDatabase, ref, set, push, update, remove} from 'firebase/database';
import {images, colors, icons, fontSizes} from '../../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {UIHeader} from '../../../components';
import ChatItem from './ChatItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  firebaseDatabaseRef,
  firebaseDatabase,
  auth,
  onValue,
} from '../../../../config';
import {setDoc, doc, getDoc} from 'firebase/firestore';
import {v4 as uuid} from 'uuid';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
function Chat(props) {
  const db = getDatabase();
  const user = auth.currentUser.uid;
  const [users, setUsers] = useState([]);
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const [refreshing, setRefreshing] = React.useState(false);
  let dataghep = [];
  const dataghepq = [];
  const dataFriend = [];
  const [hienthi, sethienthi] = useState(0);
  const [randomid, setrandomid] = useState('');
  const [bb, setbb] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const handleSelect = async ite => {
    navigate('Messenger', {user: ite});
  };
  const referencebanbe = ref(db, 'banbe/' + user);
  onValue(referencebanbe, childSnapshot1 => {
    childSnapshot1.forEach(snapshot1 => {
      const id = snapshot1.child('user').exportVal();
      const avt = snapshot1.child('avt').exportVal();
      const name = snapshot1.child('name').exportVal();
      dataFriend.push({
        id: id,
        avt: avt,
        name: name,
      });
    });
  });
  useEffect(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    onValue(
      firebaseDatabaseRef(firebaseDatabase, 'listChat/' + user),
      async snapshot => {
        debugger;
        if (snapshot.exists()) {
          let snapshotObject = snapshot.val();
          let myUserId = '1';
          debugger;
          setUsers(
            Object.keys(snapshotObject)
              .filter(item => item != myUserId)
              .map(eachKey => {
                let eachObject = snapshotObject[eachKey];

                return {
                  //default profile url
                  url: eachObject.avt,
                  name: eachObject.name,
                  email: eachObject.email,
                  accessToken: eachObject.accessToken,
                  numberOfUnreadMessages: 0,
                  userId: eachKey,
                  message: eachObject.trangthai,
                };
              }),
          );
          debugger;
        } else {
          console.log('No data available');
        }
      },
    );
  }, []);
  const GhepDoi = () => {
    dataghep.splice(0, dataghep.length);
    dataghep = [];
    let ids = uuid();
    ToastAndroid.show(
      'Đang kết nối những người xung quanh',
      ToastAndroid.BOTTOM,
    );
    const referencer = ref(db, 'hangcho');
    onValue(referencer, snapshot => {
      snapshot.forEach(childSnapshot => {
        const id = childSnapshot.key;
        dataghep.push(id);
      });
      console.log(dataghep.length);
    });

    if (dataghep.length == 0) {
      dataghep.splice(0, dataghep.length);
      dataghep = [];
      const reference = ref(db, 'hangcho/' + ids + '/' + user);
      update(reference, {
        id: user,
        hienthi: hienthi,
      });
    }
    console.log('dataghep' + dataghep);

    if (dataghep.length > 0) {
      const randomID = Math.floor(Math.random() * dataghep.length);
      setrandomid(dataghep[randomID]);
      console.log('randomid = ' + randomid);
      if (randomid != '') {
        const reference = ref(db, 'hangcho/' + randomid + '/' + user);
        update(reference, {
          id: user,
          hienthi: hienthi,
        });
        const referencerd = ref(db, 'hangcho/' + randomid);
        onValue(referencerd, snapshot => {
          snapshot.forEach(childSnapshot => {
            if (childSnapshot.size == 2) {
              dataghepq.push(childSnapshot.key);
            }
            // const combinedId =
            //   dataghepq[0] > dataghepq[1]
            //     ? dataghepq[0] + dataghepq[1]
            //     : dataghepq[1] + dataghepq[0];
          });
          if (dataghepq.length == 2) {
            const referencerd = ref(db, 'hangcho/' + randomid);
            remove(referencerd).then(() => {
              ToastAndroid.show(
                'Đã kết nối với 1 người lạ',
                ToastAndroid.BOTTOM,
              );
            });
            navigation.navigate('Messenger', {
              url: '',
              name: '',
              userId: dataghepq[0] == user ? dataghepq[1] : dataghepq[0],
            });
          } else {
            ToastAndroid.show(
              'Chưa tìm thấy, vui lòng tìm lại',
              ToastAndroid.BOTTOM,
            );
          }
        });
      }
    }

    dataghepq.splice(0, dataghepq.length);
    // const randomid = uuid();
  };
  const checkIs = () => {
    setbb(!bb);
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: 'white',
        flex: 1,
      }}>
      <UIHeader
        title={'Trò chuyện'}
        leftIconName={'arrow-left'}
        rightIconName={'eye'}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={checkIs}
      />
      {bb == true ? (
        <View>
          <FlatList
            horizontal
            style={[
              {
                width: '100%',
                marginTop: 5,
                height: 50,
                marginHorizontal: 10,
              },
              dataFriend.length == 0 ? {height: 0} : null,
            ]}
            showsHorizontalScrollIndicator={false}
            data={dataFriend}
            renderItem={({item, index}) => (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Messenger', {
                      url: '',
                      name: item.name,
                      userId: item.id,
                    })
                  }>
                  <View>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        marginHorizontal: 5,
                        borderColor: '#E94057',
                        borderWidth: 1,
                      }}
                      source={{uri: item.avt}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      ) : (
        <></>
      )}
      <View
        style={{
          width: '100%',
          paddingHorizontal: 20,
          height: 60,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          top: 10,
        }}>
        <TouchableOpacity
          style={{
            height: 60,
            flexDirection: 'column',
            alignItems: 'center',
            width: '30%',
            elevation: 5,
            backgroundColor: 'white',
            borderRadius: 10,
          }}
          onPress={() => navigate('TimNgauNhien')}>
          <Image
            style={{width: 30, height: 30, top: 5}}
            source={require('../../../image/chat.png')}
          />
          <Text style={{top: 10}}>Nhắn Tin</Text>
        </TouchableOpacity>
        <Pressable
          style={{
            height: 60,
            flexDirection: 'column',
            alignItems: 'center',
            width: '30%',
            elevation: 1,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <Image
            style={{width: 30, height: 30, top: 5}}
            source={require('../../../image/call.png')}
          />
          <Text style={{top: 10}}>Gọi Điện</Text>
        </Pressable>
        <TouchableOpacity
          style={{
            height: 60,
            flexDirection: 'column',
            alignItems: 'center',
            width: '30%',
            elevation: 5,
            backgroundColor: 'white',
            borderRadius: 10,
          }}
          onPress={() => navigate('AllRoomCall')}>
          <Image
            style={{width: 30, height: 30, top: 5}}
            source={require('../../../image/joinroom.png')}
          />
          <Text style={{top: 10}}>Phòng Chat</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingStart: 10,
        }}>
        <Text
          style={[
            {textAlign: 'center', top: 10},
            user.length == 0 ? {width: 0, height: 0} : null,
          ]}>
          {user.length == 0 ? 'Không có tin nhắn nào' : ''}
        </Text>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: 'white',
          position: 'relative',
          width: '100%',
          maxHeight: '70%',
        }}
        data={users}
        renderItem={({item}) => (
          <ChatItem
            onPress={() => {
              handleSelect(item);
            }}
            user={item}
            key={item.id}
          />
        )}
      />
    </View>
  );
}
export default Chat;
