import {StyleSheet} from 'react-native';
import {CARD} from '../utils/constants';

export const styles = StyleSheet.create({
  container: {
    height: '73%',
    top: 60,
    position: 'absolute',
  },
  image: {
    width: CARD.WIDTH,
    height: '100%',
    borderRadius: CARD.BORDER_RADIUS,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    borderRadius: CARD.BORDER_RADIUS,
    opacity: 0.8,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: -123,
    position: 'absolute',
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
  name: {
    bottom: 111,
    left: 20,
    fontSize: 30,
    fontWeight: '600',
    color: '#fff',
  },
  diachi: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
  },
  choiceContainer: {
    position: 'absolute',
    top: 100,
  },
  likeContainer: {
    left: 45,
    transform: [{rotate: '-30deg'}],
  },
  nopeContainer: {
    right: 45,
    transform: [{rotate: '30deg'}],
  },
});
