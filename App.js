import React, { useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Image, Alert } from "react-native";
import Navigation from "./src/layout/user/Navigation";
import { UserContextProvider } from "./src/layout/user/UserContext";
import { ProductConTextProvider } from "./src/layout/product/ProductContext";

import AsyncStorage from '@react-native-async-storage/async-storage'
export default function App() {
  
  return (
    <UserContextProvider>
      <ProductConTextProvider>
        <Navigation />
      </ProductConTextProvider>
    </UserContextProvider>
  );
}
