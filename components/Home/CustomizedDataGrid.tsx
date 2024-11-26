"use client";

import * as React from 'react';
import { Avatar, Paper, Box, LinearProgress, Stack, TableHead, Typography, Table, TableBody, TableCell, TableContainer, TableFooter,TablePagination, TableRow } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TablePaginationActions } from '../MaterialSnippets/MaterialSnippets';
import { useTypedTaskSelector } from '@/store/task-slice';
import { useTypedSelector } from '@/store/team-slice';
import moment from 'moment';

function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const randomTitleRound = ['#D18805','#1A65E9','#0B8A49','#D83121','#6D36D4'];
  const allUsers = useTypedSelector(state => state.teamReducer.users);
  const tasks = useTypedTaskSelector(state => state.taskReducer.tasks);
  const isLoading = useTypedTaskSelector(state => state.taskReducer.isLoading);
  
  const userColors = React.useMemo(() => {
    const colors = ['#D18805', '#1A65E9', '#0B8A49', '#D83121', '#6D36D4', "#F72D93"];
    const colorMap = new Map();
    allUsers.forEach((user, index) => {
      const color = colors[index % colors.length];
      colorMap.set(user._id, color);
    });
    return colorMap;
  }, [allUsers]);

  const modifiedTasks = React.useMemo(() => {
    return tasks.map((task) => {
      const { users } = task;
      const userNames: {
          _id: string;
          fullName: string;
          title: string;
          email: string;
          avatar: string | undefined;
      }[] = [];            
  
      users?.forEach((user) => {
          const findedUser = allUsers.find((u) => user === u._id);          
          if(findedUser) {
              userNames.push({
                  _id: findedUser?._id,
                  fullName: findedUser?.fullName,
                  title: findedUser.title,
                  email: findedUser.email,
                  avatar: findedUser.avatar
              });
          }
      });
      
      return {
          ...task,
          users: userNames
      }
    });
  }, [allUsers,tasks]);

  const handleChangePage = React.useCallback((event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = React.useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  return (
    <>
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
              ? modifiedTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : modifiedTasks
            ).map((row, index) => (
              <TableRow key={row._id}>
                <TableCell>
                  <Box className='flex-start' sx={{ gap: 1 }}>
                    <Box sx={{ width: '15px', height: '15px', flexShrink: 0, borderRadius: '50%', marginTop: '-2px', bgcolor: randomTitleRound[index % randomTitleRound.length] }}></Box>
                    {row.title}
                  </Box>
                </TableCell>
                <TableCell style={{ width: 110 }}  align="right">
                  <Box className='flex-start'>
                    {row.priority_level === 'MEDIUM' && <KeyboardArrowUpIcon sx={{ color: '#CC8907' }} />}
                    {row.priority_level === 'HIGH' && <KeyboardDoubleArrowUpIcon sx={{ color: '#E13722' }} />}
                    {row.priority_level === 'LOW' && <KeyboardArrowDownIcon sx={{ color: '#0C9046' }} />}
                    {row.priority_level}
                  </Box>
                </TableCell>
                <TableCell style={{ width: 130 }} align="left">
                  <Stack direction="row" className='flex-start'>
                    {row.users?.map((user) => (
                      <Box key={user._id} component="span">
                        <Avatar 
                          src={user.avatar}
                          sx={{ bgcolor: userColors.get(user._id) }} 
                          className="task-avatar"
                        >
                          {user.fullName.trim().includes(" ")
                            ? user.fullName
                                .split(" ")
                                .map((u) => u[0].toLocaleUpperCase())
                                .join("")
                            : user.fullName[0]}
                        </Avatar>
                      </Box>
                    ))}
                  </Stack>
                </TableCell>
                <TableCell style={{ width: 130 }} align="left">
                  {moment(row.created_at).fromNow()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[8, 10, 25, { label: 'All', value: -1 }]}
                colSpan={4}
                count={tasks.length}
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

      {tasks.length === 0 && isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}

      {tasks.length === 0 && !isLoading && (
        <Typography className="flex-center" variant='h6' sx={{ mt: 1 }}>
          There is no task!
        </Typography>
      )}
    </>
  );
}

export default React.memo(CustomPaginationActionsTable);