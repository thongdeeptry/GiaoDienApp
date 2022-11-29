import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { firebaseConfig } from "../../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginView from "../login/login.view";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
const LoginContainer = ({ ...props }) => {
  const { onLogin } = useContext(UserContext);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [sdt, setsdt] = useState();
  let app;
  useEffect(() => {
    app = initializeApp(firebaseConfig);
    if (!app.length) {
    }
  }, []);
  const auth = getAuth(app);
  const Click = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Đăng nhập thành công");
        const user = getAuth().currentUser.uid;
        console.log("UID - " + user);
        onLogin();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <LoginView
      Click={Click}
      email={email}
      setemail={setemail}
      setpassword={setpassword}
      password={password}
    />
  );
};

export default LoginContainer;
