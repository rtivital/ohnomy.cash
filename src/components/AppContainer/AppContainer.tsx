import React from 'react';
import Navigation from './Navigation/Navigation';

interface AppContainerProps {
  children: React.ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
