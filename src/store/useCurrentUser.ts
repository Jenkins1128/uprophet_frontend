import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { url } from '../domain';
import { useUserStore } from './useUserStore';
import { useEffect } from 'react';

export const fetchCurrentUser = async () => {
  const { data } = await axios.get(`${url}/currentUser`, {
    withCredentials: true,
    headers: { Accept: '*/*' },
  });
  return data;
};

export const useCurrentUser = () => {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.logout);

  const query = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    retry: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setUser(query.data);
    } else if (query.isError) {
      clearUser();
    }
  }, [query.data, query.isSuccess, query.isError, setUser, clearUser]);

  return query;
};
