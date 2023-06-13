import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProfileItems from '../../common/ProfileItem';
import { white, black, red } from '../../../utils/color';
import { SimpleModal } from '../../common/Dialogs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA } from '../../../utils/AppConstant';

import { useNavigation } from '@react-navigation/native'

const Profile = () => {
    const [visible, setVisible] = useState(false)

    const [imaegPath, setImagePath] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const navigation = useNavigation();

    useEffect(() => {
        getJSONFromAsyncStorage(USER_DATA)
    })

  const clearUserData = async (key) => {
        try {
          await AsyncStorage.removeItem(key)
          navigation.reset({
            key:'Login',
            routes:[{name:'Login'}]
          })
        } catch(e) {
          // remove error
        }
      
        console.log('Done.')
      }

    const getJSONFromAsyncStorage = async (key) => {
        try {
            const jsonData = await AsyncStorage.getItem(key);
            if (jsonData !== null) {
                const data = JSON.parse(jsonData);
                console.log('Retrieved JSON value123:', data);
                setName(data['firstName'] + ' ' + data['lastName'])
                setPhoneNumber(data['phoneNumber']);
                setEmail(data['email']);
                setImagePath(data['imagePath'])
              
                return data;
            }
        } catch (error) {
            console.log('Error retrieving JSON value:', error);
        }
    };

    return (
        <View>
            <ScrollView >
                <View style={stylesProfile.screenContainer}>
                    <View style={stylesProfile.profileContainer}>
                        <Image
                          source={imaegPath === '' ? require('../../images/no_data.png') : { uri: imaegPath }}
                            
                            style={{ width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center', backgroundColor: 'yellow', marginTop: 30, borderColor: 'red', }}
                        />
                        <View style={stylesProfile.profilePhotoContainer}>
                            <TouchableOpacity
                                onPress={() => console.log('Hello')
                                }>
                                <View style={stylesProfile.uploadBackStyle}>
                                    <Image
                                        source={require('../../images/pencil.png')}
                                        style={stylesProfile.uploadIconStyle}
                                    />
                                </View>

                            </TouchableOpacity>
                        </View>

                    </View>
                    <Text style={[stylesProfile.appTextBold20, { alignSelf: 'center', marginTop: 40, paddingHorizontal: 20 }]}>Name : {name} </Text>
                    <Text style={[stylesProfile.appTextBold18, { alignSelf: 'center', marginTop: 5, paddingHorizontal: 20 }]}>Email : {email}</Text>
                    <Text style={[stylesProfile.appTextBold16, { alignSelf: 'center', marginTop: 5, paddingHorizontal: 20 }]}>Phone : {phone} </Text>

                    <View style={{ marginTop: 30, marginBottom: 80 }}>
                        <ProfileItems leftIcon={require('../../images/address.png')} title={'My Address'} onClick={() => { navigation.navigate('SavedAddress')}} />
                        <ProfileItems leftIcon={require('../../images/cargo.png')} title={'My Orders'} onClick={() => { console.log('Hello') }} />
                        <ProfileItems leftIcon={require('../../images/language.png')} title={'Languages'} onClick={() => { console.log('Hello') }} />
                        <ProfileItems leftIcon={require('../../images/logout.png')} title={'Log out'} onClick={() => { setVisible(true) }} />
                    </View>


                </View>
            </ScrollView>
            <SimpleModal modelVisible={visible} title={'Logout ?'} description={'Are you sure you want to Logout ?'}
                yesText={'Yes'} noText={'No'} onNoClick={() => {
                    setVisible(false)
                }} onYesClick={() => { 
                    clearUserData(USER_DATA)  
                    setVisible(false)
                }}
            />
        </View>

    );
}
export default Profile;


const stylesProfile = StyleSheet.create({
    screenContainer: {
        flex: 1,

    },
    profileContainer: {
        height: 120,
        width: 120,
        alignSelf: 'center'

    },
    appButtonText: {
        fontSize: 18,
        color: white,
        alignSelf: "center",
        textTransform: "none",
        fontFamily: 'Raleway-ExtraBold'
    },
    appTextBold64: {
        fontSize: 64,
        color: white,
        alignSelf: 'flex-start',
        fontFamily: 'Raleway-Black'

    },
    appButton: {
        padding: 12,
    },
    appTextBold18: {
        fontSize: 18,
        color: white,
        fontFamily: 'Raleway-Medium'


    },
    appTextBold20: {
        fontSize: 20,
        color: white,
        fontFamily: 'Raleway-Black'

    },
    appTextBold16: {
        fontSize: 16,
        color: white,
        fontFamily: 'Raleway-SemiBold'

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
    }
})