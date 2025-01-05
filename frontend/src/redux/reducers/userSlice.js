import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  avatarUrl: '',
  bio: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload.getCurrentUser };
    },
    clearUser: () => initialState
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
