"use client";

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box, LinearProgress, TableHead, Typography } from '@mui/material';
import { useTypedSelector } from '@/store/team-slice';
import moment from 'moment';
import CustomPopover from '../CustomPopovers/CustomPopover';

export default function Users() {
  const users = useTypedSelector((state) => state.teamReducer.users);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [userId,setUserId] = React.useState("");
  const [isLoading,setIsLoading] = React.useState(true);

  const userColors = React.useMemo(() => {
    const colors = ['#D18805', '#1A65E9', '#0B8A49', '#D83121', '#6D36D4'];
    const colorMap = new Map();
    users.forEach((user, index) => {
      const color = colors[index % colors.length];
      colorMap.set(user._id, color);
    });
    return colorMap;
  }, [users]);

  const handlePopoverOpen = (id: string, event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setUserId(id);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setUserId("");
  };

  const open = Boolean(anchorEl);

  React.useEffect(() => {
      setIsLoading(false);
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell><b>Full Name</b></TableCell>
              <TableCell align="left"><b>Status</b></TableCell>
              <TableCell align="left"><b>Created At</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='users-table'>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell component="th" scope="row" >
                  <Box className='flex-start' sx={{ display: 'flex', gap: 1 }}>
                    <Avatar 
                      sx={{ bgcolor: userColors.get(user._id) }}
                      aria-owns={open ? 'mouse-over-popover' : undefined}
                      onMouseLeave={handlePopoverClose} 
                      onMouseEnter={handlePopoverOpen.bind(null, user._id)}
                      aria-haspopup="true"
                    >
                      {user.fullName.split(" ").map(u => u[0].toLocaleUpperCase()).join("")}
                    </Avatar>
                    {user.fullName}
                    <CustomPopover 
                      fullName={user.fullName}
                      title={user.title}
                      id={user._id}
                      email={user.email}
                      color={userColors.get(user._id)}
                      anchorEl={anchorEl}
                      userId={userId}
                      handlePopoverClose={handlePopoverClose}
                    />
                  </Box>
                </TableCell>
                <TableCell sx={{ width: 80 }} align="left">
                  <Box sx={{ bgcolor: '#BBDAFC', p: '3px 8px', borderRadius: '20px' }} className="flex-center">{user.status}</Box>
                </TableCell>
                <TableCell sx={{ width: 152 }} align="left">
                  {moment(user.created_at).fromNow()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {users.length === 0 && isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}

      {users.length === 0 && !isLoading && (
        <Typography className="flex-center" variant='h6' sx={{ mt: 1 }}>
          There is no user!
        </Typography>
      )}
    </>
  );
};