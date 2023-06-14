import {
    FlatList,
    TouchableOpacity, Text, View,
    SafeAreaView, StatusBar, Image, StyleSheet, ActivityIndicator, RefreshControl
} from "react-native"
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import NoDataFound from '../common/NoDatafound';
import Header from '../common/Header';
import { black, white, red, green } from "../../utils/color";
import { image_back, image_edit, image_delete } from "../../utils/images";
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'


const Cart = () => {
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation()
    const cartData = useSelector(state => state.cartData)

    useEffect(() => {
        console.log(cartData)
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
        <Header
            leftIcon={image_back}
            title={'Cart'}
            onClickLeftIcon={
                () => navigation.goBack()
            } isCartScreen={false} />

        <View style={{
            flex: 1, marginHorizontal: 10,

        }}>
            {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={70} color="#0000ff" />
            </View>) : (
                <View style={{ flexDirection: 'column', flex: 1 }}>

                    <FlatList data={cartData.data} showsVerticalScrollIndicator={false}

                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => {

                                    navigation.navigate('ProductDetails', { data: item })
                                }}>
                                    <View style={styles.productItems}>
                                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                                        <View style={{ paddingStart: 20, flexBasis: '75%' }}>
                                            <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.title.length > 30 ? item.title.substring(0, 30) + '....' : item.title}</Text>
                                            <Text style={styles.description} numberOfLines={2} ellipsizeMode='tail'>{item.description}</Text>
                                            <Text style={styles.price}>{'$' + item.price}</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )
                        }
                        }
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />

                        }
                        ListEmptyComponent={
                            <NoDataFound description={'Please add products in Cart'}
                                btnText={'Refresh'} onclick={() => { handleRefresh() }} />
                        }
                    />
                    <View style={{ flexDirection: 'row', display: 'flex', marginTop: 20, backgroundColor: white, paddingHorizontal: 10, paddingVertical: 10 }}>
                        <View style={{
                            flexDirection: 'column',
                            flex: 1, alignItems: 'flex-start',
                            alignContent: 'flex-start', justifyContent: 'flex-start',
                            
                        }}>
                            <Text style={styles.normalText}>
                                Items :{cartData.data.length}
                            </Text>
                            <Text style={styles.boldText}>
                                Total Price :
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => { }}>
                            <View style={styles.appButtonContainer} >
                                <Text style={[styles.appButtonText]}>Checkout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            )
            }




        </View>
    </SafeAreaView>)
}
export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black
    },
    appButtonContainer: {
        backgroundColor: red,
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 12,
        elevation: 5
    },
    boldText: {
        fontSize: 18,
        color: black,
        
        textTransform: "none",
        fontFamily: 'Raleway-ExtraBold'
    },
    normalText: {
        fontSize: 22,
        color: black,
        textTransform: "none",
        fontFamily: 'Raleway-ExtraBold'
    },
    appButtonText: {
        fontSize: 18,
        color: white,
        alignSelf: "center",
        textTransform: "none",
        fontFamily: 'Raleway-ExtraBold'
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
        flexBasis: '25%',
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




