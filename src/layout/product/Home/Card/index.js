// import { LinearGradient } from "expo-linear-gradient";
import React, {useCallback, useRef, useState} from 'react';
import {Animated, Image, Text, View, TouchableOpacity} from 'react-native';
import Choice from '../Choice';
import {ACTION_OFFSET} from '../utils/constants';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-deck-swiper';
import {styles} from './styles';
import OverlayLabel from '../../data/OverlayLable';

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
  pets,
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
  const [enableSwipes, setEnableSwipes] = useState(false);

  const useSwiper = useRef();
  const handleOnSwipedLeft = () => {
    useSwiper.current.swipeLeft();
  };
  const handleOnSwipedRight = () => useSwiper.current.swipeRight();
  const handleOnSwipedTop = () => {
    useSwiper.current.swipeTop();
  };

  let lastPress = 0;

  const onDoublePress = () => {
    const time = new Date().getTime();
    const delta = time - lastPress;

    const DOUBLE_PRESS_DELAY = 400;
    if (delta < DOUBLE_PRESS_DELAY) {
      navigation.navigate('Profile');
    }
    lastPress = time;
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
    <Animated.View style={styles.container}>
      <Swiper
        ref={useSwiper}
        animateCardOpacity
        cards={pets}
        renderCard={card => (
          <Animated.View
            style={[styles.container, isFirst && animatedCardStyle]}
            {...rest}>
            <Image
              source={{
                uri:
                  card.source === null
                    ? card.sex === 'Nam'
                      ? 'https://i.ibb.co/XFz2BR8/avtnbam.png'
                      : 'https://i.ibb.co/CPVcDj9/avtnu.jpg'
                    : card.source,
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
              <Text style={[styles.name, {maxWidth: 250, height: 30}]}>
                {card.name}
              </Text>

              <Text style={styles.name}>
                {card.tick == 'true' ? (
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('../../../../image/verify.png')}
                  />
                ) : (
                  <></>
                )}
                , {card.tuoi}
              </Text>
            </View>
            <Text style={styles.diachi}>{card.nghenghiep}</Text>

            {isFirst && renderChoice()}
          </Animated.View>
        )}
        cardIndex={0}
        backgroundColor="#fff"
        stackSize={3}
        stackScale={10}
        stackSeparation={30}
        infinite
        swipeAnimationDuration={800}
        showSecondCard
        animateOverlayLabelsOpacity
        onSwipedBottom={handleOnSwipedLeft}
        onTapCard={() => onDoublePress()}
        horizontalSwipe={!enableSwipes}
        verticalSwipe={!enableSwipes}
        overlayLabels={{
          bottom: {
            title: 'DISLIKE',
            element: (
              <OverlayLabel
                label={'Dislike'}
                color="#AEAEAE"
                background="rgba(186, 187, 188,0.5)"
              />
            ),
            style: {
              wrapper: styles.overlayWrapper,
            },
          },
          left: {
            title: 'DISLIKE',
            element: (
              <OverlayLabel
                label={'Dislike'}
                color="#AEAEAE"
                background="rgba(186, 187, 188,0.5)"
              />
            ),
            style: {
              wrapper: styles.overlayWrapper,
            },
          },
          right: {
            title: 'LIKE',
            element: (
              <OverlayLabel
                label={'Like'}
                color="#D9B372"
                background="rgba(205, 191, 165,0.5)"
              />
            ),
            style: {
              wrapper: {
                ...styles.overlayWrapper,
              },
            },
          },
          top: {
            title: 'SUPERLIKE',
            element: (
              <OverlayLabel
                label={'Superlike'}
                color="#D9B372"
                background="rgba(205, 191, 165,0.5)"
              />
            ),
            style: {
              wrapper: {
                ...styles.overlayWrapper,
              },
            },
          },
        }}></Swiper>
      <View style={styles.button}>
        <TouchableOpacity
          style={[styles.button.common, {backgroundColor: '#EA008A'}]}
          onPress={handleOnSwipedLeft}>
          <Icon name="times" size={28} color="#fff"></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button.common, {backgroundColor: '#D9B372'}]}
          onPress={handleOnSwipedTop}>
          <Icon name="heart" size={28} color="#fff"></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button.common, {backgroundColor: '#21C0F1'}]}
          onPress={handleOnSwipedRight}>
          <Icon name="check" size={28} color="#fff"></Icon>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
