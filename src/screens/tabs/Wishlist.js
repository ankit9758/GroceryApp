import { View, Text } from 'react-native';
import React, { useState, useRef, useEffect } from "react";
import stylesApp from '../../../utils/styles';
import { useSelector } from "react-redux";

const WishList = () => {
    const wishList = useSelector(state => state.wishlists)
    useEffect(() => {
        console.log('yoooooooo',wishList)
    })

    return (
        <View>
            <Text >WishList</Text>
        </View>
    );
}
export default WishList;


