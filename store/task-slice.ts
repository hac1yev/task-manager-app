import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

interface TaskState {
    tasks: Partial<TaskSliceType>[];
};

const initialTaskState: TaskState = {
    tasks: []
};

export const taskSlice = createSlice({
    name: 'taskSlice',
    initialState: initialTaskState,
    reducers: {
        getAllTasks(state, action) {
            state.tasks = action.payload
        },
        addTask(state, action) {
            state.tasks = [
                ...state.tasks,
                action.payload
            ]
        }
    }
});

export const taskSliceActions = taskSlice.actions;

export const useTypedTaskSelector: TypedUseSelectorHook<{ taskReducer: TaskState }> = useSelector;