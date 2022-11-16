
import React,{useState} from 'react';
import { StyleSheet, Text, View,Pressable,Image} from 'react-native';
import Landing1 from './Landing1';
import Landing2 from './Landing2';
import Landing3 from './Landing3';
import PagerView from 'react-native-pager-view';

export const Index = (props) => {
    const {navigation} = props;
  return (
    <View style={{ flex: 1 }}>
        
        <PagerView style={styles.viewPager} initialPage={0}>
        
        <View style={styles.page} key="1">
       
          <Landing1/>
        
        </View>
        <View style={styles.page} key="2">
        <Landing2/>
        </View>
        <View style={styles.page} key="3">
        <Landing3/>
        </View>
        
      </PagerView>
      
      
      <View style={styles.buttonContainer}>
        <Pressable style={styles.dangky} onPress={() =>navigation.navigate('Landing4')} >
                <Text style={styles.dangkyText} >Tạo tài khoản mới?</Text>
            </Pressable>
        </View>
        <View style={styles.textdangnhap}>
            <Text style={styles.textlogin}>Bạn đã có tài khoản?<Text onPress={() =>navigation.navigate('Login')} style={styles.textchitietlogin} > Đăng nhập</Text></Text>
            
        </View>
  </View>
);
}

const styles = StyleSheet.create({
textchitietlogin:{
  color:'#E94057',
},
textdangnhap:{
  position: 'absolute',
  width: 295,
  height: 24,
  left: 40,
  bottom: 30,
  justifyContent: 'center',
  alignItems:'center',
  flexDirection:'column',
  textAlign: 'center',
  color: '#000000B2',
  fontStyle:'normal',
  fontWeight:'400',
  fontSize:15,
},
buttonContainer:{
  position: 'absolute',
  width: '100%',
  
  height: 56,
  bottom: 70,
  justifyContent: 'center',
  alignItems:'center',
  flexDirection:'row',
    
},
dangky:{
  width:'80%',
  height:56,
  backgroundColor:'#E94057',
  justifyContent: 'center',
  alignItems:'center',
  flexDirection:'row',
  marginTop:20,
  borderRadius:15,
},
dangkyText:{
  justifyContent: 'center',
  alignItems:'center',
  textAlign:'center',
  fontSize:18,
  fontWeight:'700',
  fontStyle:'normal',
  color:'white',
},
viewPager: {
  flex: 1,
},
page: {
  justifyContent: 'center',
  alignItems: 'center',
},
});