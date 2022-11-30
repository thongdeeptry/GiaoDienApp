/** @format */

import "expo-dev-client";
import React, { useState, useEffect } from "react";
import AgoraUIKit from "agora-rn-uikit";
import { View } from "react-native";
import { ongetTokenAgora } from "../utilities/getTokenAgora.context";
const CallVideo = () => {
  const [videoCall, setVideoCall] = useState(true);
  const [channel, setChannel] = useState("123");
  const [role, setRole] = useState(1);
  const [uid, setUid] = useState(1);
  const [expiry, setexpiry] = useState("9999999999999999999");
  const [token, setToken] = useState();
  useEffect(() => {
    async function fetchData() {
      const res = await ongetTokenAgora(channel, role, "uid", uid, expiry);
      setToken(res);
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
      EndCall: () => setVideoCall(false),
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
