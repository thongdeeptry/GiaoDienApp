import { StyleSheet, Text, View, Image,TouchableOpacity , TextInput} from 'react-native'
import React from 'react'


export const  Story= () => {
    return (
        <View style = {styles.tong}>
            <Image style = {styles.hinh} source={require('../../image/avt.jpg')}>
                
            </Image>
           <View style = {styles.con}>
<View style = {styles.ten}>
    <View style = {styles.maininfo}>
<Image style = {styles.avt} source={require('../../image/avt.jpg')}/>
  <Text style ={styles.ten1} >Truong Cong Bao</Text>


  </View>
  <View style={styles.mainclose}>
        <TouchableOpacity>
        <Image style = {styles.close} source={require('../../image/close.png')}/>
        </TouchableOpacity>
  </View>
</View>
<View style = {styles.nho}>
    <View style = {styles.nhantin}>

    
    <TextInput style = {{borderBottomColor:'white',
        borderLeftColor:'white',
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderRightColor:'white',
        borderTopColor:'white',
        borderRightWidth:1,
        borderTopWidth:1,width:'100%',height:'100%',borderRadius:15,
        alignItems:'center',
                flexDirection:'row',
                justifyContent:'center',}} placeholder='  Gửi tin nhắn'>
    
    </TextInput>
    <Image style = {styles.sticker} source={require('../../image/stickers.png')}/>
    </View>
    <View style ={styles.gui}>
<TouchableOpacity style={{alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',width:'100%',height:'100%',borderBottomColor:'white',
        borderLeftColor:'white',
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderRightColor:'white',
        borderTopColor:'white',
        borderRightWidth:1,
        borderTopWidth:1,borderRadius:15,}}>
<Image style = {styles.stickerr} source={require('../../image/send.png')}/>
</TouchableOpacity>
</View>
</View>

           </View>

        </View>
    )
}


const styles = StyleSheet.create({
    stickerr:{
        position: 'relative',
        
    },
    gui:{
        
        position: 'absolute',
width: 45,
height: 45,
right:0,

borderRadius:15,

alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        
        
    },
    sticker: {
        position: 'absolute',
width: 20,
height: 20,
right:15,


    },
    nhantin:{
        
alignItems:'center',
flexDirection:'row',
justifyContent:'center',
        position: 'absolute',
        width: '83%',
        height: 45,

borderRadius:15,
color:'white'

    },
    nho:{
        
        alignItems:'center',
flexDirection:'row',
        position: 'absolute',
width: '95%',
height: 48,

top: '100%',
    },
    close:{
        width:30,
        height:30,
    },
    mainclose:{
        width:40,
        height:40,
        position:'absolute',
        right:0,
        flexDirection:'row',
        alignItems:'center',
    },
    maininfo:{
        flexDirection:'row',
        alignItems:'center',
position:'absolute',
    },
    ten1:{
        position: 'absolute',
        width: 300,
        height: 24,
        left:60,
        fontSize:18,
        fontWeight:'700',
        
    }, 
    avt:{
        position: 'absolute',
        width: 48,
        height: 48,
    
        borderRadius:30,
         
    },
    ten:{
        position: 'absolute',
width: '100%',
height: 56,
top: 20,
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
    },
    con:{
        position: 'absolute',
width: '85%',
height: '85%',
left: 40,
top: 40,
    },
    hinh:{
        width:'100%',
        height:'100%',
        opacity:0.9
    },
   tong: {
        position: 'absolute',
        width: '100%',
        height: '100%',
       backgroundColor: 'white',
   

    }
    
})