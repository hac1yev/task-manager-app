"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { taskSliceActions } from '@/store/task-slice';
import Tasks from '../Tasks/Tasks';
import { Box } from '@mui/material';
import SearchHeader from './SearchHeader';
import TeamApiCall from '../HOC/TeamApiCall';

const HOCAddTaskComponent = TeamApiCall(SearchHeader);

const SearchWrapper = ({ searchParams }: { searchParams: { q: string } }) => {
    const axiosPrivate = useAxiosPrivate();    
    const { q } = searchParams;
    const dispatch = useDispatch();    
    
    useEffect(() => {
      const fetchData = async () => {
        dispatch(taskSliceActions.setIsLoading(true));
        try {
          const response = await axiosPrivate.get(`/api/search?q=${q}`);                    
          dispatch(taskSliceActions.getAllSearchedTasks(response.data.tasks));        
        } catch (error) {
          console.error(error);
        }
        dispatch(taskSliceActions.setIsLoading(false));
      };

      fetchData();
    }, [axiosPrivate, dispatch, q]);    

    return (
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
        <HOCAddTaskComponent q={q} />
        <Tasks />
      </Box>
    );
};

export default SearchWrapper;