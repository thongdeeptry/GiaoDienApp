import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';

export default Story = ({route, navigation}) => {
  const {id} = route.params;
  const {image} = route.params;
  const {avt} = route.params;
  const {name} = route.params;
  const {noidung} = route.params;
  return (
    <View style={styles.tong}>
      <Image
        style={styles.hinh}
        source={{uri: image}}
        resizeMode="contain"></Image>
      <View style={styles.con}>
        <View style={styles.ten}>
          <TouchableOpacity
            style={styles.maininfo}
            onPress={() =>
              navigation.navigate('ProfileFriend', {
                id: id,
              })
            }>
            <Image style={styles.avt} source={{uri: avt}} />
            <Text style={styles.ten1}>{name}</Text>
          </TouchableOpacity>
          <View style={styles.mainclose}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image
                style={styles.close}
                source={require('../../image/close.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tongts}>
          <Text style={styles.texttamsu}>{noidung}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tongts: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '85%',
    alignItems: 'center',
  },
  texttamsu: {
    textAlign: 'center',
    width: '100%',
    height: 100,
    left: 20,
    fontSize: 18,

    color: 'white',
  },
  stickerr: {
    width: 45,
    height: 45,
    position: 'relative',
  },
  gui: {
    width: 45,
    height: 45,
    right: 0,

    left: 10,
    borderRadius: 15,

    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sticker: {
    position: 'absolute',
    width: 20,
    height: 20,
    right: 15,
  },
  nhantin: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',

    width: '93%',
    height: 45,

    borderRadius: 15,
    color: 'white',
  },
  nho: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    top: '100%',
  },
  close: {
    width: 30,
    height: 30,
    left: 45,
  },
  mainclose: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  maininfo: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  ten1: {
    position: 'absolute',
    width: 300,
    height: 24,
    left: 60,
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    opacity: 0.7,
  },
  avt: {
    position: 'absolute',
    width: 48,
    height: 48,

    borderRadius: 30,
  },
  ten: {
    position: 'absolute',
    width: '100%',
    height: 56,
    top: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  con: {
    position: 'absolute',
    width: '85%',
    height: '85%',
    left: 10,
  },
  hinh: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  tong: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
});
