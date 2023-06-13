const { configureStore } = require('@reduxjs/toolkit')

import AddressReducers from './slices/AddressSlice'
import WishlistReducers from './slices/Wishlistslice'
import CartReducers from './slices/CartSlice'

export const store = configureStore({
  reducer: {
    address: AddressReducers,
    wishlistData: WishlistReducers,
    cartData:CartReducers
  }
})