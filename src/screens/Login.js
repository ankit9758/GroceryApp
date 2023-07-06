import React, { useState, useRef, useEffect, useContext } from "react";
import {
    TouchableOpacity, Text, View,
    ScrollView, SafeAreaView, StatusBar, Image, StyleSheet, Keyboard
} from "react-native"
import stylesApp from '../../utils/styles';
import { red, white, black, darkRed, blue } from "../../utils/color";
import AppTextInput from "../common/AppTextInput";
import AppButton from "../common/AppButton";
import { useNavigation } from '@react-navigation/native'
import OverlayActivityIndicator from "../common/Loader";
import { ForgotPasswordModal } from "../common/Dialogs";
import { isValidEmail, returnFilterValue, validateEmpty, validatePassword } from '../common/Validaton'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ERROR, SUCESS, USER_DATA } from "../../utils/AppConstant";
import SocialButton from "../common/SocialButton";
import { image_facebook, image_google } from "../../utils/images";
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import Toast from "react-native-toast-message";
import customToaast, { toastConfig } from "../../utils/ToastConfig";
import { colors } from "../../utils/theme";
import { ThemeContext } from "../../utils/ThemeContext";

const Login = () => {

    
const { theme } = useContext(ThemeContext)
let activeColors = colors[theme.mode]

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

    const [socialData, setSocialData] = useState({})


    useEffect(() => {
        console.log('colorThem', theme.mode)

        GoogleSignin.configure({
            webClientId: ''
        });
    }, [])

    useEffect(() => {

        if (socialData.socialEmail) {
            console.log('socialemail', socialData)
            checkLoginData(true, socialData.socialEmail)
        }
    }, [socialData])


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
    const checkLoginData = (isSocialLogin, emailId) => {
        console.log('socialemail', socialData)
        setLoading(true);
        firestore().collection('Users').where
            ('email', '==', emailId).get().then((querySnapshot) => {
                console.log(querySnapshot.docs)
                setLoading(false);
                if (querySnapshot.docs.length > 0) {
                    if (isSocialLogin) {
                        console.log('socialId', socialData)
                        if (socialData.socialId !== '' && querySnapshot.docs[0]._data.email == emailId &&
                            querySnapshot.docs[0]._data.socialId == socialData.socialId) {
                            signOut() //signout sucessfully
                            customToaast(SUCESS, 'Login Sucessfully.')
                            console.log('dataa---Social', JSON.stringify(querySnapshot.docs[0]._data))
                            saveJSONToAsyncStorage(USER_DATA, querySnapshot.docs[0]._data)
                        } else {
                            customToaast(ERROR, 'Social login email  is incorrect.')
                        }
                    } else {
                        if (querySnapshot.docs[0]._data.email == emailId &&
                            querySnapshot.docs[0]._data.password == password) {
                            console.log('dataa---', JSON.stringify(querySnapshot.docs[0]._data))
                            customToaast(SUCESS, 'Login Sucessfully.')
                            saveJSONToAsyncStorage(USER_DATA, querySnapshot.docs[0]._data)
                        } else {
                            customToaast(ERROR, 'Email or password is incorrect.')
                            //  showErrorToast('Email or password is incorrect.')
                        }
                    }

                } else {
                    customToaast(ERROR, 'Account not found.')
                    // showErrorToast('Account not found.')
                }
            }).catch((error) => {
                setLoading(false);
                console.log(error)
                customToaast(ERROR, error)
                //showErrorToast(error)

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

    // Somewhere in your code
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('google data ', userInfo)
            setSocialData({ 'socialId': returnFilterValue(userInfo.user.id), 'socialEmail': returnFilterValue(userInfo.user.email) })


        } catch (error) {
            console.log('google data error', error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };
    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };


    return (
        // <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: activeColors.sky }}  >


            {/* <StatusBar backgroundColor='#1AFf0000' translucent={true} showHideTransition={true} /> */}
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
                            checkLoginData(false, email)
                            //displayLoader()
                        }



                    }} />
                    <Text style={{
                        textAlign: 'center', marginVertical: 10,
                        fontSize: 14, color: '#383838', fontFamily: 'Raleway-Regular'
                    }}>----or Login with---- </Text>

                    <SocialButton onPress={() => signIn()} textColor={darkRed}
                        title={'LOGIN WITH GOOGLE'} icon={image_google} />
                    <SocialButton onPress={() => { }} textColor={blue}
                        title={'LOGIN WITH FACEBOOK'} icon={image_facebook} />

                    <View style={{
                        marginTop: 10, marginBottom: 20, flexDirection: 'row',
                        alignItems: 'center', alignContent: 'center', justifyContent: 'center'
                    }}>
                        <Text style={stylesLogin.alreadyText}>
                            Don't have Account ?
                        </Text>
                        <TouchableOpacity onPress={() => {
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
            <Toast config={toastConfig} />
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
                    customToaast(ERROR, 'Please enter Email')

                }}
            />
        </SafeAreaView>
        // </GestureHandlerRootView>

    );
}


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
export default Login;