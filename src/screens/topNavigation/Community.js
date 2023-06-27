import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { black, white } from '../../../utils/color';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';





const Community = () => {
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        GoogleSignin.configure({ webClientId: '300110096690-t6kf0n4efbsr5t2m4tetqpp8l5fa2n6q.apps.googleusercontent.com' });
    })

    // Somewhere in your code
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('google data ', userInfo.user)
            setUserData({ userInfo });
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
    return (
        <View style={style.container}>
            {/* <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={()=>{signIn()}}
               // disabled={this.state.isSigninInProgress}
    /> */}
            <TouchableOpacity onPress={()=>signIn()}>
                <Text style={{width:100,color:black,height:50}}>
                     Google Sign in 
                </Text>
            </TouchableOpacity>
        </View>
    );

}
export default Community;
const style = StyleSheet.create({

    container: {
        backgroundColor: white, flex: 1, justifyContent: 'center', alignItems: 'center'
    }
})