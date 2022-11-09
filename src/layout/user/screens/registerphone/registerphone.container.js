import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../../../config";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import RegisterPhoneView from "./registerphone.view";
export const RegisterPhone = (props) => {
  const { navigation } = props;
  const [sdt, setsdt] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const { initialMinute = 0, initialSeconds = 10000000000 } = navigation;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    if (verificationId != null) {
      navigation.navigate("CfPhone", {
        verificationId,
        sdt,
      });
    }
    return () => {};
  }, [verificationId]);

  const SendOTP = async (sdtt) => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider
        .verifyPhoneNumber(sdtt, recaptchaVerifier.current)
        .then(setVerificationId);
      const user = getAuth().currentUser.uid;
      console.log("UID - " + user);
      navigation.navigate("CfPhone", {
        sdt,
        user,
        verificationId,
      });
    } catch (error) {
      alert(error);
    }
  };
};
export default CfPhoneContainer;