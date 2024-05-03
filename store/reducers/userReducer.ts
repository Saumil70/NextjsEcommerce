import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    isLoggedin: boolean;
}

const initialState: UserState = {
    isLoggedin: false,
};

export const loginSlice = createSlice({
    name: "user",
    initialState,
    
    reducers: {
        login: (state) => {
            state.isLoggedin = true;
        },
        logout: (state) => {
            state.isLoggedin = false;
        },
    },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;