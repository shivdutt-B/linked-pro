// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
      sessionStorage.removeItem('token'); // Clear token on logout
    },
    stopLoading: (state) => {
      state.loading = false;
    }
  },
});

export const { setUser, logout, setLoading, setError, stopLoading } = userSlice.actions;

export default userSlice.reducer;
