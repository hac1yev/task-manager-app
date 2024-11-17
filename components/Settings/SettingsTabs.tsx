"use client";

import { Box, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import './Settings.css';
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingTabs = () => {
  const [value, setValue] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    switch (pathname) {
      case '/settings/account':
        setValue(0);
        break;
      case '/settings/notifications':
        setValue(1);
        break;
      case '/settings/tasks':
        setValue(2);
        break;
      case '/settings/privacy':
        setValue(3);
        break;
      case '/settings/appearance':
        setValue(4);
        break;
      case '/settings/integrations':
        setValue(5);
        break;
    
      default:
        break;
    }
  }, [value,pathname]);
  
    return (
      <Box sx={{ width: '100%', mt: 2 }} >
        <Box>
          <Tabs
            className="tabs-ul"
            value={value}
            aria-label="nav tabs example"
            role="navigation"
          >
            <Link href="/settings/account" className={pathname === '/settings/account' ? 'active-tab tab-link' : 'tab-link'}>Account</Link>
            <Link href="/settings/notifications" className={pathname === '/settings/notifications' ? 'active-tab tab-link' : 'tab-link'}>Notifications</Link>
            <Link href="/settings/tasks" className={pathname === '/settings/tasks' ? 'active-tab tab-link' : 'tab-link'}>Tasks</Link>
            <Link href="/settings/privacy" className={pathname === '/settings/privacy' ? 'active-tab tab-link' : 'tab-link'}>Privacy</Link>
            <Link href="/settings/appearance" className={pathname === '/settings/appearance' ? 'active-tab tab-link' : 'tab-link'}>Appearance</Link>
            <Link href="/settings/integrations" className={pathname === '/settings/integrations' ? 'active-tab tab-link' : 'tab-link'}>Integrations</Link>
          </Tabs>
        </Box>
      </Box>
    );
};

export default SettingTabs;