import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const CardT = ({card}) => {
  return (
    <View activeOpacity={1} style={styles.card}>
      <Image style={styles.image} source={card.photo} resizeMode="cover" />
      <View style={styles.photoDescriptionContainer}>
        <Text style={styles.text}>{`${card.name}, ${card.age}`}</Text>
        <Text style={[styles.text, {fontSize: 16}]}>{`${card.desc}`}</Text>
      </View>
    </View>
  );
};
export default CardT;

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  card: {
    padding: 0,
    marginTop: 80,
    height: height - 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  image: {
    borderRadius: 20,
    flex: 1,
    width: '100%',
  },
  photoDescriptionContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    width: '100%',
    textShadowColor: '#000',
    textShadowRadius: 10,
  },
});
