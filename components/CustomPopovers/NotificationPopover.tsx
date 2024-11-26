"use client";

import { Avatar, Badge, Box, Button, IconButton, List, ListItemAvatar, ListItemButton, ListItemText, Popover, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { memo, useMemo, useState } from "react";
import Image from "next/image";
import moment from "moment";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { notificationSliceActions } from "@/store/notification-slice";

const NotificationPopover = ({ notifications,userInfo }: NotificationPopoverType) => {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleNotificationPopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleNotificationPopoverClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    let publicNotifications = useMemo(() => {
        return notifications.filter((notification) => notification.visibility === 'public');
    }, [notifications]);

    let privateNotifications = useMemo(() => {
        return notifications.filter((notifications) => {
            if(userInfo?.userId) return notifications.userId?.includes(userInfo?.userId);
        });
    }, [notifications, userInfo?.userId]);    

    let possibleNotifications = useMemo(() => {
        return publicNotifications.concat(privateNotifications);
    }, [privateNotifications,publicNotifications]);  
    
    let allUnreadNotifications = possibleNotifications.filter((notification) => {
        if( userInfo?.userId) { 
            if(!notification.isReadUsers?.includes(userInfo?.userId)) return notification;
        }
    });
    
    const markAllRead = async () => {
        let notificationsIds = allUnreadNotifications.map((notification) => notification._id);
        
        try {
            await axiosPrivate.put("/api/notification", JSON.stringify({ ids: notificationsIds, userId: userInfo?.userId }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch(notificationSliceActions.readAllNotification(userInfo?.userId));  
        } catch (error) {
            console.log(error);
        }
    };        

    return (
        <>
            <IconButton onClick={handleNotificationPopoverOpen}>
                {allUnreadNotifications.length > 0 && <Badge badgeContent={allUnreadNotifications.length} color="error">
                <NotificationsNoneIcon />
                </Badge>}
                {allUnreadNotifications.length === 0 && <NotificationsNoneIcon />}
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
                {allUnreadNotifications.length === 0 ? (
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
                        <Button variant="contained" color="primary" sx={{ color: '#fff', mt: 2, textTransform: 'capitalize' }} onClick={handleNotificationPopoverClose}>Close</Button>
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
                        {allUnreadNotifications.toSorted((a,b) => {
                            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                            return dateB - dateA;
                        }).map((notification) => (
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
                                    <div 
                                        dangerouslySetInnerHTML={{ __html: notification.message || "" }}
                                    >
                                    </div>
                                } />
                            </ListItemButton>
                        ))}
                    </List>
                )}
                {allUnreadNotifications.length > 0 && <Box className="flex-between" sx={{ width: '100%', px: 4, py: 1, borderTopLeftRadius: '30px', borderTopRightRadius: '30px', bgcolor: '#f9f9f9' }}>
                    <Button sx={{ textTransform: 'capitalize' }} onClick={handleNotificationPopoverClose}>Cancel</Button>
                    <Button sx={{ textTransform: 'capitalize' }} onClick={markAllRead}>Mark All Read</Button>
                </Box>}
            </Popover>
        </>
    );
};

export default memo(NotificationPopover);