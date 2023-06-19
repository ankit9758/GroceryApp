import {
    FlatList,
    TouchableOpacity, Text, View,
    SafeAreaView, StatusBar, Image, StyleSheet, ActivityIndicator, RefreshControl, Keyboard
} from "react-native"
import React, { useState, useRef, useEffect } from "react";
import { green } from "../../../../utils/color";

const SecondScreen =()=>{
  return(<View style={{backgroundColor:green,flex:1}}>
<Text>Second Screen </Text>
  </View>)
}
export default SecondScreen;