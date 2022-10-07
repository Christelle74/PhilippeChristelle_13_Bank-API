import { configureStore, combineReducers} from "@reduxjs/toolkit";
import { persistStore, persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from "redux-persist"
import storage from 'redux-persist/lib/storage'
import authReducer from "../features/auth/authSlice"

const persistConfig = {
    key: 'root',
    storage,
}
const reducers = combineReducers({
    auth: authReducer,
  });
const persistedReducer = persistReducer(persistConfig, reducers)


/**
 * [store description]
 * redux store creation with auth reducer
 * the reducer updates a different part of the application state corresponding to dispatched action
 * the store brings actions and reducer together and hold the application state
 * 
 */
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store
