import { createSlice } from "@reduxjs/toolkit";
import  { USER_DATA } from '../../../utils/AppConstant'

export const UserDataSlice = createSlice({
   name:USER_DATA ,
   initialState: {
      data: {}
   },
   reducers: {
      addUserData(state, action) {
         state.data=action.payload
      },
   }

})
export const { addUserData } = UserDataSlice.actions
export default UserDataSlice.reducer