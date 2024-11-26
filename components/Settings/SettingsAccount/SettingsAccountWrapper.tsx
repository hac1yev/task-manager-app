"use client";

import { Avatar, Box, Button, Divider, FormControl, FormLabel, LinearProgress, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import './SettingsAccount.css';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import { userInfoSliceActions } from '@/store/userInfo-slice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';

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
    const router = useRouter();
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

    const handleOpenDelete = useCallback(async () => {
        try {
            await axiosPrivate.put(`/api/team/${userInfo.userId}`, {
                headers: {
                  'Content-Type': 'application/json'
                }
            });  
            dispatch(userInfoSliceActions.deleteAvatar());
            setSettingsAccountData((prev) => {
                return {
                    ...prev, 
                    avatar: ""
                }
            })
            localStorage.setItem("userInfo", JSON.stringify({
                ...userInfo,
                avatar: ""
            }));

            toast.success("Profile image deleted successfully.")
        } catch (error) {
            console.log(error);
        }
    }, [axiosPrivate,dispatch,userInfo]);

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
            toast.success("Profile updated successfully.")
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }, [axiosPrivate,settingsAccountData,userInfo,dispatch]);

    const handleConfirm = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
    
        try {
          await axiosPrivate.post("/api/change-password", JSON.stringify({
            newPassword: formData.get("newPassword"),
            confirmPassword: formData.get("confirmPassword"),
          }), {
            headers: {
                'Content-Type': 'application/json'
            }
          });
        
          toast.success('Password changed successfully!');
          router.push("/");
        } catch (error) {
          console.log(error);
        }
    }, [axiosPrivate,router]);

    const handleSignOut = useCallback(async () => {
        try {
          await axios.post("/api/logout");
          if(typeof window !== 'undefined') {
            localStorage.removeItem("userInfo");
            window.location.reload();
          }
        } catch (error) {
          console.log(error);
        }
    }, []);

    const handleDeleteAccount = useCallback(async (id: string) => {
        try {
            await axiosPrivate.delete(`/api/settings/account/${id}`);
            if(typeof window !== 'undefined') {
                localStorage.removeItem("userInfo");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    },[axiosPrivate]);
    
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

    return (
        <Box sx={{ width: "100%", bgcolor: '#fff', maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
            <Box>
                <Typography variant="h5" align='left' sx={{ mt: 1 }}>Your Profile</Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '16px', mt: 2 }}>
                    In this section you can update your profile settings
                </Typography>
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
                <Box className="flex-end account-save-button" sx={{ pt: 3 }}>
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
            <Divider sx={{ my: 4, borderBottomWidth: 'medium', borderColor: 'rgba(0,0,0,0.3)' }} />
            <Box>
                <Typography variant="h5" align='left'>Change Password</Typography>
            </Box>
            <Box
                component="form"
                onSubmit={handleConfirm}
                noValidate
                className='settings-change-password-form'
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 4,
                }}
                >
                <FormControl>
                    <FormLabel sx={{ mb: 0.5 }} htmlFor="newPassword">New Password</FormLabel>
                    <TextField
                        id="newPassword"
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        autoComplete="newPassword"
                        required
                        fullWidth
                        variant="outlined"
                        sx={{ ariaLabel: "newPassword" }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel sx={{ mb: 0.5 }} htmlFor="confirmPassword">Confirm Password</FormLabel>
                    <TextField
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        autoComplete="confirmPassword"
                        required
                        fullWidth
                        variant="outlined"
                        sx={{ ariaLabel: "confirmPassword" }}
                    />
                </FormControl>
                <Box className="flex-end" sx={{ gap: 1, mt: 1 }}>
                    <Button type="submit" size="large" variant="contained" sx={{ textTransform: 'capitalize' }}>
                        Confirm
                    </Button>
                </Box>
            </Box>
            <Divider sx={{ my: 4, borderBottomWidth: 'medium', borderColor: 'rgba(0,0,0,0.3)' }} />
            <Box>
                <Typography variant="h5" align='left'>Danger Zone</Typography>
                <Typography variant="subtitle1" sx={{ fontSize: '16px', mt: 1 }}>Sign out or delete your account</Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box className="flex-column-start" sx={{ gap: 1, mb: 2 }}>
                <Button variant="contained" color="error" sx={{ px: 2, textTransform: 'capitalize' }} onClick={handleSignOut}>
                    <LogoutIcon />
                    Sign Out From Your Account
                </Button>
                <Button variant="contained" color="error" sx={{ px: 2, textTransform: 'capitalize',  }} onClick={handleDeleteAccount.bind(null, userInfo?.userId)}>
                    <DeleteIcon />
                    Delete your Account
                </Button>
            </Box>
        </Box>
    );
};

export default SettingsAccountWrapper;