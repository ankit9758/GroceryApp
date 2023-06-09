import { createSlice } from "@reduxjs/toolkit";

export const WishlistSlice = createSlice({
   name: 'wishlistData',
   initialState: {
      data: []
   },
   reducers: {
      addItemToWishList(state, action) {

         if (state.data.id !== action.payload.id) {
            state.data.push(action.payload)
         }

         // console.log('Heooooo', JSON.stringify(state.data))
      },
      removeItemFromWishList(state, action) {

         let newArr = state.data.filter(item => {
            return item.id !== action.payload.id
         })

         state.data = newArr
      },
   }

})
export const { addItemToWishList, removeItemFromWishList } = WishlistSlice.actions
export default WishlistSlice.reducer