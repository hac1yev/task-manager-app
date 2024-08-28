"use client";

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
;import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ChecklistIcon from '@mui/icons-material/Checklist';
import LoopIcon from '@mui/icons-material/Loop';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { usePathname } from "next/navigation";
import Link from "next/link";

const SidebarMenu = () => {
    const pathname = usePathname();
    

  return (
    <Box className="sidebar-wrapper">
      <List sx={{ mt: '12px', px: '15px' }}>
        <Link href="/">
          <ListItem
            disablePadding
            className={
              pathname === "/"
                ? "sidebar-list-item active-menu-item"
                : "sidebar-list-item"
            }
          >
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <GridViewIcon sx={{  color: pathname === "/" ? '#fff' : '#000' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/tasks">
          <ListItem
            disablePadding
            className={
              pathname === "/tasks"
                ? "sidebar-list-item active-menu-item"
                : "sidebar-list-item"
            }
          >
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <FormatListBulletedIcon sx={{  color: pathname === "/tasks" ? '#fff' : '#000' }} />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/completed">
          <ListItem
            disablePadding
            className={
              pathname === "/completed"
                ? "sidebar-list-item active-menu-item"
                : "sidebar-list-item"
            }
          >
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <CheckCircleOutlineIcon sx={{  color: pathname === "/completed" ? '#fff' : '#000' }} />
              </ListItemIcon>
              <ListItemText primary="Completed" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/in-progress">
          <ListItem
            disablePadding
            className={
              pathname === "/in-progress"
                ? "sidebar-list-item active-menu-item"
                : "sidebar-list-item"
            }
          >
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <LoopIcon sx={{  color: pathname === "/in-progress" ? '#fff' : '#000' }} />
              </ListItemIcon>
              <ListItemText primary="In Progress" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/to-do">
          <ListItem
            disablePadding
            className={
              pathname === "/to-do"
                ? "sidebar-list-item active-menu-item"
                : "sidebar-list-item"
            }
          >
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <ChecklistIcon sx={{  color: pathname === "/to-do" ? '#fff' : '#000' }} />
              </ListItemIcon>
              <ListItemText primary="To Do" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/team">
          <ListItem
            disablePadding
            className={
              pathname === "/team"
                ? "sidebar-list-item active-menu-item"
                : "sidebar-list-item"
            }
          >
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <PeopleOutlineIcon sx={{  color: pathname === "/team" ? '#fff' : '#000' }} />
              </ListItemIcon>
              <ListItemText primary="Team" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/trash">
          <ListItem
            disablePadding
            className={
              pathname === "/trash"
                ? "sidebar-list-item active-menu-item"
                : "sidebar-list-item"
            }
          >
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: '40px' }}>
                <DeleteOutlineIcon sx={{  color: pathname === "/trash" ? '#fff' : '#000' }} />
              </ListItemIcon>
              <ListItemText primary="Trash" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );
};

export default SidebarMenu;