import React, { useState, useRef, useEffect } from "react";
import {
    TouchableOpacity, Text, View,
    ScrollView, SafeAreaView, StatusBar, Image, StyleSheet, Keyboard
} from "react-native"

import { useNavigation } from '@react-navigation/native'
import OverlayActivityIndicator from "../common/Loader";

import Header from '../common/Header';
import { black, white, red } from "../../utils/color";

import AppTextInput from "../common/AppTextInput";
import AppButton from "../common/AppButton";
import { image_city, image_pincode, image_state,image_back } from "../../utils/images";
import {validateEmpty,validateNumber,validateName} from '../common/Validaton'
import { useDispatch } from "react-redux";
import { addAddress } from "../redux/slices/AddressSlice";

const AddAddress = () => {
    const navigation = useNavigation()
    const [stateError, setStateError] = useState('')
    const [pincodeError, setPincodeError] = useState('')
    const [cityError, setCityError] = useState('')

    const stateRef = React.useRef()
    const cityRef = React.useRef()
    const pincodeRef = React.useRef()

    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [type,setType]=useState(1)
    const disptach =useDispatch();

    return (<SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={red} />
        <Header
            leftIcon={image_back}
            title={'Add New Adresses'}
            onClickLeftIcon={
                () => navigation.goBack()
            } />
        <View style={{ flex: 1, padding: 20, backgroundColor: white }}>
            <AppTextInput placeholder={'Enter state'} type={'default'}
                icon={image_state} isLast={false} value={state}
                onChangeText={(text) => { setState(text) }}
                reference={stateRef}
                onSubmit={() => cityRef.current.focus()} />
            {<Text style={[styles.errorText12]}>{stateError}</Text>}

            <AppTextInput placeholder={'Enter city'} type={'default'}
                icon={image_city} isLast={false} value={city}
                onChangeText={(text) => { setCity(text) }}
                reference={cityRef}
                onSubmit={() => pincodeRef.current.focus()} />
            {<Text style={[styles.errorText12]}>{cityError}</Text>}




            <AppTextInput placeholder={'Enter pincode'} type={'numeric'}
                icon={image_pincode} isLast={true} value={pincode}
                onChangeText={(text) => { setPincode(text.replace(/[^0-9]/g, '')) }}
                reference={pincodeRef}
                maxLength={6}
                
                onSubmit={() => Keyboard.dismiss()} />
            {<Text style={[styles.errorText12]}>{pincodeError}</Text>}

            <AppButton title={'Save Address'} onPress={() => {
                if (validateEmpty(state)) {
                    setStateError('Please enter state name.')
                } else if (!validateName(state)) {
                    setStateError('Please enter valid state name')
                } else if (validateEmpty(city)) {
                    setStateError('')
                    setCityError('Please enter city name')
                } else if (!validateName(city)) {
                    setStateError('')
                    setCityError('Please enter valid city name')
                }
                else if (validateEmpty(pincode)) {
                    setStateError('')
                    setCityError('')

                    setPincodeError('Please enter pincode')
                } else if (!validateNumber(pincode)||pincode.length<6) {
                    setStateError('')
                    setCityError('')
                    setPincodeError('Please enter valid pincode')
                }
                else {
                    setStateError('')
                    setCityError('')
                    setPincodeError('')
                    console.log('Done ...')
                    disptach(addAddress({state:state,city:city,pincode:pincode,type:type==1?'Home':'Office'}))
                    navigation.goBack()
                    

                }

            }} />
        </View>
    </SafeAreaView>)
}
export default AddAddress
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black
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