import {
    FlatList,
    TouchableOpacity, Text, View,
    SafeAreaView, StatusBar, Image, StyleSheet, ActivityIndicator, RefreshControl, Keyboard
} from "react-native"
import React, { useState, useRef, useEffect } from 'react';



const Status = () => {
    return (
        <View style={{backgroundColor:'yellow',flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>Stattus List</Text>
        </View>
    );

}
export default Status