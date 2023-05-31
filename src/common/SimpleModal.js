import { View, Text, Image, ScrollView, StyleSheet, Modal, Dimensions, TouchableOpacity } from 'react-native';
import { black, white } from '../../utils/color';
import AppButton from './AppButton';
const { height, width } = Dimensions.get('window');

const SimpleModal = ({title,description,yesText,noText,isShowYes,isShowNo,onYesClick,onNoClick,modelVisible}) => {
  
    return (
        <TouchableOpacity  >
<Modal visible={modelVisible} transparent animationType={'slide'} >
        <View style={stylesModal.modalView}>
        <View style={stylesModal.mainView}>
        <Text style={stylesModal.appTextBold24}>{title}</Text>
         <Text style={[stylesModal.appTextBold18,{marginTop:10}]}>{description}</Text>
         <View style={{flexDirection:'row',marginTop:10}}>
            <View style={{width:'50%',marginEnd:10}}>
            <AppButton title={noText} onPress={()=>{onNoClick()}} />
            </View>
            <View style={{width:'50%',marginStart:10}}>
            <AppButton title={yesText} onPress={()=>{onYesClick()}}  />
            </View>
        
         </View>
        </View>
        </View>
        </Modal>
        </TouchableOpacity>
        
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
        color: black,
        fontFamily: 'Raleway-Regular'


    },
    appTextBold24: {
        fontSize: 24,
        color: black,
        fontFamily: 'Raleway-Black'

    },
    appTextBold16: {
        fontSize: 16,
        color: white,
        fontFamily: 'Raleway-SemiBold'

    },
    modalView: {
        backgroundColor:white,
        height:height,
        width:width ,
        position:'absolute',
        top:0,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.5)'

    },
   mainView: {
        backgroundColor:white,
        paddingBottom:20,
        width:'90%' ,
       borderRadius:10,
       alignContent:'center',
       alignItems:'center',
       paddingTop:30,
       paddingHorizontal:20
       
     

    },

})