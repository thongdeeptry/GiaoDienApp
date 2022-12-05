import messaging from "@react-native-firebase/messaging";
import React, { useEffect } from "react";
import { ToastAndroid } from "react-native";
export const sendMess = (token, title, body) => {
  messaging()
    .sendMessage({
      notification: {
        title: title,
        body: body,
      },
      token: token,
    })
    .then((response) => {
      console.log("Messages were sent successfully" + response);
    });
};
