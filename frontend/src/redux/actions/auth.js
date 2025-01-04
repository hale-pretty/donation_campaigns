import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile } from '~/apis/auth/auth';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (token, thunkAPI) => {
    try {
      const response = await getProfile(token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
