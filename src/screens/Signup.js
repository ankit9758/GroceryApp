import React, { useState, useRef } from "react";
import {
    TouchableOpacity, Text, View,
    ScrollView, SafeAreaView, StatusBar, Image, StyleSheet, Keyboard
} from "react-native"
import { red, white, black } from "../../utils/color";
import AppTextInput from "../common/AppTextInput";
import AppButton from "../common/AppButton";
import { useNavigation } from '@react-navigation/native'
import OverlayActivityIndicator from "../common/Loader";
import { isValidEmail, validateEmpty, validatePassword } from '../common/Validaton'
import Toast from "../../utils/Toast";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Signup = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')

    const [loading, setLoading] = useState(false);

    const firstNameRef = React.useRef()
    const lastNameRef = React.useRef()
    const phoneNumberRef = React.useRef()
    const emailRef = React.useRef()
    const passwordRef = React.useRef()
    const confirmPasswordRef = React.useRef()

    const [visible, setVisible] = useState(false)

    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const toastRef = React.useRef(null)


    const displayLoader = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('Main')
        }, 5000);
    }

    const clearErrors = () => {
        setFirstNameError('')
        setLastNameError('')
        setPhoneError('')
        setEmailError('')
        setPasswordError('')
        setConfirmPasswordError('')
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView >
                <Toast ref={toastRef} />

                <StatusBar backgroundColor='#1AFf0000' translucent={true} showHideTransition={true} />
                {loading && <OverlayActivityIndicator />}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: 20 }}>
                    <View style={styleSignUp.profileContainer}>
                    <Image
                        source={require('../images/no_data.png')}
                        style={{ width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center', backgroundColor: 'yellow', marginTop: 30, borderColor: 'red', }}
                    />
                    <View style={styleSignUp.profilePhotoContainer}>
                        <TouchableOpacity
                            onPress={() => console.log('Hello')
                            }>
                            <View style={styleSignUp.uploadBackStyle}>
                                <Image
                                    source={require('../images/add.png')}
                                    style={styleSignUp.uploadIconStyle}
                                />
                            </View>

                        </TouchableOpacity>
                    </View>

                </View>
                        <View style={{ marginTop: 20 }} />

                        <AppTextInput placeholder={'Enter First Name'} type={'default'}
                            icon={require('../images/name.png')} isLast={false} value={firstName}
                            onChangeText={(text) => { setFirstName(text) }}
                            reference={firstNameRef}
                            onSubmit={() => lastNameRef.current.focus()} />
                        {<Text style={[styleSignUp.errorText12]}>{firstNameError}</Text>}

                        <AppTextInput placeholder={'Enter Last Name'} type={'default'}
                            icon={require('../images/name.png')} isLast={false} value={lastName}
                            onChangeText={(text) => { setLastName(text) }}
                            reference={lastNameRef}
                            onSubmit={() => emailRef.current.focus()} />
                        {<Text style={[styleSignUp.errorText12]}>{lastNameError}</Text>}



                        <AppTextInput placeholder={'Enter Email Id'} type={'email-address'}
                            icon={require('../images/mail.png')} isLast={false} value={email}
                            onChangeText={(text) => { setEmail(text) }}
                            reference={emailRef}
                            onSubmit={() => phoneNumberRef.current.focus()} />
                        {<Text style={[styleSignUp.errorText12]}>{emailError}</Text>}

                        <AppTextInput placeholder={'Enter Phone Number'} type={'numbers-and-punctuation'}
                            icon={require('../images/phone.png')} isLast={false} value={phone}
                            onChangeText={(text) => { setPhoneNumber(text) }}
                            reference={phoneNumberRef}
                            onSubmit={() => passwordRef.current.focus()} />
                        {<Text style={[styleSignUp.errorText12]}>{phoneError}</Text>}

                        <AppTextInput placeholder={'Enter Password'}
                            icon={require('../images/password.png')}
                            isLast={false} type={'password'}
                            reference={passwordRef}
            
                            onSubmit={() => confirmPasswordRef.current.focus()}
                            value={password} onChangeText={(text) => { setPassword(text) }}
                        />
                        {<Text style={[styleSignUp.errorText12]}>{passwordError}</Text>}

                        <AppTextInput placeholder={'Enter Confirm Password'}
                            icon={require('../images/password.png')}
                            isLast={true} type={'password'}
                            reference={confirmPasswordRef}
                            onSubmit={() => Keyboard.dismiss()}
                            value={confirmPassword} onChangeText={(text) => { setConfirmPassword(text) }}
                        />
                        {<Text style={[styleSignUp.errorText12]}>{confirmPasswordError}</Text>}
                        

                        <View style={{ marginVertical: 20 }} />


                        <AppButton title={'Create Account'} onPress={() => {
                            if (validateEmpty(email)) {

                                setEmailError('Please enter Email')
                            } else if (!isValidEmail(email)) {
                                setEmailError('Please enter valid email')
                            } else if (validateEmpty(password)) {
                                setEmailError('')
                                setPasswordError('Please enter password')
                            } else if (!validatePassword(password)) {
                                setEmailError('')
                                setPasswordError('Please enter valid password')
                            }
                            else {
                                setEmailError('')
                                setPasswordError('')
                                displayLoader()
                            }



                        }} />

                        <View style={{
                            marginTop: 10, marginBottom: 20, flexDirection: 'row',
                            alignItems: 'center', alignContent: 'center', justifyContent: 'center'
                        }}>
                            <Text style={styleSignUp.alreadyText}>
                                Already have an account ?
                            </Text>
                            <TouchableOpacity onPress={() => {
                               clearErrors()
                               navigation.goBack()
                            }}>
                                <Text style={styleSignUp.signupText}>
                                    Login
                                </Text>
                            </TouchableOpacity>


                        </View>
                    </View>


                </ScrollView>
               
            </SafeAreaView>
        </GestureHandlerRootView>

    );
}
export default Signup;

const styleSignUp = StyleSheet.create({
    heading: {
        fontSize: 30,
        color: red,
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Raleway-Black',
    },
    image: {
        alignSelf: 'center',
        width: 100, height: 100,
        borderRadius: 100 / 2, marginTop: 80,
        backgroundColor: 'yellow',
    },
    forgotText: {
        fontSize: 20,
        color: red,
        textAlign: 'right',
        marginTop: 20,
    },
    alreadyText: {
        fontSize: 20,
        color: black,
        fontFamily: 'Raleway-Regular',
    },
    signupText: {
        fontSize: 20,
        color: red,
        paddingHorizontal: 10,
        fontFamily: 'Raleway-Black',
        textDecorationLine: 'underline'
    },
    errorText12: {
        fontSize: 13,
        color: red,
        fontFamily: 'Raleway-Regular',
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginTop: 5,
        marginStart: 5
    },
    profileContainer: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        marginVertical:40
        

    },
    profilePhotoContainer: {
        position: 'absolute',
        justifyContent: 'flex-end',
        right: -5,
        top: 110
    },
    uploadIconStyle: {
        width: 15,
        height: 15,
        tintColor: white
    },
    uploadBackStyle: {
        width: 30,
        height: 30,
        backgroundColor:red,
        borderRadius:15,
        alignContent:'center',
        position:'relative',
        justifyContent:'center',
        alignItems:'center'
    }

})
