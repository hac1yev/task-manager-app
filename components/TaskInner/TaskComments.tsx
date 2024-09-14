"use client";

import { ListItem,ListItemAvatar,ListItemText,Avatar, List, Box, Typography, IconButton, Paper, Popover, ListItemIcon, ListItemButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import moment from 'moment';
import { useTypedTaskDetailSelector } from '@/store/taskDetail-slice';

const TaskComments = () => {
    const taskData = useTypedTaskDetailSelector(state => state.taskDetailReducer.taskDetailData);
    const { comments } = taskData;
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedPopover, setSelectedPopover] = useState("");
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleLikeComment = async (commentId: string) => {
        try {
                        
        } catch (error) {
            console.log(error);
        }
    };    

    return (
        <Box className="comment-section-wrapper">
            <List sx={{ p: 2 }}>
                {comments && comments.toSorted((a,b) => new Date(a.adding_at).getTime() - new Date(b.adding_at).getTime()).map((comment) => (
                    <ListItem sx={{ p: 0, mb: 2 }} className='comment-list-item' key={comment._id}>
                        <Paper className='comment-paper'>
                            <ListItemAvatar>
                                <Avatar alt="User Name" />
                            </ListItemAvatar>
                            <Box className="comment-content">
                                <ListItemText 
                                    secondary={`${moment(comment.adding_at).from(moment(new Date()))}`} 
                                    primary={`${comment.fullName}`} 
                                    className='comment-header-text' 
                                    sx={{ mb: 0 }} 
                                />
                                <Typography variant='subtitle1'>
                                    {comment.description}
                                </Typography>
                                {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mt: '8px' }}>
                                    <Typography 
                                        variant='subtitle1' 
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => handleLikeComment(comment._id ? comment._id : "")}
                                    >
                                        2 Likes 
                                    </Typography>
                                    <Typography 
                                        variant='subtitle1' 
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        Reply
                                    </Typography>
                                </Box> */}
                            </Box>
                            <IconButton className='more-icon' aria-describedby={id} onClick={(e) => {
                                setAnchorEl(e.currentTarget);
                                setSelectedPopover(comment._id ? comment._id : "");
                            }}>
                                <MoreHorizIcon />
                            </IconButton>
                            <Popover
                                className='comment-popover'
                                id={id}
                                open={selectedPopover === comment._id}
                                anchorEl={anchorEl}
                                onClose={() => {
                                    setAnchorEl(null);
                                    setSelectedPopover("");
                                }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <List sx={{ pb: '10px', width: '130px' }}>
                                    <ListItem
                                        disablePadding
                                        className="sidebar-list-item"
                                    >
                                        <ListItemButton sx={{ py: 0 }}>
                                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                                <VisibilityOffOutlinedIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Gizlət" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem
                                        disablePadding
                                        className="sidebar-list-item"
                                    >
                                        <ListItemButton sx={{ py: 0 }}>
                                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                                <DeleteIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Sil" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Popover>
                        </Paper>
                    </ListItem>
                ))}
                {comments.length === 0 && (
                    <Typography align='center' variant='h6'>There is no comment!</Typography>
                )}
            </List>
        </Box>
    );
};

export default TaskComments;