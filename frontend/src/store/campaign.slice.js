import { createSlice } from "@reduxjs/toolkit";

const campaignSlice = createSlice({
    name: "campaign",
    initialState: { 
        campaigns: []
    },
    reducers: {
        updateCampaigns(state, action) {
            const payload = action.payload;
            state.campaigns = payload;
        }
    }
})

export const campaignActions = campaignSlice.actions;

export default campaignSlice;
