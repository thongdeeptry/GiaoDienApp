import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  RefreshControl,
} from 'react-native';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../../config';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, onValue, set, push, update} from 'firebase/database';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
export const AllRoomCall = ({route, navigation}) => {
  initializeApp(firebaseConfig);
  const db = getDatabase();
  const dataRoom = [];
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const d = new Date();
  const ngay = d.getDate();
  const thang = d.getMonth() + 1;
  const nam = d.getFullYear();
  const referencerrs = ref(db, 'roomCall');
  onValue(referencerrs, snapshot => {
    snapshot.forEach(childSnapshotq => {
      if (
        childSnapshotq.child('ngaytao').exportVal() ==
        ngay + ' Tháng ' + thang + ' Năm ' + nam
      ) {
        const id = childSnapshotq.child('id').exportVal();
        const name = childSnapshotq.child('name').exportVal();
        const avt = childSnapshotq.child('avt').exportVal();
        const token = childSnapshotq.child('token').exportVal();
        const channel = childSnapshotq.child('channel').exportVal();
        const thoigian = childSnapshotq.child('ngaytao').exportVal();
        const songuoi = childSnapshotq.child('songuoi').exportVal();
        dataRoom.push({
          id: id,
          name: name,
          avt: avt,
          token: token,
          channel: channel,
          thoigian: thoigian,
          songuoi: songuoi,
        });
      }
    });
  });
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingBottom: 25,
          top: 10,
        }}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{position: 'absolute', width: 50, height: 50}}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../../image/back.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontSize: 23,
              color: '#E94057',
              fontWeight: '600',
              letterSpacing: 1.2,
            }}>
            Phòng trò chuyện
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingBottom: 30,
          borderTopColor: '#ABABAB',
          borderTopWidth: 0.3,
        }}>
        <View>
          <Text
            style={[
              {textAlign: 'center', top: 0},
              dataRoom.length == 0 ? {top: 5} : null,
            ]}>
            {dataRoom.length == 0 ? 'Không có phòng trò chuyện nào' : ''}
          </Text>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            data={dataRoom}
            style={{height: '100%'}}
            renderItem={({item, index}) => (
              <View
                style={{
                  padding: 10,
                  paddingStart: 10,
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  elevation: 5,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProfileFriend', {id: item.id})
                    }>
                    <Image
                      style={{
                        width: 60,
                        height: 60,
                        resizeMode: 'cover',
                        borderRadius: 10,
                        marginRight: 10,
                        marginStart: 10,
                        borderColor: 'blue',
                        borderWidth: 2,
                      }}
                      source={{uri: item.avt}}></Image>
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        position: 'absolute',
                        left: 15,
                        top: 5,
                      }}
                      source={require('../../image/joinroom.png')}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'column',
                      top: 7,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '500',
                      }}>
                      {item.name}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: 15,
                          opacity: 0.8,
                        }}>
                        Số người đang trò chuyện :
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          left: 3,
                          color: '#E94057',
                        }}>
                        {item.songuoi}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    width: 80,
                    height: 40,
                    right: 5,
                    elevation: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    navigation.navigate('JoinRoom', {
                      token: item.token,
                      channel: item.channel,
                      nameLive: item.name,
                      thoigian: item.thoigian,
                      avt: item.avt,
                      id: item.id,
                      songuoi: item.songuoi,
                    })
                  }>
                  <Text style={{color: 'blue', fontSize: 18}}>Vào</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};
