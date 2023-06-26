import { View, Text, Image } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from './HomeScreen';
import BottomNavigaiton from './bottomnavigations/BottomNavigation';
import ChatList from './topNavigation/ChatList';
import CustomDrawer from '../common/CustomDrawer';
import { image_chat, image_home, image_navigation } from '../../utils/images';
import { black, red, white } from '../../utils/color';
const Drawer = createDrawerNavigator();

const Main = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType:'slide'


            }}
            
            >
          
            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
            <Drawer.Screen name="ChatList" component={ChatList} />
            <Drawer.Screen name="BottomNavigation" component={BottomNavigaiton} />
        </Drawer.Navigator>
    );
}
export default Main;