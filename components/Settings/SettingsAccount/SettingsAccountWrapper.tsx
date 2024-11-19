"use client";

import { Avatar, Box, Button, Divider, LinearProgress, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import './SettingsAccount.css';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import { userInfoSliceActions } from '@/store/userInfo-slice';

const SettingsAccountWrapper = () => {
    const [settingsAccountData,setSettingsAccountData] = useState<Partial<UserType>>({
        created_at: new Date().toISOString(),
        fullName: "",
        email: "",
        role: "",
        title: "",
        status: "",
        biography: "",
        avatar: "",
    });
    const [isLoading,setIsLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const userInfo = typeof window !== "undefined" && localStorage.getItem("userInfo") 
      ? JSON.parse(localStorage.getItem("userInfo") || "{}") 
      : "";   

    const dispatch = useDispatch();

    useEffect(() => {
        (async function() {
            setIsLoading(true);
            try {
                const response = await axiosPrivate.get(`/api/team/${userInfo?.userId}`);
                setSettingsAccountData(response.data.user);  
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        })()
    }, [axiosPrivate, userInfo.userId]);

    const handleOpenEdit = useCallback(() => {
        const editInput = document.querySelector("#edit_input") as HTMLInputElement;
        editInput.click();
        
        editInput.addEventListener("change", (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0]; 
            if (file) {
                const reader = new FileReader();

                reader.onload = () => {
                    setSettingsAccountData((prev) => {
                        return {
                            ...prev,
                            avatar: reader.result as string
                        }
                    });
                };

                reader.readAsDataURL(file);
            } 
        });
    }, []);

    const handleOpenDelete = () => {
        
    };

    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const response = await axiosPrivate.post(`/api/team/${userInfo.userId}`, JSON.stringify({
                ...settingsAccountData,
            }), {
                headers: {
                  'Content-Type': 'application/json'
                }
            });            

            localStorage.setItem("userInfo", JSON.stringify({
                ...userInfo,
                ...response.data.newUserInfo
            }));

            dispatch(userInfoSliceActions.editUserInfo(response.data.newUserInfo));
            
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }, [axiosPrivate,settingsAccountData,userInfo,dispatch]);

    if(!settingsAccountData.fullName && isLoading) {
        return (
            <Box sx={{ width: '100%', bgcolor: '#fff', p: 4 }}>
                <LinearProgress />
            </Box>
        )
    }

    if(!settingsAccountData.fullName && !isLoading) {
        return (
            <Typography className="flex-center" variant='h6' sx={{ mt: 1 }}>
                There is no task!
            </Typography>
        )
    }

    console.log(settingsAccountData.fullName);

    return (
        <Box sx={{ width: "100%", bgcolor: '#fff', maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
            <Box>
                <Typography variant="h5" align='left'>Your Profile</Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '16px', mt: 1 }}>Please update your profile settings here</Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box component={"form"} onSubmit={handleSubmit}>
                <Box className="account-input-group">
                    <Typography variant="h6" align='left'>Fullname</Typography>
                    <TextField 
                        className='account-input'
                        placeholder='Enter fullname'
                        value={settingsAccountData.fullName}
                        onChange={(e) => setSettingsAccountData((prev) => {
                            return {
                                ...prev,
                                fullName: e.target.value
                            }
                        })}
                    />
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box className="account-input-group">
                    <Typography variant="h6" align='left'>Profile Picture</Typography>
                    <Box  sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                fontSize: '30px'
                            }}
                            src={settingsAccountData.avatar}
                            alt="profile_picture"
                        >
                            {!settingsAccountData.avatar ? settingsAccountData.fullName?.split(" ").map(u => u[0].toLocaleUpperCase()).join("") : ""}
                        </Avatar>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input type="file" id='edit_input' accept='image/png, image/jpeg, image/jpg' hidden />
                            <Button 
                                sx={{ bgcolor: '#20283C', borderRadius: '20px' }}
                                onClick={handleOpenEdit}
                                variant='contained'
                            >
                                Edit
                            </Button>
                            <input type="file" id='delete_input' accept='image/png, image/jpeg, image/jpg' hidden />
                            <Button 
                                sx={{ bgcolor: '#F3415F', borderRadius: '20px', px: 2 }}
                                onClick={handleOpenDelete}
                                variant='contained'
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box className="account-input-group">
                    <Typography variant="h6" align='left'>Title</Typography>
                    <TextField 
                        className='account-input'
                        placeholder='Enter title'
                        value={settingsAccountData.title}
                        onChange={(e) => setSettingsAccountData((prev) => {
                            return {
                                ...prev,
                                title: e.target.value
                            }
                        })}
                    />
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box className="account-input-group">
                    <Typography variant="h6" align='left'>Email</Typography>
                    <TextField 
                        className='account-input'
                        value={settingsAccountData.email}
                        disabled
                    />
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box className="account-input-group">
                    <Typography variant="h6" align='left'>Role</Typography>
                    <TextField 
                        className='account-input'
                        value={settingsAccountData.role}
                        disabled
                    />
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box className="account-input-group">
                    <Typography variant="h6" align='left'>Biography</Typography>
                    <TextField 
                        className='account-input'
                        rows={5}
                        multiline
                        placeholder='Enter biography'
                        value={settingsAccountData.biography}
                        onChange={(e) => setSettingsAccountData((prev) => {
                            return {
                                ...prev,
                                biography: e.target.value
                            }
                        })}
                    ></TextField>
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box className="account-input-group">
                    <Typography variant="h6" align='left'>Status</Typography>
                    <Select
                        id="stage"
                        displayEmpty
                        defaultValue={"Active"}
                        input={<OutlinedInput />}
                    >
                        {["Active", "Deactive"].map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            sx={{
                                display: "flex",
                                gap: "5px",
                            }}
                        >
                            {name}
                        </MenuItem>
                        ))}
                    </Select>
                </Box>
                <Box className="flex-end" sx={{ pt: 3 }}>
                    <Button 
                        type="submit"
                        disabled={isLoading}
                        variant='contained'
                        sx={{  
                            color: '#fff', 
                            textTransform: 'capitalize', 
                            fontSize: '16px', 
                            px: 4 
                        }} 
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default SettingsAccountWrapper;