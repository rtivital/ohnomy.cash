import React, { useState, useEffect, useRef } from 'react';
import cx from 'clsx';
import { useClickOutside } from 'xooks';
import { ChevronDownIcon } from '@modulz/radix-icons';
import { DropdownBody, Text } from '@mantine/core';
import client from 'src/api/client';
import { Month } from 'src/api/types';
import { useLocale } from 'src/LocaleProvider';
import groupMonths from './group-months';
import formatMonth from './format-month';
import MonthsList from './MonthsList/MonthsList';
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
    : state.data.map(([year, months]) => (
        <MonthsList
          key={year}
          months={months}
          value={value}
          year={year}
          onChange={(date) => {
            onChange(new Date(date));
            setDropdownOpened(false);
          }}
        />
      ));

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
      <button
        className={classes.monthControl}
        type="button"
        onClick={() => setDropdownOpened(true)}
      >
        <Text size="lg" bold className={classes.monthTitle}>
          {formatMonth({ date: value, locale, includeYear: true })}
        </Text>

        <ChevronDownIcon />
      </button>

      {dropdownOpened && (
        <DropdownBody elementRef={dropdownRef} className={classes.dropdown} noPadding>
          {years}
        </DropdownBody>
      )}
    </div>
  );
}
