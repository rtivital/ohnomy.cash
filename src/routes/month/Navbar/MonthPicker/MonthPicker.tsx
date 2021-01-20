import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import cx from 'clsx';
import { useClickOutside } from 'xooks';
import { ChevronDownIcon, GearIcon } from '@modulz/radix-icons';
import { DropdownBody, Text, ActionIcon } from '@mantine/core';
import client from 'src/api/client';
import { Month } from 'src/api/types';
import useDateFormatter from 'src/hooks/use-date-formatter';
import useTranslations from 'src/hooks/use-translations';
import groupMonthsByYear from 'src/utils/group-months-by-year';
import upperFirst from 'src/utils/upper-first';
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
  const history = useHistory();
  const formatDate = useDateFormatter();
  const t = useTranslations();
  const dropdownRef = useRef();
  const [state, setState] = useState<MonthPickerState>({ loaded: false, data: null, error: null });
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const closeDropdown = () => setDropdownOpened(false);
  const closeOnEscape = (event: KeyboardEvent) => event.code === 'Escape' && closeDropdown();

  useClickOutside(dropdownRef, closeDropdown);

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
            closeDropdown();
          }}
        />
      ));

  useEffect(() => {
    window.addEventListener('keydown', closeOnEscape);

    if (!state.loaded) {
      client.axios
        .get<Month[]>('/months')
        .then((response) =>
          setState({ error: null, loaded: true, data: groupMonthsByYear(response.data) })
        )
        .catch((error) => setState({ loaded: false, error, data: null }));
    }

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <div className={cx(classes.monthPicker, className)}>
      <button
        className={classes.monthControl}
        type="button"
        onClick={() => setDropdownOpened(true)}
      >
        <Text size="lg" bold className={classes.monthTitle}>
          {upperFirst(formatDate({ date: value, includeYear: true }))}
        </Text>

        <ChevronDownIcon />
      </button>

      {value instanceof Date && (
        <ActionIcon
          theme="primary"
          onClick={() =>
            history.push(`/months/edit/${value.getFullYear()}-${value.getMonth() + 1}`)
          }
          title={t('edit_month')}
        >
          <GearIcon />
        </ActionIcon>
      )}

      {dropdownOpened && (
        <DropdownBody elementRef={dropdownRef} className={classes.dropdown} noPadding>
          <Link className={classes.link} to="/months/create" onClick={closeDropdown}>
            + {t('add_month')}
          </Link>

          {years}
        </DropdownBody>
      )}
    </div>
  );
}
