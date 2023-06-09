import { createSlice } from "@reduxjs/toolkit";

export const AddressSlice = createSlice({
    name: 'address',
    initialState: {
        data: []
    },
    reducers: {
        addAddress(state, action) {
            state.data.push(action.payload)
        }
    }
}) 
export const {addAddress}=AddressSlice.actions
export default AddressSlice.reducer