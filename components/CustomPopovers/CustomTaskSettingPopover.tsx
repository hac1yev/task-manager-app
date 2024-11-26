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
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { socket } from "@/socket-client";
import { useTypedSelector } from "@/store/team-slice";

const CustomTaskSettingPopover = ({ 
  anchorEl, handlePopoverClose, handleDialogOpen, id, open, setOpenModal
 }: 
 Partial<UserType> & 
 Partial<CustomPopoverType> & 
 { open: boolean, setOpenModal: (value: boolean) => void, handleDialogOpen: () => void }
) => {

  const [role,setRole] = useState("");
  const users = useTypedSelector(state => state.teamReducer.users);
  const [settingsData,setSettingsData] = useState<Partial<SettingsType>>([]);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const user = useMemo(() => {
    if(typeof window !== "undefined" && localStorage.getItem("userInfo") ) {
      return JSON.parse(localStorage.getItem("userInfo") || "{}") 
    }else{
      return "";
    }
  }, []);

  const allUserIDS = useMemo(() => {
    return users.map((user) => user._id).filter((item) => item !== user.userId);
  }, [user.userId, users]);

  useEffect(() => {
    const role = typeof window !== "undefined" && localStorage.getItem("userInfo") 
      ? JSON.parse(localStorage.getItem("userInfo") || "{}").role 
      : "";   
    
    setRole(role);
  }, []);

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

  const handleOpenEditTaskModal = useCallback(() => {
    setOpenModal(true);
  },[setOpenModal]);

  const handleDuplicate = useCallback(async () => {
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
      
      const possibleSendingUsers = settingsData.filter((item) => {
        if(item && allUserIDS?.includes(item.userId)) {
          return item;
        }
      });
      
      const resultUsers = possibleSendingUsers.filter((setting) => {
        if(setting?.notification?.modifyTask) {
          return setting;
        }
      }).map((item) => {
        if(item) return item.userId;
      });        

      const notificationResponse = await axiosPrivate.post('/api/notification', JSON.stringify({
        userId: resultUsers,
        type: 'duplicateTask',
        message: `<div>Task with <a style="color: #1851df" href="/tasks/${id}">ID ${id}</a> has been duplicated.</div>`,
        taskId: id, 
        visibility: 'private'
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const notification = notificationResponse.data.notification;
      delete notification.__v;
      
      socket.emit("duplicateTask", { notification, userIds: resultUsers });

    } catch (error) {
      console.log(error);
    }
  }, [allUserIDS,axiosPrivate,dispatch,id,settingsData]);

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

        {(role === 'admin' || role === 'editor') &&  (
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