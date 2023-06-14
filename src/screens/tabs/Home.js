import { View, Text, StyleSheet, Dimensions, Image, FlatList, Alert, ActivityIndicator, RefreshControl, Touchable, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import stylesApp from '../../../utils/styles';
import { callApiWithoutParams } from '../../../utils/NetworkRequestHandler';
import { black, green, red, white } from '../../../utils/color';
import { PRODUCTS } from '../../../utils/AppConstant';
const { width, height } = Dimensions.get('window')
import NoDataFound from '../../common/NoDatafound';
import { useNavigation, useRoute } from '@react-navigation/native'
import { image_wishlist } from '../../../utils/images';
import { image_add_wishlist } from '../../../utils/images';
import { addItemToWishList, removeItemFromWishList } from '../../redux/slices/Wishlistslice';
import { useDispatch, useSelector } from "react-redux";
import { addProducts, likeDislikeProducts } from '../../redux/slices/ProductSlice';


const Home = () => {
    const navigation = useNavigation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const disptach = useDispatch();

    const productList = useSelector(state => state.productData)



    useEffect(() => {
        //getProducts()
        // console.log('redux..'+productList.data.length,productList.data)
        if (productList.data.length == 0) {
            getProducts()
        }
        // else{
        //     setProducts(productList.data)
        // }
    }, [])


    const getProducts = () => {
    setLoading(true)
        callApiWithoutParams('GET', PRODUCTS)
            .then((response) => {
                setLoading(false)
                response.data.map(item => {
                    item.isOnWishlist = false
                })
               // setProducts(response.data)
                disptach(addProducts(response.data))
                setRefreshing(false);

                //console.log('Okkkkkkkkkkkkkk', response.data)
            })
            .catch((error) => {
                setLoading(false)
                setRefreshing(false); tail
                console.log("hello" + error.response.status)
                if (error.response.status === 404) {
                    Alert.alert(
                        '',
                        'Data Undefined',
                        [{ text: 'OK', onPress: () => { } }],
                        {
                            cancelable: false,
                        },
                    );
                }
            });
    }
    const handleRefresh = () => {
        setLoading(true)
        getProducts();
    };


    return (

        <View style={styles.container}>
            {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={70} color="#0000ff" />
            </View>) : (
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }

                    data={productList.data} renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                console.log('Hrllo')
                                navigation.navigate('ProductDetails', { types: 'edit', data: item })
                            }}>
                                <View style={styles.productItems}>
                                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                                    <TouchableOpacity
                                        onPress={() => {

                                            if (item.isOnWishlist) {
                                               // item.isOnWishlist = false
                                                disptach(removeItemFromWishList(item))
                                            } else {
                                                //item.isOnWishlist = true
                                                disptach(addItemToWishList(item))
                                            }
                                            disptach(likeDislikeProducts(item.id))
                                        }
                                        }>
                                        <View style={styles.wishListBackStyle}>
                                            <Image
                                                source={item.isOnWishlist ? image_wishlist : image_add_wishlist}
                                                style={styles.wishlistStyle}
                                            />
                                        </View>

                                    </TouchableOpacity>
                                    <View style={{ paddingStart: 10, flex:1 }}>
                                        <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.title.length > 30 ? item.title.substring(0, 30) + '....' : item.title}</Text>
                                        <Text style={styles.description} numberOfLines={3} ellipsizeMode='tail'>{item.description}</Text>
                                        <Text style={styles.price}>{'$' + item.price}</Text>
                                    </View>



                                </View>
                            </TouchableOpacity>
                        )
                    }

                    }
                    ListEmptyComponent={
                        <NoDataFound description={'Please check your internet connection'}
                            btnText={'Refresh'} onclick={() => { handleRefresh() }} />
                    }

                />
            )
            }
        </View>
    );
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'space-between'

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

        height: 150,
        marginTop: 10,

        flexDirection: 'row',
        borderRadius: 10,
        elevation: 5,
        paddingHorizontal: 10,
        backgroundColor: white

    },
    itemImage: {
       // flexBasis: '25%',
         width: '25%',
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

    }
})