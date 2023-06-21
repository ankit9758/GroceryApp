import React from "react";
import { TouchableOpacity, Text, View, ImageBackground, Image, StyleSheet } from "react-native"
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { black, red, white } from "../../utils/color";
import { image_add, image_bg, image_chat, image_home, image_logout, image_navigation, image_no_data } from "../../utils/images";

export default CustomDrawer = ({ state, navigation }) => {
  const navigateToScreen = (route) => {
    navigation.navigate(route);
  };

  const getCurrentRouteName = () => {
    const route = state.routes[state.index];
    return route.name;
  };
  return (<View style={{ flex: 1 }}>

    <DrawerContentScrollView
      // {...props}
      contentContainerStyle={{
        backgroundColor: '#8200d6',

        //borderColor: black, borderWidth: 10 
      }}

    >
      <ImageBackground source={image_bg} style={{ paddingVertical: 50, paddingHorizontal: 20 }}>

        <Image
          source={image_no_data}
          style={{
            alignSelf: 'flex-start',
            width: 70, height: 70, borderRadius: 70 / 2, backgroundColor: 'yellow',
            borderColor: red, borderWidth: 2
          }}
        />
        <Text style={{
          fontFamily: 'Raleway-Bold',
          fontSize: 16,
          marginLeft: 0,
          color: white,
          marginTop: 10
        }}>
          Ankit Singh
        </Text>
        <Text style={{
          fontFamily: 'Raleway-Bold',
          fontSize: 16,
          marginLeft: 0,
          color: white
        }}>
          ankitsingh9758@gmail.com
        </Text>
      </ImageBackground>
      <View style={{ flex: 1, backgroundColor: white, paddingTop: 20 }}>
        {/* <DrawerItemList 
        {...props} 
      
        
        /> */}

        <DrawerItem
          label="Home"
          activeBackgroundColor='#aa1bea'
          icon={({ color, size }) => <Image source={image_home} style={{ height: 24, width: 24,tintColor:getCurrentRouteName() === 'HomeScreen'?white:black }} />}
       
          onPress={() => navigateToScreen('HomeScreen')}
          focused={getCurrentRouteName() === 'HomeScreen'} // Check if the current route name is 'Home'
          labelStyle={getCurrentRouteName() === 'HomeScreen' ? styles.selectedLabel : styles.unselectedLabel} // Apply different styles based on focus

        />
        <DrawerItem
          icon={({ color, size }) => <Image source={image_chat} style={{ height: 24, width: 24,tintColor:getCurrentRouteName() === 'ChatList'?white:black }} />}
          label="Chats"
          activeBackgroundColor='#aa1bea'
          
          onPress={() => navigateToScreen('ChatList')}
          focused={getCurrentRouteName() === 'ChatList'} // Check if the current route name is 'Settings'
          labelStyle={getCurrentRouteName() === 'ChatList' ? styles.selectedLabel : styles.unselectedLabel} // Apply different styles based on focus
        />

        <DrawerItem
          label="Navigation"
          activeBackgroundColor='#aa1bea'
          icon={({ color, size }) => <Image source={image_navigation} style={{ height: 24, width: 24,tintColor:getCurrentRouteName() === 'BottomNavigation'?white:black }}  />}
         
          onPress={() => {

            navigateToScreen('BottomNavigation')
        
          }}
          focused={getCurrentRouteName() === 'BottomNavigation'} // Check if the current route name is 'Settings'
          labelStyle={getCurrentRouteName() === 'BottomNavigation' ? styles.selectedLabel : styles.unselectedLabel} // Apply different styles based on focus
        />


      </View>

    </DrawerContentScrollView>
    <View style={{ borderTopWidth: 1, borderTopColor: black, paddingVertical: 10, paddingHorizontal: 20 }}>
      <TouchableOpacity onPress={() => { }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
          <Image source={image_add} style={{ height: 24, width: 24 }} />
          <Text style={{
            fontFamily: 'Raleway-Black',
            fontSize: 16,
            marginLeft: 15
          }}>
            Tell Your Friend
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
          <Image source={image_logout} style={{ height: 24, width: 24 }} />
          <Text style={{
            fontFamily: 'Raleway-Black',
            fontSize: 16,
            marginLeft: 15
          }}>
            Sign Out
          </Text>
        </View>
      </TouchableOpacity>

    </View>
  </View>)
};

const styles = StyleSheet.create({
  selectedLabel: {
    fontFamily: 'Raleway-Black',
    fontSize: 20,
    color: white // Customize the font color for selected items
  },
  unselectedLabel: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    color: black // Customize the font color for unselected items
  }
});
