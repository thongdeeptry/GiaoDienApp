import React from 'react'
import { View, Image ,StyleSheet,TouchableOpacity, Animated} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { NavigationContainer } from '@react-navigation/native';
import Home from '../product/Home/Main'
import { Profile } from './Profile';
import { PostStatus } from './PostStatus';
import { Camxuc } from './Camxuc';
import { ProfileFriend } from './ProfileFriend';
import Card from './Home/Card';
export default PrNavigation = () => {
    return (
        <Stack.Navigator screenOptions={({route}) => ({headerShown: false})}>
        <Stack.Screen name="PostStatus" component={PostStatus} />
        <Stack.Screen name="Camxuc" component={Camxuc} />
        <Stack.Screen name="ProfileFriend" component={ProfileFriend} />
       
    </Stack.Navigator>
    )
}

