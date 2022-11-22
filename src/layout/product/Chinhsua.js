import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Pressable,
    TextInput
  } from "react-native";
import React from 'react'
import { withTheme } from "styled-components";


const Chinhsua = () => {

  return (
   <ScrollView>
    <View style ={ styles.tieude}>
      <View style = {styles.nen}>

      </View>
      <Text style={styles.chu} >Chỉnh sửa thông tin </Text>
      <View style = {styles.khung}>
      <Image style={styles.avt} source={require("../../image/avt.jpg")}/>
       
        <TextInput style={styles.ten}>Trương Công Bảo</TextInput>
        <Text style={styles.ten}>4565555</Text>
</View>
<View style ={styles.lon}>
   <View >
    <TouchableOpacity style={styles.con}>
      <Text style={styles.q} >
           Email.
      </Text>
      <TextInput style={styles.w}>
           bao@gmail.com
        
           <Image style={styles.edit} source={require("../../image/edit.png")}/>
           
      </TextInput>
      
    </TouchableOpacity>

   </View >
   <View style={{top:10}} >
    <TouchableOpacity style={styles.con}>
      <Text style={styles.q} >
          Địa chỉ.
      </Text>
      <TextInput style={styles.w}>
           nhà mặt phố
        
           <Image style={styles.edit} source={require("../../image/edit.png")}/>
           
      </TextInput>
      
    </TouchableOpacity>

   </View>
   <View style={{top:20}} >
    <TouchableOpacity style={styles.con}>
      <Text style={styles.q} >
          Đổi mật khẩu.
      </Text>
      <TextInput style={styles.w}>
           ***********
        
           <Image style={styles.edit} source={require("../../image/edit.png")}/>
           
      </TextInput>
      
    </TouchableOpacity>

   </View>
   <View style={{top:30}} >
    <TouchableOpacity style={styles.con}>
      <Text style={styles.q} >
          Ngày sinh.
      </Text>
      <TextInput style={styles.w}>
           150/05/2002.
        
           <Image style={styles.edit} source={require("../../image/edit.png")}/>
           
      </TextInput>
      
    </TouchableOpacity>

   </View>
   <View style={{top:40}} >
    <TouchableOpacity style={styles.con}>
      <Text style={styles.q} >
         Giới tính .
      </Text>
      <TextInput style={styles.w}>
           Nam
        
           <Image style={styles.edit} source={require("../../image/edit.png")}/>
           
      </TextInput>
      
    </TouchableOpacity>

   </View>

</View>

    </View>
    </ScrollView>
   
  )
}

export default Chinhsua


const styles = StyleSheet.create({
 lon:{
  flexDirection:"column",
  height:'100%'
 },
  
  edit:{
  position: 'absolute',
  width: 20,
  
 
},
  q:{
    position: 'absolute',
width: '90%',
height: 100,
left: 10,
top:10

  },
  w:{
    position: 'absolute',
width: '90%',
height: 80,
left: 10,

  },
 
  con:{
   
width: '90%',
height: 68,
left: 20,


backgroundColor: '#E94057',
borderRadius:10,
  },
  ten:{
    top:10,
    color:"white",
textAlign:"center",
  },
  avt:{
  borderRadius:50,
  width:100,
  height:100,
top:10,
  alignSelf:"center",
  },
  khung:{
   position:"absolute",
    width: '90%',
    height: 180,
  marginHorizontal:20,
    top: 70,
    backgroundColor:'#ABABAB',
   
   },
    tieude:{
        width:'100%',
        height:'100%',
        top:30,
        textAlign: "center",
        fontSize:50,
       
    },
   nen:{
   
    width: '100%',
    height: 150,
    left: 0,
    top: 0,
    backgroundColor:'#FBAF42',
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
   },
    chu:{
        width:'100%',
        position:'absolute',
        color:'white',
        textAlign: "center",
        fontSize:20
    },
})