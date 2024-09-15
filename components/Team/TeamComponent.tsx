"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Box, Button, FormControl, FormLabel, LinearProgress, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import AddUser from "./AddUser";
import { teamSliceAction, useTypedSelector } from "@/store/team-slice";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { FormEvent, memo, useCallback, useMemo, useState } from "react";
import { addUserStyle } from "../MaterialSnippets/MaterialSnippets";

const TeamComponent = () => {
  const users = useTypedSelector((state) => state.teamReducer.users);
  const isLoading = useTypedSelector((state) => state.teamReducer.isLoading);
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState("");
  const [editedUser, setEditedUser] = useState<Partial<UserType>>({});
  const dispatch = useDispatch();

  const userColors = useMemo(() => {
    const colors = ["#D18805", "#1A65E9", "#0B8A49", "#D83121", "#6D36D4"];
    const colorMap = new Map();
    users.forEach((user, index) => {
      const color = colors[index % colors.length];
      colorMap.set(user._id, color);
    });
    return colorMap;
  }, [users]);

  const handleOpenEdit = useCallback( (id: string) => {
    const selectedUser = users.find((user) => user._id === id);
    if (selectedUser) {
      setEditedUser(selectedUser);
    }
    setOpen(id);
  }, [users])

  const handleClose = useCallback(() => setOpen(""), []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await axiosPrivate.delete(`/api/team/${id}`);
      dispatch(teamSliceAction.deleteUser(id));
    } catch (error) {
      console.log(error);
    }
  }, [axiosPrivate,dispatch]);

  const handleEdit = useCallback(async (id: string, e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axiosPrivate.post(`/api/team/${id}`, JSON.stringify(editedUser), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(teamSliceAction.editUser({ _id: id, ...editedUser }));
    } catch (error) {
      console.log(error);
    }

    setOpen("");
  }, [axiosPrivate,dispatch,editedUser]);

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
                  <Avatar sx={{ bgcolor: userColors.get(user._id) }}>
                    {user.fullName.trim().includes(" ")
                      ? user.fullName
                          .split(" ")
                          .map((u) => u[0].toLocaleUpperCase())
                          .join("")
                      : user.fullName[0]}
                  </Avatar>
                  {user.fullName}
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
                    <Button
                      color="primary"
                      onClick={handleOpenEdit.bind(null, user._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      onClick={handleDelete.bind(null, user._id)}
                    >
                      Delete
                    </Button>
                    <Modal
                      open={open === user._id}
                      onClose={handleClose}
                      aria-labelledby="edit-modal"
                      aria-describedby="edit-modal-description"
                    >
                      <Box sx={addUserStyle}>
                        <Typography id="edit-modal" variant="h6" component="h2">
                          UPDATE USER
                        </Typography>
                        <Box
                          component="form"
                          onSubmit={handleEdit.bind(null, user._id)}
                          noValidate
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: 2,
                            mt: 2,
                          }}
                        >
                          <FormControl>
                            <FormLabel htmlFor="fullName">Fullname</FormLabel>
                            <TextField
                              id="fullName"
                              type="text"
                              placeholder="Full name"
                              autoComplete="fullName"
                              value={editedUser?.fullName}
                              autoFocus
                              required
                              fullWidth
                              variant="outlined"
                              sx={{ ariaLabel: "fullName" }}
                              onChange={(e) => {
                                setEditedUser((prev) => {
                                  return {
                                    ...prev,
                                    fullName: e.target.value,
                                  };
                                });
                              }}
                            />
                          </FormControl>
                          <FormControl>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <FormLabel htmlFor="title">Title</FormLabel>
                            </Box>
                            <TextField
                              id="title"
                              type="text"
                              placeholder="Title"
                              autoComplete="title"
                              value={editedUser?.title}
                              autoFocus
                              required
                              fullWidth
                              variant="outlined"
                              sx={{ ariaLabel: "title" }}
                              onChange={(e) => {
                                setEditedUser((prev) => {
                                  return {
                                    ...prev,
                                    title: e.target.value,
                                  };
                                });
                              }}
                            />
                          </FormControl>
                          <FormControl>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <FormLabel htmlFor="email">Email</FormLabel>
                            </Box>
                            <TextField
                              id="email"
                              type="email"
                              placeholder="Email"
                              autoComplete="email"
                              value={editedUser?.email}
                              autoFocus
                              required
                              fullWidth
                              variant="outlined"
                              sx={{ ariaLabel: "email" }}
                              onChange={(e) => {
                                setEditedUser((prev) => {
                                  return {
                                    ...prev,
                                    email: e.target.value,
                                  };
                                });
                              }}
                            />
                          </FormControl>
                          <FormControl fullWidth>
                            <FormLabel htmlFor="role">Role</FormLabel>
                            <Select
                              value={editedUser?.role}
                              id="role"
                              required
                              onChange={(e) => {
                                setEditedUser((prev) => {
                                  return {
                                    ...prev,
                                    role: e.target.value,
                                  };
                                });
                              }}
                              placeholder="Role"
                            >
                              <MenuItem value={"User"}>User</MenuItem>
                              <MenuItem value={"Editor"}>Editor</MenuItem>
                            </Select>
                          </FormControl>
                          <Box className="flex-end" sx={{ gap: 1, mt: 1 }}>
                            <Button
                              type="submit"
                              size="large"
                              variant="outlined"
                              onClick={handleClose}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              size="large"
                              variant="contained"
                            >
                              Edit
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Modal>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {users.length === 0 && isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}

      {users.length === 0 && !isLoading && (
        <Typography className="flex-center" variant='h6' sx={{ mt: 1 }}>
          There is no user!
        </Typography>
      )}
    </Box>
  );
};

const MemoizationTeamComponent = memo(TeamComponent);

export default MemoizationTeamComponent;