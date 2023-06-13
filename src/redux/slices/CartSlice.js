import { createSlice } from "@reduxjs/toolkit";

export const CartSlice=createSlice({
   name:'cartData',
   initialState:{
    data:[]
   },
   reducers:{
     addItemToCart(state,action){
        state.data.push(action.payload)
        console.log('Heooooo',JSON.stringify(state.data))
     }
   }
   
})
export const {addItemToCart}=CartSlice.actions
export default CartSlice.reducer