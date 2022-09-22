
import { StyleSheet, Text, View, Image,TextInput } from 'react-native'
import React from 'react'
export const Mes = () => {
    return (
        <View style={{width:'100%',height:'100%',backgroundColor:'white'}}>
            <View style={styles.imageBack}>
                <Image style={styles.backImage} source={require('../../image/backArrow.png')} />
                <Image style={styles.avatarImage} source={require('../../image/placeholder.png')} />
                <Image style={styles.onlineImage} source={require('../../image/activeIcon.png')} />
                </View>
            <View style={styles.textContainer}>
            <Text style={styles.textTen}>AdminText</Text>
            <Text style={styles.textOnline}>Đang Hoạt Động</Text>
            <Image style={styles.iconImage} source={require('../../image/iconOption.png')} />
                </View>
            <View>
            <Image style={styles.mesImage} source={require('../../image/background.png')} />
            <Text style={styles.textView}>Hey, Tell me something i don’t know</Text>
            <Text style={styles.textHours}>4.30 AM</Text>
                </View>
            <View>
            <Image style={styles.pictureImage} source={require('../../image/picture.png')}/>
            <Image style={styles.loveImage} source={require('../../image/love.png')} />
            <Text style={styles.textHours1}>4.31 AM</Text>
                </View>
            <View>
            <Image style={styles.backgroud1Image} source={require('../../image/background1.png')} />
            <Text style={styles.textView1}>Awesome</Text>
            <Text style={styles.textHours2}>9.30 AM</Text>
                </View>
            <View >
            <TextInput style={styles.background2Image} placeholder='Type message...'></TextInput>
            <Image style={styles.nhanImage} source={require('../../image/icon.png')}/>
            <Text style={styles.textView2}></Text>
            <Image style={styles.sendImage} source={require('../../image/btnSend.png')}/>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sendImage:{
        position :'absolute',
        width: 46,
        height: 46,
        left :315,
        top: 608,
    },
    nhanImage:{
        position :'absolute',
        left :'11%',
        top :618,
    },
    textView2:{
        position: 'absolute',
        width: 118,
        height: 20,
        left :74,
        top :620,
        color :'#B0B0B0',
        fontWeight :'400',
        fontSize :16,
    },
    background2Image :{
        position :'absolute',
        width :'85%',
        height: 62,
        left :35,
        bottom: 50,
        backgroundColor:'black'
    },
    textHours2: {
        position: 'absolute',
        width :47,
        height :24,
        left :340,
        top: 425,
        fontSize :12,
        fontWeight :'400',
        color :'#969696',
    },
    textView1: {
        position :'absolute',
        width :'100%',
        height: 24,
        left :300,
        top :382,
        color :'#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
    },
    backgroud1Image: {
        position: 'absolute',
        width :125,
        height: 50,
        left: 270,
        top :370,
    },
    textHours1:{
        position :'absolute',
        width :47,
        height :24,
        left :15.2,
        right :78.4,
        top: 336,
        fontSize :12,
        fontWeight :'400',
        color :'#969696',
    },
    loveImage :{
        position :'absolute',
        left: '57%',
        top :295,

    },
    pictureImage :{
        position :'absolute',
        width :254,
        height :113,
        left :15.2,
        right :78.4,
        top :211,
    },
    textHours :{
        color :'#969696',
        position :'absolute',
        width :47,
        height :24,
        left :15.2,
        right :78.4,
        top :165,
        fontSize :12,
        fontWeight :'400',
    },
    textView :{
        position :'absolute',
        width :'100%',
        height :24,
        left :40,
        top :117,
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight :'400',
    },
    mesImage :{
        position :'absolute',
        width: 296,
        height :50,
        left :15.2,
        right :78.4,
        top :105,
    },
    iconImage: {
        position: 'absolute',
        width :5,
        height: 23,
        left :347,
        top :35,
    },
    textOnline: {
        position :'absolute',
        width :'100%',
        height :100,
        left :141,
        top :42,
        fontSize :14,
        fontWeight :'300',
    },
    textTen :{
        position: 'absolute',
        width :'100%',
        height: 23,
        left :141,
        top :20,
        fontSize :18,
        fontSize :18,
    },
    onlineImage: {
        position :'absolute',
        width :18,
        height :18,
        left :72,
        top: 50,
    },
    avatarImage :{
        position :'absolute',
        width :42,
        height :42,
        left :75,
        top :20,
    },
    backImage :{
        position :'absolute',
        left :15.2,
        right :78.4,
        top :40,
        bottom :88.72,
    },
    imageBack :{

    },
})