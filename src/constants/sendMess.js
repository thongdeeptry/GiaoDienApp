import messaging from "@react-native-firebase/messaging";
import React, { useEffect } from "react";
import { ToastAndroid } from "react-native";
import axiosInstance from "./axios";
export const sendMess = async (token, title, body) => {
  console.log(token + " =====> body" + body);
  const Data = {
    data: {
      title: "Firebase notification",
      detail: "I am firebase notification. you can customise me. enjoy",
    },
    notification: {
      title: title,
      body: body,
    },
    to: token,
  };
  await axiosInstance.post("fcm/send", Data).then((res) => {
    console.log(res);
  });
};
