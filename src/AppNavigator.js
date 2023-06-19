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
import Splash from './screens/Splash';
import ChatList from './screens/ChatList';
import BottomNavigaiton from './screens/bottomnavigations/BottomNavigation';

const Stack = createNativeStackNavigator()
const AppNavigator = () => {
    // let  initalRoute='Onboarding'
    const [initalRoute, setInitalRoute] = useState('')
    //const [initalRoute, setInitalRoute] = useState('Onboarding')
    const [isLoginchecked, setIsLoginChecked] = useState(false)

    useEffect(() => {
        getJSONFromAsyncStorage(USER_DATA)
    }, [isLoginchecked])

    const getJSONFromAsyncStorage = async (key) => {
        try {
            const jsonData = await AsyncStorage.getItem(key);
            if (jsonData !== null) {
                console.log('Retrieved  Nav:', jsonData);
                const data = JSON.parse(jsonData);
                console.log('Retrieved JSON value App Nav:', data);

                // initalRoute='Main'
                setInitalRoute('Main')

                if (data['email'] !== '') {
                    console.log('Retrieved JSON value Nav:', { initalRoute });

                }
                setIsLoginChecked(true)
                return data;
            } else {
                setInitalRoute('Onboarding')
                setIsLoginChecked(true)
            }
        } catch (error) {
            console.log('Error retrieving JSON value:', error);
            setIsLoginChecked(true)

        }
    };

    // if (!isLoginchecked) {
    //     return (<Splash />)
    // }

    return (

        <NavigationContainer >


            {isLoginchecked ? (<Stack.Navigator initialRouteName={initalRoute}>


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
            ) : (<Splash />)

            }


        </NavigationContainer>


    );
}
export default AppNavigator;