import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { red, white } from '../../utils/color';
import AppButton from './AppButton';
const { height, width } = Dimensions.get('window');

const NoDataFound = ({ description, btnText, onclick }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../images/no_data.png')} style={styles.icon} />
            <Text style={styles.title}>{'No Data Found'}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={{width:width-50}}>
            <AppButton title={btnText} onPress={onclick}  />
            </View>
            
        </View>
    );
}
export default NoDataFound;

const styles = StyleSheet.create({
    container: {
        width: width,
        height:height,
        alignItems: 'center',
        justifyContent:'center'
    },

    title: {
        color: red,
        fontSize: 20,
        fontFamily: 'Raleway-Black'

    },
    description: {
        fontSize: 14,
        color: red,
        fontFamily: 'Raleway-Regular'

    },
    icon: {
        width: 50,
        height: 50,
        tintColor: red
    }
}); 