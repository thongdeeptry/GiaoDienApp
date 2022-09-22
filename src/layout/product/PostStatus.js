import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  TextInput,
  ToastAndroid,
  Animated,
  Easing
} from "react-native";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { firebaseConfig } from "../../../config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import * as Permission from 'expo-permissions'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';

export const PostStatus = ({ route, navigation }) => {
  const {noidung1} = route.params;
  console.log(""+noidung1)
  const app = initializeApp(firebaseConfig);
  const data = [];
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [tuoi, settuoi] = useState();
  const [diachi, setdiachi] = useState();
  const [ngaysinh, setngaysinh] = useState();
  const [gioitinh, setgioitinh] = useState();
  const [sothich, setsothich] = useState();
  const [location, setlocation] = useState()
  const [noidung, setnoidung] = useState();
  const [image, setImage] = useState(null);
  const [upload, setupload] = useState('')
  const [tinh, settinh] = useState()
  let id;
  let cytyy;
  if (!app.length) {
    console.log("Kết nối thành công");
  }
  const auth = getAuth(app);
  const user = getAuth().currentUser.uid;
  const db = getDatabase();
  useEffect(() => {
    const reference = ref(db, "users/" + user);
    onValue(reference, (childSnapshot) => {
      const namepr = childSnapshot.child("name").val();
      const avtpr = childSnapshot.child("avt").val();

      setname(namepr);
      setavt(avtpr);
    });
    const reference1 = ref(db, "post/" + user);
    onValue(reference1, (childSnapshot1) => {
      id = childSnapshot1.size + 1;
    });
  });
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
        setImage(result.uri);
        
    }
    uploadImageToBucket(image, makeid(60))
};
function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

  for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};
const uploadImageToBucket = async (uri, imageName) => {
  const res = await fetch(uri);
  const blob = await res.blob();
  var ref = firebase.storage().ref().child('images/album/' + imageName + '.png');
  setupload('https://firebasestorage.googleapis.com/v0/b/duantotnghiepreact.appspot.com/o/images/album%2F' + imageName + '.png?alt=media')
  
  console.log('Link Anh: ' + upload);
  
  return ref.put(blob);
};
  const getLocation = async()=>{
    const {status} = await Location.requestForegroundPermissionsAsync();
    if(status!=='granted'){
        setlocation('Không có quyền truy cập vị trí');
    }
    const vitri = await Location.getCurrentPositionAsync({});
    const diachi = await Location.reverseGeocodeAsync({
        latitude : vitri.coords.latitude,
        longitude : vitri.coords.longitude
    });
    console.log("Vị Trí : "+vitri.coords.latitude+":"+vitri.coords.longitude);
    let city;
    let country;
    let duong;
    diachi.find( p => {
      country = p.country
      city = p.streetNumber+" " +p.street + ", "+p.subregion+", "+p.region+", "+p.country;
      settinh(p.region)
      setlocation(city)
    });
    console.log("Vị Trí s: "+location);
}

  const AddPost = () => {
    if(noidung==''&&location==''||noidung==null&&location==null){
      ToastAndroid.show("Chưa có nội dung", ToastAndroid.BOTTOM);
    }else{
    const reference13 = ref(db, "post/" + user + "/" + id);
    set(reference13, {
      'name': name,
      'avt': avt,
      'noidung': noidung,
      'checkin':location
    });
    ToastAndroid.show("Đã đăng bài viết", ToastAndroid.BOTTOM);
    navigation.navigate("Profile");
  }
  };

  const ChonAnh=()=>{

  }
  return (
    <View style={styles.tong}>
      <View style={styles.e}>
        <View
          style={{
            width: "100%",
            height: 70,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor: "#ABABAB",
            borderBottomWidth: 0.6,
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", left: 20 }}
          >
            <TouchableOpacity onPress={()=>navigation.goBack()}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Image source={require("../../image/lui.png")} />
            </TouchableOpacity>
            <Text style={{ fontSize: 23, left: 10, opacity: 0.7 }}>
              Tạo bài viết
            </Text>
          </View>
          <View style={{ width: 75, height: 45, opacity: 0.4 }}>
            <TouchableOpacity
              onPress={AddPost}
              style={{
                width: "100%",
                height: "100%",
                right: 20,
                backgroundColor: "#DCDCDC",
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>ĐĂNG</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.infomain}>
        <View style={styles.info}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 35 }}
            source={{ uri: avt }}
          />
          <View style={styles.tenmain}>
            <View style={{flexDirection:"row",width:'90%',paddingRight:5}}>
            <Text style={{ fontSize: 16,fontWeight:"500" }}>{name} {noidung1!=''&noidung1!=null&&noidung1!='undefined'?'- '+noidung1:null}
            <Text style={{ fontSize: 16 }}>{tinh!=''&&tinh!=null?' tại ':null}</Text>
            <Text style={{ fontSize: 16,fontWeight:"500", }}>{tinh!=''?tinh:null} </Text></Text>
           
            
           
            </View>
           
          </View>
        </View>
        <View style={styles.mainnhap}>
          <View
            style={{
              width: "90%",
              height: 100,
              borderBottomColor: "#ABABAB",
              borderBottomWidth: 0.5,
              borderRightColor: "#ABABAB",
              borderRightWidth: 0.5,
              borderLeftColor: "#ABABAB",
              borderLeftWidth: 0.5,
              borderTopColor: "#ABABAB",
              borderTopWidth: 0.5,
              left: "5%",
              borderRadius: 10,
            }}
          >
            <TextInput
              value={noidung}
              onChangeText={setnoidung}
              style={{ left: 20, width: "90%", top: 5 }}
              multiline={true}
              placeholder="Bạn đang nghĩ gì?"
            ></TextInput>
          </View>
          {image == null ? <Image style={{width:0,height:0}} resizeMethod='auto' /> : image && <Image style={styles.image} resizeMethod='auto' source={{ uri: image }} />}
          <View
            style={{
              width: "90%",
              height: 35,

              right: 0,
              left: "5%",
              top: 20,
            }}
          >
            <TouchableOpacity onPress={pickImage}
              style={{ flexDirection: "row", alignItems: "center", left: 5 }}
            >
              <Image
                style={{ width: 30, height: 30, right: 10 }}
                source={require("../../image/image.png")}
              />
              <Text style={{ fontSize: 16, width: 100 }}>Ảnh/video</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
              height: 35,

              right: 0,
              justifyContent: "center",
              left: "5%",
              top: 20,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", left: 5 }}
            >
              <Image
                style={{ width: 30, height: 30, right: 10 }}
                source={require("../../image/friend.png")}
              />
              <Text style={{ fontSize: 16, width: 200 }}>Gắn thẻ bạn bè</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
              height: 35,

              right: 0,
              justifyContent: "center",
              left: "5%",
              top: 20,
            }}
          >
            <TouchableOpacity onPress={()=>navigation.navigate("Camxuc")}
              style={{ flexDirection: "row", alignItems: "center", left: 5 }}
            >
              <Image
                style={{ width: 30, height: 30, right: 10 }}
                source={require("../../image/camxúc.png")}
              />
              <Text style={{ fontSize: 16, width: 200 }}>
                Cảm xúc/hoạt động
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
              height: 35,

              right: 0,
              justifyContent: "center",
              left: "5%",
              top: 20,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", left: 5 }}
            >
              <Image
                style={{ width: 30, height: 30, right: 10 }}
                source={require("../../image/live.png")}
              />
              <Text style={{ fontSize: 16, width: 100 }}>Phát trực tiếp</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
              height: 35,

              right: 0,
              justifyContent: "center",
              left: "5%",
              top: 20,
            }}
          >
            <TouchableOpacity
              onPress={getLocation}
              style={{ flexDirection: "row", alignItems: "center", left: 5 }}
            >
              <Image
                style={{ width: 30, height: 30, right: 10 }}
                source={require("../../image/map.png")}
              />
              <Text style={{ fontSize: 16, width: 100 }}>Vị trí hiện tại</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={AddPost}
            style={{
              width: "90%",
              height: 50,
              top: 40,
              alignItems: "center",
              left: "5%",
              backgroundColor: "#E94057",
              justifyContent: "center",
              borderRadius: 15,
            }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>ĐĂNG</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    left: 20,
    width: 100,
    height: 100,
    borderRadius: 25,
},
  mainnhap: {
    flexDirection: "column",
    width: "100%",
    top: 20,
    height: "100%",
  },
  infomain: {
    top: 110,
    width: "100%",
    height: "100%",
  },
  tenmain: {
    width: "100%",
    height: 60,
    left: 10,
  },
  info: {
    width: "90%",
    height: 60,
    left: 20,
   paddingRight:20,
    flexDirection: "row",
  },
  r: {
    position: "absolute",
    width: "100%",
    height: "100%",
    fontSize: 20,
  },
  e: {
    position: "absolute",
    width: "100%",
    height: 40,

    top: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  w: {
    position: "absolute",
    width: "100%",
    height: 100,
    left: 20,
    top: 90,
    fontSize: 20,
    opacity: 0.3,
  },
  q: {
    position: "absolute",
    width: "100%",
    height: 100,
  },
  tong: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});
