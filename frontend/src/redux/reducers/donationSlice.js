import { createSlice } from '@reduxjs/toolkit';

const donationSlice = createSlice({
  name: 'donation',
  initialState: {
    donations: [],
    loading: false, 
    error: null, 
  },
  reducers: {
    fetchDonationsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDonationsSuccess(state, action) {
      state.donations = action.payload;
      state.loading = false;
    },
    fetchDonationsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addDonation(state, action) {
      state.donations.push(action.payload);
    },
  },
});

export const {
  fetchDonationsStart,
  fetchDonationsSuccess,
  fetchDonationsFailure,
  addDonation,
} = donationSlice.actions;

export default donationSlice.reducer;