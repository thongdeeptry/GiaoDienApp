import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const VoHieuHoa = ({navigation, route}) => {
  const QuayLai = async () => {
    await AsyncStorage.setItem('email', '');
    await AsyncStorage.setItem('password', '');
    navigation.navigate('Index');
  };
  return (
    <View style={styles.centered}>
      <Text style={styles.title}>GenzLove</Text>
      <LottieView
        source={require('../../../../chimnghenhac.json')}
        style={styles.animation}
        autoPlay
      />
      <Text style={styles.title1}>Tài khoản của bạn đã bị tạm khóa.</Text>
      <Text style={styles.title12}>
        Chúng tôi phát hiện bạn có một số hành động vi phạm tiêu chuẩn cộng đồng
        nên chúng tôi xin phép tạm khóa tài khoản của bạn để xem xét.
      </Text>
      <TouchableOpacity
        style={{
          paddingHorizontal: 30,
          height: 40,
          backgroundColor: '#E94057',
          borderRadius: 10,
          top: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={QuayLai}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            paddingHorizontal: 10,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            top: 10,
          }}>
          Quay lại
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VoHieuHoa;

const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
    bottom: 30,
  },
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    opacity: 0.95,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E94057',
    letterSpacing: 1.5,
    bottom: 45,
  },
  title1: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    bottom: 70,
    paddingHorizontal: 10,
  },
  title12: {
    fontSize: 15,
    textAlign: 'center',
    letterSpacing: 1,
    bottom: 30,
    paddingHorizontal: 20,
  },
});
