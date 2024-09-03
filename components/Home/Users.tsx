import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box, TableHead } from '@mui/material';
import { useTypedSelector } from '@/store/team-slice';
import moment from 'moment';

export default function Users() {
  const users = useTypedSelector((state) => state.teamReducer.users);
  const randomTitleRound = ['#D18805','#1A65E9','#0B8A49','#D83121','#6D36D4'];

  return (
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
                  <Avatar sx={{ bgcolor: randomTitleRound[Math.floor(Math.random() * randomTitleRound.length)] }}>
                    {user.fullName.split(" ").map(u => u[0].toLocaleUpperCase()).join("")}
                  </Avatar>
                  {user.fullName}
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
  );
}
