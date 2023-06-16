import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import Header from '../common/Header';
import { black, green, white } from '../../utils/color';
import { red } from '../../utils/color';
import Home from './tabs/Home';
import Search from './tabs/Search';
import Add from './tabs/Add';
import WishList from './tabs/Wishlist';
import Profile from './tabs/profile';
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={red} />
      

   
            <Header
                leftIcon={require('../images/menu.png')}
                rightIcon={require('../images/cart.png')}
                title={
                selectedTab == 3?'Wishlist':'Grocery App'}
                onClickLeftIcon={
                    () => navigation.openDrawer()
                } 
                onclickRightIcon={
                    () => navigation.navigate('Cart')
                } 
                />
            <View style={{ flex: 1,marginBottom:70 }}>
                {selectedTab == 0 ? (<Home />) : selectedTab == 1 ? (<Search />) : selectedTab == 2 ? (<Add />) : selectedTab == 3 ? (<WishList />) : (<Profile />)}
            </View>



            {/* <View style={{backgroundColor:green ,alignSelf:'center', position:'absolute',width:70,height:70,borderRadius:35,zIndex:1,alignContent:'center',justifyContent:'center'}}>
         <TouchableOpacity style={[styles.bottomTab,{shadowOffset:{x:2,y:0},shadowRadius:2,borderRadius:30,position:'absolute',shadowOpacity:5.0,shadowColor:'blue',bottom:20,
         right:0,top:5,left:5,justifyContent:'center',alignItems:'center',alignContent:'center'}]} onPress={() => setSelectedTab(2)}>
                    <Image source={require('../images/plus.png')} style={styles.bottomTabIcon} />
                    {/* <Text style={[styles.appTextBold14, { fontFamily: selectedTab == 2 ? 'Raleway-Black' : 'Raleway-Regular' }]}>Add</Text> */}
            {/* </TouchableOpacity>
         </View> */}

            <View style={styles.bottomView}>
                <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(0)}>
                    <Image source={selectedTab == 0 ? require('../images/home_filled.png') : require('../images/home.png')} style={styles.bottomTabIcon} />
                    <Text style={[styles.appTextBold14, { fontFamily: selectedTab == 0 ? 'Raleway-Black' : 'Raleway-Regular' }]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(1)}>
                    <Image source={require('../images/magnifying_glass.png')} style={styles.bottomTabIcon} />
                    <Text style={[styles.appTextBold14, { fontFamily: selectedTab == 1 ? 'Raleway-Black' : 'Raleway-Regular' }]}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomTab, { position: 'relative', bottom: 20 }]} onPress={() => setSelectedTab(2)}>
                    <View style={{
                        width: 60, height: 60, borderRadius: 60 / 2, backgroundColor: white, alignItems: 'center', marginBottom: 20,
                        justifyContent: 'center', alignContent: 'center', shadowOpacity: 5.0, shadowColor: green, shadowRadius: 2, shadowOffset: { x: 2, y: 0 }
                    }}>
                        <Image source={require('../images/plus.png')} style={[styles.bottomTabIcon, { tintColor: red }]} />
                    </View>

                    {/* <Text style={[styles.appTextBold14, { fontFamily: selectedTab == 2 ? 'Raleway-Black' : 'Raleway-Regular' }]}>Add</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(3)}>
                    <Image source={selectedTab == 3 ? require('../images/heart_filled.png') : require('../images/heart.png')} style={styles.bottomTabIcon} />
                    <Text style={[styles.appTextBold14, { fontFamily: selectedTab == 3 ? 'Raleway-Black' : 'Raleway-Regular' }]}>WishList</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomTab} onPress={() => setSelectedTab(4)}>
                    <Image source={selectedTab == 4 ? require('../images/user_filled.png') : require('../images/user.png')} style={styles.bottomTabIcon} />
                    <Text style={[styles.appTextBold14, { fontFamily: selectedTab == 4 ? 'Raleway-Black' : 'Raleway-Regular' }]}>Profile</Text>
                </TouchableOpacity>
            </View>
           

        </SafeAreaView>
    );
}
export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
        flexDirection:'column'

    },
    bottomView: {
        position: 'absolute',
        backgroundColor: red,
        flex: 1,
        bottom: 0,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // x:0,y:0,shadowOffset:{height:3,width:3},borderRadius:3,shadowOpacity:0.3

    },
    bottomTab: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',



    },
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