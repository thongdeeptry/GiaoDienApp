/** @format */

import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Keyboard,
  TextInput,
  RefreshControl,
} from 'react-native';
import {sendMess} from '../../../constants/sendMess';
import {images, colors, icons, fontSizes} from '../../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {UIHeader} from '../../../components';
import MessengerItem from './MessengerItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuid} from 'uuid';
import 'react-native-get-random-values';
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  update,
  serverTimestamp,
  get,
} from 'firebase/database';
import {initializeApp} from 'firebase/app';
import {auth, firebaseConfig} from '../../../../config';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
function Messenger(props) {
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
  }
  let DataHis = [];
  const db1 = getDatabase();
  const user = auth.currentUser.uid;
  const [namee, setname] = useState();
  const [avt, setavt] = useState();
  const [typedText, setTypedText] = useState('');
  const [chatHistory, setChatHistory] = useState(DataHis);
  const [nameu, setnameu] = useState();
  const [avtu, setavtu] = useState();
  const [userId, setuserId] = useState();

  const {navigate, goBack} = props.navigation;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const [email, setemail] = useState();
  const [nghenghiep, setnghenghiep] = useState();
  const [emailCR, setemailCR] = useState();
  const [nghenghiepCR, setnghenghiepCR] = useState();
  const [nameCr, setnameCr] = useState();
  const [avtCr, setavtCr] = useState();
  const idCurrent = auth.currentUser.uid;
  useEffect(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    const reference = ref(db1, 'users/' + user);
    onValue(reference, childSnapshot => {
      const namepr = childSnapshot.child('name').val();
      const avtpr = childSnapshot.child('avt').val();
      setname(namepr);
      setavt(avtpr);
      setemail(childSnapshot.child('email').val());
      setnghenghiep(childSnapshot.child('nghenghiep').val());
    });

    try {
      const {url, name, userId} = props.route.params.user;
      console.log(name);
      setnameu(name);
      setavtu(url);
      setuserId(userId);
      const referencew = ref(db1, 'users/' + userId);
      onValue(referencew, childSnapshot => {
        const namepr = childSnapshot.child('name').val();
        const avtpr = childSnapshot.child('avt').val();
        setnameCr(namepr);
        setavtCr(avtpr);
        setemailCR(childSnapshot.child('email').val());
        setnghenghiepCR(childSnapshot.child('nghenghiep').val());
      });
      const reference3w = ref(db1, 'listChat/' + userId + '/' + user);
      update(reference3w, {
        trangthai: 'Đã xem',
      });
    } catch (error) {
      const {url, name, userId} = props.route.params;

      setnameu(name);
      setavtu(url);
      setuserId(userId);
      const referencew = ref(db1, 'users/' + userId);
      onValue(referencew, childSnapshot => {
        const namepr = childSnapshot.child('name').val();
        const avtpr = childSnapshot.child('avt').val();
        setnameCr(namepr);
        setavtCr(avtpr);
        setemailCR(childSnapshot.child('email').val());
        setnghenghiepCR(childSnapshot.child('nghenghiep').val());
      });
      const reference3w = ref(db1, 'listChat/' + userId + '/' + user);
      update(reference3w, {
        trangthai: 'Đã xem',
      });
    }
  }, []);
  console.log(nameCr + 'pppp');
  const combinedId = user > userId ? user + userId : userId + user;

  const unSub = ref(db1, 'chats/' + combinedId + '/messages');
  onValue(unSub, datasnap => {
    DataHis.splice(0, DataHis.length);
    DataHis = [];
    datasnap.forEach(datasnapP => {
      DataHis.push({
        id: datasnapP.child('id').exportVal(),
        date: datasnapP.child('date').exportVal(),
        isSender: datasnapP.child('isSender').exportVal(),
        messenger: datasnapP.child('messenger').exportVal(),
        senderId: datasnapP.child('senderId').exportVal(),
        showUrl: datasnapP.child('showUrl').exportVal(),
        text: datasnapP.child('text').exportVal(),
        timestamp: datasnapP.child('timestamp').exportVal(),
        url: datasnapP.child('url').exportVal(),
      });
    });
  });
  const sendMessT = () => {
    if (typedText.trim().length == 0) {
      return;
    }
    let myFriendUserId = userId;
    const reference3 = ref(db1, 'listChat/' + idCurrent + '/' + userId);
    onValue(reference3, childSnapshot => {
      if (!childSnapshot.exists()) {
        set(reference3, {
          id: userId,
          name: nameCr,
          avt: avtCr,
          email: emailCR,
          nghenghiep: nghenghiepCR,
          trangthai: 'Chưa có tin nhắn nào được gửi',
        });
        const reference3s = ref(db1, 'listChat/' + userId + '/' + idCurrent);
        set(reference3s, {
          id: idCurrent,
          name: namee,
          avt: avt,
          email: email,
          nghenghiep: nghenghiep,
          trangthai: 'Chưa có tin nhắn nào được gửi',
        });
      }
    });
    Keyboard.dismiss();
    let key = new Date().getTime();
    const reference3w = ref(db1, 'listChat/' + user + '/' + userId);
    update(reference3w, {
      trangthai: typedText,
    });
    const reference3ws = ref(db1, 'listChat/' + userId + '/' + user);
    update(reference3ws, {
      trangthai: typedText,
    });
    const docRef = ref(db1, 'chats/' + combinedId + '/messages/' + key);
    set(docRef, {
      id: key,
      showUrl: true,
      messenger: typedText,
      text: typedText,
      senderId: user,
      date: serverTimestamp(),
      timestamp: serverTimestamp(),
      url: avt,
      isSender: true,
    });
    const docRefd = ref(
      db1,
      'userChats/' + user + '/' + combinedId + '/lastMessage',
    );
    update(docRefd, {
      text: typedText,
    });
    const docRefdds = ref(db1, 'userChats/' + user + '/' + combinedId);
    update(docRefdds, {
      date: serverTimestamp(),
    });
    const docRefdd = ref(
      db1,
      'userChats/' + myFriendUserId + '/' + combinedId + '/lastMessage',
    );
    update(docRefdd, {
      text: typedText,
    });
    const docRefddss = ref(
      db1,
      'userChats/' + myFriendUserId + '/' + combinedId,
    );
    update(docRefddss, {
      date: serverTimestamp(),
    });
    const referencecrd = ref(db1, 'users/' + userId);
    onValue(referencecrd, childSnapshot => {
      const tokendv = childSnapshot.child('token').val();
      sendMess(tokendv, namee + ' vừa gửi cho bạn 1 tin nhắn', typedText);
    });
    setTypedText('');
    // setRefreshing(true);
    // wait(1000).then(() => setRefreshing(false));
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        paddingBottom: 100,
        backgroundColor: 'white',
      }}>
      <UIHeader
        title={nameu}
        leftIconName={'arrow-left'}
        rightIconName={'phone'}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {
          navigate('CallVideo', {combinedId, userId});
        }}
      />

      <FlatList
        style={{
          flex: 1,
          marginBottom: 20,
          backgroundColor: 'white',
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        inverted
        data={DataHis == [] ? [] : DataHis.reverse()} //chatHistory.reverse()
        renderItem={({item}) => (
          <MessengerItem
            onPress={() => {
              navigate('ProfileFriend', {id: item.senderId});
            }}
            item={item}
            key={`${item.timestamp}`}
          />
        )}
      />
      <View
        style={{
          height: 50,
          position: 'absolute',
          bottom: 60,
          left: 10,
          right: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          borderBottomColor: '#ABABAB',
          borderLeftColor: '#ABABAB',
          borderLeftWidth: 1,
          borderBottomWidth: 1,
          borderRightColor: '#ABABAB',
          borderTopColor: '#ABABAB',
          borderRightWidth: 1,
          borderTopWidth: 1,
          borderRadius: 8,
        }}>
        <TextInput
          onChangeText={typedText => {
            setTypedText(typedText);
          }}
          style={{
            color: 'black',
            paddingStart: 10,
            height: 50,
          }}
          placeholder="Nhập nội dung tin nhắn"
          value={typedText}
          returnKeyType="done"
          placeholderTextColor={colors.placeholder}
        />
        <TouchableOpacity onPress={sendMessT}>
          <Icon
            style={{
              padding: 10,
            }}
            name="paper-plane"
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Messenger;
