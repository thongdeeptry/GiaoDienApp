// import { LinearGradient } from "expo-linear-gradient";
import React, {useCallback} from 'react';
import {Animated, Image, Text, View, Pressable} from 'react-native';
import Choice from '../Choice';
import {ACTION_OFFSET} from '../utils/constants';
import {LinearGradient} from 'expo-linear-gradient';
import {styles} from './styles';

export default function Card({
  id,
  name,
  source,
  tuoi,
  diachi,
  tick,
  isFirst,
  swipe,
  tiltSign,
  sex,
  km,
  nghenghiep,
  ...rest
}) {
  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, ACTION_OFFSET],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, -25],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), {rotate}],
  };

  const renderChoice = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.likeContainer,
            {opacity: likeOpacity},
          ]}>
          <Choice type="thích" />
        </Animated.View>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.nopeContainer,
            {opacity: nopeOpacity},
          ]}>
          <Choice type="bỏ" />
        </Animated.View>
      </>
    );
  }, [likeOpacity, nopeOpacity]);

  return (
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...rest}>
      <Image
        source={{
          uri:
            source === null
              ? sex === 'Nam'
                ? 'https://i.ibb.co/XFz2BR8/avtnbam.png'
                : 'https://i.ibb.co/CPVcDj9/avtnu.jpg'
              : source,
        }}
        style={styles.image}
      />
      <View
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: 'white',
          paddingHorizontal: 15,
          paddingVertical: 7,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../../../image/vitri.png')}
          style={{width: 15, height: 15}}
        />
        <Text style={{color: '#E94057', fontWeight: '600', fontSize: 16}}>
          {km}km
        </Text>
      </View>
      <LinearGradient
        colors={['transparent', 'rgba(255, 112, 141, 0.8)']}
        style={styles.gradient}
      />
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.name, {maxWidth: 250, height: 30}]}>{name}</Text>

        <Text style={styles.name}>
          {tick == 'true' ? (
            <Image
              style={{width: 25, height: 25}}
              source={require('../../../../image/verify.png')}
            />
          ) : (
            <></>
          )}
          , {tuoi}
        </Text>
      </View>
      <Text style={styles.diachi}>{nghenghiep}</Text>

      {isFirst && renderChoice()}
    </Animated.View>
  );
}
