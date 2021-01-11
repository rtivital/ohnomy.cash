import React from 'react';
import cx from 'clsx';
import { Button, Title, ElementsGroup } from '@mantine/core';
import classes from './AuthFormWrapper.styles.less';

interface AuthFormWrapperProp {
  className?: string;
  title: string;
  children: React.ReactNode;
  submitText: string;
  onSubmit(): void;
}

export default function AuthFormWrapper({
  className,
  title,
  children,
  onSubmit,
  submitText,
}: AuthFormWrapperProp) {
  return (
    <form
      className={cx(classes.authFormWrapper, className)}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <Title className={classes.title} order={2}>
        {title}
      </Title>

      {children}

      <ElementsGroup position="right" className={classes.controls}>
        <Button type="submit">{submitText}</Button>
      </ElementsGroup>
    </form>
  );
}
