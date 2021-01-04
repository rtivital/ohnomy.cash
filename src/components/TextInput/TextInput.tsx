import React from 'react';
import classes from './TextInput.styles.less';

interface TextInputProps {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  type: 'email' | 'text' | 'password';
  onChange(value: string): void;
}

export default function TextInput({
  label,
  id,
  placeholder,
  value,
  onChange,
  type,
}: TextInputProps) {
  return (
    <div>
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={classes.input}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
