import React, { useEffect, createContext } from 'react';
import { LoadingOverlay } from '@mantine/core';
import useLoadState from 'src/hooks/use-load-state';
import client from 'src/api/client';
import { User } from 'src/api/types';

export const AuthContext = createContext<User>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const state = useLoadState<User>();

  useEffect(() => {
    client.get<User>('/auth/me').then(state.onSuccess).catch(state.onError);
  }, []);

  if (!state.loaded && !state.error) {
    return <LoadingOverlay visible />;
  }

  return <AuthContext.Provider value={state.data}>{children}</AuthContext.Provider>;
}
