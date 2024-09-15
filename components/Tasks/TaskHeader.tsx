"use client";

import { Box, IconButton } from '@mui/material'
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { memo, useCallback, useMemo, useState } from 'react';
import CustomTaskSettingPopover from '../CustomPopovers/CustomTaskSettingPopover';
import CustomEditTaskModal from '../CustomModal/CustomEditTaskModal';
import DialogModal from '../CustomModal/DialogModal';

const TaskHeader = ({ priority_level, id }: { priority_level: string | undefined, id: string | undefined }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleDialogOpen = useCallback(() => {
        setOpenDialog(true);
    }, []);

    const handleOpenSettings = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const open = useMemo(() => {
        return Boolean(anchorEl);
    }, [anchorEl]);

    const priorityDisplay = useMemo(() => {
        switch (priority_level) {
            case "MEDIUM":
                return (
                    <>
                        <KeyboardArrowUpIcon />
                        MEDIUM PRIORITY
                    </>
                );
            case "HIGH":
                return (
                    <>
                        <KeyboardDoubleArrowUpIcon />
                        HIGH PRIORITY
                    </>
                );
            case "LOW":
                return (
                    <>
                        <KeyboardArrowDownIcon />
                        LOW PRIORITY
                    </>
                );
            default:
                return null;
        }
    }, [priority_level]);

    return (
        <Box sx={{ width: "100%" }} className="flex-between">
            <Box
                className="flex-center"
                sx={{
                color:
                    priority_level === "MEDIUM"
                    ? "#D08803"
                    : priority_level === "HIGH"
                    ? "#E7391A"
                    : "#0C9046",
                }}
            >
                {priorityDisplay}
            </Box>
            <IconButton aria-describedby={id} onClick={handleOpenSettings}>
                <MoreHorizOutlinedIcon />
            </IconButton>
            <CustomTaskSettingPopover 
                handlePopoverClose={handleClose}
                handleDialogOpen={handleDialogOpen}
                setOpenModal={setOpenModal}
                anchorEl={anchorEl}
                open={open}
                id={id}
            />
            <CustomEditTaskModal 
                setOpen={setOpenModal} 
                open={openModal} 
                id={id}
            />
            <DialogModal 
                setOpenDialog={setOpenDialog}
                openDialog={openDialog}
                id={id}
            />
        </Box>
    );
};

export default memo(TaskHeader);