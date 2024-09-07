import { Box, IconButton } from '@mui/material'
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import CustomTaskSettingPopover from '../CustomPopovers/CustomTaskSettingPopover';

const TaskHeader = ({ priority_level, id }: { priority_level: string | undefined, id: string | undefined }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleOpenSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

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
                {priority_level === "MEDIUM" && (
                <>
                    <KeyboardArrowUpIcon />
                    MEDIUM PRIORITY
                </>
                )}
                {priority_level === "HIGH" && (
                <>
                    <KeyboardDoubleArrowUpIcon />
                    HIGH PRIORITY
                </>
                )}
                {priority_level === "LOW" && (
                    <>
                    <KeyboardArrowDownIcon />
                    LOW PRIORITY
                    </>
                )}
            </Box>
            <IconButton aria-describedby={id} onClick={handleOpenSettings}>
                <MoreHorizOutlinedIcon />
            </IconButton>
            <CustomTaskSettingPopover 
                open={open}
                anchorEl={anchorEl}
                handlePopoverClose={handleClose}
                id={id}
            />
        </Box>
    );
};

export default TaskHeader;