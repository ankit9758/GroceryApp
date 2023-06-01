import React, { useState,useRef } from "react";
import {
    TouchableOpacity, Text, View,
    ScrollView, SafeAreaView, StatusBar, Image, StyleSheet,Keyboard
} from "react-native"
import stylesApp from '../../utils/styles';
import { red, white, black } from "../../utils/color";
import AppTextInput from "../common/AppTextInput";
import AppButton from "../common/AppButton";
import { useNavigation } from '@react-navigation/native'
import OverlayActivityIndicator from "../common/Loader";

const Login = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);

    const emailRef = React.useRef()
    const passwordRef = React.useRef()

    const displayLoader =()=> {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          
        }, 5000);
      }
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                        onSubmit={()=> passwordRef.current.focus()}/>
                    <AppTextInput placeholder={'Enter Password'}
                        icon={require('../images/password.png')}
                        isLast={true} type={'password'} 
                        reference={passwordRef}
                        onSubmit={()=>Keyboard.dismiss()}
                        value={password} onChangeText={(text) => { setPassword(text) }}
                    />
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={stylesLogin.forgotText}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    <View style={{ marginVertical: 20 }} />


                    <AppButton title={'Login'} onPress={() => {
                     displayLoader()
                   //  navigation.navigate('Main')
                    }} />

                    <View style={{
                        marginTop: 10, marginBottom: 20, flexDirection: 'row',
                        alignItems: 'center', alignContent: 'center', justifyContent: 'center'
                    }}>
                        <Text style={stylesLogin.alreadyText}>
                            Don't have Account ?
                        </Text>
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={stylesLogin.signupText}>
                                Signup
                            </Text>
                        </TouchableOpacity>


                    </View>
                </View>


            </ScrollView>
        </SafeAreaView>
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
        paddingHorizontal: 10,
        fontFamily: 'Raleway-Black',
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

})
