// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import profileReduer from '../slice/profileSlice';
// import userSlice from "./userSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReduer
  },
});
