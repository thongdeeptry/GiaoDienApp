/** @format */

import "expo-dev-client";
import React, { useState } from "react";
import AgoraUIKit from "agora-rn-uikit";
import { View } from "react-native";
const CallVideo = () => {
  const [videoCall, setVideoCall] = useState(true);
  const props = {
    connectionData: {
      appId: "d83353ff71674eff91bf6f3e4c97dd46",
      channel: "test",
      token:
        "007eJxTYPjguzMre+etSc7Jxxf3nzSMmZFtvGh/qdLrD4V2ZsqtbzgVGFLNjE0szZLTUg0M0kyMUiySUk2TTSwtjM0NUs3SEo3MRb+3JTcEMjLIPUpmYmSAQBCfhaEktbiEgQEAo9MgRw==",
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
