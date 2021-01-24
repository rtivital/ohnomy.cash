import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';
import useTranslations from 'src/hooks/use-translations';
import useErrorBoundaries from 'src/hooks/use-error-boundaries';
import client from 'src/api/client';
import { Month } from 'src/api/types';
import useLoadState from 'src/hooks/use-load-state';
import getStartOfMonth from 'src/utils/get-start-of-month';
import MonthForm, { MonthFormSubmitValues } from './MonthForm/MonthForm';

export default function EditMonthRoute() {
  const t = useTranslations();
  const handleError = useErrorBoundaries();
  const { month } = useParams<{ month: string }>();
  const history = useHistory();
  const state = useLoadState<Month>();
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState(false);
  const date = getStartOfMonth(month);
  const url = `/months/${date.toISOString()}`;

  useEffect(() => {
    client.get<Month>(`/months/${date.toISOString()}`).then(state.onSuccess).catch(handleError);
  }, []);

  const handleSubmit = (values: MonthFormSubmitValues) => {
    setLoading(true);

    client.axios
      .put<Month>('/months', { ...values, id: state.data.id })
      .then((response) => {
        setLoading(false);

        client.updateCache('/months', (current: Month[]) => {
          const clone = [...current];
          const index = current.findIndex((m) => response.data.id === m.id);
          if (index !== -1) {
            clone[index] = response.data;
          }
          return clone;
        });

        client.updateCache(url, response.data);

        const monthDate = new Date(response.data.date);
        history.push(`/${monthDate.getFullYear()}-${monthDate.getMonth() + 1}`);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  if (!state.loaded) {
    return <LoadingOverlay visible />;
  }

  return (
    <MonthForm
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
      disableDateInputs
      actionLabel={t('edit_month')}
      buttonLabel={t('save')}
      initialValues={{
        date: date.toISOString(),
        savings: state.data.savings,
        balance: state.data.balance,
      }}
    />
  );
}
