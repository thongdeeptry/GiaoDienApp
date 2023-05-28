import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import MapView, {
  Marker,
  AnimatedRegion,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import * as Location from 'expo-location';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../../config';
import {getAuth} from 'firebase/auth';
import axios from 'axios';
import {getDatabase, ref, onValue, set, push, update} from 'firebase/database';
let GOOGLE_MAP_KEY = 'AIzaSyDsRQsfFoJ5X6ZnV65ih0eI1AQsH0sZLbs';
const MapViewU = () => {
  initializeApp(firebaseConfig);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  const mapRef = useRef();
  const markerRef = useRef();
  const [location, setlocation] = useState('');
  const [lat, setLat] = useState(14.0583);
  const [long, setLong] = useState(108.2772);
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.004;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  useEffect(() => {
    getLocation();
    RequestP();
    getLiveLocation();
    onCenter();
    animate(lat, long);
  }, []);
  const getLocation = async () => {
    try {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setlocation('Không có quyền truy cập vị trí');
      }
      const vitri = await Location.getCurrentPositionAsync({});
      const diachi = await Location.reverseGeocodeAsync({
        latitude: vitri.coords.latitude,
        longitude: vitri.coords.longitude,
      });
      setLat(vitri.coords.latitude);
      setLong(vitri.coords.longitude);
      let city;
      let country;
      diachi.find(p => {
        city = p.street + ',' + p.subregion + ',' + p.region + ',' + p.country;
        setlocation(city + '');
      });
    } catch (error) {
      console.log('loi');
    }
  };
  const getLiveLocation = async (latt, longg) => {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        latt +
        ',' +
        longg +
        '&key=' +
        GOOGLE_MAP_KEY,
    );
    setlocation(response?.data?.results[0]?.formatted_address);
  };
  const RequestP = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      //console.warn(err);
    }
  };
  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS === 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 2000);
      }
    }
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: lat,
      longitude: long,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };
  const onAdd = () => {
    const duongdan = ref(db, 'users/' + user);
    update(duongdan, {
      diachi: location,
      lat: lat,
      long: long,
    });
    ToastAndroid.show('Cập nhật địa chỉ thành công', ToastAndroid.BOTTOM);
  };
  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        pitchEnabled={true}
        followsUserLocation={true}
        showsCompass={true}
        userLocationCalloutEnabled
        showsBuildings={true}
        showsTraffic={true}
        showsMyLocationButton
        showsPointsOfInterest
        showsIndoorLevelPicker
        showsIndoors={true}
        showsUserLocation
        style={styles.map}
        onRegionChangeComplete={region => {
          setLat(region.latitude);
          setLong(region.longitude);
          getLiveLocation(region.latitude, region.longitude);
        }}
        //userInterfaceStyle={'dark'}
        //showsUserLocation={true}
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        <Marker.Animated
          ref={markerRef}
          coordinate={{
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          //   onPress={onPressChange}
          image={require('../../image/vitri.png')}
        />
      </MapView>
      <TouchableOpacity
        onPress={onAdd}
        style={{
          position: 'absolute',
          bottom: 70,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E94057',
          padding: 15,
          borderRadius: 20,
          elevation: 5,
          width: '90%',
          marginHorizontal: 20,
        }}>
        <Text style={{color: 'white', fontSize: 16}}>{location}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapViewU;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
