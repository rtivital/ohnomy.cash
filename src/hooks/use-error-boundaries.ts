import { useContext } from 'react';
import { ErrorBoundariesContext } from 'src/providers/ErrorBoundaries';

export default function useErrorBoundaries() {
  const context = useContext(ErrorBoundariesContext);

  if (!context) {
    throw new Error('ErrorBoundariesProvider not found');
  }

  return context.onError;
}
