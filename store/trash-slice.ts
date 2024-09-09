import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

interface TrashState {
    trashTasks: Partial<TaskSliceType>[];
};

const initialTrashState: TrashState = {
    trashTasks: []
};

export const trashSlice = createSlice({
    name: 'trashSlice',
    initialState: initialTrashState,
    reducers: {
        getAllTrash(state, action) {
            state.trashTasks = action.payload
        },
        addtrash(state, action) {
            state.trashTasks = [
                ...state.trashTasks,
                action.payload
            ]
        },
        deleteOne(state,action) {
            state.trashTasks = state.trashTasks.filter((task) => task._id !== action.payload);
        },
        deleteAll(state) {
            state.trashTasks = [];
        }
    }
});

export const trashSliceActions = trashSlice.actions;

export const useTypedTrashSelector: TypedUseSelectorHook<{ trashReducer: TrashState }> = useSelector;