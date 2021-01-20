import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useTranslations from 'src/hooks/use-translations';
import client from 'src/api/client';
import { Month } from 'src/api/types';
import MonthForm, { MonthFormValues } from './MonthForm/MonthForm';

export default function CreateMonthRoute() {
  const t = useTranslations();
  const history = useHistory();
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: MonthFormValues) => {
    setLoading(true);

    client.axios
      .post<Month>('/months', values)
      .then((response) => {
        setLoading(false);
        client.updateCache('/months', (current: Month[]) => [...current, response.data]);
        history.push(`/${values.year}-${values.month + 1}`);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return (
    <MonthForm
      actionLabel={t('add_month')}
      buttonLabel={t('add_month')}
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
    />
  );
}
