"use client";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TimelineComponent from "./TimelineComponent";
import AddTimeline from "./AddTimeline";
import { useEffect, useState } from "react";

const TaskTimeline = ({ taskId, userNames }: { taskId: string, userNames: {
    id: string;
    fullName: string;
    title: string;
}[] }) => {
    const [role,setRole] = useState("");

    useEffect(() => {
        const role = typeof window !== "undefined" && localStorage.getItem("userInfo") 
          ? JSON.parse(localStorage.getItem("userInfo") || "{}").role 
          : "";   
        
        setRole(role);
    }, []);

    return (
        <Box sx={{ p: 1 }}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                    <TimelineComponent />
                </Grid>
                {(role === 'admin' || role === 'editor') && (
                    <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                        <AddTimeline taskId={taskId} users={userNames} />
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default TaskTimeline;