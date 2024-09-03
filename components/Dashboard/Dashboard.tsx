"use client";

import { FormEvent, useEffect, useState } from 'react';
import { Toolbar, List, Typography, Divider, IconButton, Box, CssBaseline, Stack, Avatar, InputBase, Badge } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { alpha, styled, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import theme from '../theme';
import { useMediaQuery } from '@mui/material';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import Link from 'next/link';
import './Dashboard.css';
import Image from 'next/image';
import SidebarMenu from './SidebarMenu/SidebarMenu';
import { Provider } from 'react-redux';
import { store } from '@/store';

const drawerWidth: number = 300;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: 'white',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(9),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const Search = styled("form")(({ theme }) => ({
    position: "relative",
    border: "1px solid #ccc",
    borderRadius: "20px",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "90%",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(3),
      width: "70%",
    },
  }));
  
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  }));

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
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
        <Toolbar
            sx={{
              p: 1,
              px: "24px",
              minHeight: '65px',
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
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "10px",
                  display: matches ? "none" : "block",
                }}
              >
                <MenuIcon
                  sx={{
                    fontSize: "30px",
                    display: "flex",
                    alignItems: "center",
                  }}
                />
              </IconButton>
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: [1],
            }}
          >
            <Link href="/" style={{ textDecoration: 'none', gap: '5px' }} className='flex-center'>
                <Image src={'/logo.png'} width={"50"} height={"50"} alt='logo' />
                <Typography variant='h4' sx={{ fontFamily: `"Kanit", sans-serif`}}>TaskZen</Typography>
            </Link>
            <IconButton
              edge="start"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "10px",
                color: '#000',
                display: matches ? "none" : "block",
              }}
            >
              <CloseIcon
                sx={{
                  fontSize: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              />
            </IconButton>
          </Toolbar>
          <Divider />
          <SidebarMenu />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
    </Provider>
  );
}