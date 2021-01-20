import React from 'react';
import { TextInput } from '@mantine/core';
import useNumberFormatter from 'src/hooks/use-number-formatter';

interface NumberInputProps {
  value: string;
  label: string;
  onChange(value: string): void;
}

export default function NumberInput({ value, onChange, label }: NumberInputProps) {
  const { format, extract } = useNumberFormatter();

  return (
    <TextInput
      style={{ marginTop: 15 }}
      label={label}
      placeholder={label}
      required
      value={Number.isNaN(parseInt(value, 10)) ? value : format(value)}
      onChange={(val) =>
        val === ''
          ? onChange(val)
          : onChange((Number.isNaN(extract(val)) ? '' : extract(val)).toString())
      }
      onBlur={(event) => event.target.value.trim() === '' && onChange('0')}
    />
  );
}
