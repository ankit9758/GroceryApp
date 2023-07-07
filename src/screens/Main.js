import { View, Text, Image } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from './HomeScreen';
import BottomNavigaiton from './bottomnavigations/BottomNavigation';
import ChatList from './topNavigation/ChatList';
import CustomDrawer from '../common/CustomDrawer';
import { image_chat, image_home, image_navigation } from '../../utils/images';
import { black, red, white } from '../../utils/color';
import { ThemeContext } from '../../utils/ThemeContext';
const Drawer = createDrawerNavigator();
import { useDispatch } from "react-redux";
import { addUserData } from "../redux/slices/UseDataSlice";
const Main = () => {
    const disptach = useDispatch();
    const { theme, userData } = useContext(ThemeContext);
  

    useEffect(() => {
        if(userData.email){
            console.log('Main....',theme.mode+",,,,"+userData.email)
            disptach(addUserData(userData))
        }
        
    })
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'slide'


            }}

        >

            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
            <Drawer.Screen name="ChatList" component={ChatList} />
            <Drawer.Screen name="BottomNavigation" component={BottomNavigaiton} />
        </Drawer.Navigator>
    );
}
export default Main;