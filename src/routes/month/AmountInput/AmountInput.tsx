import React, { useRef } from 'react';
import useFocusProp from 'src/hooks/use-focus-prop';
import useNumberFormatter from 'src/hooks/use-number-formatter';
import classes from './AmountInput.styles.less';

interface AmountInputProps {
  value: string;
  allowNegative?: boolean;
  focus?: boolean;
  onFocus?(): void;
  onChange(value: string): void;
}

export default function AmountInput({
  value,
  onChange,
  onFocus,
  allowNegative = false,
  focus = false,
}: AmountInputProps) {
  const inputRef = useRef();
  const { format, extract } = useNumberFormatter();

  useFocusProp(focus, inputRef);

  return (
    <input
      type="text"
      ref={inputRef}
      className={classes.amountInput}
      value={Number.isNaN(parseInt(value, 10)) ? value : format(value)}
      onChange={(event) =>
        event.target.value === '' || (allowNegative && event.target.value === '-')
          ? onChange(event.target.value)
          : onChange(
              (Number.isNaN(extract(event.target.value))
                ? ''
                : extract(event.target.value)
              ).toString()
            )
      }
      onFocus={() => typeof onFocus === 'function' && onFocus()}
      onBlur={(event) => event.target.value.trim() === '' && onChange('0')}
    />
  );
}
