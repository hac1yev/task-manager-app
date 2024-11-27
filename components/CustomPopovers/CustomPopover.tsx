"use client"

import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Popover, Typography } from "@mui/material";
import React from "react";

const CustomPopover = ({ fullName, title, avatar, email, color, userId, anchorEl, handlePopoverClose, id }: Partial<UserType> & CustomPopoverType) => {

  return (
    <Popover
      id={id ? id : fullName}
      sx={{ pointerEvents: "none", p: 0 }}
      open={userId === (id ? id : fullName)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <List sx={{ p: 0, m: 0 }}>
        <ListItem sx={{ alignItems: "center" }}>
          <ListItemAvatar>
            <Avatar
              sx={{
                bgcolor: color,
                fontSize: "26px",
                height: "60px",
                width: "60px",
                mr: 2,
              }}
              alt="Remy Sharp"
              src={avatar}
            >
              {fullName && fullName
                .split(" ")
                .map((u) => u[0].toLocaleUpperCase())
                .join("")}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="h5">{fullName}</Typography>}
            secondary={
              <Box component={"span"} className="flex-column-start">
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  {title}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "primary.main", display: "inline", mt: "1px" }}
                >
                  {email}
                </Typography>
              </Box>
            }
          />
        </ListItem>
      </List>
    </Popover>
  );
};

export default CustomPopover;