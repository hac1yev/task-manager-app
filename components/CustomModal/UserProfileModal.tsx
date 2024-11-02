"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { FormEvent, memo, useEffect } from "react";
import { addUserStyle } from "../MaterialSnippets/MaterialSnippets";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const UserProfileModal = ({
  openProfileModal,
  handleClose,
  handleEdit,
  setEditedUser,
  editedUser,
  userInfo
}: {
  openProfileModal: string;
  handleClose: () => void;
  handleEdit: (id: string, e: FormEvent<HTMLFormElement>) => Promise<void>;
  setEditedUser: (value: Partial<UserType>) => void;
  editedUser: Partial<UserType>;
  userInfo: Partial<UserInfo> | null;
}) => {

  const axiosPrivate = useAxiosPrivate();
  
  useEffect(() => {
    (async function() {      
      try {
        if(userInfo?.userId) {
          const response = await axiosPrivate.get(`/api/team/${userInfo?.userId}`);
          setEditedUser(response.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [axiosPrivate,userInfo,setEditedUser]);

  return (
    <Modal
      open={openProfileModal ? true : false}
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
          onSubmit={handleEdit.bind(null, userInfo?.userId ? userInfo.userId : "")}
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
                setEditedUser({...editedUser, fullName: e.target.value});
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
                setEditedUser({...editedUser, title: e.target.value});
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
              required
              fullWidth
              disabled
              variant="outlined"
              sx={{ ariaLabel: "email" }}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="role">Role</FormLabel>
            <TextField
              id="role"
              type="role"
              placeholder="role"
              autoComplete="role"
              value={editedUser?.role}
              required
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: "role" }}
              disabled
            />
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
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(UserProfileModal);