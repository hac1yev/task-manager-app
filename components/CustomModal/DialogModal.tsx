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
import { memo } from 'react';

const DialogModal = ({ setOpenDialog,openDialog,id }: DialogModalType) => {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleDelete = async () => {
        try {
            await axiosPrivate.post(`/api/trash/${id}`);
            dispatch(taskSliceActions.deleteTask(id));
        } catch (error) {
            console.log(error);
        }
        setOpenDialog(false);
    };

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