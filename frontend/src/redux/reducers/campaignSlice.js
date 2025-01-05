import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    campaigns: [],
};

const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {
        setCampaign: (state, action) => {
            state.campaigns = action.payload;
        },
    },
});

export const { setCampaign } = campaignSlice.actions;
export default campaignSlice.reducer;
