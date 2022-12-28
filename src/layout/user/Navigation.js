import React, {useContext} from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultThem,
} from '@react-navigation/native';
import UserNavigationn from './UserNavigationn';
import ProductNavigation from '../product/ProductNavigation';
import {UserContext} from './UserContext';
export default Navigation = () => {
  const {isLoggedIn} = useContext(UserContext);
  return (
    // theme={DarkTheme}
    <NavigationContainer>
      {isLoggedIn == true ? <ProductNavigation /> : <UserNavigationn />}
    </NavigationContainer>
  );
};
