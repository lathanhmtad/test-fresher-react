import { combineReducers, configureStore } from '@reduxjs/toolkit'

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import themeReducer from './slices/themeSlice'
import roleReducer from './slices/roleSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    backlist: ['role']
};

const reducers = combineReducers({
    theme: themeReducer,
    role: roleReducer
});

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})


export default store




