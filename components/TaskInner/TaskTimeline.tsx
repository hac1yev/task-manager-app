"use client";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TimelineComponent from "./TimelineComponent";
import AddTimeline from "./AddTimeline";

const TaskTimeline = ({ taskId }: { taskId: string }) => {
    return (
        <Box sx={{ p: 1 }}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                    <TimelineComponent />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                    <AddTimeline taskId={taskId} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default TaskTimeline;