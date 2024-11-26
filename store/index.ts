"use client";

import { configureStore } from "@reduxjs/toolkit";
import { teamSlice } from "./team-slice";
import { taskSlice } from "./task-slice";
import { trashSlice } from "./trash-slice";
import { taskDetailSlice } from "./taskDetail-slice";
import { notificationSlice } from "./notification-slice";
import { userInfoSlice } from "./userInfo-slice";
import { settingSlice } from "./settings-slice";

export const store = configureStore({
    reducer: {
        teamReducer: teamSlice.reducer,
        taskReducer: taskSlice.reducer,
        trashReducer: trashSlice.reducer,
        taskDetailReducer: taskDetailSlice.reducer,
        notificationReducer: notificationSlice.reducer,
        userInfoReducer: userInfoSlice.reducer,
        settingReducer: settingSlice.reducer
    },
});