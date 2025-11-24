// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './store/slices/userSlice';
import appReducer from './store/slices/appSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        app: appReducer,
    },
});

export default store;
