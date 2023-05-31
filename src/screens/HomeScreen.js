import { View, Text, StyleSheet, TouchableOpacity, Image,SafeAreaView,StatusBar } from 'react-native';
import React, { useState } from 'react';
import Header from '../common/Header';
import { black, white } from '../../utils/color';
import { red } from '../../utils/color';
import Home from './tabs/Home';
import Search from './tabs/Search';
import Add from './tabs/Add';
import WishList from './tabs/Wishlist';
import Profile from './tabs/profile';
import {useNavigation} from '@react-navigation/native'

const HomeScreen = () => {
    const navigation=useNavigation();
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={red} />
            <Header
                leftIcon={require('../images/menu.png')}
                rightIcon={require('../images/cart.png')}
                title={'Grocery App'}
                onClickLeftIcon={
                    ()=>navigation.openDrawer()
                } />

            {selectedTab == 0 ? (<Home />) : selectedTab == 1 ? (<Search />) : selectedTab == 2 ? (<Add />) : selectedTab == 3 ? (<WishList />) : (<Profile />)}
            <View style={styles.bottomView}>
                <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(0)}>
                    <Image source={selectedTab == 0?require('../images/home_filled.png'):require('../images/home.png')} style={styles.bottomTabIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(1)}>
                    <Image source={require('../images/magnifying_glass.png')} style={styles.bottomTabIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(2)}>
                    <Image source={require('../images/plus.png')} style={styles.bottomTabIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(3)}>
                    <Image source={selectedTab == 3?require('../images/heart_filled.png'):require('../images/heart.png')} style={styles.bottomTabIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(4)}>
                    <Image source={selectedTab == 4?require('../images/user_filled.png'):require('../images/user.png')} style={styles.bottomTabIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black

    },
    bottomView: {
        position: 'absolute',
        backgroundColor: red,
        flex: 1,
        bottom: 0,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'

    },
    bottomTab: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',


    },
    bottomTabIcon: {
        width: 30,
        height: 30,
        tintColor: white

    }
})