import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

type SettingsState = {
    taskPageSettings: Partial<SettingsType>,
    taskDetailPageSettings: Partial<SettingsType>,
};

const initialNotificationState: SettingsState = {
    taskPageSettings: [],
    taskDetailPageSettings: []
};

export const settingSlice = createSlice({
    name: 'settingSlice',
    initialState: initialNotificationState,
    reducers: {
        getAllSettings(state,action) {
            state.taskPageSettings = action.payload;
        },
        getAllTaskDetailSettings(state,action) {
            state.taskDetailPageSettings = action.payload;
        }
    }
});

export const settingSliceActions = settingSlice.actions;

export const useTypedSettingSelector: TypedUseSelectorHook<{ settingReducer: SettingsState }> = useSelector;