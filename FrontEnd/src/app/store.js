import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"


//redux store creation with auth reducer
//the reducer updates a different part of the application state corresponding to dispatched action

// the store brings actions and reducer together and hold the application state


const store = configureStore({
    reducer: {
        auth:authReducer
    }
})
export default store