"use client";

import { Avatar, Box, IconButton, Stack, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { AppBar, Search, SearchIconWrapper, StyledInputBase } from "../MaterialSnippets/MaterialSnippets";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { FormEvent, memo, useCallback, useEffect, useMemo, useState } from "react";
import ProfilePopover from "../CustomPopovers/ProfilePopover";
import UserProfileModal from "../CustomModal/UserProfileModal";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { teamSliceAction } from "@/store/team-slice";
import ChangePasswordModal from "../CustomModal/ChangePasswordModal";
import toast from "react-hot-toast";
import { socket } from "@/socket-client";
import { notificationSliceActions, useTypedNotificationSelector } from "@/store/notification-slice";
import NotificationPopover from "../CustomPopovers/NotificationPopover";

const Navbar = ({ open, toggleDrawer, handleSubmit }: { open: boolean, toggleDrawer: () => void, handleSubmit: (e: FormEvent) => void }) => {
  const matches = useMediaQuery("(min-width:769px)");
  const [userInfo, setUserInfo] = useState<Partial<UserInfo> | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<UserType>>({});
  const [openProfileModal,setOpenProfileModal] = useState("");
  const [openChangePasswordModal,setOpenChangePasswordModal] = useState("");
  const notifications = useTypedNotificationSelector(state => state.notificationReducer.notifications);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function() {
      try {
        const response = await axiosPrivate.get("/api/notification");
        dispatch(notificationSliceActions.getAllNotifications(response.data.notifications));                
      } catch (error) {
        console.log(error);
      }
    })();
  }, [axiosPrivate, dispatch]);

  useEffect(() => {
    const handleTaskNotification = (notification: Partial<NotificationType>) => {            
      dispatch(notificationSliceActions.addNotification({ ...notification }));
    };

    const handleUserLikeNotification = ({ userId,fullName,type,message }: { userId: string, fullName: string, type: string, message: string }) => {
      if(type === 'like') {
        dispatch(notificationSliceActions.addNotification({
          userId, 
          fullName,
          message,
          type: 'likeComment',
          visibility: 'private',
          isReadUsers: [],
          createdAt: new Date().toISOString(),
        }));
      }
    };

    socket.on("sendDeleteTaskNotification", handleTaskNotification);
    socket.on("sendEditTaskNotification", handleTaskNotification);
    socket.on("sendDuplicateTaskNotification", handleTaskNotification);
    socket.on("sendUserLikeNotification", handleUserLikeNotification);

    return () => {
      socket.off("sendDeleteTaskNotification", handleTaskNotification);
      socket.off("sendEditTaskNotification", handleTaskNotification);
      socket.off("sendDuplicateTaskNotification", handleTaskNotification);
      socket.off("sendUserLikeNotification", handleUserLikeNotification);
    };
  }, [dispatch]);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("userInfo");
      setUserInfo(storedUserInfo ? JSON.parse(storedUserInfo) : null);
    }
  }, []);

  const handleOpenAvatar = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleCloseModal = useCallback(() => setOpenProfileModal(""), []);
  const handleCloseChangePasswordModal = useCallback(() => setOpenChangePasswordModal(""), []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const openProfilePopover = useMemo(() => {
      return Boolean(anchorEl);
  }, [anchorEl]);

  const handleEdit = useCallback(
    async (id: string, e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();    
      
      try {
        await axiosPrivate.post(`/api/team/${id}`, JSON.stringify(editedUser), {
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(teamSliceAction.editUser({ _id: id, ...editedUser }));

        toast.success('Profile updated successfully!');
      } catch (error) {
        console.log(error);
      }

      setOpenProfileModal("");
    },
    [axiosPrivate, dispatch, editedUser]
  );

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          p: 1,
          px: "24px",
          minHeight: "65px",
        }}
      >
        <Typography
          component="h1"
          variant="h6"
          color="#000"
          noWrap
          sx={{
            flexGrow: 1,
            display: "flex",
            pl: "3px",
            alignItems: "center",
          }}
        >
          {!matches && (
            <IconButton
              edge="start"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "10px",
                display: "block",
              }}
            >
              <MenuIcon
                sx={{
                  fontSize: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              />
            </IconButton>
          )}
          <Search sx={{ height: "100%" }} onSubmit={handleSubmit}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              name="searchText"
              placeholder="Task axtar…"
              sx={{ width: "100%" }}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Typography>
        <Stack direction="row" spacing={matches ? 2 : 1}>
          <NotificationPopover 
            notifications={notifications}
            userInfo={userInfo}
          />
          <Box component={"button"} id={"avatar-settings"} sx={{ border: 'none', bgcolor: 'transparent', cursor: 'pointer' }} onClick={handleOpenAvatar}>
            <Avatar alt="Remy Sharp" sx={{ bgcolor: 'primary.main' }}>
                {userInfo?.fullName?.includes(" ") 
                    ? userInfo?.fullName?.split(" ").map((name) => name[0].toLocaleUpperCase()) 
                    : userInfo?.fullName?.slice(0,2).toLocaleUpperCase()
                }
            </Avatar>
          </Box>
          <ProfilePopover
            setOpenProfileModal={setOpenProfileModal}
            handlePopoverClose={handleClose}
            open={openProfilePopover}
            id={"avatar-settings"}
            anchorEl={anchorEl}
            userInfo={userInfo}
            setOpenChangePasswordModal={setOpenChangePasswordModal}
          />
          <UserProfileModal
            openProfileModal={openProfileModal}
            handleClose={handleCloseModal}
            setEditedUser={setEditedUser}
            editedUser={editedUser}
            handleEdit={handleEdit}
            userInfo={userInfo}
          />
          <ChangePasswordModal 
            handleCloseChangePasswordModal={handleCloseChangePasswordModal}
            openChangePasswordModal={openChangePasswordModal}
            setOpenChangePasswordModal={setOpenChangePasswordModal}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Navbar);