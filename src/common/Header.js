import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { red, white } from '../../utils/color';
const { height, width } = Dimensions.get('window');

const Header = ({title,leftIcon,rightIcon,onClickLeftIcon,onclickRightIcon}) => {
    return (
        <View style={styles.header}>
          <TouchableOpacity style={styles.btn} onPress={()=>onClickLeftIcon()}>
            <Image source={leftIcon} style={styles.icon}/>
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.btn}  onPress={onclickRightIcon}>
            <Image source={rightIcon} style={styles.icon}/>
          </TouchableOpacity>
        </View>
    );
}
export default Header;
const styles = StyleSheet.create({
    header: {
        width: width,
        height: 56,
        backgroundColor: red,
        alignItems:'center',justifyContent:'space-between',
        paddingHorizontal:15,flexDirection:'row'
    },
    btn:{
        width:40,
        height:40,
        justifyContent:'center',
        alignItems:'center'
        
    },
    title:{
       color:white,
       fontSize:20,
       fontFamily: 'Raleway-Black' 
      
    },
    icon:{
     width:30,
     height:30,
     tintColor:white
    }
}); 