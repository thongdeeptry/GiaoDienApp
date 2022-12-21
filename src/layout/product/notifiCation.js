import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../../config';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, onValue, set, push} from 'firebase/database';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
export default notifiCation = ({route, navigation}) => {
  const app = initializeApp(firebaseConfig);
  if (!app.length) {
  }
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  const [id, setid] = useState();
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [noidung, setnoidung] = useState();
  const [thoigian, setthoigian] = useState();
  const [users, setusers] = useState();
  const [isLoading, setisLoading] = useState(false);
  const dataTB = [];
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const reference = ref(db, 'notification/' + user);
  onValue(reference, childSnapshot => {
    childSnapshot.forEach(snapshot => {
      const id = snapshot.child('id').val();
      const noidung = snapshot.child('noidung').val();
      const thoigian = snapshot.child('thoigian').val();
      const users = snapshot.child('user').val();
      const avt = snapshot.child('avt').val();
      const name = snapshot.child('name').val();
      dataTB.push({
        id: id,
        noidung: noidung,
        thoigian: thoigian,
        user: users,
        avt: avt,
        name: name,
      });
    });
  });
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'column',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <Text
          style={{fontSize: 22, color: '#E94057', letterSpacing: 1, top: 5}}>
          Thông báo
        </Text>
      </View>
      <ScrollView
        style={{marginBottom: 70, top: 10}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.dataMap}>
          <Text style={{fontSize: 16, textAlign: 'center', top: 5}}>
            {dataTB.length == 0 ? 'Không có thông báo' : ''}
          </Text>
          {dataTB.map((item, index) => (
            <Pressable
              key={index}
              style={{
                borderBottomColor: '#ABABAB',
                borderLeftColor: '#ABABAB',
                borderLeftWidth: 0.5,
                borderBottomWidth: 0.5,
                borderRightColor: '#ABABAB',
                borderTopColor: '#ABABAB',
                borderRightWidth: 0.5,
                borderTopWidth: 0.5,
                borderRadius: 15,
                paddingVertical: 5,
                marginBottom: 10,
              }}>
              <View style={styles.info}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProfileFriend', {
                      id: item.user,
                    })
                  }>
                  <Image
                    style={{width: 40, height: 40, borderRadius: 20}}
                    source={{uri: item.avt}}
                  />
                </TouchableOpacity>
                <View style={styles.tenmain}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      paddingRight: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: 35,
                        width: '100%',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          width: '85%',
                        }}>
                        {item.name} {item.noidung}
                      </Text>
                      <Text style={{fontSize: 11}}>{item.thoigian}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dataMap: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  tenmain: {
    width: '100%',
    height: 50,
    left: 10,
  },
  info: {
    width: '100%',
    height: 50,
    left: 10,
    top: 5,
    flexDirection: 'row',
  },
});
