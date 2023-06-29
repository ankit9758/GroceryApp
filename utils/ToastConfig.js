import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { black, darkGray, darkRed, green, red, white } from './color';
import { Image, Text, View } from 'react-native'
import { image_check, image_error, image_sucess } from './images';



export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  // success: (props) => (
  //   <BaseToast
  //     {...props}
  //     style={{ borderLeftColor: red }}
  //     contentContainerStyle={{ paddingHorizontal: 15 }}
  //     text1Style={{
  //       fontSize: 15,
  //       fontWeight: '400',
  //       color: green,
  //     }}
  //   />
  // ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  // error: (props) => (
  //   <ErrorToast
  //     {...props}
  //     text1Style={{
  //       fontSize: 17,
  //       color: 15
  //     }}
  //     text2Style={{
  //       fontSize: 15
  //     }}
  //   />
  // ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  sucess: ({ props }) => (
    <View style={{
      paddingVertical: 20,

      borderRadius: 20,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
      paddingHorizontal: 50,
      backgroundColor: 'green',
      alignSelf: 'center'
    }}>
      <Image style={{ tintColor: white, height: 24, width: 24 }} source={image_sucess} />
      <Text style={{ marginStart: 15, color: white, fontFamily: 'Raleway-Regular' }} >{props.message}</Text>
    </View>
  ),

  error: ({ props }) => (
    <View style={{
      paddingVertical: 20,

      borderRadius: 20,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
      paddingHorizontal: 50,
      backgroundColor: darkRed,
      alignSelf: 'center'
    }}>
      <Image style={{ tintColor: white, height: 24, width: 24 }} source={image_error} />
      <Text style={{ marginStart: 15, color: white, fontFamily: 'Raleway-Regular' }} >{props.message}</Text>
    </View>
  )
};

/*
  2. Pass the config as prop to the Toast component instance
*/

const customToaast = (type, message) => {
  Toast.show({
    position: 'bottom',
    props: { message: message },
    autoHide: true,
    visibilityTime: 2000,
    type: type,
  })
}

export default customToaast;