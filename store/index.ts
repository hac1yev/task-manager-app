"use client";

import { configureStore } from "@reduxjs/toolkit";
import { teamSlice } from "./team-slice";
import { taskSlice } from "./task-slice";

export const store = configureStore({
    reducer: {
        teamReducer: teamSlice.reducer,
        taskReducer: taskSlice.reducer
    },
});