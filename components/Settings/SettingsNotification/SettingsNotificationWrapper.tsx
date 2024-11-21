"use client";

import { Box, Button, Divider, Switch, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import './SettingsNotification.css';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const SettingsNotificationWrapper = () => {
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
                <Box className="flex-between" sx={{ alignItems: 'start' }}>
                    <Typography variant="h6">Enable Assign Tasks Notifications</Typography>
                    <Box className="flex-center" sx={{ gap: 1 }}>
                        <HelpIcon sx={{ color: '#494949' }} />
                        <Switch {...label} defaultChecked />
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box className="flex-between" sx={{ alignItems: 'start' }}>
                    <Typography variant="h6">Enable Add Comments Notifications</Typography>
                    <Box className="flex-center" sx={{ gap: 1 }}>
                        <HelpIcon sx={{ color: '#494949' }} />
                        <Switch {...label} defaultChecked />
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box className="flex-between" sx={{ alignItems: 'start' }}>
                    <Typography variant="h6">Enable Sub-Tasks Notifications</Typography>
                    <Box className="flex-center" sx={{ gap: 1 }}>
                        <HelpIcon sx={{ color: '#494949' }} />
                        <Switch {...label} defaultChecked />
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box className="flex-between" sx={{ alignItems: 'start' }}>
                    <Typography variant="h6">Enable Like Comments Notifications</Typography>
                    <Box className="flex-center" sx={{ gap: 1 }}>
                        <HelpIcon sx={{ color: '#494949' }} />
                        <Switch {...label} defaultChecked />
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box className="flex-between" sx={{ alignItems: 'start' }}>
                    <Typography variant="h6">Enable Modified Tasks Notifications</Typography>
                    <Box className="flex-center" sx={{ gap: 1 }}>
                        <HelpIcon sx={{ color: '#494949' }} />
                        <Switch {...label} defaultChecked />
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box className="flex-between" sx={{ alignItems: 'start' }}>
                    <Typography variant="h6">Enable Task Activities Notifications</Typography>
                    <Box className="flex-center" sx={{ gap: 1 }}>
                        <HelpIcon sx={{ color: '#494949' }} />
                        <Switch {...label} defaultChecked />
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box className="flex-between" sx={{ alignItems: 'start' }}>
                    <Typography variant="h6">Enable New User Notifications</Typography>
                    <Box className="flex-center" sx={{ gap: 1 }}>
                        <HelpIcon sx={{ color: '#494949' }} />
                        <Switch {...label} defaultChecked />
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