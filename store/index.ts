"use client";

import { configureStore } from "@reduxjs/toolkit";
import { teamSlice } from "./team-slice";

export const store = configureStore({
    reducer: {
        teamReducer: teamSlice.reducer,
    },
});