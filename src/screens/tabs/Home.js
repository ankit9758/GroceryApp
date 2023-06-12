import { View, Text, StyleSheet, Dimensions, Image, FlatList, Alert, ActivityIndicator, RefreshControl, Touchable, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import stylesApp from '../../../utils/styles';
import { callApiWithoutParams } from '../../../utils/NetworkRequestHandler';
import { black, green, white } from '../../../utils/color';
import { PRODUCTS } from '../../../utils/AppConstant';
const { width, height } = Dimensions.get('window')
import NoDataFound from '../../common/NoDatafound';
import { useNavigation, useRoute } from '@react-navigation/native'


const Home = () => {
    const navigation = useNavigation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        getProducts()
    }, [])


    const getProducts = () => {

        callApiWithoutParams('GET', PRODUCTS)
            .then((response) => {
                setLoading(false)
                setProducts(response.data)
                setRefreshing(false);
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

                    data={products} renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                console.log('Hrllo')
                              navigation.navigate('ProductDetails', { types: 'edit', data: item })
                            }}>
                                <View style={styles.productItems}>
                                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                                    <View style={{ paddingHorizontal: 15, flexBasis: '80%' }}>
                                        <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.title.length > 30 ? item.title.substring(0, 30) + '....' : item.title}</Text>
                                        <Text style={styles.description} numberOfLines={2} ellipsizeMode='tail'>{item.description}</Text>
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

    }
})