import { createSlice } from "@reduxjs/toolkit";

const reportSlice=createSlice({
    name:"report",
    initialState:[],
    reducers:{
        addReducer:(state,action)=>{
            state.push(action.payload)
        }
    }
})

export const {addReducer}=reportSlice.actions;
export default reportSlice.reducer;