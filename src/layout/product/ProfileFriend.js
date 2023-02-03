import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  ToastAndroid,
  Modal,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../../../config';
import {getAuth} from 'firebase/auth';
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  update,
  remove,
} from 'firebase/database';
import Clipboard from '@react-native-community/clipboard';
import {sendMess} from '../../constants/sendMess';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
export const ProfileFriend = ({route, navigation}) => {
  const {id} = route.params;
  let check;
  const app = initializeApp(firebaseConfig);
  const dataImage = [];
  const datas = [];
  const dataFriend = [];
  const dataLike = [];
  let noidung1 = '';
  const [nameCr, setnameCr] = useState();
  const [avtCr, setavtCr] = useState();
  const [tokendvCr, settokendvCr] = useState();
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [tick, settick] = useState();
  const [tuoi, settuoi] = useState();
  const [diachi, setdiachi] = useState();
  const [follow, setfl] = useState();
  const [ngaysinh, setngaysinh] = useState();
  const [gioitinh, setgioitinh] = useState();
  const [sothich, setsothich] = useState();
  const [nghenghiep, setnghenghiep] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [tieusu, settieusu] = useState();
  const [idPost, setidPost] = useState();
  const [isCheckedStatus, setCheckedStatus] = useState(false);
  const [tickfr, settickfr] = useState();
  if (!app.length) {
  }
  const user = id;
  const idFr = getAuth().currentUser.uid;
  const idCurrent = getAuth().currentUser.uid;
  const db = getDatabase();
  const [daco, setdaco] = useState(false);
  const [dacod, setdacod] = useState(false);
  const sothich2 = [];
  const [refreshing, setRefreshing] = React.useState(false);
  const [isCheckedStatusmore, setCheckedStatusmore] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    const reference1d1 = ref(db, 'favourite/' + id + '/' + idCurrent);
    onValue(reference1d1, snapshot1 => {
      if (snapshot1.exists()) {
        setdaco(true);
      } else {
        setdaco(false);
      }
    });
    console.log(daco);
    setisLoading(true);
    const reference = ref(db, 'users/' + user);
    onValue(reference, childSnapshot => {
      const namepr = childSnapshot.child('name').val();
      const avtpr = childSnapshot.child('avt').val();
      const tuoipr = childSnapshot.child('tuoi').val();
      const diachipr = childSnapshot.child('diachi').val();
      const ngaysinhpr = childSnapshot.child('ngaysinh').val();
      const gioitinhpr = childSnapshot.child('gioitinh').val();
      const nghenghiep = childSnapshot.child('nghenghiep').val();
      setname(namepr);
      setavt(avtpr);
      setdiachi(diachipr);
      settuoi(tuoipr);
      setgioitinh(gioitinhpr);
      setngaysinh(ngaysinhpr);
      setnghenghiep(nghenghiep);
      setisLoading(false);
      settick(childSnapshot.child('tick').val());
      settieusu(childSnapshot.child('tieusu').val());
      setfl(childSnapshot.child('follow').exportVal());
    });
    const referencecr = ref(db, 'users/' + idCurrent);
    onValue(referencecr, childSnapshot => {
      const namepr = childSnapshot.child('name').val();
      const avtpr = childSnapshot.child('avt').val();
      const tokendv = childSnapshot.child('token').val();
      settokendvCr(tokendv);
      setnameCr(namepr);
      setavtCr(avtpr);
      settickfr(childSnapshot.child('tick').val());
    });
  });
  const referencetuongtac = ref(db, 'tuongtac/' + idCurrent);
  onValue(referencetuongtac, childSnapshot1 => {
    childSnapshot1.forEach(snapshot1 => {
      const id = snapshot1.key;
      dataLike.push(id);
    });
  });
  console.log(dataLike);
  const referencer = ref(db, 'post/' + user);
  onValue(referencer, snapshot => {
    snapshot.forEach(childSnapshot => {
      const id = childSnapshot.child('id').exportVal();
      const name = childSnapshot.child('name').exportVal();
      const avt = childSnapshot.child('avt').exportVal();
      const noidung = childSnapshot.child('noidung').exportVal();
      const trangthai = childSnapshot.child('checkin').exportVal();
      const thoigian = childSnapshot.child('thoigian').exportVal();
      const image = childSnapshot.child('image').exportVal();
      const user = childSnapshot.child('user').exportVal();
      if (
        dataLike.includes('' + childSnapshot.child('id').exportVal()) == true
      ) {
        datas.push({
          id: id,
          name: name,
          avt: avt,
          noidung: noidung,
          checkin: trangthai,
          thoigian: thoigian,
          image: image,
          user: user,
          tick: childSnapshot.child('tick').exportVal(),
          like: true,
          solike: childSnapshot.child('like').exportVal(),
        });
      } else {
        datas.push({
          id: id,
          name: name,
          avt: avt,
          noidung: noidung,
          checkin: trangthai,
          thoigian: thoigian,
          image: image,
          user: user,
          tick: childSnapshot.child('tick').exportVal(),
          like: false,
          solike: childSnapshot.child('like').exportVal(),
        });
      }
    });
  });
  const clipboard = async text => {
    Clipboard.setString(text);
    ToastAndroid.show('Sao chép liên kết thành công', ToastAndroid.BOTTOM);
    closeModalmore();
  };
  const openModal = id => {
    setidPost(id);
    setCheckedStatus(true);
  };
  const closeModal = () => {
    setCheckedStatus(false);
  };
  const reference1 = ref(db, 'users/' + user + '/sothich');
  onValue(reference1, childSnapshot1 => {
    childSnapshot1.forEach(snapshot1 => {
      const key = snapshot1.val();
      sothich2.push(key);
    });
  });

  const referenceImage = ref(db, 'post/' + user);
  onValue(referenceImage, snapshot => {
    snapshot.forEach(ImageSnapshot => {
      const id = ImageSnapshot.child('id').exportVal();
      const image = ImageSnapshot.child('image').exportVal();

      dataImage.push({
        id: id,
        image: image,
      });
    });
  });
  const referencebanbe = ref(db, 'banbe/' + user);
  onValue(referencebanbe, childSnapshot1 => {
    childSnapshot1.forEach(snapshot1 => {
      const id = snapshot1.child('id').val();
      const user = snapshot1.child('user').val();
      const name = snapshot1.child('name').val();
      const avt = snapshot1.child('avt').val();
      dataFriend.push({
        id: id,
        user: user,
        name: name,
        avt: avt,
      });
    });
  });
  const AddLike = (idP, li) => {
    let like;
    let co;
    let dc = false;
    let solike;
    if (li != true) {
      const reference11 = ref(
        db,
        'tuongtac/' + idCurrent + '/' + idP + '/' + idCurrent,
      );
      onValue(reference11, snapshot1 => {
        const value = snapshot1.child('like').exportVal();
        console.log(value);
        if (value == true) {
          setdacod(true);
          //throw "break-loop";
        } else {
          setdacod(false);
        }
      });

      const reference13 = ref(
        db,
        'tuongtac/' + idCurrent + '/' + idP + '/' + idCurrent,
      );
      set(reference13, {
        like: true,
      });
      let i;
      const referencelike = ref(db, 'post/' + id + '/' + idP);
      onValue(referencelike, childSnapshot1 => {
        const lif = childSnapshot1.child('like').exportVal();
        i = Number(lif) + 1;
      });
      console.log('Số Like ' + i);
      const reference = ref(db, 'post/' + id + '/' + idP);
      update(reference, {
        like: i,
      });
      const reference5 = ref(db, 'notification/' + id);
      push(reference5, {
        user: idCurrent,
        id: id,
        noidung: ' vừa thích bài viết của bạn',
        thoigian:
          date.getHours() +
          ':' +
          date.getMinutes() +
          ' ngày ' +
          date.getDate() +
          '/' +
          thang +
          '/' +
          date.getFullYear(),
        avt: avtCr,
        name: nameCr,
      });
      if (id != idCurrent) {
        const referencecrd = ref(db, 'users/' + id);
        onValue(referencecrd, childSnapshot => {
          const tokendv = childSnapshot.child('token').val();
          sendMess(
            tokendv,
            'Thông báo mới từ ' + nameCr,
            nameCr + ' đã thích bài viết của bạn',
          );
        });
      }
    } else {
      const reference13f = ref(
        db,
        'tuongtac/' + idCurrent + '/' + idP + '/' + idCurrent,
      );
      remove(reference13f).then(() => {
        console.log('Hủy Like');
        let i;
        const referencelike = ref(db, 'post/' + id + '/' + idP);
        onValue(referencelike, childSnapshot1 => {
          const lif = childSnapshot1.child('like').exportVal();
          i = Number(lif) - 1;
        });
        console.log('Số Like ' + i);
        const reference = ref(db, 'post/' + id + '/' + idP);
        update(reference, {
          like: i,
        });
      });
    }
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  };

  const numColumns = 3;
  const deletePost = () => {
    const referencerm = ref(db, 'post/' + user + '/' + idPost);
    remove(referencerm).then = () => {
      ToastAndroid.show('Đã xoá bài viết thành công', ToastAndroid.BOTTOM);
    };
    setCheckedStatus(false);
  };
  const date = new Date();
  let thang = date.getMonth() + 1;
  console.log(thang);
  const Love = () => {
    let fl;
    let co;
    let dc = false;
    const reference112 = ref(db, 'favourite/' + idCurrent);
    onValue(reference112, childSnapshot1 => {
      childSnapshot1.forEach(snapshot1 => {
        const value = snapshot1.child('user').val();
        console.log(value);
        try {
          if (id == value) {
            const reference3 = ref(db, 'banbe/' + idCurrent + '/' + id);
            set(reference3, {
              user: id,
              id: idCurrent,
              avt: avt,
              name: name,
              tick: tick,
            });
            const reference3d = ref(db, 'banbe/' + id + '/' + idCurrent);
            set(reference3d, {
              user: idCurrent,
              id: id,
              avt: avtCr,
              name: nameCr,
              tick: tickfr,
            });
          }
        } catch (error) {
          console.log(error);
        }
      });
    });

    if (daco == false) {
      let i;
      const referencelike = ref(db, 'users/' + id);
      onValue(referencelike, childSnapshot1 => {
        const sotim = childSnapshot1.child('follow').exportVal();
        console.log('Số Tim ' + Number(sotim) + 1);
        i = Number(sotim) + 1;
      });
      const references = ref(db, 'users/' + id);
      update(references, {
        follow: i,
      });
      console.log('Số Tim ' + i);
      const reference3 = ref(db, 'favourite/' + id + '/' + idCurrent);
      set(reference3, {
        user: idCurrent,
      });

      const reference5 = ref(db, 'notification/' + id);
      push(reference5, {
        user: idCurrent,
        id: id,
        noidung: ' vừa gửi lượt thích đến bạn',
        thoigian:
          date.getHours() +
          ':' +
          date.getMinutes() +
          ' ngày ' +
          date.getDate() +
          '/' +
          thang +
          '/' +
          date.getFullYear(),
        avt: avtCr,
        name: nameCr,
      });
      ToastAndroid.show('Đã gửi lượt thích', ToastAndroid.BOTTOM);
      if (id != idCurrent) {
        const referencecrd = ref(db, 'users/' + id);
        onValue(referencecrd, childSnapshot => {
          const tokendv = childSnapshot.child('token').val();
          sendMess(
            tokendv,
            'Thông báo mới từ ' + nameCr,
            nameCr + ' vừa gửi lượt thích đến bạn',
          );
        });
      }
      i = 0;
    } else {
      if (daco == true) {
        let i = 0;
        const referencelike = ref(db, 'users/' + id);
        onValue(referencelike, childSnapshot1 => {
          const sotim = childSnapshot1.child('follow').exportVal();
          console.log('Số Tim ' + Number(sotim) - 1);
          i = Number(sotim) - 1;
        });
        const references = ref(db, 'users/' + id);
        update(references, {
          follow: i,
        });
        const reference3 = ref(db, 'favourite/' + id + '/' + idCurrent);
        remove(reference3).then(() => {
          console.log('Hủy Tim');

          const reference3 = ref(db, 'banbe/' + idCurrent + '/' + id);
          remove(reference3).then(() => {
            console.log('delete');
          });
          const reference3d = ref(db, 'banbe/' + id + '/' + idCurrent);
          remove(reference3d).then(() => {
            console.log('delete');
          });
        });
      }
      i = 0;
    }
  };
  const openModalmore = () => {
    setCheckedStatusmore(true);
  };
  const closeModalmore = () => {
    setCheckedStatusmore(false);
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      style={{width: '100%', height: '100%'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isCheckedStatus}
          onRequestClose={() => {
            setCheckedStatus(!isCheckedStatus);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{width: '115%', position: 'absolute'}}
                onPress={closeModal}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('./../../image/remove.png')}
                />
              </TouchableOpacity>
              <Text style={styles.modalText}>
                Bạn có chắc chắn muốn xoá bài viết này không?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                }}>
                <TouchableOpacity
                  style={[styles.button1, styles.buttonClose]}
                  onPress={closeModal}>
                  <Text style={styles.textStyle}>Không</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => deletePost('1')}>
                  <Text style={styles.textStyle}>Có</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
      </View>
      <View style={styles.mainanh}>
        <View style={{width: '100%', height: 500}}>
          <Image style={styles.anh} source={{uri: avt}} />
        </View>

        <View style={styles.mailchitiet}>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isCheckedStatusmore}
              onRequestClose={() => {
                setCheckedStatusmore(!isCheckedStatusmore);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={{width: '115%', position: 'absolute'}}
                    onPress={closeModalmore}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={require('./../../image/remove.png')}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <TouchableOpacity
                      style={{
                        paddingVertical: 8,
                        borderColor: '#ABABAB',
                        borderWidth: 0.4,
                      }}
                      onPress={() => navigation.navigate('BaoCao', {id: id})}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 15,
                          textAlign: 'center',
                        }}>
                        Báo cáo tài khoản này
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        paddingVertical: 8,
                        borderColor: '#ABABAB',
                        borderWidth: 0.4,
                        top: 10,
                      }}
                      onPress={() =>
                        clipboard(
                          'https://genzlove.onrender.com/#/admin/profile/' +
                            user,
                        )
                      }>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 15,
                          textAlign: 'center',
                        }}>
                        Sao chép liên kết trang cá nhân
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          <View style={styles.mainten}>
            <View style={styles.phuten}>
              <View style={{flexDirection: 'row', top: 5}}>
                <Text style={styles.ten}>{name}</Text>
                {tick == 'true' ? (
                  <Image
                    style={{width: 25, height: 25, top: 31, left: 20}}
                    source={require('../../image/verify.png')}
                  />
                ) : (
                  <></>
                )}
                <Text style={styles.ten}>, {tuoi}</Text>
              </View>
              <Text style={styles.gioitinh}>{nghenghiep}</Text>
              <Text style={{fontSize: 16, left: 20, top: 40, opacity: 0.7}}>
                Có {follow} người yêu thích
              </Text>
            </View>
          </View>
          <View style={[styles.mainten, {top: 15}]}>
            <View style={styles.phuten}>
              <Text style={styles.diachi}>Địa chỉ</Text>
              <Text style={styles.gioitinh}>{diachi}</Text>
            </View>
          </View>
          <View style={[styles.mainten, {top: 25}]}>
            <View style={styles.phuten}>
              <Text style={styles.diachi}>Tiểu sử</Text>
              <Text style={styles.gioitinh}>{tieusu}</Text>
            </View>
          </View>
          <View style={[styles.mainten, {top: 35}]}>
            <View style={styles.phuten}>
              <Text style={styles.diachi}>Sở thích</Text>
              <FlatList
                style={{
                  left: 20,
                  top: 30,
                }}
                contentContainerStyle={{
                  flex: 1,
                  marginTop: 5,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
                horizontal={false}
                data={sothich2}
                renderItem={({item, index}) => {
                  return (
                    <Pressable
                      style={[
                        styles.khungmau,
                        item == ''
                          ? {width: 0, height: 0, display: 'none'}
                          : null,
                      ]}>
                      <View
                        style={{
                          fontSize: 20,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          key={index}
                          style={{
                            fontSize: 16,
                            fontStyle: 'normal',
                            fontWeight: '400',
                            alignItems: 'center',
                            color: 'white',
                          }}>
                          {item}
                        </Text>
                      </View>
                    </Pressable>
                  );
                }}
              />
            </View>
          </View>
          <View style={[styles.mainten, {top: 45}]}>
            <View style={styles.phuten}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.diachi}>Ảnh</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AnhUser', {idT: id})}>
                  <Text
                    style={{
                      left: 20,
                      top: 30,
                      fontSize: 15,
                      color: 'red',
                    }}>
                    Xem thêm
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                style={[
                  {
                    left: 20,
                    top: 35,
                    width: '100%',
                    maxHeight: 220,
                  },
                  dataImage == []
                    ? {
                        left: 20,
                        top: 35,
                        width: '100%',
                        maxHeight: 20,
                      }
                    : null,
                ]}
                contentContainerStyle={{
                  borderRadius: 15,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                }}
                data={dataImage}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      width: 100,
                      alignItems: 'center',
                      left: 5,
                      borderRadius: 15,
                      marginBottom: 5,
                      paddingLeft: 5,
                    }}>
                    {item.image != '' ? (
                      <Image
                        style={{
                          width: '100%',
                          height: 100,
                          borderRadius: 15,
                        }}
                        source={{uri: item.image}}
                      />
                    ) : null}
                  </View>
                )}
              />
            </View>
          </View>
          <View style={[styles.mainten, {top: 55}]}>
            <View style={styles.phuten}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.diachi}>Bạn bè</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('BanBe', {idT: id, us: 1})
                  }>
                  <Text
                    style={{
                      left: 20,
                      top: 30,
                      fontSize: 15,
                      color: 'red',
                    }}>
                    Xem thêm
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                style={[
                  {
                    left: 20,
                    top: 35,
                    width: '100%',
                    maxHeight: 220,
                  },
                  dataFriend == []
                    ? {
                        left: 20,
                        top: 35,
                        width: '100%',
                        maxHeight: 20,
                      }
                    : null,
                ]}
                contentContainerStyle={{
                  borderRadius: 15,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
                data={dataFriend}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      width: 100,
                      alignItems: 'center',
                      left: 5,

                      borderRadius: 15,
                      marginBottom: 5,
                      paddingLeft: 5,
                    }}>
                    <Image
                      style={{
                        width: '100%',
                        height: 100,
                        borderRadius: 15,
                        alignItems: 'center',
                      }}
                      source={{uri: item.avt}}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        width: 100,
                        margin: 5,
                        fontSize: 12,
                        color: 'white',
                        bottom: 3,
                        left: 5,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>

          <View
            style={{
              width: '100%',
              top: 100,
              marginHorizontal: 20,
            }}>
            <Text style={{fontSize: 19}}>Bài viết và hoạt động</Text>

            <View style={{width: '90%', paddingBottom: 110}}>
              <FlatList
                inverted
                contentContainerStyle={{
                  flexDirection: 'column',
                }}
                data={datas}
                renderItem={({item, index}) => (
                  <Pressable
                    key={index}
                    style={[
                      {
                        borderBottomColor: '#ABABAB',
                        borderLeftColor: '#ABABAB',
                        borderLeftWidth: 0.5,
                        borderBottomWidth: 0.5,
                        borderRightColor: '#ABABAB',
                        borderTopColor: '#ABABAB',
                        borderRightWidth: 0.5,
                        borderTopWidth: 0.5,
                        borderRadius: 15,
                        marginTop: 20,
                      },
                      item == ''
                        ? {width: 0, height: 0, display: 'none'}
                        : null,
                    ]}>
                    <View style={styles.info}>
                      <Image
                        style={{width: 40, height: 40, borderRadius: 20}}
                        source={{uri: avt}}
                      />
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
                            }}>
                            <View style={{flexDirection: 'row'}}>
                              <Text style={{fontSize: 16, fontWeight: '500'}}>
                                {name}
                              </Text>
                              {item.tick == 'true' ? (
                                <Image
                                  style={{
                                    width: 20,
                                    height: 20,
                                    bottom: 2,
                                    left: 2,
                                  }}
                                  source={require('../../image/verify.png')}
                                />
                              ) : (
                                <></>
                              )}
                            </View>
                            <Text style={{fontSize: 14}}>{item.thoigian}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Binhluan', {
                          idPost: item.id,
                          userID: item.user,
                        })
                      }>
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'black',
                          paddingHorizontal: 10,
                          marginTop: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingBottom: 10,
                          width: '100%',
                          alignSelf: 'center',
                          //textAlign: "center",
                          fontWeight: '400',
                        }}>
                        {item.noidung}
                      </Text>

                      {item.image != '' ? (
                        <Image
                          style={{
                            width: '100%',
                            height: 250,
                            alignItems: 'center',
                            alignSelf: 'center',
                            alignContent: 'center',
                            justifyContent: 'center',
                            marginBottom: 10,
                          }}
                          source={{uri: item.image}}
                        />
                      ) : null}
                      <Text
                        style={[
                          {
                            fontSize: 15,
                            color: 'black',
                            paddingHorizontal: 10,
                            fontWeight: '300',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: 10,
                            width: '100%',
                            alignSelf: 'center',
                            //textAlign: "center",
                          },
                          item.checkin == '' ? {width: 0, height: 0} : null,
                        ]}>
                        {item.checkin}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        borderTopWidth: 0.2,
                        paddingVertical: 10,
                      }}>
                      {item.like == true ? (
                        <TouchableOpacity
                          style={{flexDirection: 'row'}}
                          onPress={() => AddLike(item.id, item.like)}>
                          <Image
                            style={styles.iclikeContainer}
                            source={
                              item.like == true
                                ? require('../../../assets/iclike2.png')
                                : require('../../../assets/iclike.png')
                            }
                          />
                          <Text
                            style={[
                              {fontSize: 17, color: 'black'},
                              item.like == true
                                ? {fontSize: 17, color: '#E94057'}
                                : null,
                            ]}>
                            {item.solike} Thích
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{flexDirection: 'row'}}
                          onPress={() => AddLike(item.id, item.like)}>
                          <Image
                            style={styles.iclikeContainer}
                            source={
                              item.like == true
                                ? require('../../../assets/iclike2.png')
                                : require('../../../assets/iclike.png')
                            }
                          />
                          <Text
                            style={[
                              {fontSize: 17, color: 'black'},
                              item.like == true
                                ? {fontSize: 17, color: '#E94057'}
                                : null,
                            ]}>
                            {item.solike} Thích
                          </Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={{flexDirection: 'row'}}
                        onPress={() =>
                          navigation.navigate('Binhluan', {
                            idPost: item.id,
                            userID: item.user,
                          })
                        }>
                        <Image
                          style={styles.cmtContainer}
                          source={require('../../../assets/iccmt.png')}
                        />

                        <Text style={{fontSize: 17}}>Bình luận</Text>
                      </TouchableOpacity>
                    </View>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </View>
        <View style={styles.mainnut2}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.containerrr}>
              <Image
                style={styles.containerrrrr}
                source={require('../../image/back.png')}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={openModalmore}
              style={{width: 100, height: 50, left: 60}}>
              <Image
                style={[styles.containerrrrr, {borderRadius: 12}]}
                source={require('../../image/more.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {id != idCurrent ? (
          <View style={styles.mainnut}>
            <TouchableOpacity
              style={styles.nut1}
              onPress={() =>
                navigation.navigate('SayHello', {id: id, noidung: ''})
              }>
              <Image
                style={{width: '60%', height: '60%', left: 10, top: 6}}
                source={require('../../image/close-cro.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nut2} onPress={Love}>
              <Image
                style={[
                  {width: '100%', height: '100%', top: 5},
                  daco == false
                    ? {width: '100%', height: '100%', top: 5, opacity: 0.5}
                    : null,
                ]}
                source={require('../../image/tim.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nut1}>
              <Image
                style={{width: '60%', height: '60%', left: 10, top: 6}}
                source={require('../../image/star.png')}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cmtContainer: {
    right: 5,
    top: 1,
  },

  iclikeContainer: {
    right: 5,
    bottom: 1,
    width: 20,
    height: 20,
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
    paddingRight: 20,
    flexDirection: 'row',
  },
  containerr: {
    position: 'absolute',

    width: 40,
    height: 40,
    top: 50,
  },
  khungmau: {
    marginRight: 5,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    position: 'relative',
    backgroundColor: '#E94057',
    height: 35,
    borderBottomColor: '#ABABAB',
    borderLeftColor: '#ABABAB',
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightColor: '#ABABAB',
    borderTopColor: '#ABABAB',
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 8,
  },
  containerrr: {
    position: 'absolute',
    width: 50,
    height: 50,
  },
  containerrrrr: {
    width: 25,
    height: 25,
    tintColor: 'white',
  },
  vitrii: {
    width: 80,
    right: 40,
    height: 42,
    top: 35,
    elevation: 10,
  },
  imagelui: {
    position: 'absolute',
    width: 52,
    height: 52,
  },
  phuten: {
    width: '87%',
  },
  nhantin: {
    width: '15%',
    right: 30,
    height: 52,
    top: 35,
    elevation: 10,
  },
  mainten: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nut2: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },

  nut1: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
    elevation: 10,
  },
  mainnut: {
    left: '7%',
    width: '85%',
    height: 70,
    position: 'absolute',
    top: 390,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mainnut2: {
    width: '100%',
    height: 70,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 10,
    paddingLeft: 10,
  },
  mailchitiet: {
    width: '100%',
    bottom: 80,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  ngaysinh: {
    fontSize: 20,
    left: 20,
    top: 30,
  },
  sothich: {
    fontSize: 20,
    left: 20,
    top: 30,
  },
  gioitinh: {
    fontSize: 16,
    left: 20,
    top: 35,
    opacity: 0.7,
  },
  diachi: {
    fontSize: 20,
    left: 20,
    top: 30,
  },
  diachi: {
    fontSize: 20,
    left: 20,
    top: 30,
    fontStyle: 'normal',
  },
  ten: {
    fontSize: 25,
    left: 20,
    top: 30,
    fontStyle: 'normal',
  },
  anh: {
    width: '100%',
    height: '100%',
  },
  mainanh: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: 4430,
    backgroundColor: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '80%',
    elevation: 10,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 8,
    elevation: 2,
    top: 10,
  },
  button1: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    elevation: 2,
    top: 10,
  },
});
