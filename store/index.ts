"use client";

import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth-slice";

export const store = configureStore({
    reducer: {
        authReducer: authSlice.reducer,
    },
});