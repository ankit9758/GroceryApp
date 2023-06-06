import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screens/Main';
import Login from './screens/Login';
import Signup from './screens/Signup';

const Stack = createNativeStackNavigator()
const AppNavigator = () => {
    return (
        <NavigationContainer  >
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name='Main' component={Main} 
                options={{headerShown:false}}/>
                   <Stack.Screen name='Login'  component={Login}  
                options={{headerShown:false,}}/>
                <Stack.Screen name='Signup'  component={Signup}  
                options={{headerShown:false,}}/>
            </Stack.Navigator>
            
           
        </NavigationContainer>
    );
}
export default AppNavigator;