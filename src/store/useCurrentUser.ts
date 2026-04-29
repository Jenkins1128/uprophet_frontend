"use client";
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from './useUserStore';
import { useEffect } from 'react';
import { fetchCurrentUser } from '@/api/auth';

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
