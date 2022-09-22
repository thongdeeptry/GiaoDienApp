import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export const SayHello = () => {
    return (
        <View style={styles.container}>

            <View style={styles.Image}>
                <Image style={styles.Image2} source={require('../../../image/avt.jpg')} />
                <Image style={styles.Image1} source={require('../../../image/avt.jpg')} />
                <Image style={styles.Image3} source={require('../../../image/like.png')} />
                <Image style={styles.Image4} source={require('../../../image/like.png')} />


            </View>
            <View style={styles.MOBILE}>
            
                <Text style={styles.MOBILEText} >Kết nối bạn và Bảo
        </Text>
                <Text style={styles.chitietsdt} >Bắt đầu cuộc trò chuyện với nhau ngay bây giờ</Text>
            </View>
<View style={{position:'absolute',width:'100%',height:150,bottom:20,alignItems:'center',flexDirection:'column',justifyContent:'center'}}>
            
            <TouchableOpacity style ={styles.nut}>
           <Text style={styles.nutText}>Nhắn tin</Text>
            </TouchableOpacity>
            
       
            <TouchableOpacity style ={styles.nut1} >
           <Text style={styles.nutText1}>Xem trang cá nhân</Text>
            </TouchableOpacity>
       
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mailnut:{
        position: 'absolute',
        width: '85%',
        
        height: 50,
        
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row',
    },
    nut:{
        width: '85%',
            height:50,
            backgroundColor:'#FD397F',
            justifyContent: 'center',
            alignItems:'center',
            flexDirection:'row',
            marginTop:10,
            borderRadius:15,
    },
    nutText:{
        justifyContent: 'center',
        alignItems:'center',
        textAlign:'center',
        fontSize:21,
        fontWeight:'700',
        fontStyle:'normal',
        color:'white',
    },

    mailnut1:{
        position: 'absolute',
        width: '85%',

        height: 50,
        
    },
    nut1:{
        width: '85%',
            height:50,
            backgroundColor:'#FD397F',
            justifyContent: 'center',
            alignItems:'center',
            flexDirection:'row',
            marginTop:20,
            borderRadius:15,
            borderBottomColor:'#FD397F',
        borderLeftColor:'#FD397F',
        borderLeftWidth:0.5,
        borderBottomWidth:0.5,
        borderRightColor:'#FD397F',
        borderTopColor:'#FD397F',
        borderRightWidth:0.5,
        borderTopWidth:0.5,
        
     
    },
    nutText1:{
        justifyContent: 'center',
        alignItems:'center',
        textAlign:'center',
        fontSize:20,
        fontWeight:'500',
        fontStyle:'normal',
        color:'#ffffff',
    },
   
    chitietsdt:{
        fontSize:14,
        flexDirection:'row',
        justifyContent:'center',
        textAlign:'center',
        fontWeight:'400',
    
            fontStyle:'normal',
        },
        MOBILEText:{
            fontSize:30,
            flexDirection:'row',
            justifyContent:'center',
            textAlign:'center',
            fontWeight:'700',
            color: '#E94057'
        },
        MOBILE: {
            position: 'absolute',
            width: '80%',
            height: 93,
            left: 40,
            top: 500,
           
    
        },
    Image4: {
        position: 'absolute',
        width: '40%',
        height: '40%',
        left: 120,
        top: 25,
        transform: [{ rotate: '10deg' }],
    },

    Image3: {
        position: 'absolute',
        width: '40%',
        height: '40%',
        left: 25,
        top: 370,
        transform: [{ rotate: '-10deg' }],
        
    },

    Image: {
        position: 'absolute',
        width: 294.57,
        height: 403.51,
        left: 25,
        top: 0,

    },
    Image1: {
        position: 'absolute',
        width: 160,
        height: 240,
        left: 40,
        top: 197.78,
        transform: [{ rotate: '-10deg' }],
        borderRadius: 12

    },
    Image2: {
        position: 'absolute',
        width: 160,
        height: 240,
        left: 147,
        top: 78,
        transform: [{ rotate: '10deg' }],
        borderRadius: 12
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
})
