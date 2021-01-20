import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';
import client from 'src/api/client';
import { Month } from 'src/api/types';
import useLoadState from 'src/hooks/use-load-state';
import MonthForm, { MonthFormValues } from './MonthForm/MonthForm';

export default function CreateMonthRoute() {
  const { month } = useParams<{ month: string }>();
  const history = useHistory();
  const state = useLoadState<Month>();
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState(false);
  const date = new Date(month);
  date.setDate(2);

  useEffect(() => {
    client.get<Month>(`/months/${date.toISOString()}`).then(state.onSuccess).catch(state.onError);
  }, []);

  const handleSubmit = (values: MonthFormValues) => {
    setLoading(true);
    client.axios
      .post<Month>('/months', values)
      .then((response) => {
        setLoading(false);
        client.updateCache('/months', (current: Month[]) => [...current, response.data]);
        history.push(`/${values.year}-${values.month + 1}`);
      })
      .catch(setError);
  };

  if (!state.loaded) {
    return <LoadingOverlay visible />;
  }

  return (
    <MonthForm
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
      initialValues={{
        month: date.getMonth(),
        year: date.getFullYear(),
        savings: state.data.savings,
        balance: state.data.balance,
      }}
    />
  );
}
