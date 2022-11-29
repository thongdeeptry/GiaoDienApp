import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Alert,
  TextInput,
} from "react-native";
import Navigation from "./src/layout/user/Navigation";
import { UserContextProvider } from "./src/layout/user/UserContext";
import { ProductConTextProvider } from "./src/layout/product/ProductContext";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
export default function App() {
  const [sound, setSound] = React.useState();
  const requestPermision = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log("AuthorizationStatus" + authStatus);
    }
  };
  useEffect(() => {
    if (requestPermision()) {
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
        });
    } else {
      console.log("Khong Co Quyen");
    }

    ///ujfhbuj
    messaging()
      .getInitialNotification()
      .then(async (remotemess) => {
        if (remotemess) {
          console.log("Khong The Mo thong Bao", remotemess.notification);
        }
      });

    ///sss
    messaging().onNotificationOpenedApp(async (remotemess) => {
      console.log("Khong the Mo DUoi Nen", remotemess.notification);
    });

    //backgroubnd
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    //alert
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("Thong bao moi!", JSON.stringify(remoteMessage.notification));
      // <Image
      //   style={{
      //     width: 50,
      //     height: 50,
      //     borderRadius: 25,
      //     position: "absolute",
      //   }}
      //   source={require("./src/image/avt.jpg")}
      // />;
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync(require("./nhac.mp3"));
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    });

    return unsubscribe;
  }, []);
  return (
    <UserContextProvider>
      <ProductConTextProvider>
        <Navigation />
      </ProductConTextProvider>
    </UserContextProvider>
  );
}
