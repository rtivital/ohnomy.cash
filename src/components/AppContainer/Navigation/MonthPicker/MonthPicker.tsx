import React, { useState, useEffect } from 'react';
import cx from 'clsx';
import client from 'src/api/client';
import { Month } from 'src/api/types';
import { useLocale } from 'src/LocaleProvider';
import classes from './MonthPicker.styles.less';

interface MonthPickerProps {
  className?: string;
  value: Date;
  onChange(value: Date): void;
}

interface MonthPickerState {
  loaded: boolean;
  data: any;
  error: Error;
}

function formatMonth(date: Date, locale: string) {
  const month = date.toLocaleDateString(locale, { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${year}`;
}

function groupMonths(months: Month[]) {
  const grouped = months.reduce((acc, month) => {
    const year = new Date(month.date).getFullYear();

    if (!(year in acc)) {
      acc[year] = [];
    }

    acc[year].push(month);
    return acc;
  }, {} as Record<string, Month[]>);

  const years = Object.keys(grouped);
  years.forEach((year) => {
    grouped[year].sort((a, b) => new Date(a.date).getMonth() - new Date(b.date).getMonth());
  });

  years.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  return years.map((year) => [year, grouped[year]] as const);
}

export default function MonthPicker({ className, value, onChange }: MonthPickerProps) {
  const locale = useLocale();
  const [state, setState] = useState<MonthPickerState>({ loaded: false, data: null, error: null });

  useEffect(() => {
    if (!state.loaded) {
      client.axios
        .get<Month[]>('/months')
        .then((response) =>
          setState({ error: null, loaded: true, data: groupMonths(response.data) })
        )
        .catch((error) => setState({ loaded: false, error, data: null }));
    }
  }, []);

  return <div className={cx(classes.monthPicker, className)}>{formatMonth(value, locale)}</div>;
}
