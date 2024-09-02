import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box, TableHead } from '@mui/material';

function createData(fullName: string, status: string, created_at: string) {
  return { fullName, status, created_at };
};

const rows = [
  createData('Ilkin Haciyev', 'Avtive', '2 hours ago'),
  createData('Fariz Memmedov', 'Deactive', '2 hours ago'),
  createData('Elvin Cabbarli', 'Deactive', '2 hours ago'),
  createData('Ferid Emioglu', 'Avtive', '2 hours ago'),
  createData('Dasdas asdasfds', 'Deactive', '2 hours ago'),
];

export default function Users() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell><b>Full Name</b></TableCell>
            <TableCell align="center"><b>Status</b></TableCell>
            <TableCell align="right"><b>Created At</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='users-table'>
          {rows.map((row,i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row" className='flex-start' sx={{ display: 'flex', gap: 1 }}>
                <Avatar sx={{ bgcolor: '#6D36D4' }}>
                  {row.fullName.split(" ").map(item => item[0].toLocaleUpperCase()).join("")}
                </Avatar>
                {row.fullName}
              </TableCell>
              <TableCell style={{ width: 80 }} align="right">
                <Box sx={{ bgcolor: '#BBDAFC', p: '3px 8px', borderRadius: '20px' }} className="flex-center">{row.status}</Box>
              </TableCell>
              <TableCell style={{ width: 120 }} align="right">
                {row.created_at}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
