import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Stack, TableHead } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { TablePaginationActions } from '../MaterialSnippets/MaterialSnippets';

function createData(title: string, priority: string, team: string, created_at: string) {
  return { title, priority, team, created_at };
};

const rows = [
  createData('Dubmicate button', 'Medium', 'ilkin', '2 hours ago'),
  createData('Dubmicate button', 'High', 'ilkin', '2 hours ago'),
  createData('Dubmicate button', 'Medium', 'ilkin', '2 hours ago'),
  createData('Dubmicate button', 'Normal', 'ilkin', '2 hours ago'),
  createData('Dubmicate button', 'Medium', 'ilkin', '2 hours ago'),
  createData('Dubmicate button', 'High', 'ilkin', '2 hours ago'),
  createData('Dubmicate button', 'Medium', 'ilkin', '2 hours ago'),
  createData('Dubmicate button', 'High', 'ilkin', '2 hours ago'),
];

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const randomTitleRound = ['#D18805','#1A65E9','#0B8A49','#D83121','#6D36D4'];

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell><b>Task Title</b></TableCell>
            <TableCell align="left" sx={{ width: '110px' }}><b>Priority</b></TableCell>
            <TableCell align="left"><b>Team</b></TableCell>
            <TableCell align="left"><b>Created At</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row,i) => (
            <TableRow key={i}>
              <TableCell>
                <Box className='flex-start' sx={{ gap: 1 }}>
                  <Box sx={{ width: '15px', height: '15px', flexShrink: 0, borderRadius: '50%', marginTop: '-2px', bgcolor: randomTitleRound[Math.floor(Math.random() * randomTitleRound.length)] }}></Box>
                  {row.title}
                </Box>
              </TableCell>
              <TableCell style={{ width: 110 }}  align="right">
                <Box className='flex-start'>
                  {row.priority === 'Medium' && <KeyboardArrowUpIcon sx={{ color: '#CC8907' }} />}
                  {row.priority === 'High' && <KeyboardDoubleArrowUpIcon sx={{ color: '#E13722' }} />}
                  {row.priority}
                </Box>
              </TableCell>
              <TableCell style={{ width: 130 }} align="left">
                <Stack direction="row" className='flex-start'>
                  <Avatar sx={{ bgcolor: '#1A65E9', width: '25px', height: '25px', fontSize: '14px' }}>H</Avatar>
                  <Avatar sx={{ bgcolor: '#D83121', width: '25px', height: '25px', fontSize: '14px' }}>N</Avatar>
                  <Avatar sx={{ bgcolor: '#D18805', width: '25px', height: '25px', fontSize: '14px' }}>OP</Avatar>
                </Stack>
              </TableCell>
              <TableCell style={{ width: 130 }} align="left">
                {row.created_at}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[8, 10, 25, { label: 'All', value: -1 }]}
              colSpan={4}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
