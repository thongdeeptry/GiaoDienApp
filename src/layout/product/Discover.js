import React, {useRef, useState} from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-deck-swiper';
import PhotoCards from './data/PhotoCards';
import CardT from './components/Card';
import OverlayLabel from './data/OverlayLable';

const Discover = ({navigation}) => {
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
  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.container}>
        <Swiper
          ref={useSwiper}
          animateCardOpacity
          cards={PhotoCards}
          renderCard={card => <CardT card={card} />}
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
      </View>
    </SafeAreaView>
  );
};
export default Discover;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#fff',
  },
  container: {
    // flex: 1,
    flexDirection: 'column-reverse',
    height: '100%',
    // justifyContent: "flex-end",
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: Platform.OS == 'ios' ? 0 : 20,
    common: {
      width: 70,
      height: 70,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
    },
  },
  overlayWrapper: {
    height: '100%',
  },
});
