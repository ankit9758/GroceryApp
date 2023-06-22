import {
    TouchableOpacity, Text, View, StyleSheet, FlatList, ActivityIndicator, Button, SafeAreaView, StatusBar, TextInput
} from "react-native"
import React, { useState, useRef } from "react";
import { black, green, red, white } from "../../utils/color"
import Header from "../common/Header"
import { image_back } from "../../utils/images"

import AppTextInput from "../common/AppTextInput";
import AppButton from "../common/AppButton";

import { useNavigation } from '@react-navigation/native'


const OtpVerification = () => {
    const navigation = useNavigation()
    const firstNumberRef = React.useRef()
    const secondNumberRef = React.useRef()
    const thirdNumberRef = React.useRef()
    const forthNumberRef = React.useRef()



    return (<SafeAreaView style={{ flex: 1, backgroundColor: white, flexDirection: 'column' }}>
        <StatusBar translucent={false} backgroundColor={red} />

        <Header
            leftIcon={image_back}
            title={'Otp Veriifcation'}
            onClickLeftIcon={
                () => navigation.goBack()
            } isCartScreen={false} />
        <View style={{
            flex: 1, flexDirection: 'column',
            //   justifyContent: 'center',
            marginVertical: 100,
            paddingHorizontal: 45
        }}>
            <Text style={{

                fontSize: 16,
                color: black,
                textAlign: 'center',
                fontFamily: 'Raleway-Regular',
            }}>
                Please check your email to see the verification code.
            </Text>

            <Text style={{
                marginTop: 40,
                fontSize: 30,
                color: black,
                textAlign: 'left',
                fontFamily: 'Raleway-Black',
            }}>
                OTP Code
            </Text>
            <View style={{ flexDirection: 'row', marginVertical: 20, justifyContent: 'space-between' }}>
                <TextInput ref={firstNumberRef}
                    maxLength={1}
                    keyboardType="number-pad"
                    style={styles.inputView} />
                <TextInput ref={secondNumberRef}
                    maxLength={1}
                    keyboardType="number-pad"
                    style={styles.inputView} />
                <TextInput ref={thirdNumberRef}
                    maxLength={1}
                    keyboardType="number-pad"
                    style={styles.inputView} />
                <TextInput ref={forthNumberRef}
                    maxLength={1}
                    keyboardType="number-pad"
                    style={styles.inputView} />
            </View>
            <TouchableOpacity onPress={() => {

            }}>
                <View style={styles.appButtonContainer} >
                    <Text style={[styles.appButtonText]}>Verify</Text>
                </View>
            </TouchableOpacity>
            <View style={{ width: '100%', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{
                    fontSize: 16,
                    color: red,
                    textAlign: 'center',
                    fontFamily: 'Raleway-Regular',
                }}>
                    Resend code
                </Text>
                <Text style={{
                    fontSize: 16,
                    color: black,
                    textAlign: 'center',
                    fontFamily: 'Raleway-Regular',
                }}>
                    00:30
                </Text>
            </View>


        </View>

    </SafeAreaView>
    )
}
export default OtpVerification



const styles = StyleSheet.create({
    inputView: {
        fontSize: 20,
        color: black,
        borderColor: red,
        borderRadius: 10,
        borderWidth: 1,
        height: 60,
        width: 60,
        textAlign: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignContent: 'center',
        fontFamily: 'Raleway-Bold',

    },

    appButtonContainer: {
        backgroundColor: red,
        elevation: 8,
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 12,
        marginTop: 20,
        elevation: 5
    },
    appButtonText: {
        fontSize: 18,
        color: white,
        alignSelf: "center",
        textTransform: "none",
        fontFamily: 'Raleway-ExtraBold'
    },

})