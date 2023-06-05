import React, { useState, useRef } from "react";
import {
    TouchableOpacity, Text, View,
    ScrollView, SafeAreaView, StatusBar, Image, StyleSheet, Keyboard, Platform, PermissionsAndroid,
} from "react-native"
import { red, white, black, green } from "../../utils/color";
import AppTextInput from "../common/AppTextInput";
import AppButton from "../common/AppButton";
import { useNavigation } from '@react-navigation/native'
import OverlayActivityIndicator from "../common/Loader";
import { isValidEmail, validateEmpty, validatePassword } from '../common/Validaton'
import Toast from "../../utils/Toast";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-crop-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';



const Signup = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')

    const [loading, setLoading] = useState(false);
    const [showCameraGallery, setShowCameraGallery] = useState(false);


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

    const close = () => setVisible(false);
    const open = () => setVisible(true)

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

    const pickPicture = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image.path)
            //   setUri(image.path);
            //   props.onChange?.(image);
        });
    };
    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then(image => {
                // setUri(image.path);
                // props.onChange?.(image);
                console.log(image.path)
            })
            .finally(close);
    };

    const requestCameraPermissin = async() => {


        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };




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
                                onPress={() => setShowCameraGallery(true)
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
            <Modal style={{
                width: '100%', marginLeft: 0,
                marginTop: 0,
                marginBottom: 0, marginEnd: 0,
            }}
                hasBackdrop={true}
                onBackdropPress={() => setShowCameraGallery(false)}
                animationInTiming={1000} animationOutTiming={1000}
                isVisible={showCameraGallery}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                onBackButtonPress={() => setShowCameraGallery(false)
                }
                onSwipeComplete={() => setShowCameraGallery(false)}
                swipeDirection={'down'}

            >
                <View style={{
                    position: 'absolute', bottom: 0,
                    backgroundColor: white,
                    alignItems: 'center',
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 20, left: 0, right: 0
                }}>
                    <Text style={styleSignUp.bottomTitleText}>Upload Photos</Text>
                    <Text style={styleSignUp.bottomDescText}>Choose Your Profile Picture </Text>
                    <TouchableOpacity style={styleSignUp.bottombuton} onPress={requestCameraPermissin}>
                        <Text style={styleSignUp.bottomButtonText}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleSignUp.bottombuton} onPress={() => {
                        pickPicture()
                    }}>
                        <Text style={styleSignUp.bottomButtonText}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleSignUp.bottombuton} onPress={() => {
                        setShowCameraGallery(false)
                    }}>
                        <Text style={styleSignUp.bottomButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>


            </Modal>
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
        marginVertical: 40


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
        backgroundColor: red,
        borderRadius: 15,
        alignContent: 'center',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },

    bottomTitleText: {
        fontSize: 24,
        color: black,
        fontFamily: 'Raleway-Bold',

    },

    bottomDescText: {
        fontSize: 16,
        color: black,
        fontFamily: 'Raleway-Regular',
        marginBottom: 20,
    },

    bottomButtonText: {
        fontSize: 20,
        color: white,
        fontFamily: 'Raleway-Bold'
    },
    bottombuton: {
        width: '100%', marginTop: 10,
        backgroundColor: red,
        paddingVertical: 12,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})
