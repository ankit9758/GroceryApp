import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CallList from './Calls';
import Status from './Status';
import ChatList from './ChatList';
import { black, grey, red, white } from '../../../utils/color';
import Community from './Community';
import { Image, Text, View, StyleSheet } from 'react-native';
import { image_group } from '../../../utils/images';
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName='ChatList'
            screenOptions={{
                
                tabBarScrollEnabled:true,
                tabBarActiveTintColor: white,
                tabBarInactiveTintColor: black,
                tabBarAllowFontScaling: true,
                tabBarIndicatorStyle: {
                    backgroundColor: '#00000000',
                    height: '100%',
                    borderBottomColor: white,
                    borderBottomWidth: 3,
                },
                tabBarLabelStyle: {
                    fontFamily: 'Raleway-Regular',
                    //  fontSize: 14,
                    paddingVertical: 5,
                    // color: black
                },
                tabBarStyle: {
                    backgroundColor: red
                }
                ,




            }}
        >

            <Tab.Screen name="Community"
                component={Community}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={image_group} resizeMode="contain" style={[styles.bottomTabIcon, { tintColor: focused ? white : black }]} />

                        </View>)
                    //,tabBarLabelStyle:{display:'none'}
                    , tabBarShowLabel: false
                }}
            />


            <Tab.Screen name="ChatList" component={ChatList} options={{
                tabBarLabel: ({ focused }) => (

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            fontFamily: focused ? 'Raleway-Black' : 'Raleway-Regular'
                            , fontSize: 14, color: focused ? white : black
                        }}>Chats</Text>

                        <Text style={{
                            fontFamily: focused ? 'Raleway-Black' : 'Raleway-Regular'
                            , fontSize: 10, color: focused ? red : black,
                            backgroundColor:focused?'white':grey,
                            width: 20, 
                            height: 20,
                            marginStart:7,
                           
                            alignSelf:'center',
                            textAlign:'center',
                             borderRadius: 40 / 2,
                        }}>3</Text>

                    </View>

                )
            }

            } />
            <Tab.Screen name="CallList"
                component={CallList} options={{
                    tabBarLabel: ({ focused }) => (
                        <View>
                            <Text style={{
                                fontFamily: focused ? 'Raleway-Black' : 'Raleway-Regular'
                                , fontSize: 14, color: focused ? white : black
                            }}>Calls</Text>
                        </View>

                    )
                }}

            />
            <Tab.Screen name="Status" component={Status} options={{
                tabBarLabel: ({ focused }) => (
                    <Text style={{
                        fontFamily: focused ? 'Raleway-Bold' : 'Raleway-Regular'
                        , fontSize: 14, color: focused ? white : black
                    }}>Status</Text>
                ),

            }} />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({

    bottomTabIcon: {
        width: 20,
        height: 20,
        tintColor: white

    },
    appTextBold14: {
        fontSize: 14,
        color: white,
        textShadowRadius: 10,
        borderWidth: 2,
        textShadowOffset: { width: 5, height: 5 },
        borderColor: white


    },
})

export default TabTop = () => {
    return <MyTabs />

}