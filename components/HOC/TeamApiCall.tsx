"use client";

import { useEffect, ComponentType } from 'react';
import { useDispatch } from 'react-redux';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { teamSliceAction } from '@/store/team-slice';

const TeamApiCall = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const HOC: ComponentType<P> = (props) => {
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
      const fetchData = async () => {
        dispatch(teamSliceAction.setIsLoading(true));
        try {
          const response = await axiosPrivate.get("/api/team");
          dispatch(teamSliceAction.getAllUsers(response.data.users));
        } catch (error) {
          console.error(error);
        }
        dispatch(teamSliceAction.setIsLoading(false));
      };

      fetchData();
    }, [axiosPrivate, dispatch]);

    return <WrappedComponent {...props} />;
  };

  return HOC;
};

export default TeamApiCall;