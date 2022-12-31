import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

export const Friend = () => {
  return (
    <View>
      <View style={styles.textMat}>
        <Text style={styles.matText}>Matches</Text>
      </View>
      <TouchableOpacity style={styles.khungsort}>
        <Image
          style={styles.textBen}
          source={require('../../image/sorttwo.png')}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.textThis}>
          Đây là danh sách những người đã trở thành bạn bè của bạn.
        </Text>
      </View>
      <View style={styles.LineContainer}>
        <Image style={styles.line} source={require('../../image/line1.png')} />
        <Text style={styles.textToday}>Hôm nay</Text>
        <Image style={styles.line1} source={require('../../image/line1.png')} />
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageNen}
          source={require('../../image/avt.jpg')}
        />

        <Text style={styles.textTen}>Ngô Thành Thông, 21</Text>
        <Image
          style={styles.imageX}
          source={require('../../image/close.png')}
        />
        <Image
          style={styles.imageThanh}
          source={require('../../image/thanh.png')}
        />
        <Image
          style={styles.imageTim}
          source={require('../../image/love.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgmain: {},
  imageTim: {
    position: 'absolute',
    left: 140,
    right: 25,
    top: 365,
    bottom: 25,
  },
  imageThanh: {
    position: 'absolute',
    width: 1,
    height: 40,
    left: 110,
    top: 360,
  },
  imageX: {
    position: 'absolute',
    left: 70,
    right: 25,
    top: 365,
    bottom: 25,
  },
  textTen: {
    color: '#FFFFFF',
    position: 'absolute',
    fontSize: 16,
    width: 108,
    height: 24,
    left: 56,
    top: 332,
    fontWeight: '400',
  },
  imageNen: {
    position: 'absolute',
    width: 140,
    height: 200,
    left: 40,
    top: 200,
  },
  imageContainer: {
    borderRadius: 5,
  },
  line1: {
    position: 'absolute',
    width: 121,
    height: 1,
    left: 250,
    top: 182,
  },
  textToday: {
    position: 'absolute',
    width: 33,
    height: 18,
    left: 190,
    top: 176,
    fontSize: 12,
    fontWeight: '400',
  },
  line: {
    position: 'absolute',
    width: 121,
    height: 1,
    left: 40,
    top: 182,
  },
  LineContainer: {},
  textThis: {
    position: 'absolute',
    fontWeight: '400',
    width: 295,
    height: 48,
    left: 40,
    top: 104,
  },
  benText: {
    position: 'absolute',
    width: 52,
    height: 52,
    left: 283,
    top: 34,
  },
  textBen: {
    position: 'absolute',
    width: 24,
    height: 24,
  },
  khungsort: {
    position: 'absolute',
    width: 40,
    height: 40,
    right: 40,
    top: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#ABABAB',
    borderLeftColor: '#ABABAB',
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightColor: '#ABABAB',
    borderTopColor: '#ABABAB',
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 10,
  },
  matText: {
    fontSize: 34,
    position: 'absolute',
    width: 295,
    height: 51,
    left: 40,
    top: 44,
  },
});
