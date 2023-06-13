const { configureStore } = require('@reduxjs/toolkit')

import AddressReducers from './slices/AddressSlice'
import WishlistReducers from './slices/Wishlistslice'

export const store = configureStore({
  reducer: {
    address: AddressReducers,
    wishlists: WishlistReducers
  }
})