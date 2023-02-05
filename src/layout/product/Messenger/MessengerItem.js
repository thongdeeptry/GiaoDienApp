import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
} from 'react-native';
import {images, colors, icons, fontSizes} from '../../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {screenWidth} from '../../../utilies/Device';
import {
  auth,
  onAuthStateChanged,
  firebaseDatabaseRef,
  firebaseSet,
  firebaseDatabase,
  db,
  storage,
} from '../../../../config';
function MessengerItem(props) {
  const user = auth.currentUser.uid;
  const {onPress} = props;
  const {url, isSender, messenger, timestamp, showUrl, senderId, date, image} =
    props.item;
  return senderId != user ? (
    <View style={{flexDirection: 'column'}}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          marginTop: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {showUrl == true ? (
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: 'cover',
              borderRadius: 20,
              marginRight: 15,
              marginStart: 10,
            }}
            source={{uri: url}}
          />
        ) : (
          <View
            style={{
              width: 40,
              height: 40,
              marginRight: 15,
              marginStart: 10,
            }}
          />
        )}

        <View
          style={{
            width: screenWidth * 0.7,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: fontSizes.h5,
                paddingVertical: 5,
                paddingHorizontal: 7,
                backgroundColor: colors.messengertin,
                borderRadius: 10,
                // borderTopLeftRadius: 10,
                // borderTopRightRadius: 10,
              }}>
              {messenger}
            </Text>
          </View>

          <View style={{width: 20}}></View>
        </View>
        {/* isSender = true */}
      </TouchableOpacity>
      {image != '' && image != null && image != undefined ? (
        <Image
          style={{
            width: 40,
            height: 40,
            resizeMode: 'cover',
            borderRadius: 20,
            marginRight: 15,
            marginTop: 10,
          }}
          source={{uri: image}}
        />
      ) : (
        <></>
      )}
    </View>
  ) : (
    <View style={{flexDirection: 'column'}}>
      <TouchableOpacity
        style={{
          marginTop: 5,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: screenWidth * 0.7,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <View style={{width: 40}}></View>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: fontSizes.h5,
                paddingVertical: 5,
                paddingHorizontal: 7,
                backgroundColor: colors.messenger,
                borderRadius: 10,
              }}>
              {messenger}
            </Text>
          </View>
        </View>
        {showUrl == true ? (
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: 'cover',
              borderRadius: 20,
              marginRight: 15,
              marginStart: 10,
            }}
            source={{
              uri: url,
            }}
          />
        ) : (
          <View
            style={{
              width: 40,
              height: 40,
              marginRight: 15,
              marginStart: 10,
            }}
          />
        )}
      </TouchableOpacity>
      {image != '' && image != null && image != undefined ? (
        <Image
          style={{
            width: 40,
            height: 40,
            resizeMode: 'cover',
            borderRadius: 20,
            marginRight: 15,
            marginTop: 10,
          }}
          source={{uri: image}}
        />
      ) : (
        <></>
      )}
    </View>
  );
}
export default MessengerItem;
