import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {images, colors, icons, fontSizes} from '../../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {UIHeader} from '../../../components';
import ChatItem from './ChatItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  firebaseDatabaseRef,
  firebaseDatabase,
  auth,
  db,
  onValue,
} from '../../../../config';
import {setDoc, doc, getDoc} from 'firebase/firestore';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
function Chat(props) {
  const user = auth.currentUser.uid;
  const [users, setUsers] = useState([]);
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const handleSelect = async ite => {
    navigate('Messenger', {user: ite});
  };
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
  return (
    <View
      style={{
        flexDirection: 'column',
      }}>
      <UIHeader
        title={'Tin Nhắn'}
        leftIconName={'arrow-left'}
        rightIconName={'search'}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {
          alert('press right icon');
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingStart: 10,
        }}>
        <Text style={{textAlign: 'center', top: 10}}>
          {user.length == 0 ? 'Không có tin nhắn nào' : ''}
        </Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{height: '85%'}}
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
