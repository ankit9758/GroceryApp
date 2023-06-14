import React, { useState, useRef, useEffect } from "react";
import {
    Text, View,
    ScrollView, SafeAreaView, StatusBar, Image, StyleSheet, TouchableOpacity
} from "react-native"
import { useNavigation, useRoute } from '@react-navigation/native'
import Header from '../common/Header';
import { image_add_wishlist, image_back, image_cart, image_wishlist } from "../../utils/images";
import AppButton from "../common/AppButton";
import { useDispatch } from "react-redux";
import { black, white, red, transparent, green } from "../../utils/color";
import { addItemToWishList, removeItemFromWishList } from "../redux/slices/Wishlistslice";
import { addItemToCart } from "../redux/slices/CartSlice";
import { likeDislikeProducts } from "../redux/slices/ProductSlice";

const ProductDetails = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const disptach = useDispatch();
    const [productDetail, setProductDetail] = useState({})
    const [val, setval] = useState()

    const ref = useRef()
    useEffect(() => {
        console.log('useEffect')
        console.log("hello", route.params.data)
        setProductDetail(route.params.data)
    }, [])

    return (<SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={red} />
        <Header
            leftIcon={image_back}
            title={'Product Details'}
            onClickLeftIcon={
                () => navigation.goBack()
            }
            rightIcon={image_cart}
            onclickRightIcon={
                () => {

                }
            }

        />
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ backgroundColor: white, flex: 1, paddingHorizontal: 20, paddingVertical: 50 }}>
                <Image source={{ uri: productDetail.image }} style={styles.itemImage} resizeMode="center" />
                <Text style={styles.name}>{productDetail.title}</Text>
                <Text style={styles.description}>{productDetail.description}</Text>
                <Text style={styles.price}>{'$' + productDetail.price}</Text>
                <AppButton title={'Add To Cart'} onPress={() => { disptach(addItemToCart(productDetail)) }} />
                <View
                    ref={ref}
                    style={styles.profilePhotoContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            if (productDetail.isOnWishlist) {
                                disptach(likeDislikeProducts(productDetail.id))
                                disptach(removeItemFromWishList(productDetail))
                            } else {
                                disptach(likeDislikeProducts(productDetail.id))
                                disptach(addItemToWishList(productDetail))
                            }
                            console.log('Product--1', productDetail)
                            productDetail.isOnWishlist = !productDetail.isOnWishlist
                            //  productDetail.title="ankit"
                            console.log('Product--2', productDetail)
                            setProductDetail(productDetail)
                            setval(productDetail.isOnWishlist)
                            console.log('Product--3', productDetail)

                        }

                        }>
                        <View style={styles.uploadBackStyle}>
                            <Image
                                source={productDetail.isOnWishlist ? image_wishlist : image_add_wishlist}
                                style={styles.uploadIconStyle}
                            />
                        </View>

                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    </SafeAreaView>)

}
export default ProductDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
        flexDirection: 'column'
    },
    profilePhotoContainer: {
        position: 'absolute',
        justifyContent: 'flex-end',
        right: 20,
        top: 20
    },
    uploadIconStyle: {
        width: 20,
        height: 20,
        tintColor: white
    },
    uploadBackStyle: {
        width: 40,
        height: 40,
        backgroundColor: red,
        borderRadius: 20,
        alignContent: 'center',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemImage: {
        width: '100%',
        height: 300,
        alignSelf: 'center'

    },
    errorText12: {
        fontSize: 13,
        color: red,
        fontFamily: 'Raleway-Regular',
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginTop: 5,
        marginStart: 5
    },
    btnText: {
        flex: 1,
        fontSize: 13,
        color: red,
        fontFamily: 'Raleway-Regular',
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginTop: 5,
        marginStart: 5
    },

    btnRadio: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        marginHorizontal: 10,
        borderWidth: 0.3,
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    imgRadio: {
        width: 24,
        height: 24,

    },
    name: {
        marginTop: 50,
        fontSize: 30,
        color: black,
        fontFamily: 'Raleway-Black'
    },
    description: {
        marginTop: 20,
        fontSize: 14,
        color: 'black',
        fontFamily: 'Raleway-Regular',

    },
    price: {
        marginTop: 40,
        marginBottom: 20,
        fontSize: 24,
        color: green,
        fontFamily: 'Raleway-Black'

    }
})