import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { red, white } from '../../utils/color';
const { height, width } = Dimensions.get('window');

const ProfileItems = ({ title, leftIcon, onClick }) => {
  return (
    <TouchableOpacity onPress={() => onClick()}>
      <View style={styles.header}>

        <Image source={leftIcon} style={styles.icon} />

        <Text style={styles.title}>{title}</Text>

        <Image source={require('../images/right.png')} style={styles.icon} />

      </View>
    </TouchableOpacity>
  );
}
export default ProfileItems;
const styles = StyleSheet.create({
  header: {
    // width: width,
    height: 56,
    backgroundColor: red,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15, flexDirection: 'row',
    borderRadius: 20,
   marginEnd:20,
    marginTop: 10,
    marginStart: 20
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'

  },
  title: {
    color: white,
    fontSize: 20,
    fontFamily: 'Raleway-Black',
    flex:1,paddingHorizontal:20

  },
  icon: {
    width: 30,
    height: 30,
    tintColor: white
  }
}); 