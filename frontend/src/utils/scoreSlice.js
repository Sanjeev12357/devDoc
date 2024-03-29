import { createSlice } from "@reduxjs/toolkit";

const scoreSlice=createSlice({
    name:"score",
    initialState:{
        scores:0
    },
    reducers:{
        increaseScore:(state,action)=>{
            state.scores+=action.payload
        },
        decreaseScore:(state,action)=>{
            state.scores-=action.payload
        }
    }
})

export const {increaseScore,decreaseScore}=scoreSlice.actions;

export default scoreSlice.reducer;