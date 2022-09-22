import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Slider from '@react-native-community/slider';
export const Fillter = () => {
    const [number, setnumber] = useState(0)
    const [number1, setnumber1] = useState(0)
    const [number2, setnumber2] = useState(0)
    const [value, setValue] = useState(0);
    const [tuoi, setTuoi] = useState(0);
    const SetNum = () => {
        setnumber(1);
        setnumber1(0);
        setnumber2(0);
    }
    const SetNum1 = () => {
        setnumber1(1);
        setnumber(0);
        setnumber2(0);
    }
    const SetNum2 = () => {
        setnumber2(1);
        setnumber1(0);
        setnumber(0);
    }
    const Delete = () => {
        setnumber(0);
        setnumber1(0);
        setnumber2(0);
        setTuoi(0);
        setValue(0);
    }
    return (
        <View style={styles.tong}>
            <View style={styles.text}>
                <Text style={styles.chu}>Tìm bạn bè</Text>
                <Text style={styles.clear} onPress={Delete}>Xóa</Text>

            </View>
            <View style={styles.qt}>
                <Text style={styles.textqt}>Quan tâm</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 40, right: 50, }}>
                    <View>
                        <TouchableOpacity style={[styles.nam, number > 0 ? styles.namehong : null]} onPress={SetNum}>
                            <Text style={styles.chunam}>Nam</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={[styles.nu, number1 > 0 ? styles.nuhong : null]} onPress={SetNum1}>
                            <Text style={styles.chunu}>Nữ</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={[styles.khac, number2 > 0 ? styles.khachong : null]} onPress={SetNum2}>
                            <Text style={styles.chukhac}>Khác</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>

            <View style={styles.khunghinh}>
                <View style={styles.khung4}>
                    <TouchableOpacity style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                        width: '100%'
                    }}
                    >
                        <Text style={{ fontSize: 20, alignItems: 'center', left: 20, position: 'relative', }}>
                            Chọn vị trí
                        </Text>
                        <Image style={{ position: 'relative', right: 20, alignItems: 'center' }} source={require('../../../image/next.png')} />
                    </TouchableOpacity>

                </View>

            </View>
            <View style={{ position: 'absolute', top: 450, width: '90%', height: 80, alignItems: 'center', left: 25 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', left: 20 }}>Khoảng cách </Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', right: 25 }}>{Math.round(value)}Km</Text>
                </View>
                <Slider
                    style={{ width: '95%', height: 30, top: 10 }}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="#E94057"
                    maximumTrackTintColor="#E94057"
                    value={value}
                    onValueChange={value => setValue(value)}

                />
            </View>
            <View style={{ position: 'absolute', top: 530, width: '90%', height: 80, alignItems: 'center', left: 25 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', left: 20 }}>Độ tuổi </Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', right: 25 }}>{Math.round(tuoi)} Tuổi</Text>
                </View>
                <Slider
                    style={{ width: '95%', height: 30, top: 10 }}
                    minimumValue={16}
                    maximumValue={45}
                    minimumTrackTintColor="#E94057"
                    maximumTrackTintColor="#E94057"
                    value={tuoi}
                    onValueChange={tuoi => setTuoi(tuoi)}

                />
            </View>
            <View style={styles.mailnut}>
                <TouchableOpacity style={styles.nut} >
                    <Text style={styles.nutText}>Tìm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
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
    khunghinh: {
        position: 'absolute',
        justifyContent: 'center',
        fontSize: 35,
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%',
        height: 58,
        left: 40,
        top: 380,

    },
    khung4: {
        marginBottom: 20,

        position: 'relative',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ABABAB',
        borderLeftColor: '#ABABAB',
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderRightColor: '#ABABAB',
        borderTopColor: '#ABABAB',
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderRadius: 15,
    },
    chunam: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        alignItems: 'center',
        top: 15,
        fontSize: 20,
        color: 'black'
    },
    chunu: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        alignItems: 'center',
        top: 15,
        fontSize: 20,
        color: 'black'
    },
    chukhac: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        alignItems: 'center',
        top: 15,
        fontSize: 20,
        color: 'black'
    },
    qt: {
        position: 'absolute',
        width: '80%',
        height: 102,
        left: 38,
        top: 255,

    },
    textqt: {
        position: 'absolute',
        width: 93,
        height: 35,
        left:5,
        fontSize: 16,
        fontWeight: '700',

    },
    nam: {

        borderBottomColor: '#ABABAB',
        borderLeftColor: '#ABABAB',
        borderLeftWidth: 0.5,
        borderBottomWidth: 0.5,

        borderTopColor: '#ABABAB',

        borderTopWidth: 0.5,
        position: 'absolute',

        top: '36.82%',
        bottom: '56.03%',
        backgroundColor: 'white',
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        width: 105,
        height: 58,

    },
    namehong: {
        borderBottomColor: '#ABABAB',
        borderLeftColor: '#ABABAB',
        borderLeftWidth: 0.5,
        borderBottomWidth: 0.5,

        borderTopColor: '#ABABAB',

        borderTopWidth: 0.5,
        position: 'absolute',

        top: '36.82%',
        bottom: '56.03%',
        backgroundColor: '#E94057',
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        width: 105,
        height: 58,
    },
    nuhong: {

        borderBottomColor: '#ABABAB',

        borderBottomWidth: 0.5,

        borderTopColor: '#ABABAB',

        borderTopWidth: 0.5,
        position: 'absolute',
        top: '36.82%',
        bottom: '56.03%',
        backgroundColor: '#E94057',

        width: 105,
        height: 58,
    },
    khachong: {
        borderBottomColor: '#ABABAB',

        borderBottomWidth: 0.5,
        borderRightColor: '#ABABAB',
        borderTopColor: '#ABABAB',
        borderRightWidth: 0.5,
        borderTopWidth: 0.5,
        position: 'absolute',

        top: '36.82%',
        bottom: '56.03%',
        backgroundColor: '#E94057',
        borderBottomEndRadius: 15,
        borderTopRightRadius: 15,

        width: 105,
        height: 58,
    },
    nu: {

        borderBottomColor: '#ABABAB',

        borderBottomWidth: 0.5,

        borderTopColor: '#ABABAB',

        borderTopWidth: 0.5,
        position: 'absolute',
        top: '36.82%',
        bottom: '56.03%',
        backgroundColor: 'white',

        width: 105,
        height: 58,
    },
    khac: {
        borderBottomColor: '#ABABAB',

        borderBottomWidth: 0.5,
        borderRightColor: '#ABABAB',
        borderTopColor: '#ABABAB',
        borderRightWidth: 0.5,
        borderTopWidth: 0.5,
        position: 'absolute',

        top: '36.82%',
        bottom: '56.03%',
        backgroundColor: 'white',
        borderBottomEndRadius: 15,
        borderTopRightRadius: 15,

        width: 105,
        height: 58,
    },

    clear: {
        position: 'absolute',
        width: 41,
        height: 24,
        right: 10,
        color: '#E94057',
        fontSize: 16,
        top: 5

    },
    chu: {
        position: 'absolute',
        width: 150,
        height: 36,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        color: '#000000',
    },
    tong: {
        width: '100%',
        height: '100%',
        background: '#FFFFFF',
        bottom:0,
    },
    text: {
        position: 'absolute',
        width: '70%',
        height: 36,
        right: 0,
        top: 50,


    },


})