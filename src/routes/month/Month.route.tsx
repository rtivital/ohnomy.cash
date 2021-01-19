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
    month: Month;
  };
}

const START_OF_MONTH = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

export default function MonthRoute() {
  const history = useHistory();
  const { month } = useParams<{ month: string }>();
  const date = month ? new Date(month) : START_OF_MONTH;
  date.setHours(23);
  const [state, setState] = useState<MonthRouteState>({ loaded: false, error: null, data: null });
  const url = `/transactions?month=${date.toISOString()}`;

  useEffect(() => {
    setState({ loaded: false, error: null, data: null });

    client.get<Month[]>('/months').then(async (months) => {
      const currentMonth = months.find((m) => isSameDate(date, new Date(m.date)));

      if (!currentMonth) {
        history.replace('/months/create', { date });
        return null;
      }

      try {
        const [transactions, categories] = await Promise.all([
          client.get<Transaction[]>(url),
          client.get<Category[]>('/categories'),
        ]);
        setState({
          loaded: true,
          error: null,
          data: { transactions, categories, month: currentMonth },
        });
      } catch (error) {
        return setState({ loaded: false, error, data: null });
      }

      return null;
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
