"use client";

import { Box } from "@mui/material";
import AddTask from "./AddTask";
import TasksApiCall from "../HOC/TasksApiCall";
import TeamApiCall from "../HOC/TeamApiCall";
import Tasks from "./Tasks";
import { useEffect } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { settingSliceActions } from "@/store/settings-slice";
import { useDispatch } from "react-redux";

const HOCAddTaskComponent = TeamApiCall(AddTask);
const HOCTasksComponent = TasksApiCall(Tasks);

const TasksWrapper = () => {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();

    useEffect(() => {
        (async function() {
          try {
            const response = await axiosPrivate.get("/api/settings");
            dispatch(settingSliceActions.getAllSettings(response.data.settings));
          } catch (error) {
            console.log(error);
          }
        })();
    }, [axiosPrivate,dispatch]);

    return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
            <HOCAddTaskComponent />
            <HOCTasksComponent />
        </Box>
    );
};

export default TasksWrapper;