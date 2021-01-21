import React, { useState, useRef, useEffect } from 'react';
import { useClickOutside } from 'xooks';
import { DropdownBody, Month, Text } from '@mantine/core';
import { useLocale } from 'src/hooks/use-locale';
import classes from './DatePicker.styles.less';

interface DatePickerProps {
  value: Date;
  onChage(value: Date): void;
}

export default function DatePicker({ value, onChage }: DatePickerProps) {
  const dropdownRef = useRef();
  const controlRef = useRef<HTMLButtonElement>();
  const [opened, setOpened] = useState(false);
  const locale = useLocale();

  const closeDropdown = () => {
    setOpened(false);
    controlRef.current.focus();
  };

  const closeOnEscape = (event: KeyboardEvent) => event.code === 'Escape' && closeDropdown();

  useEffect(() => {
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  useClickOutside(dropdownRef, closeDropdown);

  return (
    <div className={classes.datePicker}>
      <button
        className={classes.control}
        onClick={() => setOpened(true)}
        type="button"
        ref={controlRef}
      >
        <Text size="sm">
          {value.getDate()} {value.toLocaleString(locale, { month: 'short' }).replace('.', '')}
        </Text>
      </button>

      {opened && (
        <DropdownBody className={classes.dropdown} elementRef={dropdownRef}>
          <Month
            autoFocus
            className={classes.month}
            month={value}
            selected={value}
            locale={locale}
            onDayClick={(day) => {
              onChage(day);
              closeDropdown();
            }}
          />
        </DropdownBody>
      )}
    </div>
  );
}
