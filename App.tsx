import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppNavigator from './src/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import RNBootSplash from "react-native-bootsplash";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA } from './utils/AppConstant';
const App = () => {
    const [isLoginchecked, setIsLoginChecked] = useState(false)
    const [initalRoute, setInitalRoute] = useState('')
  
    useEffect(() => {
        const init = async () => {
            // …do multiple sync or async tasks
            try {
                const jsonData = await AsyncStorage.getItem(USER_DATA);
                if (jsonData !== null) {
                    console.log('Retrieved  Nav:', jsonData);
                    const data = JSON.parse(jsonData);
                    console.log('Retrieved JSON value App Nav:', data);

                    //setInitalRoute('Main')
                    setInitalRoute('OtpVerification')
                    setIsLoginChecked(true)
                    if (data['email'] !== '') {
                        console.log('Retrieved JSON value Nav:', { initalRoute });

                    }

                    return data;
                } else {
                    setInitalRoute('Onboarding')
                    console.log('OnB', initalRoute);
                    setIsLoginChecked(true)

                }
            } catch (error) {
                setInitalRoute('Onboarding')
                setIsLoginChecked(true)
                console.log('Error retrieving JSON value:', error);

            }
        }


        init().finally(async () => {
            await RNBootSplash.hide({ fade: true });
            console.log("BootSplash has been hidden successfully");
        });
    }, []);




    return (
        initalRoute!='' ? (
            <Provider store={store}>
                <AppNavigator initalRoute={initalRoute} />
            </Provider>) : <View></View>)



}
export default App;