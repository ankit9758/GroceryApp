import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChangePassword from '../ChangePassword';
import SavedAddress from '../SavedAddress';
import CallList from './Calls';
import Status from './Status';
import ChatList from './ChatList';
import { black, red, white } from '../../../utils/color';
import Community from './Community';
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarIndicatorStyle: {
                    backgroundColor: '#00000000',
                    height: '100%',
                    borderBottomColor: white,
                    borderBottomWidth: 3,
                },
                tabBarLabelStyle: {
                    fontFamily: 'Raleway-Regular',
                    fontSize: 14,
                    paddingVertical: 5,
                    color: black
                },
                tabBarStyle: {
                    backgroundColor: red
                }



            }}
        >

            <Tab.Screen name="Community" component={Community} options={{ title: 'Com' }} />

            <Tab.Screen name="CallList" component={CallList} options={{ title: 'Calls' }} />

            <Tab.Screen name="ChatList" component={ChatList} options={{ tabBarLabel: 'Chats' }} />
            <Tab.Screen name="Status" component={Status} />
        </Tab.Navigator>
    );
}


export default TabTop = () => {
    return <MyTabs />

}