"use client";

import { useTypedSelector } from "@/store/team-slice";
import { CustomTabPanel } from "../MaterialSnippets/MaterialSnippets";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Box, LinearProgress, Tab, Tabs, Typography } from "@mui/material";
import { a11yProps } from '../MaterialSnippets/MaterialSnippets';
import TaskDetail from "./TaskDetail";
import { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { taskDetailSliceActions, useTypedTaskDetailSelector } from "@/store/taskDetail-slice";
import TaskTimeline from "./TaskTimeline";

const TaskInnerContainer = ({ taskId }: { taskId: string }) => {
    const allUsers = useTypedSelector(state => state.teamReducer.users);
    const taskData = useTypedTaskDetailSelector(state => state.taskDetailReducer.taskDetailData);
    const [userNames, setUserNames] = useState<{ fullName: string; title: string }[]>([]);
    const [isLoading,setIsLoading] = useState(true);
    const [value, setValue] = useState(0);
    const axiosPrivate = useAxiosPrivate();        
    const dispatch = useDispatch();

    const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }, []);

    useEffect(() => {
        (async function() {
            setIsLoading(true);
            try {
                const response = await axiosPrivate.get(`/api/tasks/${taskId}`);
                const taskDetailData = response.data.data;
                delete taskDetailData.__v;
                dispatch(taskDetailSliceActions.getTaskDetailData(taskDetailData));
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        })();
    }, [axiosPrivate, taskId, dispatch]);

    useEffect(() => {
        if(taskData) {
            const { users } = taskData;
            const userNames: {
                fullName: string;
                title: string;
            }[] = [];            
    
            users?.forEach((user) => {
                const findedUser = allUsers.find((u) => user === u._id);
                
                if(findedUser) {
                    userNames.push({
                        fullName: findedUser?.fullName,
                        title: findedUser.title,
                    });
                }
            });

            setUserNames(userNames);
            
        }
    }, [allUsers,taskData]);        

    return (
        <>
            <Typography align="left" variant="h4" sx={{ pb: 2 }}>{taskData?.title}</Typography>
            <Box sx={{ width: 'max-content', background: 'transparent' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    className="task-inner-tabs"
                >
                    <Tab label={
                        <Box className="flex-center" sx={{ gap: '5px' }}>
                            <FormatListBulletedIcon/> 
                            <Typography component="span" sx={{ textTransform: 'capitalize' }}>Task Detail</Typography>
                        </Box>
                    } sx={{ bgcolor: 'background.paper' }} {...a11yProps(0)} />
                    <Tab label={
                        <Box className="flex-center" sx={{ gap: '5px' }}>
                            <TimelineIcon/> 
                            <Typography component="span" sx={{ textTransform: 'capitalize' }}>Activities/Timeline</Typography>
                        </Box>
                    } sx={{ bgcolor: 'background.paper' }} {...a11yProps(1)} />
                </Tabs>
            </Box>
            {taskData._id === taskId && (
                <>
                    <CustomTabPanel value={value} index={0}>
                        <TaskDetail userNames={userNames} taskId={taskId} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <TaskTimeline taskId={taskId} />
                    </CustomTabPanel>
                </>
            )}
            {!(taskData?._id === taskId) && isLoading && (
                <Box sx={{ width: '100%', bgcolor: '#fff', p: 4, mt: 2 }}>
                    <LinearProgress />
                </Box>
            )}
            {!(taskData?._id === taskId) && !isLoading && (
                <Typography className="flex-center" variant='h6' sx={{ mt: 2 }}>
                    There is no task data!
                </Typography>
            )}
        </>
    );
};

export default TaskInnerContainer;