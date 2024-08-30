import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function LoginContent() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignItems: 'center', alignSelf: 'center', gap: 3, maxWidth: 450 }}
    >
      <Typography className="flex-center login-manage">
        Manage all your task in one place!
      </Typography>
      <Typography variant="h2" sx={{ textAlign: 'center', color: '#1851DF', fontWeight: 700 }}>
        Cloud-based Task Manager
      </Typography>
      <Box className="login-round"></Box>
    </Stack>
  );
}