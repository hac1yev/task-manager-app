"use client";

import { Box, LinearProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTypedTaskSelector } from "@/store/task-slice";
import { useTypedSelector } from "@/store/team-slice";
import { useEffect, useState } from "react";
import TaskList from "../Tasks/TaskList";

const Tasks = ({ stage }: { stage: string }) => {
    const allUsers = useTypedSelector(state => state.teamReducer.users);
    const tasks = useTypedTaskSelector(state => state.taskReducer.tasks);
    const [isLoading,setIsLoading] = useState(true);

    const modifiedTasks = tasks.map((task) => {
        const { users } = task;
        const userNames: {
            fullName: string;
            title: string;
            email: string;
        }[] = [];            

        users?.forEach((user) => {
            const findedUser = allUsers.find((u) => user === u._id);
            if(findedUser) {
                userNames.push({
                    fullName: findedUser?.fullName,
                    title: findedUser.title,
                    email: findedUser.email
                });
            }
        });
        
        return {
            ...task,
            users: userNames
        }
    });    
        
    const resultTasks = modifiedTasks.filter(task => {
        if(task.stage === stage) return task;
    });

    useEffect(() => {
        setIsLoading(false);
    }, [tasks]);    
    
    return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
            <Typography variant="h4" align="left" sx={{ mb: 2 }}>
                {stage === 'COMPLETED' && 'Completed Tasks'}
                {stage === 'IN PROGRESS' && 'In Progress Tasks'}
                {stage === 'TODO' && 'To Do Tasks'}
            </Typography>
            <Grid container spacing={2}>
                {resultTasks.map((task) => (
                    <Grid size={{ xs: 12, sm: 12, md: 4 }} key={task._id}>
                        <TaskList 
                            _id={task._id}
                            title={task.title}
                            priority_level={task.priority_level}
                            users={task.users}
                            subtask={task.subtask}
                            created_at={task.created_at}
                            comments={task.comments}
                        />
                    </Grid>
                ))}
            </Grid>
            {modifiedTasks.length === 0 && isLoading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}

            {modifiedTasks.length === 0 && !isLoading && (
                <Typography className="flex-center" variant='h6' sx={{ mt: 1 }}>
                    There is no task!
                </Typography>
            )}
        </Box>
    );
};

export default Tasks;