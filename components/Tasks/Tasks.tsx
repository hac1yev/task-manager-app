"use client";

import { Box, IconButton, LinearProgress, Typography } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Item } from "../MaterialSnippets/MaterialSnippets";
import Grid from "@mui/material/Grid2";
import { useTypedTaskSelector } from "@/store/task-slice";
import InProgressList from "./InProgressList";
import ToDoList from "./ToDoList";
import CompletedList from "./CompletedList";
import { useTypedSelector } from "@/store/team-slice";
import { useEffect, useState } from "react";

const Tasks = () => {
    const allUsers = useTypedSelector(state => state.teamReducer.users);
    const tasks = useTypedTaskSelector(state => state.taskReducer.tasks);
    const [isLoading,setIsLoading] = useState(true);

    const modifiedTasks = tasks.map((task) => {
        const { users } = task;
        const userNames: string[] = [];

        users?.forEach((user) => {
            const findedUser = allUsers.find((u) => user === u._id);
            if(findedUser?.fullName) {
                userNames.push(findedUser?.fullName);
            }
        });
        
        return {
            ...task,
            users: [...userNames]
        }
    });
    
    const todoTasks = modifiedTasks.filter(task => {
        if(task.stage === 'TODO') return task;
    });
    const inProgressTasks = modifiedTasks.filter(task => {
        if(task.stage === 'IN PROGRESS') return task;
    });
    const completedTasks = modifiedTasks.filter(task => {
        if(task.stage === 'COMPLETED') return task;
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return clearTimeout(timeout);
    }, []);    

    return (
        <>
            <Grid container spacing={2}>
                <Grid container size={{ xs: 12, sm: 12, md: 4 }} className="flex-column-start">
                    <Grid size={12}>
                        <Item className="flex-between" sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Box 
                                    component={"span"} 
                                    sx={{ 
                                        bgcolor: 'primary.main', 
                                        borderRadius: '50%', 
                                        display: 'block', 
                                        height: '16px', 
                                        width: '16px', 
                                    }}></Box>
                                To Do
                            </Box>
                            <IconButton sx={{ p: 0.2 }}>
                                <AddOutlinedIcon sx={{ fontSize: '20px' }} />
                            </IconButton>
                        </Item>
                    </Grid>
                    <Grid size={12}>
                        {todoTasks.map((task) => (
                            <ToDoList  
                                key={task._id}  
                                title={task.title}
                                priority_level={task.priority_level}
                                users={task.users}
                                subtask={task.subtask}
                                created_at={task.created_at}
                            />
                        ))}
                    </Grid>
                </Grid>
                <Grid container size={{ xs: 12, sm: 12, md: 4 }} className="flex-column-start">
                    <Grid size={12}>
                        <Item className="flex-between" sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Box 
                                    component={"span"} 
                                    sx={{ 
                                        bgcolor: '#D08803', 
                                        borderRadius: '50%', 
                                        display: 'block', 
                                        height: '16px', 
                                        width: '16px', 
                                    }}></Box>
                                In Progress
                            </Box>
                            <IconButton sx={{ p: 0.2 }}>
                                <AddOutlinedIcon sx={{ fontSize: '20px' }} />
                            </IconButton>
                        </Item>
                    </Grid>
                    <Grid size={12}>
                        {inProgressTasks.map((task) => (
                            <InProgressList  
                                key={task._id}  
                                title={task.title}
                                priority_level={task.priority_level}
                                users={task.users}
                                subtask={task.subtask}
                                created_at={task.created_at}
                            />
                        ))}   
                    </Grid>
                </Grid>
                <Grid container size={{ xs: 12, sm: 12, md: 4 }} className="flex-column-start">
                    <Grid size={12}>
                        <Item className="flex-between" sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Box 
                                    component={"span"} 
                                    sx={{ 
                                        bgcolor: '#0C9046', 
                                        borderRadius: '50%', 
                                        display: 'block', 
                                        height: '16px', 
                                        width: '16px', 
                                    }}></Box>
                                Completed
                            </Box>
                            <IconButton sx={{ p: 0.2 }}>
                                <AddOutlinedIcon sx={{ fontSize: '20px' }} />
                            </IconButton>
                        </Item>
                    </Grid>
                    <Grid size={12}>
                        {completedTasks.map((task) => (
                            <CompletedList 
                                key={task._id}  
                                title={task.title}
                                priority_level={task.priority_level}
                                users={task.users}
                                subtask={task.subtask}
                                created_at={task.created_at}
                            />
                        ))}
                    </Grid>
                </Grid>
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
        </>
    );
};

export default Tasks;