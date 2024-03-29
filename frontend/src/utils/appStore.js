import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./scoreSlice";
import reportReducer from "./reportSlice";
const appStore=configureStore({
    reducer:{
        score:scoreReducer ,
        report:reportReducer  
    }
})

export default appStore;