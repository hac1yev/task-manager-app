"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, Popover, Typography } from "@mui/material";
import AddUser from "./AddUser";
import { useTypedSelector } from "@/store/team-slice";
import React from "react";

const TeamComponent = () => {
  const users = useTypedSelector((state) => state.teamReducer.users);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [userId,setUserId] = React.useState("");

  const userColors = React.useMemo(() => {
    const colors = ['#D18805', '#1A65E9', '#0B8A49', '#D83121', '#6D36D4'];
    const colorMap = new Map();
    users.forEach((user, index) => {
      const color = colors[index % colors.length];
      colorMap.set(user._id, color);
    });
    return colorMap;
  }, [users]);

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
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
      <AddUser />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Full Name</b>
              </TableCell>
              <TableCell align="left">
                <b>Title</b>
              </TableCell>
              <TableCell align="left">
                <b>Email</b>
              </TableCell>
              <TableCell align="left">
                <b>Role</b>
              </TableCell>
              <TableCell align="left" sx={{ width: 120 }}>
                <b>Status</b>
              </TableCell>
              <TableCell sx={{ width: 200 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="users-table">
            {users.map((user) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="flex-start"
                  sx={{ display: "flex", gap: 1 }}
                >
                  <Avatar
                    sx={{ bgcolor: userColors.get(user._id) }}
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    onMouseLeave={handlePopoverClose} 
                    onMouseEnter={handlePopoverOpen.bind(null, user._id)}
                    aria-haspopup="true"
                  >
                    {user.fullName
                      .split(" ")
                      .map((u) => u[0].toLocaleUpperCase())
                      .join("")}
                  </Avatar>
                  {user.fullName}
                  <Popover
                    id={user._id}
                    sx={{ pointerEvents: 'none', p: 0 }}
                    open={userId === user._id}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <List sx={{ p: 0, m: 0 }}>
                      <ListItem sx={{ alignItems: 'center' }}>
                        <ListItemAvatar>
                          <Avatar 
                            sx={{ bgcolor: userColors.get(user._id) }}
                            alt="Remy Sharp"
                          >
                            {user.fullName.split(" ").map(u => u[0].toLocaleUpperCase()).join("")}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography variant="h5">{user.fullName}</Typography>}
                          secondary={
                            <Box className="flex-column-start">
                              <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: 'text.primary', display: 'inline' }}
                              >
                                {user.title}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: 'primary.main', display: 'inline', mt: '3px' }}
                              >
                                {user.email}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    </List>
                  </Popover>
                </TableCell>
                <TableCell align="left">{user.title}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.role}</TableCell>
                <TableCell align="left" sx={{ width: 120 }}>
                  <Box
                    sx={{
                      bgcolor: user.status === "Active" ? "#BBDAFC" : "#FEF5C3",
                      p: "3px 8px",
                      borderRadius: "20px",
                    }}
                    className="flex-center"
                  >
                    {user.status}
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box className="flex-end" sx={{ width: "100%" }}>
                    <Button color="primary">Edit</Button>
                    <Button color="error">Delete</Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeamComponent;