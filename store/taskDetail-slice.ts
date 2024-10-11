import { createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

interface TaskDetailState {
  taskDetailData: TaskSliceType;
}

const initialTaskDetailState: TaskDetailState = {
  taskDetailData: {
    _id: "",
    title: "",
    users: [],
    stage: "",
    priority_level: "",
    created_at: "",
    subtask: [],
    comments: [],
    activities: [],
  },
};

export const taskDetailSlice = createSlice({
  name: "taskDetailSlice",
  initialState: initialTaskDetailState,
  reducers: {
    getTaskDetailData(state, action) {
      state.taskDetailData = { ...action.payload };
    },
    addComment(state, action) {
      state.taskDetailData = {
        ...state.taskDetailData,
        comments: [
          ...state.taskDetailData.comments, 
          { ...action.payload }
        ]
      };
    },
    deleteComment(state,action) {
      const filteredComments = state.taskDetailData.comments.filter(comment => comment._id !== action.payload);
      state.taskDetailData = {
        ...state.taskDetailData,
        comments: filteredComments
      };
    },
    addActivities(state,action) {
      state.taskDetailData = {
        ...state.taskDetailData,
        activities: [
          ...state.taskDetailData.activities, 
          { ...action.payload }
        ]
      };
    }
  },
});

export const taskDetailSliceActions = taskDetailSlice.actions;

export const useTypedTaskDetailSelector: TypedUseSelectorHook<{
  taskDetailReducer: TaskDetailState;
}> = useSelector;
