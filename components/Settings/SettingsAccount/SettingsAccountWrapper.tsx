"use client";

import { Avatar, Box, Button, Divider, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import './SettingsAccount.css';
import { FormEvent, useEffect, useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

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
    const [fileName,setFileName] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const userInfo = typeof window !== "undefined" && localStorage.getItem("userInfo") 
      ? JSON.parse(localStorage.getItem("userInfo") || "{}") 
      : "";   

    useEffect(() => {
        (async function() {
            try {
                const response = await axiosPrivate.get(`/api/team/${userInfo?.userId}`);
                setSettingsAccountData(response.data.user);
                console.log(response.data.user);
                
            } catch (error) {
                console.log(error);
            }
        })()
    }, [axiosPrivate, userInfo.userId]);

    const handleOpenEdit = () => {
        const editInput = document.querySelector("#edit_input") as HTMLInputElement;
        editInput.click();
        
        editInput.addEventListener("change", (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0]; 
            if (file) {
                const reader = new FileReader();
                setFileName(file.name.split(".")[0]);

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
    };

    const handleOpenDelete = () => {

    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            await axiosPrivate.post(`/api/team/${userInfo.userId}`, JSON.stringify({
                ...settingsAccountData,
                fileName
            }), {
                headers: {
                  'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

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
                            {!settingsAccountData.avatar ? "IH" : ""}
                        </Avatar>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <input type="file" id='edit_input' accept='image/png, image/jpeg, image/jpg' hidden />
                            <Button 
                                sx={{ bgcolor: '#20283C', color: '#fff', borderRadius: '20px' }}
                                onClick={handleOpenEdit}
                            >
                                Edit
                            </Button>
                            <input type="file" id='delete_input' accept='image/png, image/jpeg, image/jpg' hidden />
                            <Button 
                                sx={{ bgcolor: '#F3415F', color: '#fff', borderRadius: '20px', px: 2 }}
                                onClick={handleOpenDelete}
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
                <Button type="submit">Send</Button>
            </Box>
        </Box>
    );
};

export default SettingsAccountWrapper;