import React from 'react';
import { useForm } from 'xooks';
import { Select } from '@mantine/core';
import { useLocale } from 'src/LocaleProvider';
import useTranslations from 'src/translations/use-translations';
import NumberInput from './NumberInput';

function capitalizeString(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function CreateMonthForm() {
  const t = useTranslations();
  const locale = useLocale();

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

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Select
        required
        label={t('month')}
        data={monthNames}
        value={form.values.month}
        onChange={(value) => form.setField('month', value)}
      />

      <Select
        required
        label={t('year')}
        data={yearData}
        value={form.values.year}
        onChange={(value) => form.setField('year', value)}
      />

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
    </form>
  );
}
