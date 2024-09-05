"use client";

import { Avatar, Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddTask from "./AddTask";
import { Item } from "../MaterialSnippets/MaterialSnippets";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

const TasksWrapper = () => {
    return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
            <AddTask />
            <Grid container spacing={2}>
                <Grid container size={{ xs: 12, sm: 12, md: 4 }} className="flex-column-start">
                    <Grid size={12}>
                        <Item className="flex-between" sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Box 
                                    component={"span"} 
                                    sx={{ 
                                        bgcolor: 'primary.main', 
                                        borderRadius: '50%', 
                                        display: 'block', 
                                        height: '16px', 
                                        width: '16px', 
                                    }}></Box>
                                To Do
                            </Box>
                            <IconButton sx={{ p: 0.2 }}>
                                <AddOutlinedIcon sx={{ fontSize: '20px' }} />
                            </IconButton>
                        </Item>
                    </Grid>
                    <Grid size={12}>
                        <Item sx={{ mb: 2 }}>
                            <Box className="flex-column-start">
                                <Box sx={{ width: '100%' }} className="flex-between">
                                    <Box className="flex-center" sx={{ color: '#D08803' }}>
                                        <KeyboardArrowUpIcon/>
                                        Medium Priority
                                    </Box>
                                    <IconButton>
                                        <MoreHorizOutlinedIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', px: 0.5 }}>
                                    <Box 
                                        component={"span"} 
                                        sx={{ 
                                            bgcolor: '#D08803', 
                                            borderRadius: '50%', 
                                            display: 'block', 
                                            height: '16px', 
                                            width: '16px', 
                                        }}></Box>
                                    Website Project Proposol Review
                                </Box>
                                <Typography sx={{ fontSize: '14px', px: 0.7, mt: 0.5 }}>5 February 2024</Typography>
                            </Box>
                            <Divider sx={{ mt: 1 }} />
                            <Box className="flex-between" sx={{ px: 0.5, py: 1 }}>
                                Users
                                <Stack direction="row" className='flex-start'>
                                    <Avatar sx={{ bgcolor: '#1A65E9' }} className="task-avatar">H</Avatar>
                                    <Avatar sx={{ bgcolor: '#D83121' }} className="task-avatar">N</Avatar>
                                    <Avatar sx={{ bgcolor: '#D18805' }} className="task-avatar">OP</Avatar>
                                </Stack>
                            </Box>
                            <Divider sx={{ mb: 1 }} />
                            <Box>
                                <Button variant="text" sx={{ color: '#6f6f6f' }} >
                                    <AddOutlinedIcon sx={{ fontSize: '20px' }} />
                                    <Typography sx={{ fontSize: '15px' }}>ADD SUBTASK</Typography>
                                </Button>   
                            </Box>
                        </Item>
                        <Item sx={{ mb: 2 }}>
                            <Box className="flex-column-start">
                                <Box sx={{ width: '100%' }} className="flex-between">
                                    <Box className="flex-center" sx={{ color: '#D08803' }}>
                                        <KeyboardArrowUpIcon/>
                                        Medium Priority
                                    </Box>
                                    <IconButton>
                                        <MoreHorizOutlinedIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', px: 0.5 }}>
                                    <Box 
                                        component={"span"} 
                                        sx={{ 
                                            bgcolor: '#D08803', 
                                            borderRadius: '50%', 
                                            display: 'block', 
                                            height: '16px', 
                                            width: '16px', 
                                        }}></Box>
                                    Website Project Proposol Review
                                </Box>
                                <Typography sx={{ fontSize: '14px', px: 0.7, mt: 0.5 }}>5 February 2024</Typography>
                            </Box>
                            <Divider sx={{ mt: 1 }} />
                            <Box className="flex-between" sx={{ px: 0.5, py: 1 }}>
                                Users
                                <Stack direction="row" className='flex-start'>
                                    <Avatar sx={{ bgcolor: '#1A65E9' }} className="task-avatar">H</Avatar>
                                    <Avatar sx={{ bgcolor: '#D83121' }} className="task-avatar">N</Avatar>
                                    <Avatar sx={{ bgcolor: '#D18805' }} className="task-avatar">OP</Avatar>
                                </Stack>
                            </Box>
                            <Divider sx={{ mb: 1 }} />
                            <Box>
                                <Button variant="text" sx={{ color: '#6f6f6f' }} >
                                    <AddOutlinedIcon sx={{ fontSize: '20px' }} />
                                    <Typography sx={{ fontSize: '15px' }}>ADD SUBTASK</Typography>
                                </Button>   
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
                <Grid container size={{ xs: 12, sm: 12, md: 4 }} className="flex-column-start">
                    <Grid size={12}>
                        <Item className="flex-between" sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Box 
                                    component={"span"} 
                                    sx={{ 
                                        bgcolor: '#D08803', 
                                        borderRadius: '50%', 
                                        display: 'block', 
                                        height: '16px', 
                                        width: '16px', 
                                    }}></Box>
                                In Progress
                            </Box>
                            <IconButton sx={{ p: 0.2 }}>
                                <AddOutlinedIcon sx={{ fontSize: '20px' }} />
                            </IconButton>
                        </Item>
                    </Grid>
                    <Grid size={12}>
                        <Item sx={{ mb: 2 }}>
                            <Box className="flex-column-start">
                                <Box sx={{ width: '100%' }} className="flex-between">
                                    <Box className="flex-center" sx={{ color: '#D08803' }}>
                                        <KeyboardArrowUpIcon/>
                                        Medium Priority
                                    </Box>
                                    <IconButton>
                                        <MoreHorizOutlinedIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', px: 0.5 }}>
                                    <Box 
                                        component={"span"} 
                                        sx={{ 
                                            bgcolor: '#D08803', 
                                            borderRadius: '50%', 
                                            display: 'block', 
                                            height: '16px', 
                                            width: '16px', 
                                        }}></Box>
                                    Website Project Proposol Review
                                </Box>
                                <Typography sx={{ fontSize: '14px', px: 0.7, mt: 0.5 }}>5 February 2024</Typography>
                            </Box>
                            <Divider sx={{ mt: 1 }} />
                            <Box className="flex-between" sx={{ px: 0.5, py: 1 }}>
                                Users
                                <Stack direction="row" className='flex-start'>
                                    <Avatar sx={{ bgcolor: '#1A65E9' }} className="task-avatar">H</Avatar>
                                    <Avatar sx={{ bgcolor: '#D83121' }} className="task-avatar">N</Avatar>
                                    <Avatar sx={{ bgcolor: '#D18805' }} className="task-avatar">OP</Avatar>
                                </Stack>
                            </Box>
                            <Divider sx={{ mb: 1 }} />
                            <Box>
                                <Button variant="text" sx={{ color: '#6f6f6f' }} >
                                    <AddOutlinedIcon sx={{ fontSize: '20px' }} />
                                    <Typography sx={{ fontSize: '15px' }}>ADD SUBTASK</Typography>
                                </Button>   
                            </Box>
                        </Item>
                        <Item sx={{ mb: 2 }}>
                            <Box className="flex-column-start">
                                <Box sx={{ width: '100%' }} className="flex-between">
                                    <Box className="flex-center" sx={{ color: '#D08803' }}>
                                        <KeyboardArrowUpIcon/>
                                        Medium Priority
                                    </Box>
                                    <IconButton>
                                        <MoreHorizOutlinedIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', px: 0.5 }}>
                                    <Box 
                                        component={"span"} 
                                        sx={{ 
                                            bgcolor: '#D08803', 
                                            borderRadius: '50%', 
                                            display: 'block', 
                                            height: '16px', 
                                            width: '16px', 
                                        }}></Box>
                                    Website Project Proposol Review
                                </Box>
                                <Typography sx={{ fontSize: '14px', px: 0.7, mt: 0.5 }}>5 February 2024</Typography>
                            </Box>
                            <Divider sx={{ mt: 1 }} />
                            <Box className="flex-between" sx={{ px: 0.5, py: 1 }}>
                                Users
                                <Stack direction="row" className='flex-start'>
                                    <Avatar sx={{ bgcolor: '#1A65E9' }} className="task-avatar">H</Avatar>
                                    <Avatar sx={{ bgcolor: '#D83121' }} className="task-avatar">N</Avatar>
                                    <Avatar sx={{ bgcolor: '#D18805' }} className="task-avatar">OP</Avatar>
                                </Stack>
                            </Box>
                            <Divider sx={{ mb: 1 }} />
                            <Box>
                                <Button variant="text" sx={{ color: '#6f6f6f' }} >
                                    <AddOutlinedIcon sx={{ fontSize: '20px' }} />
                                    <Typography sx={{ fontSize: '15px' }}>ADD SUBTASK</Typography>
                                </Button>   
                            </Box>
                        </Item>
                        <Item sx={{ mb: 2 }}>
                            <Box className="flex-column-start">
                                <Box sx={{ width: '100%' }} className="flex-between">
                                    <Box className="flex-center" sx={{ color: '#D08803' }}>
                                        <KeyboardArrowUpIcon/>
                                        Medium Priority
                                    </Box>
                                    <IconButton>
                                        <MoreHorizOutlinedIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', px: 0.5 }}>
                                    <Box 
                                        component={"span"} 
                                        sx={{ 
                                            bgcolor: '#D08803', 
                                            borderRadius: '50%', 
                                            display: 'block', 
                                            height: '16px', 
                                            width: '16px', 
                                        }}></Box>
                                    Website Project Proposol Review
                                </Box>
                                <Typography sx={{ fontSize: '14px', px: 0.7, mt: 0.5 }}>5 February 2024</Typography>
                            </Box>
                            <Divider sx={{ mt: 1 }} />
                            <Box className="flex-between" sx={{ px: 0.5, py: 1 }}>
                                Users
                                <Stack direction="row" className='flex-start'>
                                    <Avatar sx={{ bgcolor: '#1A65E9' }} className="task-avatar">H</Avatar>
                                    <Avatar sx={{ bgcolor: '#D83121' }} className="task-avatar">N</Avatar>
                                    <Avatar sx={{ bgcolor: '#D18805' }} className="task-avatar">OP</Avatar>
                                </Stack>
                            </Box>
                            <Divider sx={{ mb: 1 }} />
                            <Box>
                                <Button variant="text" sx={{ color: '#6f6f6f' }} >
                                    <AddOutlinedIcon sx={{ fontSize: '20px' }} />
                                    <Typography sx={{ fontSize: '15px' }}>ADD SUBTASK</Typography>
                                </Button>   
                            </Box>
                        </Item>    
                    </Grid>
                </Grid>
                <Grid container size={{ xs: 12, sm: 12, md: 4 }} className="flex-column-start">
                    <Grid size={12}>
                        <Item className="flex-between" sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Box 
                                    component={"span"} 
                                    sx={{ 
                                        bgcolor: '#0C9046', 
                                        borderRadius: '50%', 
                                        display: 'block', 
                                        height: '16px', 
                                        width: '16px', 
                                    }}></Box>
                                Completed
                            </Box>
                            <IconButton sx={{ p: 0.2 }}>
                                <AddOutlinedIcon sx={{ fontSize: '20px' }} />
                            </IconButton>
                        </Item>
                    </Grid>
                    <Grid size={12}>
                        <Item sx={{ mb: 2 }}>
                            <Box className="flex-column-start">
                                <Box sx={{ width: '100%' }} className="flex-between">
                                    <Box className="flex-center" sx={{ color: '#D08803' }}>
                                        <KeyboardArrowUpIcon/>
                                        Medium Priority
                                    </Box>
                                    <IconButton>
                                        <MoreHorizOutlinedIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', px: 0.5 }}>
                                    <Box 
                                        component={"span"} 
                                        sx={{ 
                                            bgcolor: '#D08803', 
                                            borderRadius: '50%', 
                                            display: 'block', 
                                            height: '16px', 
                                            width: '16px', 
                                        }}></Box>
                                    Website Project Proposol Review
                                </Box>
                                <Typography sx={{ fontSize: '14px', px: 0.7, mt: 0.5 }}>5 February 2024</Typography>
                            </Box>
                            <Divider sx={{ mt: 1 }} />
                            <Box className="flex-between" sx={{ px: 0.5, py: 1 }}>
                                Users
                                <Stack direction="row" className='flex-start'>
                                    <Avatar sx={{ bgcolor: '#1A65E9' }} className="task-avatar">H</Avatar>
                                    <Avatar sx={{ bgcolor: '#D83121' }} className="task-avatar">N</Avatar>
                                    <Avatar sx={{ bgcolor: '#D18805' }} className="task-avatar">OP</Avatar>
                                </Stack>
                            </Box>
                            <Divider sx={{ mb: 1 }} />
                            <Box>
                                <Button variant="text" sx={{ color: '#6f6f6f' }} >
                                    <AddOutlinedIcon sx={{ fontSize: '20px' }} />
                                    <Typography sx={{ fontSize: '15px' }}>ADD SUBTASK</Typography>
                                </Button>   
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TasksWrapper;