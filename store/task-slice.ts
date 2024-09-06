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
        },
        addSubtaskToTask(state, action) {
            const indexOfTask = state.tasks.findIndex((item) => item._id === action.payload._id);
            
            if (indexOfTask !== -1) {
                state.tasks[indexOfTask] = {
                    ...state.tasks[indexOfTask],
                    subtask: [
                        ...(state.tasks[indexOfTask].subtask || []), 
                        action.payload.subtask
                    ]
                };
            }
        }
    }
});

export const taskSliceActions = taskSlice.actions;

export const useTypedTaskSelector: TypedUseSelectorHook<{ taskReducer: TaskState }> = useSelector;