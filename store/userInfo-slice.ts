import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

interface UserInfoState {
    userInfo: Partial<UserInfo>;
};

const initialUserInfoState: UserInfoState = {
    userInfo: {}
};

export const userInfoSlice = createSlice({
    name: 'userInfoSlice',
    initialState: initialUserInfoState,
    reducers: {
        getUserInfo(state,action) {
            state.userInfo = action.payload
        },
        editUserInfo(state,action){
            state.userInfo = {
                ...state.userInfo,
                ...action.payload
            }
        }
    }
});

export const userInfoSliceActions = userInfoSlice.actions;

export const useTypedUserInfoSelector: TypedUseSelectorHook<{ userInfoReducer: UserInfoState }> = useSelector;