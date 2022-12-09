/** @format */

import "expo-dev-client";
import React, { useState, useEffect } from "react";
import AgoraUIKit from "agora-rn-uikit";
import { View } from "react-native";
import { ongetTokenAgora } from "../utilities/getTokenAgora.context";
import { initializeApp } from "firebase/app";
import { auth, firebaseConfig } from "../../../../../config";
import messaging from "@react-native-firebase/messaging";
const CallVideo = ({ route, navigation }) => {
  initializeApp(firebaseConfig);
  const user = auth.currentUser.metadata;
  const { combinedId } = route.params;
  const [videoCall, setVideoCall] = useState(true);
  const [channel, setChannel] = useState(combinedId);
  const [role, setRole] = useState(1);
  const [uid, setUid] = useState(Number(user.createdAt));
  const [expiry, setexpiry] = useState(9999999999999999999);
  const [token, setToken] = useState();
  useEffect(() => {
    async function fetchData() {
      const res = await ongetTokenAgora(channel, role, "uid", uid, expiry);
      setToken(res);
      console.log(uid);
      messaging()
        .sendMessage({
          notification: {
            title: "Background Message Title",
            body: "Background message body",
          },
          token:
            "cB0fWnGDSRyQ29XlMOSinK:APA91bHTTKCDubVMVIJzqBeAan5IqjtVDpdjThLI43ogpBMlrcleaBKJzWRaCa2BiSn2o01qyoZTbazOLdzm0iyJwsSgPXhSGImVZVkt8uWELjImrWyucd--RUX1808CqsOr87DLULFH",
        })
        .then((response) => {
          console.log("Messages were sent successfully" + response);
        });
    }
    fetchData();
  }, []);
  const props = {
    connectionData: {
      appId: "e63496cfe00f42d8be5c498370e6fa27",
      channel: channel,
      uid: uid,
      token: token,
    },
    rtcCallbacks: {
      EndCall: () => {
        setVideoCall(false);
        navigation.goBack();
      },
    },
  };

  return videoCall ? (
    <View style={{ width: "100%", height: "100%", paddingBottom: 50 }}>
      <AgoraUIKit
        connectionData={props.connectionData}
        rtcCallbacks={props.rtcCallbacks}
      />
    </View>
  ) : null;
};

export default CallVideo;
