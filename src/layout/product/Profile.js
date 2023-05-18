import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  Modal,
  ToastAndroid,
  RefreshControl,
  TextInput,
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
  update,
  remove,
} from 'firebase/database';
import Clipboard from '@react-native-community/clipboard';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
export const Profile = props => {
  const {navigation} = props;
  initializeApp(firebaseConfig);
  const dataImage = [];
  const datas = [];
  const dataFriend = [];
  const dataLike = [];
  let noidung1 = '';
  const [name, setname] = useState();
  const [avt, setavt] = useState();
  const [tuoi, settuoi] = useState();
  const [diachi, setdiachi] = useState();
  const [ngaysinh, setngaysinh] = useState();
  const [gioitinh, setgioitinh] = useState();
  const [sothich, setsothich] = useState();
  const [tieusu, settieusu] = useState();
  const [follow, setfl] = useState();
  const [tick, settick] = useState();
  const [tieusum, settieusum] = useState();
  const [nghenghiep, setnghenghiep] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [idPost, setidPost] = useState();
  const [isCheckedStatus, setCheckedStatus] = useState(false);
  const [isCheckedStatus1, setCheckedStatus1] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isCheckedStatusmore, setCheckedStatusmore] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const user = getAuth().currentUser.uid;
  const idFr = getAuth().currentUser.uid;
  const db = getDatabase();
  const [daco, setdaco] = useState();
  const [dacod, setdacod] = useState(false);
  const sothich2 = [];
  useEffect(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    const reference1d1 = ref(db, 'tuongtac/' + user);
    onValue(reference1d1, snapshot1 => {
      snapshot1.forEach(childSnapshot => {
        const value = childSnapshot.child(user).child('like').val();
        if (value == true) {
          setdacod(true);
          //throw "break-loop";
        } else if (value != true) {
          setdacod(false);
        }
      });
    });
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
      settick(childSnapshot.child('tick').val());
      setdiachi(diachipr);
      settuoi(tuoipr);
      setgioitinh(gioitinhpr);
      setngaysinh(ngaysinhpr);
      setnghenghiep(nghenghiep);
      settieusum(childSnapshot.child('tieusu').val());
      setfl(childSnapshot.child('follow').exportVal());
      setisLoading(false);
    });
    const reference1 = ref(db, 'users/' + user + '/sothich');
    onValue(reference1, childSnapshot1 => {
      childSnapshot1.forEach(snapshot1 => {
        const key = snapshot1.val();
        sothich2.push(key);
      });
    });
  }, []);
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
  const referencetuongtac = ref(db, 'tuongtac/' + user);
  onValue(referencetuongtac, childSnapshot1 => {
    childSnapshot1.forEach(snapshot1 => {
      const id = snapshot1.key;
      dataLike.push(id);
    });
  });
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
  const openModal = id => {
    setidPost(id);
    setCheckedStatus(true);
  };
  const closeModal = () => {
    setCheckedStatus(false);
  };
  const openEditor = () => {
    navigation.navigate('Chinhsua');
    closeModalmore();
  };
  const closeModalmore = () => {
    setCheckedStatusmore(false);
  };
  const openModalmore = () => {
    setCheckedStatusmore(true);
  };
  const clipboard = async text => {
    Clipboard.setString(text);
    ToastAndroid.show('Sao chép liên kết thành công', ToastAndroid.BOTTOM);
    closeModalmore();
  };

  const AddLike = (idP, li) => {
    let like;
    let solike;
    let co;
    let dc = false;
    if (li != true) {
      const reference11 = ref(db, 'tuongtac/' + user + '/' + idP + '/' + user);
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

      const reference13 = ref(db, 'tuongtac/' + user + '/' + idP + '/' + user);
      set(reference13, {
        like: true,
      });
      let i;
      const referencelike = ref(db, 'post/' + user + '/' + idP);
      onValue(referencelike, childSnapshot1 => {
        const lif = childSnapshot1.child('like').exportVal();
        i = Number(lif) + 1;
      });
      console.log('Số Like ' + i);
      const reference = ref(db, 'post/' + user + '/' + idP);
      update(reference, {
        like: i,
      });
    } else {
      const reference13f = ref(db, 'tuongtac/' + user + '/' + idP + '/' + user);
      remove(reference13f).then(() => {
        console.log('Hủy Like');
        let i;
        const referencelike = ref(db, 'post/' + user + '/' + idP);
        onValue(referencelike, childSnapshot1 => {
          const lif = childSnapshot1.child('like').exportVal();
          i = Number(lif) - 1;
        });
        console.log('Số Like ' + i);
        const reference = ref(db, 'post/' + user + '/' + idP);
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
  const openModal1 = () => {
    setCheckedStatus1(true);
    closeModalmore();
  };
  const closeModal1 = () => {
    setCheckedStatus1(false);
  };
  const updatetieusu = () => {
    const referencets = ref(db, 'users/' + user);
    update(referencets, {tieusu: tieusu}).then(() => {
      ToastAndroid.show('Đã cập nhật tiểu sử', ToastAndroid.BOTTOM);
    });
    closeModal1();
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
      </View>

      <View style={styles.centeredView1}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isCheckedStatus1}
          onRequestClose={() => {
            setCheckedStatus1(!isCheckedStatus1);
          }}>
          <View style={styles.centeredView1}>
            <View style={styles.modalView1}>
              <TouchableOpacity
                style={{width: '100%', position: 'absolute'}}
                onPress={closeModal1}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('./../../image/remove.png')}
                />
              </TouchableOpacity>
              <Text style={styles.modalText}>
                Thay đổi tiểu sử theo phong cách mà bạn yêu thích
              </Text>
              <TextInput
                style={styles.veryPass}
                placeholder="Nhập tiểu sử"
                value={tieusu}
                onChangeText={settieusu}
                returnKeyType="done"
                maxLength={222}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={updatetieusu}>
                <Text style={styles.textStyle}>Thay Đổi</Text>
              </TouchableOpacity>
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
          <TouchableOpacity
            style={{position: 'absolute', right: 10, top: 20}}
            onPress={openModalmore}>
            <Image
              style={{width: 35, height: 35}}
              source={require('../../image/more.png')}
            />
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
                        onPress={openEditor}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            textAlign: 'center',
                          }}>
                          Chỉnh sửa thông tin cá nhân
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          paddingVertical: 8,
                          borderColor: '#ABABAB',
                          borderWidth: 0.4,
                          top: 5,
                        }}
                        onPress={openModal1}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            textAlign: 'center',
                          }}>
                          Chỉnh sửa tiểu sử
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          paddingVertical: 8,
                          borderColor: '#ABABAB',
                          borderWidth: 0.4,
                          top: 10,
                        }}
                        onPress={() => navigation.navigate('HoTro')}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            textAlign: 'center',
                          }}>
                          Hỗ trợ
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          paddingVertical: 8,
                          borderColor: '#ABABAB',
                          borderWidth: 0.4,
                          top: 15,
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
          </TouchableOpacity>
          <View style={styles.mainten}>
            <View style={styles.phuten}>
              <View style={{flexDirection: 'row'}}>
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
              <Text style={{fontSize: 16, left: 20, top: 35, opacity: 0.7}}>
                Có {follow} người yêu thích
              </Text>
            </View>
          </View>
          <View style={[styles.mainten, {top: 10}]}>
            <View style={styles.phuten}>
              <Text style={styles.diachi}>Địa chỉ</Text>
              <Text style={styles.gioitinh}>{diachi}</Text>
            </View>
          </View>
          <View style={[styles.mainten, {top: 25}]}>
            <View style={styles.phuten}>
              <Text style={styles.diachi}>Tiểu sử</Text>

              <Text style={{fontSize: 16, left: 20, top: 30, opacity: 0.7}}>
                {tieusum}
              </Text>
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
                  onPress={() => navigation.navigate('AnhUser', {idT: idFr})}>
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
                      }
                    : null,
                ]}
                contentContainerStyle={{
                  flexDirection: 'row',
                  borderRadius: 15,
                  flexWrap: 'wrap',
                }}
                data={dataImage}
                renderItem={({item, index}) =>
                  item.image != '' ? (
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
                        }}
                        source={{uri: item.image}}
                      />
                    </View>
                  ) : (
                    <></>
                  )
                }
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
                    navigation.navigate('BanBe', {idT: idFr, us: 0})
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

          <View style={[styles.mainten, {top: 75}]}>
            <View style={styles.phuten}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.diachi}>Bài viết</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: 90,
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      left: 20,
                      top: 30,
                      fontSize: 15,
                      width: 40,
                      height: 40,
                      backgroundColor: 'white',
                      borderBottomColor: '#ABABAB',
                      borderLeftColor: '#ABABAB',
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      borderRightColor: '#ABABAB',
                      borderTopColor: '#ABABAB',
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={require('../../image/vitri.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      left: 20,
                      top: 30,
                      fontSize: 15,
                      width: 40,
                      height: 40,
                      backgroundColor: 'white',
                      borderBottomColor: '#ABABAB',
                      borderLeftColor: '#ABABAB',
                      borderLeftWidth: 1,
                      borderBottomWidth: 1,
                      borderRightColor: '#ABABAB',
                      borderTopColor: '#ABABAB',
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={require('../../image/voice.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  left: 20,
                  top: 40,
                  height: 50,
                  backgroundColor: 'white',
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PostStatus')}
                  style={{
                    width: '100%',
                    height: 50,
                    position: 'absolute',
                    backgroundColor: 'white',
                    borderBottomColor: '#ABABAB',
                    borderLeftColor: '#ABABAB',
                    borderLeftWidth: 1,
                    borderBottomWidth: 1,
                    borderRightColor: '#ABABAB',
                    borderTopColor: '#ABABAB',
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    borderRadius: 8,
                    paddingLeft: 20,
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 18, opacity: 0.7}}>
                    Bạn muốn đăng gì?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              top: 133,
              marginHorizontal: 20,
            }}>
            <Text style={{fontSize: 19}}>Bài viết và hoạt động</Text>

            <View style={{width: '90%', paddingBottom: 110}}>
              <FlatList
                contentContainerStyle={{
                  flexDirection: 'column',
                }}
                inverted
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
                      <View
                        style={{
                          flexDirection: 'row',
                          position: 'absolute',
                          right: 13,
                          top: -3,
                        }}>
                        <TouchableOpacity
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            right: 3,
                          }}
                          onPress={() =>
                            navigation.navigate('EditPost', {
                              tenu: item.name,
                              urlu: item.avt,
                              noidungu: item.noidung,
                              timeu: item.thoigian,
                              idPostu: item.id,
                              userIDu: item.user,
                              checkinu: item.checkin,
                              imageu:
                                item.image != '' && item.image != undefined
                                  ? item.image
                                  : 'a',
                              ticku: item.tick,
                              hoatdongu: item.hoatdong,
                            })
                          }>
                          <Image
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 2,
                            }}
                            source={require('../../image/edit-2.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                          }}
                          onPress={() => openModal(item.id)}>
                          <Image
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 10,
                            }}
                            source={require('../../image/remove.png')}
                          />
                        </TouchableOpacity>
                      </View>
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
        </View>
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
    color: 'white',
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
    top: 435,
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
    top: 30,
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

  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView1: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#E94057',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
  },
  veryPass: {
    width: 300,
    height: 100,
    textAlign: 'center',
    borderColor: '#ABABAB',
    borderWidth: 0.5,
    borderRadius: 20,
  },
});
