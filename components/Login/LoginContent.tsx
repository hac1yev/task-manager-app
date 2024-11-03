"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function LoginContent() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignItems: 'center', alignSelf: 'center', gap: 2, maxWidth: 450, mb: 2 }}
    >
      <Typography className="flex-center login-manage">
        Manage all your task in one place!
      </Typography>
      <Typography className='login-cloud'>
        Cloud-based Task Manager
      </Typography>
      <Box className="login-round"></Box>
    </Stack>
  );
}