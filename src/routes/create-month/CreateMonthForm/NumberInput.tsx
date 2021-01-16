import React from 'react';
import { TextInput } from '@mantine/core';
import { formatNumber, extractFormattedNumber } from 'src/components/AmountInput/AmountInput';
import { useLocale } from 'src/LocaleProvider';

interface NumberInputProps {
  value: string;
  label: string;
  onChange(value: string): void;
}

export default function NumberInput({ value, onChange, label }: NumberInputProps) {
  const locale = useLocale();

  return (
    <TextInput
      style={{ marginTop: 15 }}
      label={label}
      placeholder={label}
      required
      value={Number.isNaN(parseInt(value, 10)) ? value : formatNumber(value, locale)}
      onChange={(val) =>
        val === ''
          ? onChange(val)
          : onChange(
              (Number.isNaN(extractFormattedNumber(val))
                ? ''
                : extractFormattedNumber(val)
              ).toString()
            )
      }
      onBlur={(event) => event.target.value.trim() === '' && onChange('0')}
    />
  );
}
