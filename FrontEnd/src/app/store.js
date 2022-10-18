import { configureStore} from "@reduxjs/toolkit";
// import { persistStore, persistReducer} from "redux-persist"
// import storage from 'redux-persist/lib/storage'
import authReducer from "../features/auth/authSlice"
//import thunk from 'redux-thunk';

// const persistConfig = {
//     key: 'root',
//     storage,
// }
// const reducers = combineReducers({
//     auth: authReducer,
//   });
// const persistedReducer = persistReducer(persistConfig, reducers)


// /**
//  * [store description]
//  * redux store creation with auth reducer
//  * the reducer updates a different part of the application state corresponding to dispatched action
//  * the store brings actions and reducer together and hold the application state
//  * 
//  */
// const store = configureStore({
//     reducer: persistedReducer,
//     devTools: process.env.NODE_ENV !== 'production',
//     middleware: [thunk]
// })

// export const persistor = persistStore(store)
// export default store


 const store = configureStore({
   reducer : {
     auth: authReducer
   }
 })
 export default store