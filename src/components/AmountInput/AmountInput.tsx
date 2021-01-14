import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useFocusProp from 'src/hooks/use-focus-prop';
import { useLocale } from 'src/LocaleProvider';
import classes from './AmountInput.styles.less';

function formatNumber(number: number | string, locale: string) {
  return Intl.NumberFormat(locale).format(
    typeof number === 'number' ? number : parseInt(number, 10)
  );
}

function extractFormattedNumber(string: string) {
  const negative = string[0] === '-';
  return parseInt(string.replace(/[^0-9]/g, ''), 10) * (negative ? -1 : 1);
}

interface AmountInputProps {
  value: string;
  allowNegative: boolean;
  focus: boolean;
  onChange(value: string): void;
  onEnter(): void;
}

export default function AmountInput({
  value,
  onChange,
  onEnter,
  allowNegative = false,
  focus = false,
}: AmountInputProps) {
  const locale = useLocale();
  const inputRef = useRef();

  useFocusProp(focus, inputRef);

  return (
    <input
      type="text"
      ref={inputRef}
      className={classes.amountInput}
      value={Number.isNaN(parseInt(value, 10)) ? value : formatNumber(value, locale)}
      onChange={(event) =>
        event.target.value === '' || (allowNegative && event.target.value === '-')
          ? onChange(event.target.value)
          : onChange(
              (Number.isNaN(extractFormattedNumber(event.target.value))
                ? ''
                : extractFormattedNumber(event.target.value)
              ).toString()
            )
      }
      onFocus={(event) => event.target.value === '0' && onChange('')}
      onBlur={(event) => event.target.value.trim() === '' && onChange((0).toString())}
      onKeyDown={(event) => {
        if (event.nativeEvent.code === 'Enter') {
          event.preventDefault();
          onEnter();
        }
      }}
    />
  );
}

AmountInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  focus: PropTypes.bool,
  allowNegative: PropTypes.bool,
};
