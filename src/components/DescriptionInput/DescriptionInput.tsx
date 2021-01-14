import React from 'react';
import cx from 'clsx';
import classes from './DescriptionInput.styles.less';

interface DescriptionInputProps {
  className?: string;
  placeholder: string;
  value: string;
  onChange(value: string): void;
}

export default function DescriptionInput({
  className,
  placeholder,
  value,
  onChange,
}: DescriptionInputProps) {
  return (
    <input
      className={cx(classes.descriptionInput, className)}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
}
