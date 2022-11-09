import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback } from "react";
import { Animated, Image, Text, View, Pressable } from "react-native";
import Choice from "../Choice";
import { ACTION_OFFSET } from "../utils/constants";

import { styles } from "./styles";

export default function Card({
  id,
  name,
  source,
  tuoi,
  diachi,
  isFirst,
  swipe,
  tiltSign,
  ...rest
}) {
  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ["8deg", "0deg", "-8deg"],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, ACTION_OFFSET],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, -25],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  const renderChoice = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.likeContainer,
            { opacity: likeOpacity },
          ]}
        >
          <Choice type="thích" />
        </Animated.View>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.nopeContainer,
            { opacity: nopeOpacity },
          ]}
        >
          <Choice type="bỏ" />
        </Animated.View>
      </>
    );
  }, [likeOpacity, nopeOpacity]);

  return (
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...rest}
    >
      <Image source={{ uri: source }} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,1)"]}
        style={styles.gradient}
      />

      <Text style={styles.name}>
        {name}, {tuoi}
      </Text>
      <Text style={styles.diachi}>{diachi}</Text>

      {isFirst && renderChoice()}
    </Animated.View>
  );
}
