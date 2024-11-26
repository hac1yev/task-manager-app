"use client";

import { Box } from "@mui/material";
import './TaskInner.css';
import TeamApiCall from '../HOC/TeamApiCall';
import TaskInnerContainer from './TaskInnerContainer';
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { settingSliceActions } from "@/store/settings-slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const HOCTaskInnerContainer = TeamApiCall(TaskInnerContainer);

const TaskInnerWrapper = ({ taskId }: { taskId: string }) => {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();

    useEffect(() => {
        (async function() {
          try {
            const response = await axiosPrivate.get("/api/settings");
            dispatch(settingSliceActions.getAllTaskDetailSettings(response.data.settings));
          } catch (error) {
            console.log(error);
          }
        })();
      }, [axiosPrivate,dispatch]);

    return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
            <HOCTaskInnerContainer taskId={taskId} />
        </Box>
    );
};

export default TaskInnerWrapper;