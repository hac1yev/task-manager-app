"use client";

import { Avatar, Badge, Box, Button, IconButton, List, ListItemAvatar, ListItemButton, ListItemText, Popover, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { memo, useMemo, useState } from "react";
import Image from "next/image";
import moment from "moment";

const NotificationPopover = ({ lengthOfNotification,notifications,userInfo }: NotificationPopoverType) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleNotificationPopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleNotificationPopoverClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    
    let publicNotifications = useMemo(() => {
        return notifications.filter((notification) => notification.visibility === 'public');
    }, [notifications]);

    let privateNotifications = useMemo(() => {
        return notifications.filter((notifications) => notifications.userId === userInfo?.userId);
    }, [notifications, userInfo?.userId]);
    
    console.log(notifications);
    

    let allPossibleNotifications = useMemo(() => {
        return publicNotifications.concat(privateNotifications);
    }, [privateNotifications,publicNotifications]);        

    return (
        <>
            <IconButton onClick={handleNotificationPopoverOpen}>
                {lengthOfNotification > 0 && <Badge badgeContent={lengthOfNotification} color="error">
                <NotificationsNoneIcon />
                </Badge>}
                {lengthOfNotification === 0 && <NotificationsNoneIcon />}
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleNotificationPopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {notifications.length === 0 ? (
                    <Box 
                        className="flex-column-center" 
                        sx={{ 
                            width: '360px', 
                            bgcolor: 'background.paper',
                            px: 1, 
                            py: 4 
                        }}
                    >
                        <Image 
                            src={"/no-notification.jpg"}
                            width={"230"}
                            height={"230"}
                            alt="logo"
                            priority
                        />
                        <Typography variant="h5">No Notifications Yet!</Typography>
                        <Typography 
                            sx={{ 
                                fontSize: '16px',
                                fontWeight: '400',
                                lineHeight: '18px',
                                color: '#9D9D9B',
                                textAlign: 'center',
                                px: 2,
                                mt: 1
                            }}
                        >
                            You have no notifications right now. Come back later.
                        </Typography>
                    </Box>
                ) : (
                    <List 
                        className="notification-list"
                        sx={{ 
                            width: '100%', 
                            maxWidth: '460px', 
                            minWidth: '260px',  
                            bgcolor: 'background.paper', 
                            px: 1, 
                            py: 2 
                        }}
                    >
                        {allPossibleNotifications.map((notification) => (
                            <ListItemButton sx={{ px: 1 }} key={notification._id}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                                        <NotificationsActiveIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <Box className="flex-start" sx={{ gap: 1 }}>
                                        <Typography variant="h6">{notification.type}</Typography>
                                        <Typography variant="subtitle1">{moment(notification.createdAt).fromNow()}</Typography>
                                    </Box>
                                } secondary={
                                    <Typography 
                                        sx={{ 
                                            fontSize: '15px',
                                            fontWeight: '400',
                                            lineHeight: '18px',
                                            color: '#1D1D1B' 
                                        }}
                                    >
                                        {notification.message}
                                    </Typography>
                                } />
                            </ListItemButton>
                        ))}
                    </List>
                )}
                {allPossibleNotifications.length > 0 && <Box className="flex-between" sx={{ width: '100%', px: 4, py: 1, borderTopLeftRadius: '30px', borderTopRightRadius: '30px', bgcolor: '#f9f9f9' }}>
                    <Button sx={{ textTransform: 'capitalize' }} onClick={handleNotificationPopoverClose}>Cancel</Button>
                    <Button sx={{ textTransform: 'capitalize' }}>Mark All Read</Button>
                </Box>}
            </Popover>
        </>
    );
};

export default memo(NotificationPopover);