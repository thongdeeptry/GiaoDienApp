import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import {Login} from './screens/Login'; 
import {Register} from './screens/Register'; 
import {Index} from './screens/Index';
import { Landing4 } from './screens/Landing4';
import { RegisterPhone } from './screens/RegisterPhone';
import { CfPhone } from './screens/CfPhone';
import { ProfileName } from './screens/ProfileName';
import { Selectsex } from './screens/Selectsex';
import {Possions} from './screens/Possions';
import { LoginPhone } from './screens/LoginPhone';
import { LoginCfPhone } from './screens/LoginCfPhone';
import { Profile } from '../product/Profile';
import { PostStatus } from '../product/PostStatus';
export default UserNavigationn = () => {
    return (
        <Stack.Navigator screenOptions={({route}) => ({headerShown: false,})}>
            <Stack.Screen name="Index" component={Index} />
            <Stack.Screen name="Landing4" component={Landing4} />
            <Stack.Screen name="RegisterPhone" component={RegisterPhone} />
            <Stack.Screen name="CfPhone" component={CfPhone} />
            <Stack.Screen name="ProfileName" component={ProfileName} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Selectsex" component={Selectsex} />
            <Stack.Screen name="Possions" component={Possions}/>
            <Stack.Screen name="LoginPhone" component={LoginPhone} />
            <Stack.Screen name="LoginCfPhone" component={LoginCfPhone}/>
            
        </Stack.Navigator>
    )
}

