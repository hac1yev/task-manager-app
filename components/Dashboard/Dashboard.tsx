"use client";

import { FormEvent, useEffect, useState } from "react";
import { Toolbar, Typography, Divider, IconButton, Box, CssBaseline, Stack, Avatar, Badge } from "@mui/material"; 
import { ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../theme";
import { useMediaQuery } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import "./Dashboard.css";
import Image from "next/image";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
import { Provider } from "react-redux";
import { store } from "@/store";
import { AppBar, Drawer, Search, SearchIconWrapper, StyledInputBase } from "../MaterialSnippets/MaterialSnippets";
import { Toaster } from "react-hot-toast";

export default function Dashboard({ children }: DashboardProps) {
  const [open, setOpen] = useState(true);
  const matches = useMediaQuery("(min-width:769px)");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                p: 1,
                px: "24px",
                minHeight: "65px",
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                color="#000"
                noWrap
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  pl: "3px",
                  alignItems: "center",
                }}
              >
                {!matches && <IconButton
                  edge="start"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "10px",
                    display: "block",
                  }}
                >
                  <MenuIcon
                    sx={{
                      fontSize: "30px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  />
                </IconButton>}
                <Search sx={{ height: "100%" }} onSubmit={handleSubmit}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    name="searchText"
                    placeholder="Axtar…"
                    sx={{ width: "100%" }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </Typography>
              <Stack direction="row" spacing={matches ? 2 : 1}>
                <IconButton>
                  <Badge badgeContent={2} color="error">
                    <NotificationsNoneIcon />
                  </Badge>
                </IconButton>
                <Link href="/profile">
                  <Avatar alt="Remy Sharp" src="" />
                </Link>
              </Stack>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: [1],
              }}
            >
              <Link
                href="/"
                style={{ textDecoration: "none", gap: "5px" }}
                className="flex-center"
              >
                <Image
                  src={"/logo.png"}
                  width={"50"}
                  height={"50"}
                  alt="logo"
                />
                <Typography
                  variant="h4"
                  sx={{ fontFamily: `"Kanit", sans-serif` }}
                >
                  TaskZen
                </Typography>
              </Link>
              {!matches && <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "10px",
                  color: "#000",
                  display: "block",
                }}
              >
                <CloseIcon
                  sx={{
                    fontSize: "30px",
                    display: "flex",
                    alignItems: "center",
                  }}
                />
              </IconButton>}
            </Toolbar>
            <Divider />
            <SidebarMenu />
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>

        <Toaster 
          position="bottom-right"
          reverseOrder={false}
        />

      </ThemeProvider>
    </Provider>
  );
}