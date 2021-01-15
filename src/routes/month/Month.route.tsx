import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from 'src/api/client';
import { Category, Transaction } from 'src/api/types';
import MonthContainer from './MonthContainer';

interface MonthRouteState {
  loaded: boolean;
  error: Error;
  data: {
    transactions: Transaction[];
    categories: Category[];
  };
}

const START_OF_MONTH = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

export default function MonthRoute() {
  const { month } = useParams<{ month: string }>();
  const date = month ? new Date(month) : START_OF_MONTH;
  const [state, setState] = useState<MonthRouteState>({ loaded: false, error: null, data: null });
  const url = `/transactions?month=${date.toISOString()}`;

  useEffect(() => {
    setState({ loaded: false, error: null, data: null });
    Promise.all([client.get<Transaction[]>(url), client.get<Category[]>('/categories')])
      .then(([transactions, categories]) =>
        setState({ loaded: true, error: null, data: { transactions, categories } })
      )
      .catch((error) => setState({ loaded: false, error, data: null }));
  }, [month]);

  if (!state.loaded) {
    return <div>Loading</div>;
  }

  if (state.error) {
    return <div>Error</div>;
  }

  return (
    <MonthContainer
      transactions={state.data.transactions}
      categories={state.data.categories}
      cacheUrl={url}
      date={date.toISOString()}
    />
  );
}
