import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet,View,Text } from 'react-native';
import { white } from '../../../utils/color';



const Community = () => {
    return (
        <View style={style.container}>
            <Text>Community </Text>
        </View>
    );

}
export default Community;
const style = StyleSheet.create({

    container: {
        backgroundColor: white, flex: 1, justifyContent: 'center', alignItems: 'center'
    }
})