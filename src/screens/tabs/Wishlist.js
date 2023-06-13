import {
    FlatList,
    TouchableOpacity, Text, View,
    SafeAreaView, StatusBar, Image, StyleSheet, ActivityIndicator, RefreshControl
} from "react-native"
import React, { useState, useRef, useEffect } from "react";
import stylesApp from '../../../utils/styles';
import { useSelector } from "react-redux";
import NoDataFound from '../../common/NoDatafound';
import { black, white, red, green } from "../../../utils/color";
import { image_back, image_edit, image_delete, image_wishlist, image_add_wishlist } from "../../../utils/images";
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { removeItemFromWishList } from "../../redux/slices/Wishlistslice";
import { useDispatch } from "react-redux";


const WishList = () => {
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation()
    const wishList = useSelector(state => state.wishlistData)
    const disptach = useDispatch();

    useEffect(() => {
        console.log(wishList)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [isFocused])

    const handleRefresh = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setRefreshing(false)
        }, 3000)
    };
    return (<SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={red} />


        <View style={{ flex: 1, }}>
            {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={70} color="#0000ff" />
            </View>) : (
                <FlatList data={wishList.data} showsVerticalScrollIndicator={false}

                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => {

                                navigation.navigate('ProductDetails', { data: item })
                            }}>
                                <View style={styles.productItems}>
                                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                                    <TouchableOpacity
                                        onPress={() =>
                                            disptach(removeItemFromWishList(item.id))}>
                                        <View style={styles.wishListBackStyle}>
                                            <Image
                                                source={item.isOnWishlist ? image_wishlist : image_add_wishlist}
                                                style={styles.wishlistStyle}
                                            />
                                        </View>

                                    </TouchableOpacity>
                                    <View style={{ paddingHorizontal: 15, flexBasis: '80%' }}>
                                        <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.title.length > 30 ? item.title.substring(0, 30) + '....' : item.title}</Text>
                                        <Text style={styles.description} numberOfLines={2} ellipsizeMode='tail'>{item.description}</Text>
                                        <Text style={styles.price}>{'$' + item.price}</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )
                    }
                    }image_add_wishlist
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />

                    }
                    ListEmptyComponent={
                        <NoDataFound description={'Please Add products in wishList'}
                            btnText={'Refresh'} onclick={() => { handleRefresh() }} />
                    }
                />
            )
            }




        </View>
    </SafeAreaView>)
}
export default WishList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black
    },
    wishlistStyle: {
        width: 20,
        height: 20,
        tintColor: white
    },
    wishListBackStyle: {
        width: 40,
        height: 40,
        backgroundColor: red,
        borderRadius: 20,
        alignContent: 'center',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        right: 8,
        top: 5,
    },
    productItems: {

        width: '100%',
        height: 150,
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 10,
        elevation: 5,
        paddingHorizontal: 10,
        backgroundColor: white

    },
    itemImage: {
        flexBasis: '20%',
        // width: '30%',
        height: 150,
        alignSelf: 'center'

    },
    name: {
        marginTop: 20,
        fontSize: 20,
        color: black,
        fontFamily: 'Raleway-SemiBold'
    },
    description: {
        fontSize: 14,
        color: black,

        fontFamily: 'Raleway-Regular',

    },
    price: {
        marginTop: 5,
        fontSize: 24,
        color: green,
        fontFamily: 'Raleway-Black'

    },
    imgStyle: {
        width: 22,
        height: 22,
        paddingHorizontal: 10,
        marginHorizontal: 5
        , tintColor: red

    },
    addressActions: { position: 'absolute', right: 10, bottom: 10, flexDirection: 'row' }

})




