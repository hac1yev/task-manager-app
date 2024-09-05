"use client";

import { Box } from "@mui/material";
import AddTask from "./AddTask";
import TasksApiCall from "../HOC/TasksApiCall";
import TeamApiCall from "../HOC/TeamApiCall";
import Tasks from "./Tasks";

const HOCAddTaskComponent = TeamApiCall(AddTask);
const HOCTasksComponent = TasksApiCall(Tasks);

const TasksWrapper = () => {
    return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
            <HOCAddTaskComponent />
            <HOCTasksComponent />
        </Box>
    );
};

export default TasksWrapper;