import { StyleSheet, Text, View } from "react-native";
import React, { useState, createContext } from "react";

export const UserContext = createContext();
export const UserContextProvider = (props) => {
  const { children } = props;
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const onLogin = () => {
    setisLoggedIn(true);
  };
  const onLogout = () => {
    setisLoggedIn(false);
  };
  return (
    <UserContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
