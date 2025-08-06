// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
// import userSlice from "./userSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
