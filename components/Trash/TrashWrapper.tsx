"use client";

import { Box, Button, LinearProgress, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from "react";
import { TablePaginationActions } from "../MaterialSnippets/MaterialSnippets";
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { trashSliceActions, useTypedTrashSelector } from "@/store/trash-slice";
import { useDispatch } from "react-redux";

const TrashWrapper = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const randomTitleRound = ['#D18805','#1A65E9','#0B8A49','#D83121','#6D36D4'];
    const axiosPrivate = useAxiosPrivate();
    const trashTasks = useTypedTrashSelector(state => state.trashReducer.trashTasks);
    const [isLoading,setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        (async function() {
            setIsLoading(true);
            try {
                const response = await axiosPrivate.get("/api/trash");
                dispatch(trashSliceActions.getAllTrash(response.data.tasks));                
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        })()
    }, [axiosPrivate,dispatch]);

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

    const handleDeleteAll = () => {
        try {
            axiosPrivate.put("/api/trash", JSON.stringify("DELETE"));
            dispatch(trashSliceActions.deleteAll());
        } catch (error) {
            console.log(error);
        }
    };

    const handleRestoreAll = () => {
        try {
            axiosPrivate.put("/api/trash", JSON.stringify("RESTORE"));
            dispatch(trashSliceActions.deleteAll());
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteOne = (id: string | undefined) => {
        try {
            if (!id) return;
            
            axiosPrivate.put(`/api/trash/${id}`, JSON.stringify("DELETE"));
            dispatch(trashSliceActions.deleteOne(id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleRestoreOne = (id: string | undefined) => {
        try {
            if (!id) return;

            axiosPrivate.put(`/api/trash/${id}`, JSON.stringify("RESTORE"));
            dispatch(trashSliceActions.deleteOne(id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
            <Box className="flex-between" sx={{ mb: 3 }}>
                <Typography variant="h4">Trashed Tasks</Typography>
                <Box sx={{ display: 'flex', gap: '6px' }}>
                    <Button 
                        sx={{ display: 'flex', gap: '3px' }} 
                        onClick={handleRestoreAll}
                        disabled={trashTasks.length === 0}
                        color="inherit" 
                        variant="text" 
                    >
                        <RestoreIcon sx={{ width: '20px' }} />
                        Restore All
                    </Button>
                    <Button 
                        sx={{ display: 'flex', gap: '1px' }} 
                        onClick={handleDeleteAll}
                        disabled={trashTasks.length === 0}
                        variant="text" 
                        color="error" 
                    >
                        <DeleteIcon sx={{ width: '20px' }} />
                        Delete All
                    </Button>
                </Box>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Task Title</b></TableCell>
                            <TableCell align="left" sx={{ width: '110px' }}><b>Priority</b></TableCell>
                            <TableCell align="left"><b>Stage</b></TableCell>
                            <TableCell align="left"><b>Created At</b></TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? trashTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : trashTasks
                        ).map((task) => (
                            <TableRow key={task._id}>
                                <TableCell>
                                    <Box className='flex-start' sx={{ gap: 1 }}>
                                    <Box sx={{ width: '15px', height: '15px', flexShrink: 0, borderRadius: '50%', marginTop: '-2px', bgcolor: randomTitleRound[Math.floor(Math.random() * randomTitleRound.length)] }}></Box>
                                        {task.title}
                                    </Box>
                                </TableCell>
                                <TableCell style={{ width: 110 }}  align="right">
                                    <Box className='flex-start'>
                                        {task.priority_level === 'MEDIUM' && <KeyboardArrowUpIcon sx={{ color: '#CC8907' }} />}
                                        {task.priority_level === 'HIGH' && <KeyboardDoubleArrowUpIcon sx={{ color: '#E13722' }} />}
                                        {task.priority_level === 'LOW' && <KeyboardArrowDownIcon sx={{ color: '#0C9046' }} />}
                                        {task.priority_level}
                                    </Box>
                                </TableCell>
                                <TableCell style={{ width: 130 }} align="left">
                                    <Stack direction="row" className='flex-start'>
                                        {task.stage}
                                    </Stack>
                                </TableCell>
                                <TableCell style={{ width: 130 }} align="left">
                                    {task.created_at?.slice(0,10)}
                                </TableCell>
                                <TableCell style={{ width: 130 }} align="left">
                                    <Box className="flex-end" sx={{ width: "100%" }}>
                                        <Button
                                            color="primary"
                                            onClick={handleRestoreOne.bind(null, task._id)}
                                        >
                                            <RestoreIcon/>
                                        </Button>
                                        <Button
                                            color="error"
                                            onClick={handleDeleteOne.bind(null, task._id)}
                                        >
                                            <DeleteIcon/>
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[8, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={4}
                                count={trashTasks.length}
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

            {trashTasks.length === 0 && isLoading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )}

            {trashTasks.length === 0 && !isLoading && (
                <Typography className="flex-center" variant='h6' sx={{ mt: 1 }}>
                    Trash is empty!
                </Typography>
            )}
        </Box>
    );
};

export default TrashWrapper;