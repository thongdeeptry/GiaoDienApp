import { StyleSheet, Text, View, Image, Button, ScrollView,TouchableOpacity,FlatList,Pressable } from 'react-native'
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set, push ,update} from "firebase/database";
const Home = (props) => {
    const { navigation } = props;
  initializeApp(firebaseConfig);
    let noidung1 = "";
    const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [id, setid] = useState();
  const datapost = []
  const dataStory= []
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
  });
  const referencer = ref(db, "post");
  onValue(referencer, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        childSnapshot.forEach((childSnapshotq) => {
      const id = childSnapshotq.child("id").exportVal();
      const name = childSnapshotq.child("name").exportVal();
      const avt = childSnapshotq.child("avt").exportVal();
      const noidung = childSnapshotq.child("noidung").exportVal();
      const trangthai = childSnapshotq.child("checkin").exportVal();
      const thoigian = childSnapshotq.child("thoigian").exportVal();
      const image = childSnapshotq.child("image").exportVal();
      datapost.push({
        id: id,
        name: name,
        avt: avt,
        noidung: noidung,
        checkin: trangthai,
        thoigian: thoigian,
        image: image,
      });
    });
});
  });

  const referencerr = ref(db, "story");
  onValue(referencerr, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        childSnapshot.forEach((childSnapshotq) => {
      const id = childSnapshotq.child("id").exportVal();
      const name = childSnapshotq.child("name").exportVal();
      const avt = childSnapshotq.child("avt").exportVal();
      const noidung = childSnapshotq.child("noidung").exportVal();
      const trangthai = childSnapshotq.child("checkin").exportVal();
      const thoigian = childSnapshotq.child("thoigian").exportVal();
      const image = childSnapshotq.child("image").exportVal();
      dataStory.push({
        id: id,
        name: name,
        avt: avt,
        noidung: noidung,
        checkin: trangthai,
        thoigian: thoigian,
        image: image,
      });
    });
});
  });

    return (
        <ScrollView style={{height: '100%', width: '100%',backgroundColor:'white'}}>
        <View style={{ top: 75 ,flexDirection:'column',marginBottom:40}}>
                <View style={styles.phuten}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: 90,
                        justifyContent: "space-between",
                      }}
                    >
                     
                    </View>
                  </View>
                  <View
                    style={{
                      width: "90%",
                      left: 20,
                      top: 40,
                      height: 50,
                      backgroundColor: "white",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("PostStatus", noidung1)
                      }
                      style={{
                        width: "100%",
                        height: 50,
                        position: "absolute",
                        backgroundColor: "white",
                        borderBottomColor: "#ABABAB",
                        borderLeftColor: "#ABABAB",
                        borderLeftWidth: 1,
                        borderBottomWidth: 1,
                        borderRightColor: "#ABABAB",
                        borderTopColor: "#ABABAB",
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        borderRadius: 8,
                        paddingLeft: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 18, opacity: 0.7 }}>
                        Bạn muốn đăng gì?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
               <View>
               <FlatList 
               horizontal
               style={styles.addContainer}
                
               showsHorizontalScrollIndicator={false}
              data={dataStory}
              renderItem={({ item, index }) => (
                
                  <TouchableOpacity  key={index}>
               
           
            <View>
                <Image style={styles.str1Container} source={{uri:item.image}} />
            </View>
            <View>
                <Image style={styles.nameContainer} source={{uri:item.avt}} />
            </View>
            <View>
                <Text style={styles.textContainer}>{item.name}</Text>
            </View>

            </TouchableOpacity> 
              )}
            />
               </View>
        </View>
               {/* <View style={styles.addContainer}>
                </View> */}
            
          <View style={{top:100}}>
            <Text style={{ fontSize: 19,paddingHorizontal:20 }}>Bài viết và hoạt động</Text>
                <View style={{ width: "100%",paddingHorizontal:20 }}>
                  <FlatList
                    contentContainerStyle={{
                      flexDirection: "column",
                    }}
                    data={datapost}
                    renderItem={({ item, index }) => (
                      <Pressable
                        key={index}
                        style={[
                          {
                            borderBottomColor: "#ABABAB",
                            borderLeftColor: "#ABABAB",
                            borderLeftWidth: 0.5,
                            borderBottomWidth: 0.5,
                            borderRightColor: "#ABABAB",
                            borderTopColor: "#ABABAB",
                            borderRightWidth: 0.5,
                            borderTopWidth: 0.5,
                            borderRadius: 15,
                            marginTop: 20,
                          },
                          item == ""
                            ? { width: 0, height: 0, display: "none" }
                            : null,
                        ]}
                      >
                        <View style={styles.info}>
                          <Image
                            style={{ width: 40, height: 40, borderRadius: 20 }}
                            source={{ uri: avt }}
                          />
                          <View style={styles.tenmain}>
                            <View
                              style={{
                                flexDirection: "row",
                                width: "100%",
                                paddingRight: 5,
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                  height: 35,
                                }}
                              >
                                <Text
                                  style={{ fontSize: 16, fontWeight: "500" }}
                                >
                                  {name}
                                </Text>
                                <Text style={{ fontSize: 14 }}>
                                  {item.thoigian}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <Text
                          style={{
                            fontSize: 18,
                            color: "black",
                            paddingHorizontal: 10,
                            marginTop: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingBottom: 10,
                            width: "100%",
                            alignSelf: "center",
                            //textAlign: "center",
                            fontWeight: "400",
                          }}
                        >
                          {item.noidung}
                        </Text>

                        {item.image != "" ? (
                          <Image
                            style={{
                              width: "90%",
                              height: 160,
                              alignItems: "center",
                              alignSelf: "center",
                              alignContent: "center",
                              justifyContent: "center",
                              borderRadius: 15,
                              marginBottom: 10,
                            }}
                            source={{ uri: item.image }}
                          />
                        ) : null}
                      <Text
                          style={[{
                            fontSize: 15,
                            color: "black",
                            paddingHorizontal: 10,
                            fontWeight: "300",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingBottom: 10,
                            width: "100%",
                            alignSelf: "center",
                            //textAlign: "center",
                          },item.checkin==""?{width:0,height:0}:null]}
                        >
                          {item.checkin}
                        </Text>
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            borderTopWidth: 0.2,
                            paddingVertical: 10,
                          }}
                        >
                          <TouchableOpacity style={{flexDirection:'row' }} onPress={()=>AddLike(item.id)}>
                          <Image style={styles.iclikeContainer} source={require('../assets/iclike.png')} />
                            <Text style={{ fontSize: 17,color:"black" }}>Thích</Text>
                          </TouchableOpacity>
                          <TouchableOpacity  style={{flexDirection:'row' }}>
                          <Image style={styles.cmtContainer} source={require('../assets/iccmt.png')} />

                            <Text style={{ fontSize: 17 }}>Bình luận</Text>

                          </TouchableOpacity>
                        </View>
                      </Pressable>
                    )}
                  />
                </View>
                </View>




            {/* <View>
                <Image style={styles.gachContainer} source={require('../assets/gachngang.png')} />
            </View>
            <View>
                <Image style={styles.tenContainer} source={require('../assets/user2.jpg')} />
            </View>
            <View>
                <Text style={styles.userName}>Admin</Text>
            </View>
            <View>
                <Text style={styles.hourContainer}>2 phút trước</Text>
            </View>
            <View>
                <Image style={styles.shareContainer} source={require('../assets/share.png')} />
            </View>
            <View>
                <Image style={styles.iconContainer} source={require('../assets/friend.png')} />
            </View>
            <View>
                <Text style={styles.baidangContainer}>Admin đẹp zai</Text>
            </View>
            <View>
                <Image style={styles.bgrContainer} source={require('../assets/bgr.png')} />
            </View>
            
            <View>
            <Image style={styles.iclikeContainer} source={require('../assets/iclike.png')} />
                <Text style={styles.thich}>Thích</Text>
                
            </View>
            <View>
                <Image style={styles.cmtContainer} source={require('../assets/iccmt.png')} />
                <Text style={styles.cmt}>Bình luận</Text>
            </View>
            <View>
                <Image style={styles.mesContainer} source={require('../assets/mes.png')} />
                <Text style={styles.mes}>Gửi</Text>
            </View>
            <View>
                <Image style={styles.likeContainer} source={require('../assets/like.png')} />
            </View>
            <View>
                <Text style={styles.nguoilike}>Bạn và 2 người khác</Text>
            </View>
            <View>
                <Text style={styles.comment}>4 bình luận</Text>
            </View> */}
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    tenmain: {
        width: "100%",
        height: 50,
        left: 10,
      },
      info: {
        width: "100%",
        height: 50,
        left: 10,
        top: 5,
        paddingRight: 20,
        flexDirection: "row",
      },
    mes:{
        left: 340,
        top: -78,
    },
    mesContainer:{
        width: 21,
        height: 21,
        left: 310,
        top: -61,
    },
    cmt:{
        width: 50,
        height: 20,
        left: 200,
        fontSize: 15,
        top: -38,
    },
    cmtContainer:{
      right:5,
       top:3
    },
    thich: {
        width: 50,
        height: 20,
        left: 60,
        fontSize: 15,
    },
    iclikeContainer: {
       right:5,
       top:3
        
       
       
    },
    comment:{
        width: 60,
        height: 13,
        left: 310,
        top: -85,
    },
    nguoilike:{
        width: 187,
        height: 20,
        left: 51,
        top: -63,
    },
    likeContainer: {
        width: 17,
        height: 17,
        left: 20,
        top: -49,
    },
    bgrContainer: {
        width: '100%',
        height: 250,
    },
    baidangContainer: {
        width: 120,
        height: 17,
        left: 21,
        top: -20,
    },
    iconContainer: {
        width: 9,
        height: 9,
        left: 170,
        top: -45,
    },
    shareContainer: {
        width: 15,
        height: 1,
        left: 367,
        top: -35,
    },
    hourContainer: {
        width: 140,
        height: 20,
        left: 87,
        top: -35,
    },
    userName: {
        width: 193,
        height: 34,
        top: -30,
        left: 86,
        fontSize: 20,
    },
    tenContainer: {
        width: 50,
        height: 50,
        top: 20,
        left: 21,
        borderRadius: 10,
    },
    gachContainer: {
        width: '100%',
    },
    textContainer: {
        width: 100,
        height: 20,
        fontSize: 15,
        top: -55,
        color: 'white',
    },
    nameContainer: {
        width: 25,
        height: 25,
        //left: 125,
        top: -120,
        borderRadius:15
    },
    str1Container: {
        width: 90,
        height: 130,
        borderRadius:15
    },
    addContainer: {
        height: 135,
        top: 55,
        marginHorizontal:20
    },
    avtContainer: {
        width: 50,
        height: 50,
        top: 90,
        left: 20,
        borderRadius: 30,
    },
    avt: {

    },
})