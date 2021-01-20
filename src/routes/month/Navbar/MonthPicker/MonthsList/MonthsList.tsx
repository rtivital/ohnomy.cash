import React from 'react';
import cx from 'clsx';
import { CheckIcon } from '@modulz/radix-icons';
import { Text } from '@mantine/core';
import useDateFormatter from 'src/hooks/use-date-formatter';
import { Month } from 'src/api/types';
import isSameMonth from 'src/utils/is-same-month';
import classes from './MonthsList.styles.less';

interface MonthsListProps {
  months: Month[];
  onChange(value: Date): void;
  value: string | Date;
  year: string;
}

export default function MonthsList({ months, onChange, value, year }: MonthsListProps) {
  const formatDate = useDateFormatter();

  const items = months.map((month) => {
    const active = isSameMonth(new Date(value), new Date(month.date));
    return (
      <button
        key={month.id}
        className={cx(classes.monthContol, { [classes.monthContolActive]: active })}
        type="button"
        onClick={() => onChange(new Date(month.date))}
      >
        <Text>{formatDate({ date: month.date })}</Text>
        {active && <CheckIcon />}
      </button>
    );
  });

  return (
    <div className={classes.monthsList}>
      <Text theme="muted" size="sm" className={classes.year}>
        {year}
      </Text>

      {items}
    </div>
  );
}
