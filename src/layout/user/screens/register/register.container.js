import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { UserContext } from "../UserContext";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { firebaseConfig } from "../../../../config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import RegisterView from "./register.view";
export const Register = (props) => {
  const { navigation } = props;
  const { onLogin } = useContext(UserContext);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
    console.log("Kết nối thành công");
  }
  const auth = getAuth(app);
  const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Tạo tài khoản thành công");
        const user = getAuth().currentUser.uid;
        console.log("UID - " + user);
        navigation.navigate("ProfileName", {
          email,
          user,
          password,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export default RegisterContainer;
