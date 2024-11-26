"use client";

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { taskSliceActions } from "@/store/task-slice";
import { memo, useCallback, useMemo } from 'react';
import { socket } from '@/socket-client';
import { useTypedSelector } from '@/store/team-slice';
import { useTypedSettingSelector } from '@/store/settings-slice';

const DialogModal = ({ setOpenDialog,openDialog,id }: DialogModalType) => {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const users = useTypedSelector(state => state.teamReducer.users);
    const settingsData = useTypedSettingSelector(state => state.settingReducer.taskPageSettings);

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

    const handleClose = useCallback(() => {
        setOpenDialog(false);
    }, [setOpenDialog]);

    const handleDelete = useCallback(async () => {
        try {
            await axiosPrivate.post(`/api/trash/${id}`);
            dispatch(taskSliceActions.deleteTask(id));
            
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
                type: 'deleteTask',
                message: `<div>Task with ID ${id} has been deleted.</div>`,
                taskId: id, 
                visibility: 'private'
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const notification = notificationResponse.data.notification;
            delete notification.__v;
            
            socket.emit("deleteTask", { notification, userIds: resultUsers });

        } catch (error) {
            console.log(error);
        }
        setOpenDialog(false);
    }, [axiosPrivate,dispatch,id,setOpenDialog,allUserIDS,settingsData]);

    return (
        <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{ p: 2 }}
        >
            <Box className="flex-column-center">
            <Box 
                className="flex-center" 
                sx={{ bgcolor: '#FFD0CB', width: '100px', height: '100px', borderRadius: '50%', mx: 'auto', my: 3 }}
            >
                <QuestionMarkIcon sx={{ fontSize: '70px', color: '#E73724' }} />
            </Box>
            <DialogContent sx={{ maxWidth: '500px', width: '100%', pt: 0, px: 8 }}>
                <DialogContentText id="alert-dialog-description" align='center'>
                    Are you sure you want to delete this task?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ pb: 2 }}>
                <Button type="button" onClick={handleClose} color="inherit" variant='outlined'>Cancel</Button>
                <Button onClick={handleDelete} color="error" variant='contained' autoFocus>
                    Delete
                </Button>
            </DialogActions>
            </Box>
        </Dialog>
    );
};

export default memo(DialogModal);