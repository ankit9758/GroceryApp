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

const Stack = createNativeStackNavigator()
const AppNavigator = () => {
    const [initalRoute, setInitalRoute] = useState('Login')

    useEffect(() => {
        getJSONFromAsyncStorage(USER_DATA)
    }, [])

    const getJSONFromAsyncStorage = async (key) => {
        try {
            const jsonData = await AsyncStorage.getItem(key);
            if (jsonData !== null) {
                console.log('Retrieved  Nav:', jsonData);
                const data = JSON.parse(jsonData);
                console.log('Retrieved JSON value App Nav:', data);

                setInitalRoute('Main')

                if (data['email'] !== '') {
                    console.log('Retrieved JSON value Nav:', { initalRoute });

                }
                return data;
            }
        } catch (error) {
            console.log('Error retrieving JSON value:', error);
        }
    };

    return (
        <NavigationContainer >


            <Stack.Navigator initialRouteName='Main' >
                <Stack.Screen name='Onboarding' component={OnBoardingScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen name='Signup' component={Signup}
                    options={{ headerShown: false}} />

                <Stack.Screen name='Main' component={Main}
                    options={{ headerShown: false }} />
                <Stack.Screen name='Login' component={Login}
                    options={{ headerShown: false }} />

                <Stack.Screen name='SavedAddress' component={SavedAddress}
                    options={{ headerShown: false }} />

                <Stack.Screen name='AddAddress' component={AddAddress}
                    options={{ headerShown: false }} />
            </Stack.Navigator>



        </NavigationContainer>


    );
}
export default AppNavigator;