import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  PanResponder,
  View,
  Pressable,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {firebaseConfig} from '../../../../../config';
import Card from '../Card';
import {initializeApp} from 'firebase/app';
import Footer from '../Footer';
import {ACTION_OFFSET, CARD} from '../utils/constants';
import {pets as petsArray} from './data';
import {styles} from './styles';
import {getAuth} from 'firebase/auth';
import {
  getDatabase,
  ref,
  onValue,
  set,
  update,
  remove,
} from 'firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-deck-swiper';
import PhotoCards from '../../data/PhotoCards';
import CardT from '../../components/Card';
import OverlayLabel from '../../data/OverlayLable';
export default function Main({route, navigation}) {
  initializeApp(firebaseConfig);
  let noidung1 = '';
  const db = getDatabase();
  const [pets, setPets] = useState(petsArray);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  const user = getAuth().currentUser.uid;
  const [lat1, setLat] = useState();
  const [long1, setLong] = useState();
  const [avtU, setAvtu] = useState('');
  const dataStory = [];
  useEffect(() => {
    const reference = ref(db, 'users/' + user);
    onValue(reference, childSnapshot => {
      const latp = childSnapshot.child('lat').val();
      const longp = childSnapshot.child('long').val();
      setLat(latp);
      setLong(longp);
      setAvtu(childSnapshot.child('avt').val());
    });
    if (!pets.length) {
      setPets(petsArray);
    }
  }, [pets.length === 0]);
  const d = new Date();
  const ngay = d.getDate();
  const thang = d.getMonth() + 1;
  const nam = d.getFullYear();
  const referencerr = ref(db, 'story');
  onValue(referencerr, snapshot => {
    snapshot.forEach(childSnapshot => {
      childSnapshot.forEach(childSnapshotq => {
        if (
          childSnapshotq.child('thoigian').exportVal() ==
          ngay + ' Tháng ' + thang + ' Năm ' + nam
        ) {
          const id = childSnapshotq.child('id').exportVal();
          const name = childSnapshotq.child('name').exportVal();
          const avt = childSnapshotq.child('avt').exportVal();
          const noidung = childSnapshotq.child('noidung').exportVal();
          const trangthai = childSnapshotq.child('checkin').exportVal();
          const thoigian = childSnapshotq.child('thoigian').exportVal();
          const image = childSnapshotq.child('image').exportVal();
          dataStory.push({
            id: id,
            user: childSnapshotq.child('user').exportVal(),
            name: name,
            avt: avt,
            noidung: noidung,
            checkin: trangthai,
            thoigian: thoigian,
            image: image,
            tick: childSnapshotq.child('tick').exportVal(),
          });
        }
      });
    });
  });
  console.log(dataStory);
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy, y0}) => {
      swipe.setValue({x: dx, y: dy});
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, {dx, dy}) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setPets(prevState => prevState.slice(1));
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);

  const handleChoice = useCallback(
    direction => {
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCREEN,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x],
  );
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return parseInt(d);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  return (
    <View style={styles.container}>
      {pets
        .map(
          (
            {id, name, source, tuoi, diachi, tick, sex, lat, long, nghenghiep},
            index,
          ) => {
            const isFirst = index === 0;
            const km = getDistanceFromLatLonInKm(lat1, long1, lat, long);
            const dragHandlers = isFirst ? panResponder.panHandlers : {};
            return source !== null && id !== user ? (
              <Pressable
                onPress={() => navigation.navigate('ProfileFriend', {id})}
                style={{width: '100%', height: '100%', position: 'absolute'}}>
                <View
                  style={{
                    paddingHorizontal: 0,
                    top: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingTop: 20,
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 23,
                        color: '#E94057',
                        fontWeight: '600',
                        letterSpacing: 1.2,
                        top: 5,
                      }}>
                      GenzLove
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Timkiem')}>
                      <Image
                        style={{width: 35, height: 35, right: 5}}
                        source={require('../../../../assets/search.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('CaiDat')}>
                      <Image
                        style={{width: 35, height: 35}}
                        source={require('../../../../image/setting.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 60,
                    top: 70,

                    position: 'absolute',
                  }}>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('PostStatus', noidung1)
                      }>
                      <View
                        style={{
                          borderColor: '#E94057',
                          padding: 2,
                          borderWidth: 1,
                          borderRadius: 30,
                        }}>
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                          }}
                          source={{uri: avtU}}
                        />
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                            position: 'absolute',
                          }}
                          source={require('../../../../image/them.png')}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <FlatList
                      horizontal
                      style={{
                        height: 60,
                        paddingHorizontal: 7,
                        position: 'absolute',
                      }}
                      showsHorizontalScrollIndicator={false}
                      data={dataStory}
                      extraData={dataStory}
                      renderItem={({item, index}) => (
                        <View key={index}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('Story', {
                                id: item.user,
                                image: item.image,
                                avt: item.avt,
                                name: item.name,
                                noidung: item.noidung,
                              })
                            }>
                            <View
                              style={{
                                borderColor: '#E94057',
                                padding: 2,
                                borderWidth: 1,
                                borderRadius: 30,
                              }}>
                              <Image
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 25,
                                }}
                                source={{uri: item.avt}}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    marginTop: 140,
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      backgroundColor: '#E94057',
                      paddingHorizontal: 10,
                      paddingVertical: 3,
                      borderRadius: 15,
                      color: 'white',
                      fontSize: 16,
                    }}>
                    New
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AllUser')}>
                    <Text
                      style={{
                        backgroundColor: '#E94057',
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        borderRadius: 15,
                        color: 'white',
                        fontSize: 15,
                      }}>
                      See all
                    </Text>
                  </TouchableOpacity>
                </View>
                <Card
                  key={id}
                  name={name}
                  source={
                    source === null
                      ? sex === 'Nam'
                        ? 'https://i.ibb.co/XFz2BR8/avtnbam.png'
                        : 'https://i.ibb.co/CPVcDj9/avtnu.jpg'
                      : source
                  }
                  tuoi={tuoi}
                  diachi={diachi}
                  tick={tick}
                  isFirst={isFirst}
                  swipe={swipe}
                  tiltSign={tiltSign}
                  sex={sex}
                  km={km}
                  nghenghiep={nghenghiep}
                  pets={pets}
                  {...dragHandlers}></Card>
              </Pressable>
            ) : (
              <></>
            );
          },
        )
        .reverse()}

      <Footer handleChoice={handleChoice} />
    </View>
  );
}
