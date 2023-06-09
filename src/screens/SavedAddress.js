import React, { useState, useRef, useEffect } from "react";
import {
    TouchableOpacity, Text, View,
    ScrollView, SafeAreaView, StatusBar, Image, StyleSheet, Keyboard
} from "react-native"

import { useNavigation } from '@react-navigation/native'
import OverlayActivityIndicator from "../common/Loader";

import Header from '../common/Header';
import { black, white, red } from "../../utils/color";
import { image_city, image_pincode, image_state,image_back } from "../../utils/images";
import { useSelector } from "react-redux";



const SavedAddress = () => {
    const navigation = useNavigation()
    const addressList=useSelector(state=>state.address)
     console.log(addressList)
    return (<SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={red} />
        <Header
            leftIcon={image_back}
            title={'Saved Adresses'}
            onClickLeftIcon={
                () => navigation.goBack()
            } />
        <View style={{ flex: 1, backgroundColor: white }}>

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddAddress')}>
                <Text style={{ fontSize: 40, color: white }}>
                    +
                </Text>

            </TouchableOpacity>
        </View>
    </SafeAreaView>)
}
export default SavedAddress
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black
    },
    addButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: red,
        position: 'absolute',
        bottom: 40,
        right: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

})