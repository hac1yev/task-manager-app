"use client";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import { memo, useCallback } from "react";
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";

const ProfilePopover = ({
  anchorEl,
  handlePopoverClose,
  id,
  open,
  userInfo,
  setOpenProfileModal,
  setOpenChangePasswordModal,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  handlePopoverClose: () => void;
  id?: string;
  userInfo: Partial<UserInfo> | null;
  setOpenProfileModal: (value: string) => void;
  setOpenChangePasswordModal: (value: string) => void;
}) => {

  const handleOpenEdit = useCallback((userId: string | undefined) => {
    if(userId) {
      setOpenProfileModal(userId);
    }
  }, [setOpenProfileModal]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      if(typeof window !== 'undefined') {
        localStorage.removeItem("userInfo");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenConfirmPassword = () => {
    setOpenChangePasswordModal("open-change-password");
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handlePopoverClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <List
        sx={{ display: "flex", flexDirection: "column", px: "9px", gap: "5px" }}
        onClick={handlePopoverClose}
      >
        <ListItem disablePadding onClick={handleOpenEdit.bind(null, userInfo?.userId)}>
            <ListItemButton sx={{ py: 0, px: 1 }}>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={handleOpenConfirmPassword}>
          <ListItemButton sx={{ py: 0, px: 1 }}>
            <ListItemIcon sx={{ minWidth: "40px" }}>
                <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={handleLogout}>
          <ListItemButton sx={{ py: 0, px: 1 }}>
            <ListItemIcon sx={{ minWidth: "40px" }}>
                <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Popover>
  );
};

export default memo(ProfilePopover);