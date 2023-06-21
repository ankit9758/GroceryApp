import {
  TouchableOpacity, Text, View, StyleSheet, FlatList, Image
} from "react-native"
import React, { useState, useRef, useEffect } from "react";
import { black, green, white } from "../../../../utils/color";
import { image_check } from "../../../../utils/images";
import { image_uncheck } from "../../../../utils/images";

const SecondScreen = () => {

  const [listData, setListData] = useState([{
    id: 1,
    name: "All",
    isChecked: false

  },
  {
    id: 2,
    name: "Apple",
    isChecked: false

  },
  {
    id: 3,
    name: "Mango",
    isChecked: false

  },
  {
    id: 4,
    name: "Banana",
    isChecked: false

  },
  {
    id: 5,
    name: "Orange",
    isChecked: false

  }])

  const selectcheckUncheck = (items, index) => {
    // console.log('item--', items.name)
    // console.log('index--', index)

    if (items.id == 1) {
      setListData((prevState) =>
        prevState.map((item) =>
          ({ ...item, isChecked: (items.isChecked ? false : true) }))
      );

    } else {
      setListData(
        listData.map((data) =>
          data.id === items.id
            ? { ...data, isChecked: !data.isChecked }
            : { ...data }

        )
      );
    }


    // console.log('check.....', areAllItemsSelected())
    areAllItemsSelected()
  }




  const areAllItemsSelected = () => {
    return listData.every((item) => {
     // if (item.id != 1) {
        item.isChecked
//}
    }
    );

  };
  console.log('check.....', areAllItemsSelected())

  return (<View style={{ backgroundColor: green, flex: 1 }}>
    <FlatList data={listData} showsVerticalScrollIndicator={false}

      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity onPress={() => {
            selectcheckUncheck(item, index)
          }}>
            <View style={styles.productItems}>
              <Image source={item.isChecked ? image_check : image_uncheck} style={{ height: 24, width: 24, marginHorizontal: 10 }} />
              <Text style={styles.description}>{item.name}</Text>
            </View>
            <View
              style={{
                backgroundColor: black,
                width: '100%',
                height: 1
              }}
            />
          </TouchableOpacity>
        )
      }
      }


      keyExtractor={(item, index) => index.toString()}

    />
  </View>)
}
export default SecondScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
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


  description: {
    fontSize: 14,
    color: black,

    fontFamily: 'Raleway-Regular',

  },



})
