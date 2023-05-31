import { View, Text, Image, ScrollView, StyleSheet, Modal } from 'react-native';
import React from 'react';
import ProfileItems from '../../common/ProfileItem';
import { white, black } from '../../../utils/color';
const { height, width } = Dimensions.get('window');

const SimpleModal = (title,description,yesText,noText,isShowYes,isShowNo,onYesClick,onNoClick) => {
    return (
        <Modal visible={true} transparent >
        <View style={stylesModal.mainView}></View>
        </Modal>
    );
}
export default SimpleModal;


const stylesModal = StyleSheet.create({
    screenContainer: {
        flex: 1,
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
    mainView: {
        backgroundColor:white,
        height:height,
        width:width ,
        position:'absolute',
        top:0,
        backgroundColor:'rgba(0,0,0,0.5)'

    },

})