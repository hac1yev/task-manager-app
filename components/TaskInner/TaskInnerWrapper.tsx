"use client";

import { Box } from "@mui/material";
import './TaskInner.css';
import TeamApiCall from '../HOC/TeamApiCall';
import TaskInnerContainer from './TaskInnerContainer';

const HOCTaskInnerContainer = TeamApiCall(TaskInnerContainer);

const TaskInnerWrapper = ({ taskId }: { taskId: string }) => {
    return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
            <HOCTaskInnerContainer taskId={taskId} />
        </Box>
    );
};

export default TaskInnerWrapper;