import { View, Text, Appearance } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppNavigator from './src/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import RNBootSplash from "react-native-bootsplash";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA } from './utils/AppConstant';
import { ThemeContext } from './utils/ThemeContext';
const App = () => {

    const [theme, setTheme] = useState({ mode: 'light' })
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

                    setInitalRoute('Main')
                    //  setInitalRoute('TabTop')
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

    Appearance.addChangeListener(({ colorScheme }) => {
         updateTheme(colorScheme)
    })
    const updateTheme = (newTheme: any) => {
        let mode;
        const systemColorScheme = Appearance.getColorScheme()
        mode = systemColorScheme === 'dark' ? 'dark' : 'light'
        // if (!newTheme) {
        //     mode = theme.mode === 'dark' ? 'light' : 'dark'
        // }
        newTheme = { mode };
        console.log('colorThem==App', systemColorScheme)
        setTheme(newTheme)
    }



    return (

        initalRoute != '' ? (
            <ThemeContext.Provider value={{ theme, updateTheme }}>
                <Provider store={store}>

                <AppNavigator initalRoute={initalRoute} />

                </Provider>
            </ThemeContext.Provider>
        ) : <View></View>

    )



}
export default App;