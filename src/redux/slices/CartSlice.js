import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
   name: 'cartData',
   initialState: {
      //  data:{}
      data: []
   },
   reducers: {
      addItemToCart(state, action) {
         // {}
         // const id = action.payload.item.id;
         // state.data[id] = action.payload.item;
         state.data.push(action.payload)
         console.log('Heooooo', JSON.stringify(state.data))
      }
   }

})
export const { addItemToCart } = CartSlice.actions
export default CartSlice.reducer