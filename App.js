import React, { useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Image, Alert } from "react-native";
import Navigation from "./src/layout/user/Navigation";
import { UserContextProvider } from "./src/layout/user/UserContext";
import { ProductConTextProvider } from "./src/layout/product/ProductContext";
import { Friend } from "./src/layout/product/Friend";
import { SayHello } from "./src/layout/user/screens/SayHello";
import Home from "./src/layout/product/Home/Main";
import { Selectsex } from "./src/layout/user/screens/Selectsex";
import Possions from "./src/layout/user/screens/Possions";
import { ProfileName } from "./src/layout/user/screens/ProfileName";
import { Mes } from "./src/layout/product/Mes";
import { Profile } from "./src/layout/product/Profile";
import { PostStatus } from "./src/layout/product/PostStatus";
import { Camxuc } from "./src/layout/product/Camxuc";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { firebaseConfig } from "./config";
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function App() {
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
    console.log("Kết nối thành công");
  }
  return (
    <UserContextProvider>
      <ProductConTextProvider>
        <Navigation />
      </ProductConTextProvider>
    </UserContextProvider>
  );
}
