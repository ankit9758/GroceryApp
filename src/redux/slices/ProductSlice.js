import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
   name: 'productData',
   initialState: {
      data: []
   },
   reducers: {
      addProducts(state, action) {
         state.data=action.payload
        
      },
      likeDislikeProducts(state, action) {
         console.log('ProductSlice--Id',action.payload)
         state.data = state.data.map(item => {
            if(item.id == action.payload){
               item.isOnWishlist=!item.isOnWishlist
               
            }
            return item
         })
        
      //  console.log('ProductSlice',state.data)
      },
     
   }

})
export const { addProducts,likeDislikeProducts } = ProductSlice.actions
export default ProductSlice.reducer