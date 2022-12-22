import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const VoHieuHoa = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.title}>GenzLove</Text>
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
          top: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
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
          Yêu cầu mở khóa
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VoHieuHoa;

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    opacity: 0.95,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E94057',
    letterSpacing: 1,
    bottom: 100,
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
