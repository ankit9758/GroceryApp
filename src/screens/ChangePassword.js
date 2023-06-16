import {
    FlatList,
    TouchableOpacity, Text, View,
    SafeAreaView, StatusBar, Image, StyleSheet, ActivityIndicator, RefreshControl, Keyboard
} from "react-native"
import React, { useState, useRef, useEffect } from "react";
import Header from "../common/Header";
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { black, white, red, green } from "../../utils/color";
import { image_back, image_password } from "../../utils/images";
import AppTextInput from "../common/AppTextInput";
import AppButton from "../common/AppButton";

import OverlayActivityIndicator from "../common/Loader";
import { isValidEmail, validateEmpty, validatePassword, validateName, validateNumber } from '../common/Validaton'
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "../../utils/Toast";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { USER_DATA } from "../../utils/AppConstant";

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);
   
    const [currentpassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const currentPasswordRef = React.useRef()
    const newPasswordRef = React.useRef()
    const confirmPasswordRef = React.useRef()

    const [currentPasswordError, setCurrentPasswordError] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const navigation = useNavigation()
    const toastRef = React.useRef(null)
 



    const checkPasswordAndSaveUserData = () => {
        AsyncStorage.getItem(USER_DATA).then((jsonData) => {
            if (jsonData !== null) {
                const data = JSON.parse(jsonData);
                setLoading(true);
                firestore().collection('Users')
                    .where('email', '==', data.email).where
                    ('password', '==', currentpassword).get().then((querySnapshot) => {
                        console.log(querySnapshot.docs)
                        if (querySnapshot.docs.length > 0) {

                            const data = querySnapshot.docs[0]._ref._documentPath._parts
                            console.log('values...', querySnapshot.docs[0]._ref._documentPath._parts)
                            const documentId = data[1]
                            console.log('id---', documentId)
                            updateUserPassword(documentId)

                        } else {
                            setLoading(false);
                            showErrorToast('Paasword is not correct.')

                        }
                    }).catch((error) => {
                        setLoading(false);
                        console.log(error)
                        showErrorToast(error)
                    })
            }
        });


        // AsyncStorage.getItem(USER_DATA).then((data) => {

        //     console.log(data)
        //     console.log(JSON.stringify(data.password))
        //     // setLoading(true);
        //     // firestore().collection('Users')
        //     // .where('email', '==', '').where
        //     //     ('password', '==', currentpassword).get().then((querySnapshot) => {
        //     //         console.log(querySnapshot.docs)
        //     //         if (querySnapshot.docs.length > 0) {
        //     //             setLoading(false);
        //     //             //console.log('data--->', JSON.stringify(querySnapshot.docs))
        //     //            // updateUserPassword()
        //     //         } else {
        //     //             setLoading(false);
        //     //             showErrorToast('Paasword is not correct.')

        //     //         }
        //     //     }).catch((error) => {
        //     //         setLoading(false);
        //     //         console.log(error)
        //     //         showErrorToast(error)
        //     //     })
        // })

    }

    const updateUserPassword = (documentId) => {
        firestore().collection('Users').doc(documentId).update({
            password: `${newPassword}`,
        }).then((data) => {
            setLoading(false);
            showSucessToast('Password changes sucessfully.')
            saveJSONToAsyncStorage(USER_DATA)
        }).catch((error) => {
            setLoading(false);
            showErrorToast(error)
            console.log(error)

        })
    }


    const saveJSONToAsyncStorage = async (key) => {
        try {
            AsyncStorage.getItem(key).then((data) => {
                // the string value read from AsyncStorage has been assigned to data
                // console.log('1', data)
                // transform it back to an object
                data = JSON.parse(data);
                console.log('2', data)
                // update password value
                data.password = `${newPassword}`
                console.log('3', data)

                AsyncStorage.setItem(key, JSON.stringify(data));
                console.log('JSON value saved successfully.');
                setTimeout(() => {
                    navigation.goBack()
                }, 1000);

            }
            )



        } catch (error) {
            console.log('Error saving JSON value:', error);
        }
    };

    const showErrorToast = (msg) => {
        toastRef.current.show({
            type: 'error',
            text: msg,
            duration: 800
        });
    }
    const showSucessToast = (msg) => {
        toastRef.current.show({
            type: 'success',
            text: msg,
            duration: 800
        });
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={red} />
                <Header
                    leftIcon={image_back}
                    title={'Change Password'}
                    onClickLeftIcon={
                        () => navigation.goBack()
                    } isCartScreen={false} />
                <Toast ref={toastRef} />
                {loading && <OverlayActivityIndicator />}
                <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 50 }}>
                    <AppTextInput placeholder={'Enter Current Password'}
                        icon={image_password}
                        isLast={false} type={'password'}
                        reference={currentPasswordRef}

                        onSubmit={() => newPasswordRef.current.focus()}
                        value={currentpassword} onChangeText={(text) => { setCurrentPassword(text) }}
                    />
                    {<Text style={[styles.errorText12]}>{currentPasswordError}</Text>}

                    <AppTextInput placeholder={'Enter New Password'}
                        icon={image_password}
                        isLast={false} type={'password'}
                        reference={newPasswordRef}

                        onSubmit={() => confirmPasswordRef.current.focus()}
                        value={newPassword} onChangeText={(text) => { setNewPassword(text) }}
                    />
                    {<Text style={[styles.errorText12]}>{newPasswordError}</Text>}
                    <AppTextInput placeholder={'Enter Confirm Password'}
                        icon={image_password}
                        isLast={true} type={'password'}
                        reference={confirmPasswordRef}
                        onSubmit={() => Keyboard.dismiss()}
                        value={confirmPassword} onChangeText={(text) => { setConfirmPassword(text) }}
                    />
                    {<Text style={[styles.errorText12]}>{confirmPasswordError}</Text>}
                    <View style={{ marginTop: 50 }}>
                        <AppButton title={'Change Password'} onPress={() => {
                            if (validateEmpty(currentpassword)) {
                                setCurrentPasswordError('Please enter current password')
                            } else if (!validatePassword(currentpassword)) {
                                setCurrentPasswordError('Please enter valid current password')
                            } else if (validateEmpty(newPassword)) {
                                setCurrentPasswordError('')
                                setNewPasswordError('Please enter new password')
                            } else if (!validatePassword(newPassword)) {
                                setCurrentPasswordError('')
                                setNewPasswordError('Please enter valid new password')
                            }
                            else if (validateEmpty(confirmPassword)) {
                                setCurrentPasswordError('')
                                setNewPasswordError('')
                                setConfirmPasswordError('Please enter confirm password')
                            } else if (currentpassword === newPassword) {
                                setCurrentPasswordError('')
                                setNewPasswordError('New password must be different from current password')
                                setConfirmPasswordError('')
                            }
                            else if (newPassword !== confirmPassword) {
                                setCurrentPasswordError('')
                                setNewPasswordError('')
                                setConfirmPasswordError('Confirm password and password must be same.')
                            }
                            else {
                                setCurrentPasswordError('')
                                setNewPasswordError('')
                                setConfirmPasswordError('')
                                Keyboard.dismiss()
                                checkPasswordAndSaveUserData()
                            }

                        }} />
                    </View>

                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}
export default ChangePassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black
    },
    productItems: {
        width: '100%',
        height: 150,
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 10,
        elevation: 5,
        paddingHorizontal: 10,
        backgroundColor: white

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
    itemImage: {
        flexBasis: '25%',
        // width: '30%',
        height: 150,
        alignSelf: 'center'

    },
    name: {
        marginTop: 20,
        fontSize: 20,
        color: black,
        fontFamily: 'Raleway-SemiBold'
    },
    description: {
        fontSize: 14,
        color: black,

        fontFamily: 'Raleway-Regular',

    },
    price: {
        marginTop: 5,
        fontSize: 24,
        color: green,
        fontFamily: 'Raleway-Black'

    },
    imgStyle: {
        width: 22,
        height: 22,
        paddingHorizontal: 10,
        marginHorizontal: 5
        , tintColor: red

    },
    addressActions: { position: 'absolute', right: 10, bottom: 10, flexDirection: 'row' }

})