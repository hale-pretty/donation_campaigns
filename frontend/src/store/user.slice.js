import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { 
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJqdXBpdGVyMTIwMyIsInBhc3N3b3JkIjoiJDJiJDEwJDZZMGVsUnZvekNWMUlpLjhzV3UxOWVzZlpXOUNIcHBOMWJ3M1NtYmVqOG1sTkxpbk8uMEFpIiwiZW1haWwiOiJqdXBpdGVyMTIwM0BnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDI0LTEyLTE4IiwidXBkYXRlZEF0IjoiMjAyNC0xMi0xOCIsInVzZXJJc0xvZ2dlZEluIjp0cnVlLCJpYXQiOjE3MzQ4MDE5NzksImV4cCI6MjMzOTYwMTk3OX0.EBmBTPbnLE2JnCnvIQVarerIx3sxHz9LQJpZoeeKiFc",
        id: 5
    },
    reducers: {
        
    }
})

export const userActions = userSlice.actions;

export default userSlice;
