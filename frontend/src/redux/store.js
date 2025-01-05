import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import campaignReducer from "./reducers/campaignSlice";
import donationsReducer from "./reducers/donationSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    campaign: campaignReducer,
    donations: donationsReducer,
  },
});
