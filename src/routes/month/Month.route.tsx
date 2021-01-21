import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';
import useErrorBoundaries from 'src/hooks/use-error-boundaries';
import client from 'src/api/client';
import { Category, Month, Transaction } from 'src/api/types';
import isSameMonth from 'src/utils/is-same-month';
import MonthContainer from './Month.container';

interface MonthRouteState {
  loaded: boolean;
  data: {
    transactions: Transaction[];
    categories: Category[];
    month: Month;
  };
}

const START_OF_MONTH = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

export default function MonthRoute() {
  const history = useHistory();
  const onError = useErrorBoundaries();
  const { month } = useParams<{ month: string }>();
  const date = month ? new Date(month) : START_OF_MONTH;
  date.setHours(23);
  const [state, setState] = useState<MonthRouteState>({ loaded: false, data: null });
  const url = `/transactions?month=${date.toISOString()}`;

  useEffect(() => {
    setState({ loaded: false, data: null });

    client.get<Month[]>('/months').then(async (months) => {
      const currentMonth = months.find((m) => isSameMonth(date, new Date(m.date)));

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
          data: { transactions, categories, month: currentMonth },
        });
      } catch (error) {
        onError(error);
      }

      return null;
    });
  }, [month]);

  if (!state.loaded) {
    return <LoadingOverlay visible />;
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
