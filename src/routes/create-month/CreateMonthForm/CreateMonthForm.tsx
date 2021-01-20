import React, { useState } from 'react';
import { useForm } from 'xooks';
import { useHistory } from 'react-router-dom';
import { Select, Title, Text, ElementsGroup, Button } from '@mantine/core';
import client from 'src/api/client';
import { useLocale } from 'src/providers/LocaleProvider';
import useTranslations from 'src/hooks/use-translations';
import NumberInput from './NumberInput';
import classes from './CreateMonthForm.styles.less';

function capitalizeString(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function CreateMonthForm() {
  const t = useTranslations();
  const [, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const locale = useLocale();
  const history = useHistory();

  const monthNames = Array(12)
    .fill(0)
    .map((_, month) => ({
      label: capitalizeString(new Date(2000, month).toLocaleString(locale, { month: 'long' })),
      value: month.toString(),
    }));

  const yearData = Array(3)
    .fill(0)
    .map((_, year) => ({
      label: (2020 + year).toString(),
      value: (2020 + year).toString(),
    }));

  const form = useForm({
    initialValues: {
      month: (new Date().getMonth() + 1).toString(),
      year: new Date().getFullYear().toString(),
      balance: '',
      savings: '',
    },
  });

  const handleSubmit = () => {
    const values = {
      month: parseInt(form.values.month, 10),
      year: parseInt(form.values.year, 10),
      balance: parseInt(form.values.balance, 10),
      savings: parseInt(form.values.savings, 10),
    };

    setLoading(true);

    client.axios
      .post('/months', values)
      .then((response) => {
        client.updateCache('/months', (current: any[]) => [...current, response.data]);
        history.push(`/${form.values.year}-${parseInt(form.values.month, 10) + 1}`);
      })
      .catch(() => setError(true));
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <Title order={2} className={classes.title}>
          {t('add_month')}
        </Title>

        <form
          className={classes.form}
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <div className={classes.fieldsGroup}>
            <Select
              required
              label={t('year')}
              data={yearData}
              value={form.values.year}
              onChange={(value) => form.setField('year', value)}
              className={classes.fieldSecondary}
            />

            <Select
              required
              label={t('month')}
              data={monthNames}
              value={form.values.month}
              onChange={(value) => form.setField('month', value)}
              className={classes.fieldPrimary}
            />
          </div>

          <NumberInput
            label={t('savings_month_start')}
            value={form.values.savings}
            onChange={(value) => form.setField('savings', value)}
          />

          <NumberInput
            label={t('balance_month_start')}
            value={form.values.balance}
            onChange={(value) => form.setField('balance', value)}
          />

          {error && (
            <Text theme="danger" size="sm" className={classes.error}>
              {t('month_already_exists')}
            </Text>
          )}

          <ElementsGroup position="right" className={classes.controls}>
            <Button type="submit">{t('add_month')}</Button>
          </ElementsGroup>
        </form>
      </div>
    </div>
  );
}
