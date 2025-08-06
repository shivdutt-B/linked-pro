import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setProfileLoading(state, action) {
      state.loading = action.payload;
    },
    setProfileError(state, action) {
      state.error = action.payload;
    },
    setProfileUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: () => {},
});

export const { setProfileLoading, setProfileError, setProfileUser } = profileSlice.actions;
export default profileSlice.reducer;
