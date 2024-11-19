"use client";

import { Box,List,ListItem,ListItemButton,ListItemIcon,ListItemText, useMediaQuery } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GridViewIcon from "@mui/icons-material/GridView";
import ChecklistIcon from "@mui/icons-material/Checklist";
import LoopIcon from "@mui/icons-material/Loop";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import SettingsIcon from "@mui/icons-material/Settings";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { memo, useEffect, useState } from "react";

const SidebarMenu = () => {
  const pathname = usePathname();
  const [role,setRole] = useState("");

  useEffect(() => {
    const role = typeof window !== "undefined" && localStorage.getItem("userInfo") 
      ? JSON.parse(localStorage.getItem("userInfo") || "{}").role 
      : "";   
    
    setRole(role);
  }, []);

  return (
    <>
      <Box>
        <List sx={{ display: 'flex', flexDirection: 'column', mt: "12px", px: "9px" , gap: '5px' }}>
          <Link href="/">
            <ListItem
              disablePadding
              className={pathname === "/" ? "active-menu-item" : ""}
            >
              <ListItemButton className="menu-item-button">
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <GridViewIcon
                    sx={{ color: pathname === "/" ? "#fff" : "#0f0f0f" }}
                  />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/tasks">
            <ListItem
              disablePadding
              className={pathname === "/tasks" ? "active-menu-item" : ""}
            >
              <ListItemButton className="menu-item-button">
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <AssignmentOutlinedIcon
                    sx={{ color: pathname === "/tasks" ? "#fff" : "#0f0f0f" }}
                  />
                </ListItemIcon>
                <ListItemText primary="Tasks" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/completed">
            <ListItem
              disablePadding
              className={pathname === "/completed" ? "active-menu-item" : ""}
            >
              <ListItemButton className="menu-item-button">
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <CheckCircleOutlineIcon
                    sx={{ color: pathname === "/completed" ? "#fff" : "#0f0f0f" }}
                  />
                </ListItemIcon>
                <ListItemText primary="Completed" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/in-progress">
            <ListItem
              disablePadding
              className={pathname === "/in-progress" ? "active-menu-item" : ""}
            >
              <ListItemButton className="menu-item-button">
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <LoopIcon
                    sx={{
                      color: pathname === "/in-progress" ? "#fff" : "#0f0f0f",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="In Progress" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/to-do">
            <ListItem
              disablePadding
              className={pathname === "/to-do" ? "active-menu-item" : ""}
            >
              <ListItemButton className="menu-item-button">
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <ChecklistIcon
                    sx={{ color: pathname === "/to-do" ? "#fff" : "#0f0f0f" }}
                  />
                </ListItemIcon>
                <ListItemText primary="To Do" />
              </ListItemButton>
            </ListItem>
          </Link>
          {role === 'admin' && (
            <>
              <Link href="/team">
                <ListItem
                  disablePadding
                  className={pathname === "/team" ? "active-menu-item" : ""}
                >
                  <ListItemButton className="menu-item-button">
                    <ListItemIcon sx={{ minWidth: "40px" }}>
                      <PeopleOutlineIcon
                        sx={{ color: pathname === "/team" ? "#fff" : "#0f0f0f" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Team" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="/trash">
                <ListItem
                  disablePadding
                  className={pathname === "/trash" ? "active-menu-item" : ""}
                >
                  <ListItemButton className="menu-item-button">
                    <ListItemIcon sx={{ minWidth: "40px" }}>
                      <DeleteOutlineIcon
                        sx={{ color: pathname === "/trash" ? "#fff" : "#0f0f0f" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Trash" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </>
          )}
        </List>
      </Box>
      <List
        sx={{
          mt: "12px",
          px: "10px",
          position: "absolute",
          bottom: "5px",
          width: "100%",
          bgcolor: '#fff'
        }}
      >
        <Link href="/settings/account">
          <ListItem disablePadding className="sidebar-list-item">
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </>
  );
};

export default memo(SidebarMenu);
