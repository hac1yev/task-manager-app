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
import toast from 'react-hot-toast';
import { memo, useEffect, useState } from "react";
import { socket } from "@/socket-client";
import { notificationSliceActions } from "@/store/notification-slice";

const CustomTaskSettingPopover = ({ 
  anchorEl, handlePopoverClose, handleDialogOpen, id, open, setOpenModal
 }: 
 Partial<UserType> & 
 Partial<CustomPopoverType> & 
 { open: boolean, setOpenModal: (value: boolean) => void, handleDialogOpen: () => void }
) => {

  const [role,setRole] = useState("");

  useEffect(() => {
    const role = typeof window !== "undefined" && localStorage.getItem("userInfo") 
      ? JSON.parse(localStorage.getItem("userInfo") || "{}").role 
      : "";   
    
    setRole(role);
  }, []);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const handleOpenEditTaskModal = () => {
    setOpenModal(true);
  };

  const handleDuplicate = async () => {
    try {
      const response = await axiosPrivate.post("/api/duplicate", JSON.stringify(id), {
        headers: {
          'Content-Type': 'application/json'
        }
      });      

      const recievingData = response.data.duplicateTask;
      delete recievingData.__v
  
      dispatch(taskSliceActions.addTask({
        ...recievingData,
      }));

      toast.success('Task duplicated!');
      
      socket.emit("duplicateTask", id);

      await axiosPrivate.post('/api/notification', JSON.stringify({
        type: 'duplicateTask',
        message: `Task with ID ${id} has been duplicated.`,
        taskId: id, 
        visibility: 'public'
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });

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
        <Link href={`/tasks/${id}`}>
          <ListItem disablePadding>
            <ListItemButton sx={{ py: 0, px: 1 }}>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <FolderOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Open Task" />
            </ListItemButton>
          </ListItem>
        </Link>

        {(role === 'Admin' || role === 'Editor') &&  (
          <>
            <ListItem disablePadding onClick={handleOpenEditTaskModal}>
              <ListItemButton sx={{ py: 0, px: 1 }}>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={handleDuplicate}>
              <ListItemButton sx={{ py: 0, px: 1 }}>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <ContentCopyIcon />
                </ListItemIcon>
                <ListItemText primary="Duplicate" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={handleDialogOpen}>
              <ListItemButton
                sx={{ py: 0, px: 1, color: "rgba(231, 57, 26, 0.9)" }}
              >
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <DeleteIcon sx={{ color: "rgba(231, 57, 26, 0.8)" }} />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Popover>
  );
};

export default memo(CustomTaskSettingPopover);