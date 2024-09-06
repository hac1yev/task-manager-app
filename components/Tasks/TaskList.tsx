"use client";

import { Item } from "../MaterialSnippets/MaterialSnippets";
import { Avatar, Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import React, { useMemo } from "react";
import CustomPopover from "../CustomPopover";

const TaskList = ({ title, priority_level, users, subtask, created_at }: Partial<TaskType>) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [userId,setUserId] = React.useState("");
  const colors = useMemo(() => {
    return ["#D18805", "#1A65E9", "#0B8A49", "#D83121", "#6D36D4"];
  }, []);

  const handlePopoverOpen = (id: string, event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setUserId(id);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setUserId("");
  };

  const open = Boolean(anchorEl);

  return (
    <Item sx={{ mb: 2 }}>
      <Box className="flex-column-start">
        <Box sx={{ width: "100%" }} className="flex-between">
          <Box
            className="flex-center"
            sx={{
              color:
                priority_level === "MEDIUM"
                  ? "#D08803"
                  : priority_level === "HIGH"
                  ? "#E7391A"
                  : "#0C9046",
            }}
          >
            {priority_level === "MEDIUM" && (
              <>
                <KeyboardArrowUpIcon />
                MEDIUM PRIORITY
              </>
            )}
            {priority_level === "HIGH" && (
              <>
                <KeyboardDoubleArrowUpIcon />
                HIGH PRIORITY
              </>
            )}
            {priority_level === "LOW" && (
                <>
                  <KeyboardArrowDownIcon />
                  LOW PRIORITY
                </>
            )}
          </Box>
          <IconButton>
            <MoreHorizOutlinedIcon />
          </IconButton>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: "5px", px: 0.5 }}
        >
          <Box
            component={"span"}
            sx={{
              bgcolor:
                priority_level === "MEDIUM"
                  ? "#D08803"
                  : priority_level === "HIGH"
                  ? "#E7391A"
                  : "#0C9046",
              borderRadius: "50%",
              display: "block",
              height: "16px",
              width: "16px",
            }}
          ></Box>
          {title}
        </Box>
        <Typography sx={{ fontSize: "14px", px: 0.7, mt: 0.5 }}>
          {created_at?.slice(0, 10)}
        </Typography>
      </Box>
      <Divider sx={{ mt: 1 }} />
      <Box className="flex-between" sx={{ px: 0.5, py: 1 }}>
        <Stack sx={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center' }}>
          <Box component='span' className="flex-center" sx={{ gap: '2px' }}>
            <CommentOutlinedIcon sx={{ fontSize: '16px' }} /> 2
          </Box>
          <Box component='span' className="flex-center" sx={{ gap: '2px' }}>
            <FormatListBulletedOutlinedIcon sx={{ fontSize: '16px' }} /> 0/{subtask?.length}
          </Box>
        </Stack>
        <Stack direction="row" className="flex-start">
          {users?.map((user, index) => (
            <Box key={user.fullName} component="span">
              <Avatar 
                sx={{ bgcolor: colors[index] }} 
                className="task-avatar"
                aria-owns={open ? 'mouse-over-popover' : undefined}
                onMouseLeave={handlePopoverClose} 
                onMouseEnter={handlePopoverOpen.bind(null, user.fullName)}
                aria-haspopup="true" 
              >
                {user.fullName.trim().includes(" ")
                  ? user.fullName
                      .split(" ")
                      .map((u) => u[0].toLocaleUpperCase())
                      .join("")
                  : user.fullName[0]}
              </Avatar>
              <CustomPopover 
                fullName={user.fullName}
                title={user.title}
                email={user.email}
                color={colors[index]}
                anchorEl={anchorEl}
                userId={userId}
                handlePopoverClose={handlePopoverClose}
              />
            </Box>
          ))}
        </Stack>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ mt: 3 }}>
        {subtask?.length === 0 && <Typography sx={{ px: 1, mb: "5px" }}>No Sub-Task</Typography>}
        <Button variant="text" sx={{ color: "#6f6f6f" }}>
          <AddOutlinedIcon sx={{ fontSize: "20px" }} />
          <Typography sx={{ fontSize: "15px" }}>ADD SUBTASK</Typography>
        </Button>
      </Box>
    </Item>
  );
};

export default TaskList;