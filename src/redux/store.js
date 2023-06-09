const {configureStore} = require('@reduxjs/toolkit')

import AddressReducers from './slices/AddressSlice'


export const store =configureStore({reducer:{
  address:AddressReducers
}})