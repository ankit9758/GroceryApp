import {
    TouchableOpacity, Text, View, StyleSheet, FlatList, ActivityIndicator, Button, SafeAreaView, StatusBar, TextInput, Keyboard
} from "react-native"
import React, { useState, useRef, useEffect } from "react";
import { black, green, grey, red, white } from "../../utils/color"
import Header from "../common/Header"
import { image_back } from "../../utils/images"

import AppTextInput from "../common/AppTextInput";
import AppButton from "../common/AppButton";

import { useNavigation } from '@react-navigation/native'


const OtpVerification = () => {
    const navigation = useNavigation()
    const firstNumberRef = useRef()
    const secondNumberRef = useRef()
    const thirdNumberRef = useRef()
    const forthNumberRef = useRef()

    const [firstNumber, setFirstNumber] = useState('')
    const [secondNumber, setSecondNumber] = useState('')
    const [thirdNumber, setThirdNumber] = useState('')
    const [fouthNumber, setFouthNumber] = useState('')

    const [timerCount, setTimerCount] = useState(30)

    const [isInputFocusedPosition, setIsInputFocusedPostion] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timerCount == 0) {
                clearInterval(interval)
            } else {
                setTimerCount(timerCount - 1)
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [timerCount]);


    const handleKeyPress = ({ nativeEvent: { key: keyValue } }) => {
        if (!isNaN(keyValue)) {
            console.log(keyValue);
            //console.log('current Focus ',firstNumber.length);

            if (isInputFocusedPosition == 1 && firstNumber.length == 1) {
                secondNumberRef.current.focus()
                setSecondNumber(keyValue)
            } else if (isInputFocusedPosition == 2 && secondNumber.length == 1) {
                thirdNumberRef.current.focus()
                setThirdNumber(keyValue)
            } else if (isInputFocusedPosition == 3 && thirdNumber.length == 1) {
                forthNumberRef.current.focus()
                setFouthNumber(keyValue)
            }

        } else {
            console.log("wrong enter");
        }
    };
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
                    onFocus={() => setIsInputFocusedPostion(1)}
                    value={firstNumber}
                    onKeyPress={handleKeyPress}
                    onChangeText={(text) => {
                        const withoutSpecialCharacter = text.replace(/[^0-9]/g, '').trim()
                        setFirstNumber(withoutSpecialCharacter)
                        if (withoutSpecialCharacter.length == 1) {
                            secondNumberRef.current.focus()
                        }
                    }}
                    maxLength={1}
                    returnKeyType="next"
                    keyboardType="number-pad"
                    style={styles.inputView} />
                <TextInput ref={secondNumberRef}
                    value={secondNumber}
                    onFocus={() => setIsInputFocusedPostion(2)}
                    onKeyPress={handleKeyPress}
                    onChangeText={(text) => {
                        const withoutSpecialCharacter = text.replace(/[^0-9]/g, '').trim()
                        setSecondNumber(withoutSpecialCharacter)
                        if (withoutSpecialCharacter.length == 1) {
                            thirdNumberRef.current.focus()
                        } else {
                            firstNumberRef.current.focus()
                        }
                    }}
                    maxLength={1}

                    returnKeyType="next"
                    keyboardType="number-pad"
                    style={styles.inputView} />
                <TextInput ref={thirdNumberRef}
                    maxLength={1}
                    onFocus={() => setIsInputFocusedPostion(3)}
                    onKeyPress={handleKeyPress}
                    value={thirdNumber}
                    onChangeText={(text) => {
                        const withoutSpecialCharacter = text.replace(/[^0-9]/g, '').trim()
                        setThirdNumber(withoutSpecialCharacter)
                        if (withoutSpecialCharacter.length == 1) {
                            forthNumberRef.current.focus()
                        } else {
                            secondNumberRef.current.focus()
                        }
                    }}
                    returnKeyType="next"
                    keyboardType="number-pad"
                    style={styles.inputView} />
                <TextInput ref={forthNumberRef}
                    maxLength={1}
                    onFocus={() => setIsInputFocusedPostion(4)}
                    onKeyPress={handleKeyPress}
                    value={fouthNumber}
                    onChangeText={(text) => {
                        const withoutSpecialCharacter = text.replace(/[^0-9]/g, '').trim()
                        setFouthNumber(withoutSpecialCharacter)
                        if (withoutSpecialCharacter.length == 0) {
                            thirdNumberRef.current.focus()
                        }
                    }}
                    returnKeyType="done"
                    keyboardType="number-pad"
                    style={styles.inputView} />
            </View>
            <TouchableOpacity
                disabled={firstNumber != "" && secondNumber != "" && thirdNumber != "" && fouthNumber != "" ? false : true}
                onPress={() => { console.log('Hello') }}>
                <View style={[styles.appButtonContainer,
                { backgroundColor: firstNumber != "" && secondNumber != "" && thirdNumber != "" && fouthNumber != "" ? red : grey }]} >
                    <Text style={[styles.appButtonText]}>Verify</Text>
                </View>
            </TouchableOpacity>
            <View style={{ width: '100%', marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity disabled={timerCount == 0 ? false : true}
                    onPress={() => {
                        Keyboard.dismiss()
                        setTimerCount(30)
                    }
                    }>
                    <Text
                        style={{
                            fontSize: timerCount == 0 ? 20 : 16,
                            // color: timerCount == 0 ? red : '#5A5A5A',
                            textAlign: 'center',
                            textDecorationLine: timerCount == 0 ? 'underline' : 'none',
                            fontFamily: timerCount == 0 ? 'Raleway-Black' : 'Raleway-Regular',
                        }}  >
                        {timerCount == 0 ? 'Send Code' : 'Resend code in'}
                    </Text>
                </TouchableOpacity>


                {
                    timerCount > 0 ? (<Text style={{
                        fontSize: 16,
                        color: black,
                        textAlign: 'center',
                        fontFamily: 'Raleway-Regular',
                    }}>
                        `00:{timerCount >= 10 ? timerCount : '0' + timerCount}`
                    </Text>) : null
                }

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
        fontFamily: 'Raleway-Bold'
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