"use client";

import * as React from 'react';
import Grid from '@mui/material/Grid2';
import LoginContent from './LoginContent';
import './Login.css';
import LoginForm from './LoginForm';

export default function LoginWrapper() {
  return (
    <Grid container className="flex-center" sx={{ height: '100vh', width: '100%', background: '#F5F4F7' }}>
        <Grid size={{ md: 6 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LoginContent />
        </Grid>
        <Grid size={{ md: 6 }}>
            <LoginForm />
        </Grid>
    </Grid>
  );
}