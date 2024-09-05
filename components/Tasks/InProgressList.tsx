"use client";

import { Item } from "../MaterialSnippets/MaterialSnippets";
import { Avatar, Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const InProgressList = ({ title, priority_level, users, subtask, created_at }: Partial<TaskType>) => {
  const colors = ["#D18805", "#1A65E9", "#0B8A49", "#D83121", "#6D36D4"];

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
        Users
        <Stack direction="row" className="flex-start">
          {users?.map((user, index) => (
            <Avatar sx={{ bgcolor: colors[index] }} key={user} className="task-avatar">
              {user.trim().includes(" ")
                ? user
                    .split(" ")
                    .map((u) => u[0].toLocaleUpperCase())
                    .join("")
                : user[0]}
            </Avatar>
          ))}
        </Stack>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ mt: 3 }}>
        <Button variant="text" sx={{ color: "#6f6f6f" }}>
          <AddOutlinedIcon sx={{ fontSize: "20px" }} />
          <Typography sx={{ fontSize: "15px" }}>ADD SUBTASK</Typography>
        </Button>
      </Box>
    </Item>
  );
};

export default InProgressList;