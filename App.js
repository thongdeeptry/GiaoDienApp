import React, {useEffect, useState} from 'react';
import 'expo-dev-client';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Alert,
  TextInput,
  ToastAndroid,
  Modal,
  StatusBar,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import Navigation from './src/layout/user/Navigation';
import {UserContextProvider} from './src/layout/user/UserContext';
import {ProductConTextProvider} from './src/layout/product/ProductContext';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Audio} from 'expo-av';
import {useNetInfo, NetInfoState} from '@react-native-community/netinfo';
import Loading from './src/components/Loading';
export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleCall, setModalVisibleCall] = useState(false);
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const internetState: NetInfoState = useNetInfo();
  const [sound, setSound] = React.useState();
  const requestPermision = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('AuthorizationStatus' + authStatus);
    }
  };
  if (internetState.isConnected === false) {
    Alert.alert(
      'Không có kết nối mạng! ❌',
      'Xin lỗi, Bạn vui lòng kiểm tra lại kết nối mạng để sử dụng các tính năng của GenzLove.',
      [{text: 'Được'}],
    );
  }
  useEffect(() => {
    setTimeout(() => setShow(true), 3000);
    if (requestPermision()) {
      messaging()
        .getToken()
        .then(async token => {
          await AsyncStorage.setItem('token', token);
        });
    } else {
      console.log('Khong Co Quyen');
    }

    ///ujfhbuj
    messaging()
      .getInitialNotification()
      .then(async remotemess => {
        if (remotemess) {
        }
      });

    ///sss
    messaging().onNotificationOpenedApp(async remotemess => {
      console.log('Message handled in the background!', remotemess);
    });

    //backgroubnd
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    //alert
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setTitle(remoteMessage.notification.title);
      setBody(remoteMessage.notification.body);
      if (remoteMessage.notification.title == 'Bạn có cuộc gọi đến') {
      } else {
        setModalVisible(true);
        console.log('Loading Sound');
        const {sound} = await Audio.Sound.createAsync(require('./nhac.mp3'));
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync();
        setTimeout(() => {
          setModalVisible(false);
        }, 1000);
      }
    });

    return unsubscribe;
  }, []);
  const [show, setShow] = useState(false);
  return (
    <UserContextProvider>
      <ProductConTextProvider>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    position: 'absolute',
                    left: 0,
                    borderBottomLeftRadius: 10,
                    borderTopLeftRadius: 10,
                  }}
                  source={require('./src/image/auth.png')}
                />
                <Text style={styles.modalText}>{title}</Text>
                <Text style={styles.modalText1}>{body}</Text>
              </View>
            </View>
          </Modal>
        </View>
        {show == true ? (
          internetState.isConnected === false ? (
            <Loading />
          ) : (
            <Navigation />
          )
        ) : (
          <Loading />
        )}
      </ProductConTextProvider>
    </UserContextProvider>
  );
}
const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E94057',
    opacity: 0.95,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    letterSpacing: 1,
    bottom: 20,
  },
  title1: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    letterSpacing: 1,
    bottom: 10,
    paddingHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    top: 10,
  },
  modalView: {
    width: '90%',
    height: 60,
    marginHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 5,
    top: 5,
    fontSize: 20,
    color: '#E94057',
    width: '70%',
    height: 22,
    left: 15,
  },
  modalText1: {
    width: '70%',
    fontSize: 15,
    left: 15,
    opacity: 0.8,
    height: 17,
    top: 5,
  },
});
