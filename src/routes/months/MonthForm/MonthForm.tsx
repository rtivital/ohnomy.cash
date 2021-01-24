import React from 'react';
import { useForm } from 'xooks';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@modulz/radix-icons';
import { Select, Title, Text, ElementsGroup, Button, LoadingOverlay } from '@mantine/core';
import { useLocale } from 'src/hooks/use-locale';
import useTranslations from 'src/hooks/use-translations';
import getMonthsNames from 'src/utils/get-months-names';
import getYearsData from 'src/utils/get-years-data';
import isSameMonth from 'src/utils/is-same-month';
import { Month } from 'src/api/types';
import NumberInput from './NumberInput';
import classes from './MonthForm.styles.less';

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
  actionLabel: string;
  buttonLabel: string;
  excludeMonths?: Month[];
}

export default function MonthForm({
  disableDateInputs = false,
  initialValues,
  actionLabel,
  buttonLabel,
  onSubmit,
  loading,
  error,
  excludeMonths = [],
}: MonthFormProps) {
  const t = useTranslations();
  const locale = useLocale();

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

  const monthNames = getMonthsNames(locale, parseInt(form.values.year, 10)).filter(
    (month) =>
      !excludeMonths.some((excludedMonth) => {
        const excludeDate = new Date(excludedMonth.date);
        const monthDate = new Date(month.value);
        return isSameMonth(excludeDate, monthDate);
      })
  );

  return (
    <div className={classes.wrapper}>
      <div>
        <Title order={2} className={classes.title}>
          {actionLabel}
        </Title>

        <form
          className={classes.form}
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit({
              month: new Date(form.values.month).getMonth(),
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
              data={getYearsData()}
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
            <Button type="submit">{buttonLabel}</Button>
          </ElementsGroup>
        </form>

        <Link to="/" className={classes.backLink}>
          <ArrowLeftIcon />
          <span className={classes.backLabel}>{t('back_to_home_page')}</span>
        </Link>
      </div>
    </div>
  );
}
