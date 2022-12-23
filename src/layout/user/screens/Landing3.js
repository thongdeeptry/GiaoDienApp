import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';

export default Landing1 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMethod="auto"
          source={require('../../../image/photolanding3.png')}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Sẵn sàng</Text>
        <Text style={styles.textchitiet}>
          Hãy sẵn sàng và bắt đầu cuộc hành trình đi tìm những người bạn tâm
          giao và bạn đời của bạn.
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textchitietlogin: {
    color: '#E94057',
  },
  textdangnhap: {
    position: 'absolute',
    width: 295,
    height: 24,
    left: 40,
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    color: '#000000B2',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',

    height: 56,
    bottom: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dangky: {
    width: '80%',
    height: 56,
    backgroundColor: '#E94057',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 15,
  },
  dangkyText: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'normal',
    color: 'white',
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#FFFFFF',
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    height: 360,
    flexDirection: 'row',
    justifyContent: 'center',
    top: 76,
  },
  textContainer: {
    position: 'absolute',
    width: '100%',
    height: 126,
    flexDirection: 'row',
    justifyContent: 'center',
    top: 480,
  },
  textTitle: {
    position: 'absolute',
    width: 295,
    height: 36,

    color: '#E94057',
    fontSize: 25,

    fontWeight: '700',
    textAlign: 'center',
    fontStyle: 'normal',
  },
  textchitiet: {
    position: 'absolute',
    width: 280,
    height: 50,

    top: 40,
    color: '#323755',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    fontStyle: 'normal',
  },
});
