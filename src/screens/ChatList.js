
import {
    FlatList,
    TouchableOpacity, Text, View,
    SafeAreaView, StatusBar, Image, StyleSheet, ActivityIndicator, RefreshControl, Keyboard
} from "react-native"
import React, { useState, useRef, useEffect } from "react";
import Header from "../common/Header";
import { black, green, red, white } from "../../utils/color";
import { image_back, image_no_data } from "../../utils/images";
import { useSelector } from "react-redux";
import NoDataFound from '../common/NoDatafound';
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import OverlayActivityIndicator from "../common/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA } from "../../utils/AppConstant";

const ChatList = () => {

    const [userList, setUserList] = useState([]);
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
     const [emailS, setEmailS] = useState('')
    let email = ''
    console.log('hello', userList)

    const handleRefresh = () => {
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    };

    useEffect(() => {
      
        getUserList()
    
    }, [])
    const getUserData = async (allUserData) => {
        AsyncStorage.getItem(USER_DATA).then((jsonData) => {
            if (jsonData !== null) {
                const data = JSON.parse(jsonData);
                console.log('data-->', data)
                email = data.email
                setEmailS(data.email)
                //setEmail(data.email)
                
                setLoading(false)
                
                setUserList(allUserData.filter(it => {
                    return it.email != email
                }))
            }
        });
    }
    const getUserList = () => {
        setLoading(true)
        firestore().collection('Users').get().then((querySnapshot) => {
            const allUserData = []
            querySnapshot.forEach(documentSnapshot => {
                //   fireData.push(documentSnapshot.data())
                console.log('User ID: ', documentSnapshot.data());
                allUserData.push(documentSnapshot.data())
            });
            // setFireData([...fireData, documentSnapshot.data()])
           getUserData(allUserData)
        })

    }

    return (<SafeAreaView style={styles.container}>

        <StatusBar backgroundColor={red} />
        <Header
            leftIcon={image_back}
            title={'All Conversation'}
            onClickLeftIcon={
                () => navigation.goBack()
            } isCartScreen={false} />
        <View style={{
            flex: 1, 
            //marginHorizontal: 10,

        }}>
            {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={70} color="#0000ff" />
            </View>) : (
                <View style={{ flexDirection: 'column', flex: 1 }}>

                    <FlatList data={userList} showsVerticalScrollIndicator={false}

                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => { }}>
                                    <View style={styles.productItems}>
                                        <Image
                                            source={item.imagePath === '' ? image_no_data : { uri: item.imagePath }}

                                            style={{
                                                width: 60, height: 60, borderRadius: 60 / 2, alignSelf: 'center', backgroundColor: 'yellow',
                                                borderColor: red, borderWidth: 2
                                            }}
                                        />
                                        <View style={{ paddingStart: 20, flexBasis: '75%' }}>
                                            <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{item.firstName + ' ' + item.lastName}</Text>
                                            <Text style={styles.description} numberOfLines={2} ellipsizeMode='tail'>{item.email}</Text>

                                        </View>
                                      
                                    </View>
                                    <View
                                            style={{
                                                backgroundColor: black,
                                                width:'100%' ,
                                                height:1
                                            }}
                                        />
                                </TouchableOpacity>
                            )
                        }
                        }
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />

                        }
                        ListEmptyComponent={
                            <NoDataFound description={'No user list found.'}
                                btnText={'Refresh'} onclick={() => { handleRefresh() }} />
                        }
                        keyExtractor={(item, index) => index.toString()}

                    />


                </View>
            )
            }




        </View>

    </SafeAreaView>)

}
export default ChatList


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
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
        paddingVertical: 5,
        // marginTop: 10,
        flexDirection: 'row',
        alignContent: 'center',
       // borderRadius: 10,
      //  elevation: 5,
        paddingHorizontal: 5,
        backgroundColor: white

    },
    itemImage: {
        flexBasis: '25%',
        // width: '30%',
        height: 150,
        alignSelf: 'center'

    },
    name: {

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


})
