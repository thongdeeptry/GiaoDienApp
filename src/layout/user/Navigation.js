import React ,{useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import UserNavigationn from './UserNavigationn';
import ProductNavigation from '../product/ProductNavigation';
import PrNavigation from '../product/PrNavigation';
import {UserContext} from './UserContext';
export default Navigation = () => {
    const {isLoggedIn}= useContext(UserContext);
    return (
        <NavigationContainer>
            {
                isLoggedIn == true?
                <ProductNavigation/>:
                <UserNavigationn/>
            }
        </NavigationContainer>
    )
}

