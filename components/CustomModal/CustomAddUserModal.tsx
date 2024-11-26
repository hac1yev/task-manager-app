"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { teamSliceAction, useTypedSelector } from "@/store/team-slice";
import { Box, Button, FormControl, FormLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addUserStyle } from "../MaterialSnippets/MaterialSnippets";
import { socket } from "@/socket-client";

const CustomAddUserModal = ({ setOpen, open }: CustomModalType) => {
  const [role, setRole] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [settingsData,setSettingsData] = useState<Partial<SettingsType>>([]);
  const dispatch = useDispatch();
  const user = useMemo(() => {
    if(typeof window !== "undefined" && localStorage.getItem("userInfo") ) {
      return JSON.parse(localStorage.getItem("userInfo") || "{}") 
    }else{
      return "";
    }
  }, []);
  const users = useTypedSelector(state => state.teamReducer.users);  

  const allUserIDS = useMemo(() => {
    return users.map((user) => user._id).filter((item) => item !== user.userId);
  }, [user.userId, users]);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    (async function() {
      try {
        const response = await axiosPrivate.get("/api/settings");
        setSettingsData(response.data.settings);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [axiosPrivate]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
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

      const possibleSendingUsers = settingsData.filter((item) => {
        if(item && allUserIDS?.includes(item.userId)) {
          return item;
        }
      });
      
      const resultUsers = possibleSendingUsers.filter((setting) => {
        if(setting?.notification?.addUser) {
          return setting;
        }
      }).map((item) => {
        if(item) return item.userId;
      });  

      const notificationResponse = await axiosPrivate.post('/api/notification', JSON.stringify({
        userId: resultUsers,
        type: 'addUser',
        message: `<div>New user, <span style="color: #1851df;">"${data.fullName}"</span>, has been added to the team!</div>`,
        visibility: 'private'
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const notification = notificationResponse.data.notification;
      delete notification.__v;
            
      socket.emit("addUser", { notification, userIds: resultUsers });

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }, [allUserIDS, axiosPrivate, dispatch, setOpen, settingsData]);

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