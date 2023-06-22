
import {
    FlatList,
    TouchableOpacity, Text, View,
    SafeAreaView, StatusBar, Image, StyleSheet, ActivityIndicator, RefreshControl, Keyboard
} from "react-native"
import React, { useState, useRef, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductListScreen from "./tabs/ProductListScreen";
import SecondScreen from "./tabs/SecondScreen";
import { green, red, white } from "../../../utils/color";
import { image_add, image_home, image_wishlist } from "../../../utils/images";
import { black } from "../../../utils/color";
import Header from "../../common/Header";
import Add from "../tabs/Add";
import PaginationDemo from "./tabs/PaginationDemo";

const Tab = createBottomTabNavigator();

// const CustomTabBarButton = ({ childern, onPress }) => {
//     // <TouchableOpacity onPress={onPress} style={{ top: -50, justifyContent: 'center', alignItems: 'center' }} >
//     // <View style={{ width: 70, height: 70, borderRadius: 70 / 2, backgroundColor: black }}>
//     { childern }
//     // </View>
//     //  </TouchableOpacity>
// }

const BottomNavigaiton = () => {

    return (<Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false, tabBarStyle: {
            //   position: 'absolute',
            //     bottom: 20,
                // left: 10,
                // right: 10,
                elevation: 0,
                //borderRadius: 10,
                height: 70,
                backgroundColor: red,

            },
            header: () => <Header title={'Bottom Demo'} />
        }}>
        <Tab.Screen name="Home" component={ProductListScreen} options={{
            tabBarIcon: ({ focused }) => (<View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={image_home} resizeMode="contain" style={[styles.bottomTabIcon, { tintColor: focused ? white : black }]} />
                <Text style={[styles.appTextBold14, { fontFamily: focused ? 'Raleway-Black' : 'Raleway-Regular', color: focused ? white : black }]}>Home</Text>
            </View>)
        }} />


        <Tab.Screen name="Pagination" component={PaginationDemo} options={{
            tabBarIcon:
            ({ focused }) =>(  
            <View style={{ width: 60, height: 60, borderRadius: 60 / 2,
             backgroundColor: 'orange',bottom: 40, justifyContent: 'center', alignItems: 'center'  }}>
            <Image source={image_add} resizeMode="contain"
                style={[styles.bottomTabIcon, { tintColor: focused ? white : black }]} />
            </View>
            

            )
            
        
        }} />

        <Tab.Screen name="Settings" component={SecondScreen} options={{
            tabBarIcon: ({ focused }) => (<View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={image_wishlist} resizeMode="contain" style={[styles.bottomTabIcon, { tintColor: focused ? white : black }]} />
                <Text style={[styles.appTextBold14, { fontFamily: focused ? 'Raleway-Black' : 'Raleway-Regular', color: focused ? white : black }]}>Settings</Text>
            </View>)
        }} />

    </Tab.Navigator>)

}
export default BottomNavigaiton;
const styles = StyleSheet.create({

    bottomTabIcon: {
        width: 30,
        height: 30,
        tintColor: white

    },
    appTextBold14: {
        fontSize: 14,
        color: white,
        textShadowRadius: 10,
        borderWidth: 2,
        textShadowOffset: { width: 5, height: 5 },
        borderColor: white


    },
})