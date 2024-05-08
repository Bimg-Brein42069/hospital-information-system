import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//combine all the reducers
const rootReducer = combineReducers({user: userReducer});

//specify config for the persisted reducer
const persistConfig = {
    key: 'root', //key for local storage
    version: 1,
    storage, //specified the local storage
}

//make a persisted reducer with the config
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);