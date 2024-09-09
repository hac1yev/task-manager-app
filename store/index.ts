"use client";

import { configureStore } from "@reduxjs/toolkit";
import { teamSlice } from "./team-slice";
import { taskSlice } from "./task-slice";
import { trashSlice } from "./trash-slice";

export const store = configureStore({
    reducer: {
        teamReducer: teamSlice.reducer,
        taskReducer: taskSlice.reducer,
        trashReducer: trashSlice.reducer
    },
});