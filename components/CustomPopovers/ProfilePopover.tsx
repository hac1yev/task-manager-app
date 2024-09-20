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

const ProfilePopover = ({
  anchorEl,
  handlePopoverClose,
  id,
  open,
  userInfo,
  setOpenProfileModal,
  setEditedUser
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  handlePopoverClose: () => void;
  id?: string;
  userInfo: Partial<UserInfo> | null;
  setOpenProfileModal: (value: string) => void;
  setEditedUser: (value: Partial<UserType>) => void
}) => {

  const handleOpenEdit = useCallback((userId: string | undefined) => {
    if(userId) {
      setOpenProfileModal(userId);
    }
  }, [setOpenProfileModal]);

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

        <ListItem disablePadding>
          <ListItemButton sx={{ py: 0, px: 1 }}>
            <ListItemIcon sx={{ minWidth: "40px" }}>
                <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
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