import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import client from 'src/api/client';
import { Category, Month, Transaction } from 'src/api/types';
import isSameDate from './is-same-date';
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
  const history = useHistory();
  const { month } = useParams<{ month: string }>();
  const date = month ? new Date(month) : START_OF_MONTH;
  const [state, setState] = useState<MonthRouteState>({ loaded: false, error: null, data: null });
  const url = `/transactions?month=${date.toISOString()}`;

  useEffect(() => {
    setState({ loaded: false, error: null, data: null });

    client.get<Month[]>('/months').then((months) => {
      const currentMonth = months.find((m) => isSameDate(date, new Date(m.date)));
      if (!currentMonth) {
        history.replace('/create-month', { date });
        return null;
      }

      return Promise.all([client.get<Transaction[]>(url), client.get<Category[]>('/categories')])
        .then(([transactions, categories]) => {
          setState({ loaded: true, error: null, data: { transactions, categories } });
        })
        .catch((error) => setState({ loaded: false, error, data: null }));
    });
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
