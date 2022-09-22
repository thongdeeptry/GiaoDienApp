import { ToastAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../../../config";
import firebase from "firebase/compat/app";
import cfphoneView from "./cfphone.view";
const CfPhoneContainer = ({ route, navigation }) => {
  const { verificationId } = route.params;
  const { sdt } = route.params;
  const { user } = route.params;
  const { initialMinute = 0, initialSeconds = 59 } = navigation;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [verificationCode, setVerificationCode] = useState("");
  const [Code1, setCode1] = useState("");
  const [Code2, setCode2] = useState("");
  const [Code3, setCode3] = useState("");
  const [Code4, setCode4] = useState("");
  const [Code5, setCode5] = useState("");
  const [Code6, setCode6] = useState("");

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(0);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const ConfimCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      Code1 + Code2 + Code3 + Code4 + Code5 + Code6
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setCode1("");
        setCode2("");
        setCode3("");
        setCode4("");
        setCode5("");
        setCode6("");
        ToastAndroid.show("Đã xác nhận mã", ToastAndroid.BOTTOM);
        navigation.navigate("ProfileName", {
          verificationId,
          sdt,
          user,
        });
      })
      .catch((error) => {
        ToastAndroid.show("Mã sai", ToastAndroid.BOTTOM);
      });
  };
};
return (
  <cfphoneView
    seconds={seconds}
    Code1={Code1}
    Code2={Code2}
    Code3={Code3}
    ConfimCode={ConfimCode}
    verificationCode={verificationCode}
  />
);

export default CfPhoneContainer;
