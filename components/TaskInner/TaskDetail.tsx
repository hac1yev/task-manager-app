"use client";

import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TaskInnerRightbar from "./TaskInnerRightbar";
import { useTypedTaskDetailSelector } from "@/store/taskDetail-slice";

const TaskDetail = ({ userNames, taskId }: TaskDetailType) => {
    const taskData = useTypedTaskDetailSelector(state => state.taskDetailReducer.taskDetailData);
    const colors = ['#D18805', '#1A65E9', '#0B8A49', '#D83121', '#6D36D4'];
    
    return (
        <Box sx={{ p: 1 }}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                    <Box className="flex-column-start">
                        <Box className="flex-start" sx={{ gap: '10px' }}>
                            <Box className="flex-center" sx={{
                                    color:
                                        taskData?.priority_level === "MEDIUM"
                                        ? "#D08803"
                                        : taskData?.priority_level === "HIGH"
                                        ? "#E7391A"
                                        :  taskData?.priority_level === "LOW" 
                                        ? "#0C9046" : "#fff",
                                    bgcolor: taskData?.priority_level === "MEDIUM"
                                        ? "rgba(208, 136, 3, 0.2)"
                                        : taskData?.priority_level === "HIGH"
                                        ? "rgba(231, 57, 26, 0.2)"
                                        : taskData?.priority_level === "LOW"
                                        ? "rgba(12, 144, 70, 0.2)" : '#fff',
                                    p: '4px 15px',
                                    borderRadius: '20px'
                                }}
                            >
                                {taskData?.priority_level === "MEDIUM" && (
                                    <>
                                        <KeyboardArrowUpIcon />
                                        MEDIUM PRIORITY
                                    </>
                                )}
                                {taskData?.priority_level === "HIGH" && (
                                    <>
                                        <KeyboardDoubleArrowUpIcon />
                                        HIGH PRIORITY
                                    </>
                                )}
                                {taskData?.priority_level === "LOW" && (
                                    <>
                                        <KeyboardArrowDownIcon />
                                        LOW PRIORITY
                                    </>
                                )}
                            </Box>
                            <Box className="flex-center" sx={{ gap: "5px" }}>
                                <Box sx={{ bgcolor: taskData?.priority_level === "MEDIUM"
                                        ? "#D08803"
                                        : taskData?.priority_level === "HIGH"
                                        ? "#E7391A"
                                        :  taskData?.priority_level === "LOW" 
                                        ? "#0C9046" : "#fff", width: '15px', height: '15px', flexShrink: 0, borderRadius: '50%' }}></Box>
                                IN PROGRESS
                            </Box>
                        </Box>
                        <Typography variant="subtitle1" sx={{ my: 3 }}>
                            Created At: {taskData && new Date(taskData?.created_at).toDateString()}
                        </Typography>
                        <Divider sx={{ width: '100%', mt: 1 }} />   
                        <Typography variant="subtitle1" sx={{ fontSize: '17px', mt: 2 }}>TASK TEAM</Typography>
                        <List sx={{ width: '100%', maxWidth: 360, mt: 1 }}>
                            {userNames.map((user,index) => (
                                <Box key={user.id}>
                                    <ListItem sx={{ p:0 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: colors[index % colors.length] }}>
                                                {user.fullName.split(" ").map(u => u[0].toLocaleUpperCase()).join("")}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={user.fullName} secondary={user.title} />
                                    </ListItem>
                                </Box>
                            ))}
                        </List>
                        <Divider sx={{ width: '100%', mt: 2 }} />   
                        <Typography variant="subtitle1" sx={{ fontSize: '17px', mt: 3 }}>SUB-TASKS: {taskData?.subtask.length}</Typography>
                        {taskData && taskData?.subtask.length > 0 ? (
                            <List sx={{ width: '100%', maxWidth: 360, mt: 1 }}>
                                {taskData.subtask.map((sub_task) => (
                                    <ListItem sx={{ p:0 }} key={sub_task._id}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: 'rgba(109, 54, 212, 0.1)' }}>
                                                <TaskAltIcon sx={{ color: '#6D36D4' }} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={
                                            <Box className="flex-start" sx={{ gap: '5px' }}>
                                                <Typography variant="subtitle1">{new Date(sub_task.date).toDateString()}</Typography>
                                                <Typography variant="subtitle1" sx={{ bgcolor: 'rgba(109, 54, 212, 0.1)', color: '#6D36D4', p: '2px 8px', borderRadius: '20px' }}>{sub_task.tag}</Typography>
                                            </Box>
                                        } secondary={sub_task.title} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <b style={{ color: '#555', marginTop: '5px' }}>There is no sub-task!</b>
                        )}
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6  }}>
                    <TaskInnerRightbar taskId={taskId} userNames={userNames} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default TaskDetail;