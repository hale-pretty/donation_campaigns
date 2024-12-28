import { createSlice } from "@reduxjs/toolkit";

const campaignSlice = createSlice({
    name: "campaign",
    initialState: { 
        campaigns: [],
        editing_campaign: {},
        donations: [],
    },
    reducers: {
        updateCampaigns(state, action) {
            const payload = action.payload;
            state.campaigns = payload;
        },
        update_current_campaign(state, action) {
            const payload = action.payload;
            state.editing_campaign = payload;
        },
        update_donations(state, action) {
            const payload = action.payload;
            state.donations.push(payload);
        }
    }
})

export const campaignActions = campaignSlice.actions;

export default campaignSlice;
