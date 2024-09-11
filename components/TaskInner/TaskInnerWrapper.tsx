"use client";

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { a11yProps, CustomTabPanel } from '../MaterialSnippets/MaterialSnippets';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import './TaskInner.css';
import { useTypedSelector } from '@/store/team-slice';
import TaskDetail from './TaskDetail';

const TaskInnerWrapper = ({ taskId }: { taskId: string }) => {
    const allUsers = useTypedSelector(state => state.teamReducer.users);
    const [taskData,setTaskData] = useState<TaskSliceType | null>(null);
    const [userNames, setUserNames] = useState<{ fullName: string; title: string }[]>([]);

    const axiosPrivate = useAxiosPrivate();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    useEffect(() => {
        (async function() {
            try {
                const response = await axiosPrivate.get(`/api/tasks/${taskId}`);
                setTaskData(response.data.data)
            } catch (error) {
                console.log(error);
            }
        })();
    }, [axiosPrivate, taskId]);

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
    }, []);

    return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
            <Typography align="left" variant="h4" sx={{ py: 2 }}>Duplicate - Review Code Changes</Typography>
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
            <CustomTabPanel value={value} index={0}>
                <TaskDetail taskData={taskData} userNames={userNames} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
        </Box>
    );
};

export default TaskInnerWrapper;