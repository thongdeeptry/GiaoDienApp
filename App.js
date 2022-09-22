import React  from 'react';
import { StyleSheet, Text, View,Pressable ,Image} from 'react-native';
import Navigation from './src/layout/user/Navigation';
import { UserContextProvider } from './src/layout/user/UserContext';
import { ProductConTextProvider } from './src/layout/product/ProductContext';
import { Friend } from './src/layout/product/Friend';
import { SayHello } from './src/layout/user/screens/SayHello';
import Home from './src/layout/product/Home/Main'
import { Selectsex } from './src/layout/user/screens/Selectsex';
import Possions from './src/layout/user/screens/Possions';
import { ProfileName } from './src/layout/user/screens/ProfileName';
import { Mes } from './src/layout/product/Mes';
import { Profile } from './src/layout/product/Profile';
import { PostStatus } from './src/layout/product/PostStatus';
import { Camxuc } from './src/layout/product/Camxuc';
export default function App() {

  return (
    <UserContextProvider>
      <ProductConTextProvider>
      <Navigation/>
      </ProductConTextProvider>
  </UserContextProvider>

);
}

