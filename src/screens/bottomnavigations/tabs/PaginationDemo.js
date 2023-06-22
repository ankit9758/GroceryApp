import {
  TouchableOpacity, Text, View, StyleSheet, FlatList, ActivityIndicator, Button
} from "react-native"
import React, { useState, useRef, useEffect } from "react";
import { black, green, red, white } from "../../../../utils/color";
import { image_check, image_uncheck } from "../../../../utils/images";
import { callPaginationApiWithoutParams } from "../../../../utils/NetworkRequestHandler";
import { PASSENGER_DATA } from "../../../../utils/AppConstant";
import NoDataFound from "../../../common/NoDatafound";


const PaginationDemo = () => {
  const [artistData, setArtistData] = useState([])
  const [page, setPage] = useState(0)

  const [isLoading, setIsLoading] = useState(false); // Loading state indicator
  const [isLoadMore, setIsLoadMore] = useState(false); // Loading More  state indicator
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getArtisrtList()

  }, [])

  const handleRefresh = () => {
    setPage(0)
    setArtistData([])
    setOnOffLoading(true)
    getArtisrtList();
  };

  const setOnOffLoading = (loding) => {
    if (isLoadMore) {
      return;  // Prevent multiple simultaneous requests
    }
    if (loding) {
      if (page == 0) {
        setIsLoading(true)
      } else {
        setIsLoadMore(true)
      }
    } else {
      setIsLoading(false)
      setIsLoadMore(false)
    }

  }

  const getArtisrtList = () => {
    setOnOffLoading(true)
    callPaginationApiWithoutParams('GET', PASSENGER_DATA + '?page=' + page + '&size=20')
      .then((response) => {

        setOnOffLoading(false)

        setRefreshing(false);
        if (artistData.length > 0) {
          setArtistData([...artistData, ...response.data.data]);
        } else {
          setArtistData(response.data.data)
        }

        setPage(prevPage => prevPage + 1);


        //console.log('Okkkkkkkkkkkkkk', response.data)
      })
      .catch((error) => {
        setOnOffLoading(false)
        setRefreshing(false);
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
  console.log('use Effect', artistData)
  return (<View style={styles.container}>
    {isLoading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={70} color="#0000ff" />
    </View>) : (
      <FlatList data={artistData} showsVerticalScrollIndicator={false}

        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => {

            }}>
              <View style={styles.productItems}>


                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.trips}</Text>
              </View>
              <View
                style={{
                  backgroundColor: black,
                  width: '100%',
                  height: 1
                }} name
              />
            </TouchableOpacity>
          )
        }
        }
        onEndReachedThreshold={0.5}
        // onEndReached={getArtisrtList()}

        ListEmptyComponent={
          <NoDataFound description={'Please check your internet connection'}
            btnText={'Refresh'} onclick={() => { handleRefresh() }} />
        }
        ListFooterComponent={

          isLoadMore ? (
            // Render a loading indicator
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text>Loading....</Text>
              <ActivityIndicator size={40} color="#0000ff" />
            </View>
          ) : (
            // Render the "Load More" button
            <Button title="Load More" onPress={getArtisrtList} disabled={isLoadMore} />
          )


        }
        onEndReached={getArtisrtList} // Trigger load more when reaching the end
        keyExtractor={(item, index) => index.toString()}

      />)}
  </View>
  )

}
export default PaginationDemo;

const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: green
  },


  productItems: {
    width: '100%',
    paddingVertical: 5,
    // marginTop: 10,
    flexDirection: 'column',
    alignContent: 'center',
    // borderRadius: 10,
    //  elevation: 5,
    paddingHorizontal: 5,
    backgroundColor: white

  },

  name: {
    fontSize: 20,
    color: black,

    fontFamily: 'Raleway-Black',

  },
  description: {
    fontSize: 14,
    color: black,

    fontFamily: 'Raleway-Regular',

  },



})
