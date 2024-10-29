import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

type NotificationState = {
    notifications: Partial<NotificationType>[]
};

const initialNotificationState: NotificationState = {
    notifications: [],
};

export const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState: initialNotificationState,
    reducers: {
        getAllNotifications(state,action) {
            state.notifications = action.payload;
        },
        addNotification(state,action) {
            state.notifications = [
                ...state.notifications,
                action.payload
            ];
        },
        readAllNotification(state,action) {
            state.notifications = state.notifications.map((notification) => {
                if(!notification.isReadUsers?.includes(action.payload)) {
                    notification.isReadUsers?.push(action.payload);
                }

                return notification;
            });
        }
    }
});

export const notificationSliceActions = notificationSlice.actions;

export const useTypedNotificationSelector: TypedUseSelectorHook<{ notificationReducer: NotificationState }> = useSelector;