import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
    },
    reducers: {
        update_auth_user(state, action) {
            const payload = action.payload;
            state.info = payload;
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice;
