import React, { useState, useEffect, useRef } from 'react';
import cx from 'clsx';
import { useClickOutside } from 'xooks';
import { Text, DropdownBody } from '@mantine/core';
import { CheckIcon } from '@modulz/radix-icons';
import client from 'src/api/client';
import { Month } from 'src/api/types';
import { useLocale } from 'src/LocaleProvider';
import groupMonths from './group-months';
import formatMonth from './format-month';
import isMonthSelected from './is-month-selected';
import classes from './MonthPicker.styles.less';

interface MonthPickerProps {
  className?: string;
  value: Date;
  onChange(value: Date): void;
}

interface MonthPickerState {
  loaded: boolean;
  data: (readonly [string, Month[]])[];
  error: Error;
}

export default function MonthPicker({ className, value, onChange }: MonthPickerProps) {
  const dropdownRef = useRef();
  const locale = useLocale();
  const [state, setState] = useState<MonthPickerState>({ loaded: false, data: null, error: null });
  const [dropdownOpened, setDropdownOpened] = useState(true);

  useClickOutside(dropdownRef, () => setDropdownOpened(false));

  const years = !state.loaded
    ? null
    : state.data.map(([year, months]) => {
        const items = months.map((month) => (
          <button
            key={month.id}
            type="button"
            onClick={() => {
              onChange(new Date(month.date));
              setDropdownOpened(false);
            }}
          >
            <span>{formatMonth({ date: month.date, locale })}</span>
            {isMonthSelected(value, month.date) && <CheckIcon />}
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

      {dropdownOpened && (
        <DropdownBody elementRef={dropdownRef} className={classes.dropdown}>
          {years}
        </DropdownBody>
      )}
    </div>
  );
}
