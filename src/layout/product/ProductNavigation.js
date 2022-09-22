import React from 'react'
import { View, Image ,StyleSheet,TouchableOpacity, Animated} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { NavigationContainer } from '@react-navigation/native';
import PrNavigation from './PrNavigation';
import Home from '../product/Home/Main'
import { Profile } from './Profile';
import { PostStatus } from './PostStatus';
import { Camxuc } from './Camxuc';
import { ProfileFriend } from './ProfileFriend';
import Card from './Home/Card';
export default ProductNavigation = (props) => {
    const hide = props.routeName != "PostStatus"
    const CustomBar = ({children,onPress}) =>(
        <TouchableOpacity style={{
            top:-30,
            justifyContent:'center',
            alignItems:'center',

        }}
        onPress={onPress}>
             <View style={{
                width:60,
                height:60,
                borderRadius:35,
                backgroundColor:'#E94057',
             }}>
                {children}
             </View>
        </TouchableOpacity>
    );

    return (
        <View style={{width:'100%',height:'100%'}}>
       
       <Tab.Navigator  screenOptions={({route}) => ({
            tabBarStyle:{position:'absolute',backgroundColor:'#FFFFFF',borderTopLeftRadius:15,borderTopRightRadius:15,height:60,alignItems:'center'},
          tabBarIcon : ({focused}) =>{
            if (route.name == "Home") {
                return <Image style={{resizeMode:'cover',tintColor:focused ? '#E94057' : '#748c94'}} source={require('../../image/home.png')}/>
            }
            if (route.name == "Home1") {
                return <Image style={{resizeMode:'cover',tintColor:focused ? '#E94057' : '#748c94'}} source={require('../../image/home.png')}/>
            }
            if(route.name == "Chat"){
                return <Image style={{resizeMode:'cover',tintColor:focused ? '#E94057' : '#748c94'}} source={require('../../image/chat.png')}/>
            }
            if (route.name == "Detail") {
                return <Image style={{resizeMode:'cover',tintColor:focused ? '#E94057' : '#748c94'}} source={require('../../image/home.png')}/>
            }
            if (route.name == "Profile") {
                return <Image style={{resizeMode:'cover',tintColor:focused ? '#E94057' : '#748c94'}} source={require('../../image/home.png')}/>
            }
          },
          tabBarShowLabel:false,
          
          headerShown:false,
          
          
       })}>
           <Tab.Screen name="Home" component={Home}/>
           <Tab.Screen name="Home1" component={Home}/>
           <Tab.Screen name="Chat" component={Home} 
            // options={{
            //     tabBarIcon:({focused})=>(
            //         <Image style={{resizeMode:'cover',tintColor:'#FFFFFF',width:40,height:40}} source={require('../../image/chat.png')}/>
                    
            //         ),
            //         tabBarButton:(props)=>(
            //             <CustomBar {... props}/>
            //         )
            // }} />
            />
           <Tab.Screen name="Detail" component={Home}/>
           <Tab.Screen name="Profile" component={Profile}/>
           
           <Stack.Screen name="PostStatus" component={PostStatus} options={{
          headerShown: false,
          tabBarStyle: { display: "none"}
        }} />
        <Stack.Screen name="Camxuc" component={Camxuc} options={{
          headerShown: false,
          tabBarStyle: { display: "none"}
        }} />
        <Stack.Screen name="ProfileFriend" component={ProfileFriend} options={{
          headerShown: false,
          tabBarStyle: { display: 'none'}
        }} />
       </Tab.Navigator>
       
       </View>
       
    )
}

