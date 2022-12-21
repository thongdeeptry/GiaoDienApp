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
export const AllSuport = ({route, navigation}) => {
  initializeApp(firebaseConfig);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  const dataRoom = [];
  const [refreshing, setRefreshing] = React.useState(false);
  initializeApp(firebaseConfig);
  useEffect(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const referencerrs = ref(db, 'support');
  onValue(referencerrs, snapshot => {
    snapshot.forEach(childSnapshotq => {
      childSnapshotq.forEach(childSnapshotq1 => {
        if (childSnapshotq1.child('thaotac').exportVal() == user) {
          const id = childSnapshotq1.child('id').exportVal();
          const avt = childSnapshotq1.child('avt').exportVal();
          const name = childSnapshotq1.child('name').exportVal();
          const link = childSnapshotq1.child('link').exportVal();
          const lydokhac = childSnapshotq1.child('lydokhac').exportVal();
          const noidung = childSnapshotq1.child('noidung').exportVal();
          const thaotac = childSnapshotq1.child('thaotac').exportVal();
          const trangthai = childSnapshotq1.child('trangthai').exportVal();
          dataRoom.push({
            id: id,
            avt: avt,
            name: name,
            link: link,
            lydokhac: lydokhac,
            noidung: noidung,
            thaotac: thaotac,
            trangthai: trangthai,
          });
        }
      });
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
            Đơn hỗ trợ đã gửi
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
            {dataRoom.length == 0 ? 'Không có đơn hỗ trợ nào' : ''}
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
                      navigation.navigate('ProfileFriend', {id: item.thaotac})
                    }>
                    <Image
                      style={[
                        {
                          width: 60,
                          height: 60,
                          resizeMode: 'cover',
                          borderRadius: 10,
                          marginRight: 10,
                          marginStart: 10,
                          borderColor: 'blue',
                          borderWidth: 2,
                        },
                        item.trangthai == 'Hoàn Tất'
                          ? {
                              width: 60,
                              height: 60,
                              resizeMode: 'cover',
                              borderRadius: 10,
                              marginRight: 10,
                              marginStart: 10,
                              borderColor: '#E94057',
                              borderWidth: 2,
                            }
                          : null,
                      ]}
                      source={{uri: item.avt}}></Image>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'column',
                      top: 7,
                    }}>
                    <TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '500',
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: 15,
                          opacity: 0.8,
                        }}>
                        Trạng thái :
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          left: 3,
                          color: 'blue',
                        }}>
                        {item.trangthai}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: 15,
                          opacity: 0.8,
                        }}>
                        Nội dung :
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          left: 3,
                          color: '#E94057',
                          width: 230,
                        }}>
                        {item.noidung}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};
