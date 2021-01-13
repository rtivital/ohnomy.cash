import React, { useState, useEffect } from 'react';
import cx from 'clsx';
import { Text, DropdownBody } from '@mantine/core';
import client from 'src/api/client';
import { Month } from 'src/api/types';
import { useLocale } from 'src/LocaleProvider';
import groupMonths from './group-months';
import formatMonth from './format-month';
import classes from './MonthPicker.styles.less';

interface MonthPickerProps {
  className?: string;
  value: Date;
  onChange(value: Date): void;
}

type NormalizedData = readonly [string, Month[]];

interface MonthPickerState {
  loaded: boolean;
  data: NormalizedData[];
  error: Error;
}

export default function MonthPicker({ className, value, onChange }: MonthPickerProps) {
  const locale = useLocale();
  const [state, setState] = useState<MonthPickerState>({ loaded: false, data: null, error: null });
  const [dropdownOpened, setDropdownOpened] = useState(false);

  const years = !state.loaded
    ? null
    : state.data.map(([year, months]) => {
        const items = months.map((month) => (
          <button key={month.id} type="button" onClick={() => onChange(new Date(month.date))}>
            {formatMonth({ date: month.date, locale })}
          </button>
        ));

        return (
          <div key={year}>
            <Text theme="muted" size="sm">
              {year}
            </Text>
            {items}
          </div>
        );
      });

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

  return (
    <div className={cx(classes.monthPicker, className)}>
      <button type="button" onClick={() => setDropdownOpened(true)}>
        {formatMonth({ date: value, locale, includeYear: true })}
      </button>

      {dropdownOpened && <DropdownBody>{years}</DropdownBody>}
    </div>
  );
}
