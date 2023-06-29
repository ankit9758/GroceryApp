import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screens/Main';
import Login from './screens/Login';
import Signup from './screens/Signup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA } from '../utils/AppConstant';
import OnBoardingScreen from './screens/Onboarding';
import SavedAddress from './screens/SavedAddress';
import AddAddress from './screens/AddAddress';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import ChangePassword from './screens/ChangePassword';
import ChatList from './screens/topNavigation/ChatList';
import BottomNavigaiton from './screens/bottomnavigations/BottomNavigation';
import OtpVerification from './screens/OtpVerification';
import TabTop from './screens/topNavigation/PagerTabs'


const Stack = createNativeStackNavigator()
const AppNavigator = (props) => {

    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName={props.initalRoute}>


                <Stack.Screen name='TabTop' component={TabTop}
                    options={{ headerShown: false }} />

            

                <Stack.Screen name='OtpVerification' component={OtpVerification}
                    options={{ headerShown: false }} />

                <Stack.Screen name='Signup' component={Signup}
                    options={{ headerShown: false }} />

                <Stack.Screen name='Onboarding' component={OnBoardingScreen}
                    options={{ headerShown: false }} />

                <Stack.Screen name='Main' component={Main}
                    options={{ headerShown: false }} />
                <Stack.Screen name='Login' component={Login}
                    options={{ headerShown: false }} />

                <Stack.Screen name='SavedAddress' component={SavedAddress}
                    options={{ headerShown: false }} />

                <Stack.Screen name='AddAddress' component={AddAddress}
                    options={{ headerShown: false }} />

                <Stack.Screen name='ProductDetails' component={ProductDetails}
                    options={{ headerShown: false }} />
                <Stack.Screen name='Cart' component={Cart}
                    options={{ headerShown: false }} />
                <Stack.Screen name='ChangePassword' component={ChangePassword}
                    options={{ headerShown: false }} />
                <Stack.Screen name='ChatList' component={ChatList}
                    options={{ headerShown: false }} />

                <Stack.Screen name='BottomNavigation' component={BottomNavigaiton}
                    options={{ headerShown: false }} />
            </Stack.Navigator>





        </NavigationContainer>


    );
}
export default AppNavigator;