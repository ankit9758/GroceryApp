import { createSlice } from "@reduxjs/toolkit";

export const WishlistSlice=createSlice({
   name:'wishlistData',
   initialState:{
    data:[]
   },
   reducers:{
     addItemToWishList(state,action){
        state.data.push(action.payload)
        console.log('Heooooo',JSON.stringify(state.data))
     }
   }
   
})
export const {addItemToWishList}=WishlistSlice.actions
export default WishlistSlice.reducer