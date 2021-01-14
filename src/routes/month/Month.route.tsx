import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from 'src/api/client';
import { Transaction } from 'src/api/types';
import MonthContainer from './MonthContainer';

interface MonthRouteState {
  loaded: boolean;
  error: Error;
  data: Transaction[];
}

const START_OF_MONTH = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

export default function MonthRoute() {
  const { month } = useParams<{ month: string }>();
  const date = month ? new Date(month) : START_OF_MONTH;
  const [state, setState] = useState<MonthRouteState>({ loaded: false, error: null, data: null });

  useEffect(() => {
    setState({ loaded: false, error: null, data: null });

    client.axios
      .get<Transaction[]>(`/transactions?month=${date.toISOString()}`)
      .then((response) => setState({ loaded: true, error: null, data: response.data }))
      .catch((error) => setState({ loaded: false, error, data: null }));
  }, [month]);

  if (!state.loaded) {
    return <div>Loading</div>;
  }

  if (state.error) {
    return <div>Error</div>;
  }

  return <MonthContainer transactions={state.data} />;
}
