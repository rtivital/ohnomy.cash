import { useState } from 'react';

interface DataState<T> {
  loaded: boolean;
  error: Error;
  data: T;
}

export default function useLoadState<T>() {
  const [state, setState] = useState<DataState<T>>({ loaded: false, error: null, data: null });
  const handleSuccess = (data: T) => setState({ loaded: true, error: null, data });
  const handleError = (error: Error) => setState({ loaded: false, error, data: null });

  return {
    data: state.data,
    error: state.error,
    loaded: state.loaded,
    onSuccess: handleSuccess,
    onError: handleError,
  };
}
