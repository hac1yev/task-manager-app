"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { teamSliceAction } from "@/store/team-slice";
import { Box, Button, FormControl, FormLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { addUserStyle } from "../MaterialSnippets/MaterialSnippets";

const CustomAddUserModal = ({ setOpen, open }: CustomModalType) => {
  const [role, setRole] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newRole = formData.get("role") as string;

    const data = {
      fullName: formData.get("fullName"),
      title: formData.get("title"),
      email: formData.get("email"),
      password: `${formData.get("role")}1234`,
      role: newRole.toLocaleLowerCase(),
      status: "Active",
      biography: "",
      avatar: "",
      created_at: new Date().toISOString(),
    };    

    try {
      const response = await axiosPrivate.post(
        "/api/team",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const recievingData = response.data.addedUser;
      delete recievingData.__v;

      dispatch(teamSliceAction.addUser(recievingData));
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={addUserStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          ADD NEW USER
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
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
              name="fullName"
              placeholder="Full name"
              autoComplete="fullName"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: "fullName" }}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="title">Title</FormLabel>
            </Box>
            <TextField
              id="title"
              type="text"
              name="title"
              placeholder="Title"
              autoComplete="title"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: "title" }}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="email">Email</FormLabel>
            </Box>
            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: "email" }}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="role">Role</FormLabel>
            <Select
              value={role}
              id="role"
              name="role"
              required
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role"
            >
              <MenuItem value={"user"}>user</MenuItem>
              <MenuItem value={"editor"}>editor</MenuItem>
            </Select>
          </FormControl>
          <Box className="flex-end" sx={{ gap: 1, mt: 1 }}>
            <Button
              type="button"
              size="large"
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" size="large" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(CustomAddUserModal);