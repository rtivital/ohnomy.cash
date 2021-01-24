import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';
import useTranslations from 'src/hooks/use-translations';
import useLoadState from 'src/hooks/use-load-state';
import client from 'src/api/client';
import { Month } from 'src/api/types';
import MonthForm, { MonthFormSubmitValues } from './MonthForm/MonthForm';

export default function CreateMonthRoute() {
  const t = useTranslations();
  const history = useHistory();
  const state = useLoadState<{ months: Month[]; nextMonth: Month }>();
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([client.axios.get<Month[]>('/months'), client.axios.get<Month>('/months/next')])
      .then(([months, nextMonth]) => {
        state.onSuccess({ months: months.data, nextMonth: nextMonth.data });
      })
      .catch(state.onError);
  }, []);

  const handleSubmit = (values: MonthFormSubmitValues) => {
    setLoading(true);

    client.axios
      .post<Month>('/months', values)
      .then((response) => {
        setLoading(false);
        client.updateCache('/months', (current: Month[]) => [...current, response.data]);
        const month = new Date(response.data.date);
        history.push(`/${month.getFullYear()}-${month.getMonth() + 1}`);
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
      actionLabel={t('add_month')}
      buttonLabel={t('add_month')}
      excludeMonths={state.data.months}
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
      initialValues={{
        date: state.data.nextMonth.date,
        balance: state.data.nextMonth.balance,
        savings: state.data.nextMonth.savings,
      }}
    />
  );
}
