import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';
import useLoadState from 'src/hooks/use-load-state';
import useErrorBoundaries from 'src/hooks/use-error-boundaries';
import client from 'src/api/client';
import { Category, Month, Transaction } from 'src/api/types';
import isSameMonth from 'src/utils/is-same-month';
import getStartOfMonth from 'src/utils/get-start-of-month';
import MonthContainer from './Month.container';

interface MonthRouteState {
  transactions: Transaction[];
  categories: Category[];
  month: Month;
}

export default function MonthRoute() {
  const { month } = useParams<{ month: string }>();
  const date = getStartOfMonth(month);
  const history = useHistory();
  const { data, loaded, onSuccess } = useLoadState<MonthRouteState>();
  const handleError = useErrorBoundaries();
  const url = `/transactions?month=${date.toISOString()}`;

  useEffect(() => {
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
        onSuccess({ transactions, categories, month: currentMonth });
      } catch (error) {
        handleError(error);
      }

      return null;
    });
  }, [month]);

  if (!loaded) {
    return <LoadingOverlay visible />;
  }

  return (
    <MonthContainer
      transactions={data.transactions}
      categories={data.categories}
      cacheUrl={url}
      date={date.toISOString()}
    />
  );
}
