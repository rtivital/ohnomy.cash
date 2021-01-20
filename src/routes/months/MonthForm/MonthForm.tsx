import React from 'react';
import { useForm } from 'xooks';
import { Select, Title, Text, ElementsGroup, Button, LoadingOverlay } from '@mantine/core';
import { useLocale } from 'src/hooks/use-locale';
import useTranslations from 'src/hooks/use-translations';
import getMonthsNames from 'src/utils/get-months-names';
import NumberInput from './NumberInput';
import classes from './MonthForm.styles.less';

const YEARS_DATA = Array(3)
  .fill(0)
  .map((_, year) => ({
    label: (2020 + year).toString(),
    value: (2020 + year).toString(),
  }));

export interface MonthFormValues {
  month: number;
  year: number;
  balance: number;
  savings: number;
}

interface MonthFormProps {
  error?: Error;
  loading: boolean;
  initialValues?: MonthFormValues;
  disableDateInputs?: boolean;
  onSubmit(values: MonthFormValues): void;
}

export default function MonthForm({
  disableDateInputs = false,
  initialValues,
  onSubmit,
  loading,
  error,
}: MonthFormProps) {
  const t = useTranslations();
  const locale = useLocale();
  const monthNames = getMonthsNames(locale);

  const form = useForm({
    initialValues: initialValues
      ? {
          month: initialValues.month.toString(),
          year: initialValues.month.toString(),
          balance: initialValues.balance.toString(),
          savings: initialValues.savings.toString(),
        }
      : {
          month: (new Date().getMonth() + 1).toString(),
          year: new Date().getFullYear().toString(),
          balance: '0',
          savings: '0',
        },
  });

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
            onSubmit({
              month: parseInt(form.values.month, 10),
              year: parseInt(form.values.year, 10),
              balance: parseInt(form.values.balance, 10),
              savings: parseInt(form.values.savings, 10),
            });
          }}
        >
          <LoadingOverlay visible={loading} />

          <div className={classes.fieldsGroup}>
            <Select
              required
              label={t('year')}
              data={YEARS_DATA}
              value={form.values.year}
              onChange={(value) => form.setField('year', value)}
              className={classes.fieldSecondary}
              disabled={disableDateInputs}
            />

            <Select
              required
              label={t('month')}
              data={monthNames}
              value={form.values.month}
              onChange={(value) => form.setField('month', value)}
              className={classes.fieldPrimary}
              disabled={disableDateInputs}
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
