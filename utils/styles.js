
import { StyleSheet } from "react-native"
import { black, green, red, white } from "./color";


const stylesApp = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  appButtonText: {
    fontSize: 18,
    color: white,
    alignSelf: "center",
    textTransform: "none",
    fontFamily: 'Raleway-ExtraBold'
  },
  appTextBold64: {
    fontSize: 64,
    color: white,
    alignSelf: 'flex-start',
    fontFamily: 'Raleway-Black'

  },
  appButton: {
    padding: 12,
  },
  appTextBold40: {
    fontSize: 40,
    color: black,
    fontFamily: 'Raleway-Medium'


  },
  appTextBold20: {
    fontSize: 20,
    color: white,
    fontFamily: 'Raleway-Regular'

  },
  appTextBold16: {
    fontSize: 16,
    color: black,
    fontFamily: 'Raleway-SemiBold'

  },
  appButtonContainer: {
    backgroundColor:red,
    elevation: 8,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 10,
  },

})

export default stylesApp;
