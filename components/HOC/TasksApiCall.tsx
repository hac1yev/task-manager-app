"use client";

import { useEffect, ComponentType } from 'react';
import { useDispatch } from 'react-redux';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { taskSliceActions } from '@/store/task-slice';

const TasksApiCall = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const HOC: ComponentType<P> = (props) => {
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosPrivate.get("/api/tasks");
          dispatch(taskSliceActions.getAllTasks(response.data.tasks));        
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, [axiosPrivate, dispatch]);

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default TasksApiCall;