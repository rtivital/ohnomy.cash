import React, { useState, useRef } from 'react';
import { useClickOutside } from 'xooks';
import { DropdownBody, Month, Text } from '@mantine/core';
import { useLocale } from 'src/LocaleProvider';
import classes from './DatePicker.styles.less';

interface DatePickerProps {
  value: Date;
  onChage(value: Date): void;
}

export default function DatePicker({ value, onChage }: DatePickerProps) {
  const dropdownRef = useRef();
  const [opened, setOpened] = useState(false);
  const closeDropdown = () => setOpened(false);
  const locale = useLocale();

  useClickOutside(dropdownRef, closeDropdown);

  return (
    <div className={classes.datePicker}>
      <button className={classes.control} onClick={() => setOpened(true)} type="button">
        <Text size="sm">
          {value.getDate()} {value.toLocaleString(locale, { month: 'short' })}
        </Text>
      </button>

      {opened && (
        <DropdownBody elementRef={dropdownRef}>
          <Month
            month={value}
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
