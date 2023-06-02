import React from "react";
import { TouchableOpacity, Text, View, Image, TextInput } from "react-native"
import stylesApp from '../../utils/styles';
import { white } from "../../utils/color";

export default AppTextInput = ({ value, onChangeText, 
  placeholder, type, icon,isLast,onSubmit,reference}) => (
  <View style={{
    width: '100%',
    height: 55,
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: white,
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center'
  }}>
    <Image source={icon} style={{ height: 24, width: 24 }} />
    <TextInput placeholder={placeholder} placeholderTextColor={'#000000'} style={{
      marginHorizontal: 10 }} value={value} returnKeyType={isLast ? "done" : "next"}
      secureTextEntry={type == 'password' ? true : false}
      numberOfLines={1} onChangeText={onChangeText}
       keyboardType={type ? type : 'default'} 
      blurOnSubmit={false} onSubmitEditing={onSubmit}
      ref={reference}
      />
  </View>
);
