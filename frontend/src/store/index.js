import { configureStore } from "@reduxjs/toolkit";
import campaignSlice from "./campaign.slice";
import userSlice from "./user.slice";

export const store = configureStore({
    reducer: {
        campaign: campaignSlice.reducer,
        user: userSlice.reducer,
    },
});

export default store;
