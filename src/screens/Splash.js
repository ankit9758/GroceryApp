
import {
    Text, View,
    StyleSheet, ActivityIndicator, StatusBar
} from "react-native"

import { red, white } from "../../utils/color";
import { SafeAreaView } from "react-native-safe-area-context";
const Splash = () => {
    return (

        <SafeAreaView style={{ backgroundColor: red, alignItems: 'center', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
           <StatusBar backgroundColor={red} />

            <View style={{ alignItems: 'center', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
                <Text style={styles.loading}>
                    Loading.....
                </Text>
                <ActivityIndicator size={70} color={white} />
            </View>


        </SafeAreaView>)
}
export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: red
    },

    loading: {
        fontSize: 24,
        color: white,
        fontFamily: 'Raleway-SemiBold',
        marginVertical: 20
    },


})