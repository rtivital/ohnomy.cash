import React from 'react';
import cx from 'clsx';
import { CheckIcon } from '@modulz/radix-icons';
import { Text } from '@mantine/core';
import { useLocale } from 'src/providers/LocaleProvider';
import { Month } from 'src/api/types';
import formatMonth from '../format-month';
import isMonthSelected from '../is-month-selected';
import classes from './MonthsList.styles.less';

interface MonthsListProps {
  months: Month[];
  onChange(value: Date): void;
  value: string | Date;
  year: string;
}

export default function MonthsList({ months, onChange, value, year }: MonthsListProps) {
  const locale = useLocale();

  const items = months.map((month) => (
    <button
      key={month.id}
      className={cx(classes.monthContol, {
        [classes.monthContolActive]: isMonthSelected(value, month.date),
      })}
      type="button"
      onClick={() => onChange(new Date(month.date))}
    >
      <Text>{formatMonth({ date: month.date, locale })}</Text>
      {isMonthSelected(value, month.date) && <CheckIcon />}
    </button>
  ));

  return (
    <div className={classes.monthsList}>
      <Text theme="muted" size="sm" className={classes.year}>
        {year}
      </Text>

      {items}
    </div>
  );
}
