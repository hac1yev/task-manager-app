"use client";

import { useEffect } from 'react';
import TasksApiCall from '../HOC/TasksApiCall';
import Tasks from '../Tasks/Tasks';
import { useDispatch } from 'react-redux';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { taskSliceActions } from '@/store/task-slice';

const HOCTasksComponent = TasksApiCall(Tasks);

const SearchWrapper = ({ searchParams }: { searchParams: { q: string; page: number } }) => {
    const axiosPrivate = useAxiosPrivate();    
    const { q,page } = searchParams;
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchData = async () => {
        dispatch(taskSliceActions.setIsLoading(true));
        try {
          const response = await axiosPrivate.get(`/api/search?q=${q}&page=${page}`);          
          dispatch(taskSliceActions.getAllTasks(response.data.tasks));        
        } catch (error) {
          console.error(error);
        }
        dispatch(taskSliceActions.setIsLoading(false));
      };

      fetchData();
    }, [axiosPrivate, dispatch, q, page]);    

    return (
        <HOCTasksComponent />
    );
};

export default SearchWrapper;