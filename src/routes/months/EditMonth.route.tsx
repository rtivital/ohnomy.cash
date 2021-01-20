import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import client from 'src/api/client';
import MonthForm, { MonthFormValues } from './MonthForm/MonthForm';

export default function CreateMonthRoute() {
  const history = useHistory();
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState(true);

  const handleSubmit = (values: MonthFormValues) => {
    setLoading(true);
    client.axios
      .post('/months', values)
      .then((response) => {
        setLoading(false);
        client.updateCache('/months', (current: any[]) => [...current, response.data]);
        history.push(`/${values.year}-${values.month + 1}`);
      })
      .catch(setError);
  };

  return <MonthForm onSubmit={handleSubmit} error={error} loading={loading} />;
}
