import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screens/Main';
import Login from './screens/Login';
import Signup from './screens/Signup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA } from '../utils/AppConstant';

const Stack = createNativeStackNavigator()
const AppNavigator = () => {
  const [initalRoute, setInitalRoute] = useState('Login')

    useEffect(() => {
      getJSONFromAsyncStorage(USER_DATA)
    },[initalRoute])

    const getJSONFromAsyncStorage = async (key) => {
        try {
            const jsonData = await AsyncStorage.getItem(key);
            if (jsonData !== null) {
                console.log('Retrieved  Nav:', jsonData);
                const data = JSON.parse(jsonData);
                console.log('Retrieved JSON value App Nav:', data);
                setInitalRoute('Main')
                if(data['email']!==''){
                    console.log('Retrieved JSON value Nav:', data.email);
                   
                }
               
                return data;
            }
        } catch (error) {
            console.log('Error retrieving JSON value:', error);
        }
    };
   
    return (
        <NavigationContainer >
            {initalRoute==='Main'? <Stack.Navigator initialRouteName='Main' >
        <Stack.Screen name='Signup'  component={Signup}  
            options={{headerShown:false,}}/>
            <Stack.Screen name='Main' component={Main} 
            options={{headerShown:false}}/>
               <Stack.Screen name='Login'  component={Login}  
            options={{headerShown:false,}}/>
          
        </Stack.Navigator>:
        <Stack.Navigator initialRouteName='Login' >
        <Stack.Screen name='Signup'  component={Signup}  
            options={{headerShown:false,}}/>
            <Stack.Screen name='Main' component={Main} 
            options={{headerShown:false}}/>
               <Stack.Screen name='Login'  component={Login}  
            options={{headerShown:false,}}/>
          
        </Stack.Navigator>}
        
        
       
    </NavigationContainer>
   
        
    );
}
export default AppNavigator;