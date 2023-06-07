import React, { useState, useRef, useEffect } from "react";
import {
    TouchableOpacity, Text, View,
    ScrollView, SafeAreaView, StatusBar, Image, StyleSheet, Keyboard
} from "react-native"
import stylesApp from '../../utils/styles';
import { red, white, black } from "../../utils/color";
import AppTextInput from "../common/AppTextInput";
import AppButton from "../common/AppButton";
import { useNavigation } from '@react-navigation/native'
import OverlayActivityIndicator from "../common/Loader";
import { ForgotPasswordModal } from "../common/Dialogs";
import { isValidEmail, validateEmpty, validatePassword } from '../common/Validaton'
import Toast from "../../utils/Toast";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA } from "../../utils/AppConstant";


const Login = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);

    const emailRef = React.useRef()
    const passwordRef = React.useRef()

    const [visible, setVisible] = useState(false)

    const [fogotPasswordEmail, setFogotPasswordEmail] = useState('')
    const [fogotPasswordEmailError, setFogotPasswordEmailError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const toastRef = React.useRef(null)


    useEffect(() => {
        //getJSONFromAsyncStorage(USER_DATA)
    })

    const displayLoader = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('Main')
        }, 5000);
    }

    const clearErrors = () => {
        setEmail('')
        setPassword('')
        setEmailError('')
        setPasswordError('')
    }
    const checkLoginData = () => {
        setLoading(true);
        firestore().collection('Users').where
            ('email', '==', email).get().then((querySnapshot) => {
                console.log(querySnapshot.docs)
                setLoading(false);
                if (querySnapshot.docs.length > 0) {
                    if (querySnapshot.docs[0]._data.email == email &&
                        querySnapshot.docs[0]._data.password == password) {
                        showSucessToast('User login sucessfully')
                       console.log('dataa---',JSON.stringify(querySnapshot.docs[0]._data))
                       saveJSONToAsyncStorage(USER_DATA,querySnapshot.docs[0]._data)
                    } else {
                        showErrorToast('Email or password is incorrect.')
                    }
                } else {
                    showErrorToast('Account not found.')
                }
            }).catch((error) => {
                setLoading(false);
                console.log(error)
                showErrorToast(error)
              
            })
    }

    const saveJSONToAsyncStorage = async (key, data) => {
        try {
          const jsonData = JSON.stringify(data);
          await AsyncStorage.setItem(key, jsonData);
          console.log('JSON value saved successfully.');
        //   setTimeout(() => {
           navigation.navigate('Main')
        // }, 3000);
         
        } catch (error) {
          console.log('Error saving JSON value:', error);
        }
      };


    const getJSONFromAsyncStorage = async (key) => {
        try {
            const jsonData = await AsyncStorage.getItem(key);
            if (jsonData !== null) {
                const data = JSON.parse(jsonData);
                console.log('Retrieved JSON value Login:', data);
                navigation.navigate('Main')
                return data;
            }
        } catch (error) {
            console.log('Error retrieving JSON value:', error);
        }
    };
    const showErrorToast = (msg) => {
        toastRef.current.show({
            type: 'error',
            text: msg,
            duration: 2000
        });
    }
    const showSucessToast = (msg) => {
        toastRef.current.show({
            type: 'success',
            text: msg,
            duration: 2000
        });
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView >
                <Toast ref={toastRef} />

                <StatusBar backgroundColor='#1AFf0000' translucent={true} showHideTransition={true} />
                {loading && <OverlayActivityIndicator />}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <Image source={require('../images/app_image.png')} resizeMode="center" style={stylesLogin.image} />
                        <Text style={stylesLogin.heading}>
                            Login
                        </Text>
                        <View style={{ marginTop: 20 }} />
                        <AppTextInput placeholder={'Enter Email Id'} type={'email-address'}
                            icon={require('../images/mail.png')} isLast={false} value={email}
                            onChangeText={(text) => { setEmail(text) }}
                            reference={emailRef}
                            onSubmit={() => passwordRef.current.focus()} />
                        {<Text style={[stylesLogin.errorText12]}>{emailError}</Text>}
                        <AppTextInput placeholder={'Enter Password'}
                            icon={require('../images/password.png')}
                            isLast={true} type={'password'}
                            reference={passwordRef}
                            onSubmit={() => Keyboard.dismiss()}
                            value={password} onChangeText={(text) => { setPassword(text) }}
                        />
                        {<Text style={[stylesLogin.errorText12]}>{passwordError}</Text>}
                        <TouchableOpacity onPress={() => {
                            setFogotPasswordEmail('')
                            setFogotPasswordEmailError('')
                            setVisible(true)
                        }}>
                            <Text style={stylesLogin.forgotText}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>

                        <View style={{ marginVertical: 20 }} />


                        <AppButton title={'Login'} onPress={() => {

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
                                checkLoginData()
                                //displayLoader()
                            }



                        }} />

                        <View style={{
                            marginTop: 10, marginBottom: 20, flexDirection: 'row',
                            alignItems: 'center', alignContent: 'center', justifyContent: 'center'
                        }}>
                            <Text style={stylesLogin.alreadyText}>
                                Don't have Account ?
                            </Text>
                            <TouchableOpacity onPress={() => {
                                // toastRef.current.show({
                                //     type: 'warning',
                                //     text: 'Please enter Email',
                                //     duration: 2000
                                // });
                                clearErrors()
                                navigation.navigate('Signup')
                            }}>
                                <Text style={stylesLogin.signupText}>
                                    Signup
                                </Text>
                            </TouchableOpacity>


                        </View>
                    </View>


                </ScrollView>
                <ForgotPasswordModal modelVisible={visible} title={'Forgot Password?'}
                    yesText={'Submit'} onNoClick={() => {
                        setVisible(false)
                    }}
                    email={fogotPasswordEmail}
                    setEmail={setFogotPasswordEmail}
                    emailError={fogotPasswordEmailError}
                    setFogotPasswordEmailError={setFogotPasswordEmailError}
                    onYesClick={(emailId) => {
                        console.log('Email---' + emailId)
                        setVisible(false)
                        toastRef.current.show({
                            type: 'warning',
                            text: 'Please enter Email',
                            duration: 2000
                        });
                    }}
                />
            </SafeAreaView>
        </GestureHandlerRootView>

    );
}
export default Login;

const stylesLogin = StyleSheet.create({
    heading: {
        fontSize: 50,
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

})
