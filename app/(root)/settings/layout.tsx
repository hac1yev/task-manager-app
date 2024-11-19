"use client";

import SettingTabs from '@/components/Settings/SettingsTabs';
import { Box, Typography } from '@mui/material'
import React from 'react'

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
            <Box sx={{ px: 2, borderBottom: '2px solid #ccc', pt: 3, bgcolor: '#F5F5F5', position: 'sticky', top: '65px', zIndex: 10 }}>
              <Typography variant="h3">Settings</Typography>
              <SettingTabs />
            </Box>
            {children}
        </Box>
  )
}

export default SettingsLayout