"use client";

import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

interface TeamState {
    users: Array<{ 
        created_at: string 
        _id: string; 
        fullName: string; 
        email: string; 
        role: string; 
        title: string; 
        status: string, 
    }>;
}

const initialTeamState: TeamState = {
    users: []
};

export const teamSlice = createSlice({
    name: 'teamSlice',
    initialState: initialTeamState,
    reducers: {
        getAllUsers(state,action) {
            state.users = action.payload;
        },
        addUser(state,action) {
            state.users = [...state.users, action.payload];
        }
    }
});

export const teamSliceAction = teamSlice.actions;

export const useTypedSelector: TypedUseSelectorHook<{ teamReducer: TeamState }> = useSelector;