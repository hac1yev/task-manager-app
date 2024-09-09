"use client";

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover } from "@mui/material";
import Link from "next/link";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { taskSliceActions } from "@/store/task-slice";

const CustomTaskSettingPopover = ({ anchorEl, handlePopoverClose, id, open, setOpenModal }: Partial<UserType> & Partial<CustomPopoverType> & { open: boolean, setOpenModal: (value: boolean) => void }) => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleOpenEditTaskModal = () => {
    setOpenModal(true);
  };

  const handleDeleteTask = async () => {
    try {
      await axiosPrivate.post(`/api/trash/${id}`);
      dispatch(taskSliceActions.deleteTask(id));
    } catch (error) {
      console.log(error);
    }
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
        <Link href="/">
          <ListItem disablePadding>
            <ListItemButton sx={{ py: 0, px: 1 }}>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <FolderOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Open Task" />
            </ListItemButton>
          </ListItem>
        </Link>

        <ListItem disablePadding onClick={handleOpenEditTaskModal}>
          <ListItemButton sx={{ py: 0, px: 1 }}>
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ py: 0, px: 1 }}>
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <ContentCopyIcon />
            </ListItemIcon>
            <ListItemText primary="Duplicate" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={handleDeleteTask}>
          <ListItemButton
            sx={{ py: 0, px: 1, color: "rgba(231, 57, 26, 0.9)" }}
          >
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <DeleteIcon sx={{ color: "rgba(231, 57, 26, 0.8)" }} />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItemButton>
        </ListItem>
      </List>
    </Popover>
  );
};

export default CustomTaskSettingPopover;