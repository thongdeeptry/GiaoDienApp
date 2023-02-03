import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {firebaseConfig} from '../../../../config';
import {initializeApp} from 'firebase/app';
import firebase from 'firebase/compat';
import {getDatabase, ref, onValue, set, push} from 'firebase/database';

export const Possions = ({route, navigation}) => {
  const {sdt} = route.params;
  const {name} = route.params;
  const {ngaysinh} = route.params;
  const {avt} = route.params;
  const {gioitinh} = route.params;
  const {user} = route.params;
  const {email} = route.params;
  const {password} = route.params;
  const {tuoi} = route.params;
  const {location} = route.params;
  const data = [];
  const [Datan, setDatan] = useState([]);
  const [number, setnumber] = useState(false);
  const [number1, setnumber1] = useState(false);
  const [number2, setnumber2] = useState(false);
  const [number3, setnumber3] = useState(false);
  const [number4, setnumber4] = useState(false);
  const [number5, setnumber5] = useState(false);
  const [number6, setnumber6] = useState(false);
  const [number7, setnumber7] = useState(false);
  const [number8, setnumber8] = useState(false);
  const [number9, setnumber9] = useState(false);
  const [number10, setnumber10] = useState(false);
  const [number11, setnumber11] = useState(false);
  const [number12, setnumber12] = useState(false);
  const [number13, setnumber13] = useState(false);
  const [tong, setTong] = useState(0);
  const [soThich, setsoThich] = useState('');
  const [soThich1, setsoThich1] = useState('');
  const [soThich2, setsoThich2] = useState('');
  const [soThich3, setsoThich3] = useState('');
  const [soThich4, setsoThich4] = useState('');
  const [soThich5, setsoThich5] = useState('');
  const [soThich6, setsoThich6] = useState('');
  const [soThich7, setsoThich7] = useState('');
  const [soThich8, setsoThich8] = useState('');
  const [soThich9, setsoThich9] = useState('');
  const [soThich10, setsoThich10] = useState('');
  const [soThich11, setsoThich11] = useState('');
  const [soThich12, setsoThich12] = useState('');
  const [soThich13, setsoThich13] = useState('');
  let soThichAll = [];

  const app = initializeApp(firebaseConfig);

  if (!app.length) {
  }
  useEffect(() => {
    if (number == true) {
      console.log('vo');
      setsoThich('Chụp hình');
    } else {
      console.log('vo1');
      setsoThich('');
    }
    if (number1 == true) {
      setsoThich1('Mua sắm');
    } else {
      setsoThich1('');
    }
    if (number2 == true) {
      setsoThich2('Hát hò');
    } else {
      setsoThich2('');
    }
    if (number3 == true) {
      setsoThich3('Tập yoga');
    } else {
      setsoThich3('');
    }
    if (number4 == true) {
      setsoThich4('Nấu ăn');
    } else {
      setsoThich4('');
    }
    if (number5 == true) {
      setsoThich5('Quần vợt');
    } else {
      setsoThich5('');
    }
    if (number6 == true) {
      setsoThich6('Chạy bộ');
    } else {
      setsoThich6('');
    }
    if (number7 == true) {
      setsoThich7('Bơi lội');
    } else {
      setsoThich7('');
    }
    if (number8 == true) {
      setsoThich8('Vẽ tranh');
    } else {
      setsoThich8('');
    }
    if (number9 == true) {
      setsoThich9('Leo núi');
    } else {
      setsoThich9('');
    }
    if (number10 == true) {
      setsoThich10('Nhảy dù');
    } else {
      setsoThich10('');
    }
    if (number11 == true) {
      setsoThich11('Nghe nhạc');
    } else {
      setsoThich11('');
    }
    if (number12 == true) {
      setsoThich12('Uống nước');
    } else {
      setsoThich12('');
    }
    if (number13 == true) {
      setsoThich13('Chơi game');
    } else {
      setsoThich13('');
    }
  }, [
    number,
    number1,
    number2,
    number3,
    number4,
    number5,
    number6,
    number7,
    number8,
    number9,
    number10,
    number11,
    number12,
    number13,
  ]);
  const AddData = () => {
    soThichAll.push(
      soThich,
      soThich1,
      soThich2,
      soThich3,
      soThich4,
      soThich5,
      soThich6,
      soThich7,
      soThich8,
      soThich9,
      soThich10,
      soThich11,
      soThich12,
      soThich13,
    );
    console.log(
      soThich,
      soThich1,
      soThich2,
      soThich3,
      soThich4,
      soThich5,
      soThich6,
      soThich7,
      soThich8,
      soThich9,
      soThich10,
      soThich11,
      soThich12,
      soThich13,
    );

    if (soThichAll.length < 2) {
      ToastAndroid.show(
        'Vui lòng chọn ít nhất 2 sở thích',
        ToastAndroid.CENTER,
      );
    } else {
      console.log(sdt + ' --- email ' + email);
      if (sdt != undefined) {
        const db = getDatabase();
        const reference = ref(db, 'users/' + user);
        set(reference, {
          sdt: '+84' + sdt,
          sothich: soThich,
          gioitinh: gioitinh,
          name: name,
          ngaysinh: ngaysinh,
          avt: avt,
          tuoi: tuoi,
          diachi: location,
          id: user,
          nghenghiep: 'Chưa đặt',
          thaotac: user,
          tick: 'false',
          trangthai: 'Hoạt Động',
          follow: 0,
          phanquyen: 0,
          tieusu: 'Chưa đặt',
        });
        const reference1 = ref(db, 'users/' + user + '/sothich');
        set(reference1, {
          soThich,
          soThich1,
          soThich2,
          soThich3,
          soThich4,
          soThich5,
          soThich6,
          soThich7,
          soThich8,
          soThich9,
          soThich10,
          soThich11,
          soThich12,
          soThich13,
        });
        navigation.navigate('Login');
        ToastAndroid.show('Đăng ký thành công', ToastAndroid.BOTTOM);
      }
      if (email != '' && email != undefined) {
        const db = getDatabase();
        const reference = ref(db, 'users/' + user);
        set(reference, {
          email: email,
          password: password,
          gioitinh: gioitinh,
          name: name,
          ngaysinh: ngaysinh,
          avt: avt,
          tuoi: tuoi,
          diachi: location,
          id: user,
          nghenghiep: 'Chưa đặt',
          thaotac: user,
          tick: 'false',
          trangthai: 'Hoạt Động',
          follow: 0,
          phanquyen: 0,
          tieusu: 'Chưa đặt',
        });
        const reference1 = ref(db, 'users/' + user + '/sothich');
        set(reference1, {
          soThich,
          soThich1,
          soThich2,
          soThich3,
          soThich4,
          soThich5,
          soThich6,
          soThich7,
          soThich8,
          soThich9,
          soThich10,
          soThich11,
          soThich12,
          soThich13,
        });

        navigation.navigate('Login');
        ToastAndroid.show('Đăng ký thành công', ToastAndroid.BOTTOM);
      }
    }
  };
  const SetNum = () => {
    setnumber(!number);
  };
  const SetNum1 = () => {
    setnumber1(!number1);
    console.log(number, number1, number2, number3);
  };
  const SetNum2 = () => {
    setnumber2(!number2);
  };
  const SetNum3 = () => {
    setnumber3(!number3);
  };
  const SetNum4 = () => {
    setnumber4(!number4);
  };
  const SetNum5 = () => {
    setnumber5(!number5);
  };
  const SetNum6 = () => {
    setnumber6(!number6);
  };
  const SetNum7 = () => {
    setnumber7(!number7);
  };
  const SetNum8 = () => {
    setnumber8(!number8);
  };
  const SetNum9 = () => {
    setnumber9(!number9);
  };
  const SetNum10 = () => {
    setnumber10(!number10);
  };
  const SetNum11 = () => {
    setnumber11(!number11);
  };
  const SetNum12 = () => {
    setnumber12(!number12);
  };
  const SetNum13 = () => {
    setnumber13(!number13);
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <View style={styles.imagelui}>
        <TouchableOpacity
          style={{position: 'relative', paddingRight: 20, right: 20}}
          source={require('../../../image/lui.png')}
        />
      </View>
      <View style={styles.Skiptext}>
        <Text style={styles.textSkip}>Skip</Text>
      </View>
      <View style={styles.sothichText}>
        <Text style={styles.Textsothich}>Sở thích của bạn</Text>
        <Text style={{width: '100%', textAlign: 'left', left: 40}}>
          Chọn một vài sở thích của bạn và cho mọi người biết bạn đam mê điều
          gì.
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'space-around',
            top: 220,
          }}>
          <TouchableOpacity
            style={[styles.khung, number == true ? styles.khungmau : null]}
            onPress={SetNum}>
            <Image
              style={{position: 'relative', right: 10}}
              source={require('../../../image/cam.png')}
            />

            <View
              style={{
                fontSize: 20,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              placeholder=""
              multiline={true}
              maxLength={0}>
              <Text
                style={[
                  {
                    fontSize: 19,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    alignItems: 'center',
                  },
                  number == true
                    ? {
                        fontSize: 19,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        alignItems: 'center',
                        color: 'white',
                      }
                    : null,
                ]}>
                Chụp hình
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.khung, number1 == true ? styles.khungmau : null]}
            onPress={SetNum1}>
            <Image
              style={{position: 'relative', right: 10}}
              source={require('../../../image/shopping.png')}
            />
            <View
              style={{
                fontSize: 20,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              placeholder=""
              multiline={true}
              maxLength={0}>
              <Text
                style={[
                  {
                    fontSize: 19,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    alignItems: 'center',
                  },
                  number1 == true
                    ? {
                        fontSize: 19,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        alignItems: 'center',
                        color: 'white',
                      }
                    : null,
                ]}>
                Mua sắm
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'space-around',
            top: 280,
          }}>
          <TouchableOpacity
            style={[styles.khung, number2 == true ? styles.khungmau : null]}
            onPress={SetNum2}>
            <Image
              style={{position: 'relative', right: 10, width: 30, height: 30}}
              source={require('../../../image/voice.png')}
            />

            <View
              style={{
                fontSize: 20,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              placeholder=""
              multiline={true}
              maxLength={0}>
              <Text
                style={[
                  {
                    fontSize: 19,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    alignItems: 'center',
                  },
                  number2 == true
                    ? {
                        fontSize: 19,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        alignItems: 'center',
                        color: 'white',
                      }
                    : null,
                ]}>
                Hát hò
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.khung, number3 == true ? styles.khungmau : null]}
            onPress={SetNum3}>
            <Image
              style={{position: 'relative', right: 10}}
              source={require('../../../image/yoga.png')}
            />
            <View
              style={{
                fontSize: 20,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              placeholder=""
              multiline={true}
              maxLength={0}>
              <Text
                style={[
                  {
                    fontSize: 19,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    alignItems: 'center',
                  },
                  number3 == true
                    ? {
                        fontSize: 19,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        alignItems: 'center',
                        color: 'white',
                      }
                    : null,
                ]}>
                Tập yoga
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'space-around',
            top: 340,
          }}>
          <TouchableOpacity
            style={[styles.khung, number4 == true ? styles.khungmau : null]}
            onPress={SetNum4}>
            <Image
              style={{position: 'relative', right: 10}}
              source={require('../../../image/cooking.png')}
            />

            <View
              style={{
                fontSize: 20,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              placeholder=""
              multiline={true}
              maxLength={0}>
              <Text
                style={[
                  {
                    fontSize: 19,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    alignItems: 'center',
                  },
                  number4 == true
                    ? {
                        fontSize: 19,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        alignItems: 'center',
                        color: 'white',
                      }
                    : null,
                ]}>
                Nấu ăn
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.khung, number5 == true ? styles.khungmau : null]}
            onPress={SetNum5}>
            <Image
              style={{position: 'relative', right: 10}}
              source={require('../../../image/tennis.png')}
            />
            <View
              style={{
                fontSize: 20,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              placeholder=""
              multiline={true}
              maxLength={0}>
              <Text
                style={[
                  {
                    fontSize: 19,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    alignItems: 'center',
                  },
                  number5 == true
                    ? {
                        fontSize: 19,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        alignItems: 'center',
                        color: 'white',
                      }
                    : null,
                ]}>
                Quần vợt
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'space-around',
            top: 400,
          }}>
          <TouchableOpacity
            style={[styles.khung, number6 == true ? styles.khungmau : null]}
            onPress={SetNum6}>
            <Image
              style={{position: 'relative', right: 10}}
              source={require('../../../image/run.png')}
            />

            <View
              style={{
                fontSize: 20,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              placeholder=""
              multiline={true}
              maxLength={0}>
              <Text
                style={[
                  {
                    fontSize: 19,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    alignItems: 'center',
                  },
                  number6 == true
                    ? {
                        fontSize: 19,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        alignItems: 'center',
                        color: 'white',
                      }
                    : null,
                ]}>
                Chạy bộ
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.khung, number7 == true ? styles.khungmau : null]}
            onPress={SetNum7}>
            <Image
              style={{position: 'relative', right: 10}}
              source={require('../../../image/boi.png')}
            />
            <View
              style={{
                fontSize: 20,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              placeholder=""
              multiline={true}
              maxLength={0}>
              <Text
                style={[
                  {
                    fontSize: 19,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    alignItems: 'center',
                  },
                  number7 == true
                    ? {
                        fontSize: 19,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        alignItems: 'center',
                        color: 'white',
                      }
                    : null,
                ]}>
                Bơi lội
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'space-around',
            top: 460,
          }}>
          <TouchableOpacity
            style={[styles.khung, number8 == true ? styles.khungmau : null]}
            onPress={SetNum8}>
            <Image
              style={{position: 'relative', right: 10}}
              source={require('../../../image/ve.png')}
            />

            <View
              style={{
                fontSize: 20,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              placeholder=""
              multiline={true}
              maxLength={0}>
              <Text
                style={[
                  {
                    fontSize: 19,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    alignItems: 'center',
                  },
                  number8 == true
                    ? {
                        fontSize: 19,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        alignItems: 'center',
                        color: 'white',
                      }
                    : null,
                ]}>
                Vẽ tranh
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.khung, number9 == true ? styles.khungmau : null]}
            onPress={SetNum9}>
            <Image
              style={{position: 'relative', right: 10}}
              source={require('../../../image/leonui.png')}
            />
            <View
              style={{
                fontSize: 20,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              placeholder=""
              multiline={true}
              maxLength={0}>
              <Text
                style={[
                  {
                    fontSize: 19,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    alignItems: 'center',
                  },
                  number9 == true
                    ? {
                        fontSize: 19,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        alignItems: 'center',
                        color: 'white',
                      }
                    : null,
                ]}>
                Leo núi
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'space-around',
            top: 520,
          }}>
          <TouchableOpacity
            style={[styles.khung, number10 == true ? styles.khungmau : null]}
            onPress={SetNum10}>
            <Image
              style={{position: 'relative', right: 10}}
              source={require('../../../image/nhaydu.png')}
            />

            <View
              style={{
                fontSize: 20,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              placeholder=""
              multiline={true}
              maxLength={0}>
              <Text
                style={[
                  {
                    fontSize: 19,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    alignItems: 'center',
                  },
                  number10 == true
                    ? {
                        fontSize: 19,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        alignItems: 'center',
                        color: 'white',
                      }
                    : null,
                ]}>
                Nhảy dù
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.khung, number11 == true ? styles.khungmau : null]}
            onPress={SetNum11}>
            <Image
              style={{position: 'relative', right: 10}}
              source={require('../../../image/music.png')}
            />
            <View
              style={{
                fontSize: 20,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              placeholder=""
              multiline={true}
              maxLength={0}>
              <Text
                style={[
                  {
                    fontSize: 19,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    alignItems: 'center',
                  },
                  number11 == true
                    ? {
                        fontSize: 19,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        alignItems: 'center',
                        color: 'white',
                      }
                    : null,
                ]}>
                Nghe nhạc
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'space-around',
            top: 580,
          }}>
          <TouchableOpacity
            style={[styles.khung, number12 == true ? styles.khungmau : null]}
            onPress={SetNum12}>
            <Image
              style={{position: 'relative', right: 10}}
              source={require('../../../image/drink.png')}
            />

            <View
              style={{
                fontSize: 20,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              placeholder=""
              multiline={true}
              maxLength={0}>
              <Text
                style={[
                  {
                    fontSize: 19,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    alignItems: 'center',
                  },
                  number12 == true
                    ? {
                        fontSize: 19,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        alignItems: 'center',
                        color: 'white',
                      }
                    : null,
                ]}>
                Uống nước
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.khung, number13 == true ? styles.khungmau : null]}
            onPress={SetNum13}>
            <Image
              style={{position: 'relative', right: 10}}
              source={require('../../../image/game-handle.png')}
            />
            <View
              style={{
                fontSize: 20,
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              placeholder=""
              multiline={true}
              maxLength={0}>
              <Text
                style={[
                  {
                    fontSize: 19,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    alignItems: 'center',
                  },
                  number13 == true
                    ? {
                        fontSize: 19,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        alignItems: 'center',
                        color: 'white',
                      }
                    : null,
                ]}>
                Chơi game
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mailnut}>
        <TouchableOpacity style={styles.nut} onPress={AddData}>
          <Text style={styles.nutText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lui}>
        <TouchableOpacity onPress={() => navigation.navigate('Possions')}>
          <Image
            style={{position: 'relative', right: 5}}
            source={require('../../../image/lui.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Possions;

const styles = StyleSheet.create({
  lui: {
    position: 'absolute',
    width: 52,
    height: 52,
    left: 45,
    top: 20,
  },
  mailnut: {
    position: 'absolute',
    width: '100%',
    bottom: 50,
    height: 56,

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  nut: {
    width: '80%',
    height: 56,
    backgroundColor: '#E94057',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 15,
  },
  nutText: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '700',
    fontStyle: 'normal',
    color: 'white',
  },
  khung: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    position: 'relative',
    width: 140,
    height: 45,
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
  khungmau: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    position: 'relative',
    backgroundColor: '#E94057',
    width: 140,
    height: 45,
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
  Textsothich: {
    fontSize: 30,
    right: 25,
    marginLeft: 35,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  sothichText: {
    position: 'absolute',
    width: '80%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    height: 70,
    top: 120,
  },
  textSkip: {
    fontSize: 16,
    color: '#E94057',
    fontWeight: '700',
  },
  Skiptext: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
    height: 24,
    top: 35,
  },
  imagelui: {
    position: 'absolute',
    width: 52,
    height: 52,
    left: 40,
    top: 20,
  },
});
