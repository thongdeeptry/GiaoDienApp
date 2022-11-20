import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  View,
  Pressable,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import Card from "../Card";
import Footer from "../Footer";
import { ACTION_OFFSET, CARD } from "../utils/constants";
import { pets as petsArray } from "./data";
import { styles } from "./styles";

export default function Main({ route, navigation }) {
  const [pets, setPets] = useState(petsArray);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!pets.length) {
      setPets(petsArray);
    }
  }, [pets.length]);
  console.log("User pets: ", pets);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setPets((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleChoice = useCallback(
    (direction) => {
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCREEN,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x]
  );

  return (
    <View style={styles.container }>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 20,
          paddingTop: 20,
          position: 'absolute',
          height:50,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center"}}>
          <View>
            <Image source={require("../../../../image/star.png")} />
          </View>
          <View>
            <Text style={{ fontSize: 25 }}>GenzLove</Text>
          </View>
        </View>

        <View >
          <TouchableOpacity >
          <Image source={require("../../../../image/lui.png")} />
          </TouchableOpacity>
        </View>
      </View>
      {pets
        .map(({ id, name, source, tuoi, diachi }, index) => {
          const isFirst = index === 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};
          console.log("id" + id);
          return (
            <Pressable
              onPress={() => navigation.navigate("ProfileFriend", { id })}
              style={{ width: "90%", height: "100%", position: "absolute" }}
            >
              <Card
                key={id}
                name={name}
                source={source}
                tuoi={tuoi}
                diachi={diachi}
                isFirst={isFirst}
                swipe={swipe}
                tiltSign={tiltSign}
                {...dragHandlers}
              ></Card>
            </Pressable>
          );
        })
        .reverse()}

      <Footer handleChoice={handleChoice} />
    </View>
  );
}
