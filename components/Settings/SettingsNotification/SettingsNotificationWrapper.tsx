"use client";

import { Box, Button, Divider, Switch, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import './SettingsNotification.css';
import { useState } from 'react';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const SettingsNotificationWrapper = () => {
    const [notificationSettings,setNotificationSettings] = useState({
        assignTask: true,
        addComment: true,
        subTask: true,
        likeComment: true,
        modifyTask: true,
        addTimeline: true,
        addUser: true
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotificationSettings({
          ...notificationSettings,
          [event.target.name]: event.target.checked,
        });
    };

    return (
        <Box sx={{ width: "100%", bgcolor: '#fff', maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
            <Box>
                <Typography variant="h5" align='left' sx={{ mt: 1 }}>Notification Settings</Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '16px', mt: 2 }}>
                    In this section you will able to configure the behaviour of notifications
                </Typography>
            </Box>
            <Divider sx={{ mt: 3, mb: 2 }} />
            <Box className="setting-notifications-wrapper" component={"form"} sx={{ mb: 2 }}>
                <Box className="flex-between notification-list">
                    <Typography variant="h6">Enable Assign Tasks Notifications</Typography>
                    <Box className="flex-center" sx={{ gap: 1 }}>
                        <HelpIcon sx={{ color: '#494949' }} />
                        <Switch 
                            {...label} 
                            checked={notificationSettings.assignTask}
                            name="assignTask"
                            onChange={handleChange} 
                        />
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box className="flex-between notification-list">
                    <Typography variant="h6">Enable Add Comments Notifications</Typography>
                    <Box className="flex-center" sx={{ gap: 1 }}>
                        <HelpIcon sx={{ color: '#494949' }} />
                        <Switch 
                            {...label} 
                            checked={notificationSettings.addComment} 
                            name="addComment"
                            onChange={handleChange} 
                        />
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box className="flex-between notification-list">
                    <Typography variant="h6">Enable Sub-Tasks Notifications</Typography>
                    <Box className="flex-center" sx={{ gap: 1 }}>
                        <HelpIcon sx={{ color: '#494949' }} />
                        <Switch 
                            {...label}  
                            checked={notificationSettings.subTask}
                            name="subTask"
                            onChange={handleChange} 
                        />
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box className="flex-between notification-list">
                    <Typography variant="h6">Enable Like Comments Notifications</Typography>
                    <Box className="flex-center" sx={{ gap: 1 }}>
                        <HelpIcon sx={{ color: '#494949' }} />
                        <Switch 
                            {...label}  
                            checked={notificationSettings.likeComment} 
                            name="likeComment"
                            onChange={handleChange} 
                        />
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box className="flex-between notification-list">
                    <Typography variant="h6">Enable Modified Tasks Notifications</Typography>
                    <Box className="flex-center" sx={{ gap: 1 }}>
                        <HelpIcon sx={{ color: '#494949' }} />
                        <Switch 
                            {...label} 
                            checked={notificationSettings.modifyTask} 
                            name="modifyTask"
                            onChange={handleChange} 
                        />
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box className="flex-between notification-list">
                    <Typography variant="h6">Enable Task Activities Notifications</Typography>
                    <Box className="flex-center" sx={{ gap: 1 }}>
                        <HelpIcon sx={{ color: '#494949' }} />
                        <Switch 
                            {...label} 
                            checked={notificationSettings.addTimeline} 
                            name="addTimeline"
                            onChange={handleChange} 
                        />
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box className="flex-between notification-list">
                    <Typography variant="h6">Enable New User Notifications</Typography>
                    <Box className="flex-center" sx={{ gap: 1 }}>
                        <HelpIcon sx={{ color: '#494949' }} />
                        <Switch 
                            {...label} 
                            checked={notificationSettings.addUser} 
                            name="addUser"
                            onChange={handleChange} 
                        />
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box className="flex-end">
                    <Button 
                        type="submit"
                        variant='contained'
                        sx={{  
                            color: '#fff', 
                            textTransform: 'capitalize', 
                            fontSize: '16px', 
                            px: 4,
                            mt: 1
                        }} 
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default SettingsNotificationWrapper;