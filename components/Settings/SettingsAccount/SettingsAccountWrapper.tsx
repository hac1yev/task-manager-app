"use client";

import { Box, Divider, TextField, Typography } from '@mui/material';
import './SettingsAccount.css';
import Image from 'next/image';

const SettingsAccountWrapper = () => {
    return (
        <Box sx={{ width: "100%", bgcolor: '#fff', maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
            <Box>
                <Typography variant="h5" align='left'>Your Profile</Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '16px', mt: 1 }}>Please update your profile settings here</Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box component={"form"}>
                <Box className="account-input-group">
                    <Typography variant="h6" align='left'>Fullname</Typography>
                    <TextField 
                        className='account-input'
                        value={"Ilkin Haciyev"}
                    />
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box className="account-input-group">
                    <Typography variant="h6" align='left'>Profile Picture</Typography>
                    <Box alignItems={"start"}>
                        <Image 
                            src={"https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small_2x/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"}
                            width={50}
                            height={50}
                            style={{ borderRadius: '50%' }}
                            alt='tiger'
                        />
                    </Box>
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box className="account-input-group">
                    <Typography variant="h6" align='left'>Title</Typography>
                    <TextField 
                        className='account-input'
                        value={"Adminstrator"}
                    />
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box className="account-input-group">
                    <Typography variant="h6" align='left'>Email</Typography>
                    <TextField 
                        className='account-input'
                        value={"ilkinhaciyev955@gmail.com"}
                        disabled
                    />
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box className="account-input-group">
                    <Typography variant="h6" align='left'>Role</Typography>
                    <TextField 
                        className='account-input'
                        value={"Admin"}
                        disabled
                    />
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box className="account-input-group">
                    <Typography variant="h6" align='left'>Biography</Typography>
                    <TextField 
                        className='account-input'
                        multiline
                        value={"Frontend Developer for at least 4 years experiences."}
                        rows={5}
                    ></TextField>
                </Box>
                
                <Box className="account-input-group">
                    <Typography variant="h6" align='left'>Fullname</Typography>
                    <TextField 
                        className='account-input'
                        value={"Ilkin Haciyev"}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default SettingsAccountWrapper;