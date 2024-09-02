"use client";

import { createSlice } from "@reduxjs/toolkit";

const getUserInfo = () => {
    const userInfo = window.localStorage.getItem("userInfo");

    if(userInfo) {
        return JSON.parse(userInfo);
    }

    return {};
};

const initialAuthState = {
    userInfo: getUserInfo(),
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialAuthState,
    reducers: {
        getUserInfo(state,action) {
            state.userInfo = action.payload;
        }
    }
});

export const authSliceAction = authSlice.actions;