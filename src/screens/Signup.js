import React, { useState, useRef } from "react";
import {
    TouchableOpacity, Text, View,
    ScrollView, SafeAreaView, StatusBar, Image, StyleSheet, Alert, Keyboard, Platform, PermissionsAndroid,
} from "react-native"
import { red, white, black, green } from "../../utils/color";
import AppTextInput from "../common/AppTextInput";
import AppButton from "../common/AppButton";
import { useNavigation } from '@react-navigation/native'
import OverlayActivityIndicator from "../common/Loader";
import { isValidEmail, validateEmpty, validatePassword, validateName, validateNumber } from '../common/Validaton'
import Toast from "../../utils/Toast";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-crop-picker';
import { request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA } from "../../utils/AppConstant";
import storage from '@react-native-firebase/storage';



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
    const [imageUri, setImageUri] = useState('')

    const close = () => setVisible(false);
    const open = () => setVisible(true)

    const toastRef = React.useRef(null)

    const checkEmailAndSaveUserData = () => {
        setLoading(true);
        firestore().collection('Users').where
            ('email', '==', email).get().then((querySnapshot) => {
                console.log(querySnapshot.docs)
                if (querySnapshot.docs.length > 0) {
                    setLoading(false);
                    showErrorToast('Email is already exist.')
                } else {
                    saveUserData()
                }
            }).catch((error) => {
                setLoading(false);
                console.log(error)
                showErrorToast(error)
            })
    }

    const saveUserData = () => {
        firestore().collection('Users').add({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phone,
            email: email,
            password: password,
            imaegPath:imageUri
        }).then((data) => {
            setLoading(false);
            showSucessToast('User Added Sucessfully.')
            console.log(data);
            saveJSONToAsyncStorage(USER_DATA,
                {
                'firstName': `${firstName}`,
                'lastName': `${lastName}`,
                'phoneNumber': `${phone}`,
                'email': `${email}`,
                'imagePath': `${imageUri}`,
                'password': `${password}`,
              })
           
        
        }).catch((error) => {
            setLoading(false);
            showErrorToast(error)
            console.log(error)

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
            setShowCameraGallery(false)
            console.log(image)
            setImageUri(image.path);
        });
    };
    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            cropperCircleOverlay: true
        }).then(image => {
                setShowCameraGallery(false)
                // setImageUri(image.path);
                console.log(image)
                uploadImage(image.path)
            })
            .finally(close);
    };

    const uploadImage = async (imagePath) => {
        setLoading(true)
        const fileName=imagePath.substring(imagePath.lastIndexOf('/') + 1)
        const reference = storage().ref(fileName)
        const pathToFile = imagePath
        //upload file 
        await reference.putFile(pathToFile).then(()=>{
            getImagePath(fileName)
        }).catch((error)=>{
            setLoading(false)
            showErrorToast(error)
        });
    };
    const getImagePath = async (fileName) => {
        const url = await storage().ref(fileName).getDownloadURL().then((data)=>{
            setLoading(false)
            setImageUri(data)
            // console.log(data)
        }).catch((error)=>{
            setLoading(false)
            showErrorToast(error)
        });
    };


    const checkCameraPermission = async () => {
        try {
            if (Platform.OS === 'android') {
                // const granted = await PermissionsAndroid.request(
                //     PermissionsAndroid.PERMISSIONS.CAMERA,
                //     {
                //         title: 'Camera Permission',
                //         message: 'Grocery App needs access to your camera to take photos ',
                //         buttonPositive: 'OK',
                //         buttonNeutral: 'Cancel',

                //     }
                // );

                const permission = PermissionsAndroid.PERMISSIONS.CAMERA;
                const granted = await PermissionsAndroid.request(permission);
                console.log(granted)
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    openCamera()
                } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                    handlePermissionDenied();
                } else {
                    toastRef.current.show({
                        type: 'warning',
                        text: 'Camera permission denied',
                        duration: 2000
                    });

                    console.log('Camera permission denied');
                }
            } else if (Platform.OS === 'ios') {
                const result = await request(PERMISSIONS.IOS.CAMERA);
                if (result === RESULTS.GRANTED) {
                    openCamera()
                    console.log('Camera permission granted');
                } else if (granted === RESULTS.DENIED) {
                    handlePermissionDenied();
                }
                else {
                    toastRef.current.show({
                        type: 'warning',
                        text: 'Camera permission denied',
                        duration: 2000
                    });
                    console.log('Camera permission denied');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handlePermissionDenied = () => {
        Alert.alert(
            'Permission Required',
            'To use the camera, you need to grant camera access. Please go to app settings and enable the camera permission.',
            [
                { text: 'Cancel', style: 'cancel', onPress: openCancel },
                { text: 'Open Settings', onPress: openAppSettings },
            ]
        );
    };
    const openCancel = () => {
        toastRef.current.show({
            type: 'warning',
            text: 'Camera permission denied',
            duration: 2000
        });
    };
    const openAppSettings = () => {
        if (Platform.OS === 'android') {
            // Open app settings for Android
            openSettings()
        } else if (Platform.OS === 'ios') {
            // Open app settings for iOS
            Linking.openURL('app-settings:');
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

                                source={imageUri === '' ? require('../images/no_data.png') : { uri: imageUri }}
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

                        <AppTextInput placeholder={'Enter Phone Number'} type={'numeric'}
                            icon={require('../images/phone.png')} isLast={false} value={phone}
                            onChangeText={(text) => { setPhoneNumber(text.replace(/[^0-9]/g, '')) }}
                            reference={phoneNumberRef}
                            isPhone={true}
                            maxLength={10}
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
                            if (validateEmpty(firstName)) {
                                setFirstNameError('Please enter first name')
                            } else if (!validateName(firstName)) {
                                setFirstNameError('Please enter valid first name')
                            } else if (validateEmpty(lastName)) {
                                setFirstNameError('')
                                setLastNameError('Please enter last name')
                            } else if (!validateName(lastName)) {
                                setFirstNameError('')
                                setLastNameError('Please enter valid last name')
                            } else if (validateEmpty(email)) {
                                setFirstNameError('')
                                setLastNameError('')
                                setEmailError('Please enter Email')
                            } else if (!isValidEmail(email)) {
                                setFirstNameError('')
                                setLastNameError('')
                                setEmailError('Please enter valid email')
                            }
                            else if (validateEmpty(phone)) {
                                setFirstNameError('')
                                setLastNameError('')
                                setEmailError('')
                                setPhoneError('Please enter phone number')
                            } else if (!validateNumber(phone)) {
                                setFirstNameError('')
                                setLastNameError('')
                                setEmailError('')
                                setPhoneError('Please enter valid phone number')
                            } else if (validateEmpty(password)) {
                                setFirstNameError('')
                                setLastNameError('')
                                setEmailError('')
                                setPhoneError('')
                                setPasswordError('Please enter password')
                            } else if (!validatePassword(password)) {
                                setFirstNameError('')
                                setLastNameError('')
                                setEmailError('')
                                setPhoneError('')
                                setPasswordError('Please enter valid password')
                            } else if (validateEmpty(confirmPassword)) {
                                setFirstNameError('')
                                setLastNameError('')
                                setEmailError('')
                                setPhoneError('')
                                setPasswordError('')
                                setConfirmPasswordError('Please enter confirm password')
                            } else if (password !== confirmPassword) {
                                setFirstNameError('')
                                setLastNameError('')
                                setEmailError('')
                                setPhoneError('')
                                setPasswordError('')
                                setConfirmPasswordError('confirm password and password must be same.')
                            }
                            else {
                                setFirstNameError('')
                                setLastNameError('')
                                setEmailError('')
                                setPhoneError('')
                                setPasswordError('')
                                setConfirmPasswordError('')
                                checkEmailAndSaveUserData()
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
                                <Text style={styleSignUp.signupText}>Login </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </ScrollView>
                <Modal style={{
                    width: '100%', marginLeft: 0,
                    marginTop: 0,
                    marginBottom: 0, marginEnd: 0
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
                        <TouchableOpacity style={styleSignUp.bottombuton} onPress={() => {
                            checkCameraPermission()
                            setShowCameraGallery(false)
                        }
                        }>
                            <Text style={styleSignUp.bottomButtonText}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleSignUp.bottombuton} onPress={() => {
                            pickPicture()
                            setShowCameraGallery(false)
                        }}>
                            <Text style={styleSignUp.bottomButtonText}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styleSignUp.bottombuton} onPress={() => { setShowCameraGallery(false) }}>
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
