"use client";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Box, Typography } from "@mui/material";
import { useTypedTaskDetailSelector } from "@/store/taskDetail-slice";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import AddTaskIcon from "@mui/icons-material/AddTask";
import PestControlIcon from "@mui/icons-material/PestControl";
import CachedIcon from "@mui/icons-material/Cached";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import moment from "moment";

const TimelineComponent = () => {
    const taskData = useTypedTaskDetailSelector(state => state.taskDetailReducer.taskDetailData);    

    const getIcon = (name: string) => {
        switch(name) {
            case 'Started':
                return (
                    <TimelineDot sx={{ bgcolor: 'primary.main' }}>
                        <ThumbUpIcon />
                    </TimelineDot>
                );
            case 'Completed':
                return (
                    <TimelineDot sx={{ bgcolor: 'green' }}>
                        <AddTaskIcon />
                    </TimelineDot>
                );
            case 'In Progress':
                return (
                    <TimelineDot sx={{ bgcolor: '#0B6F70' }}>
                        <CachedIcon />
                    </TimelineDot>
                );
            case 'Commented':
                return (
                    <TimelineDot sx={{ bgcolor: '#6B7283' }}>
                        <CommentIcon />
                    </TimelineDot>
                );
            case 'Bug':
                return (
                    <TimelineDot sx={{ bgcolor: '#fff' }}>
                        <PestControlIcon sx={{ color: 'red' }} />
                    </TimelineDot>
                );
            case 'Assigned':
                return (
                    <TimelineDot sx={{ bgcolor: '#FDA003' }}>
                        <AssignmentLateIcon />
                    </TimelineDot>
                );
            default:
                return null;
        }
    };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Activities</Typography>
      <Timeline className="timeline-container">
        {taskData?.activities?.map((item) => (
            <TimelineItem key={item.name}>
                <TimelineSeparator>
                    {getIcon(item.name)}
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                <Box className="flex-column-start">
                    <Typography variant={'h6'}>{item.description}</Typography>
                    <Box className="flex-start" sx={{ gap: '5px' }}>
                        <Typography variant={"subtitle1"}>{item.name}</Typography>
                        <Typography variant={"subtitle1"}>{moment(item.created_at).fromNow()}</Typography>
                    </Box>
                </Box>
                </TimelineContent>
            </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default TimelineComponent;
