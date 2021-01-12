import React from 'react';
import cx from 'clsx';
import { Link } from 'react-router-dom';
import { Button, Title, ElementsGroup, Text } from '@mantine/core';
import classes from './AuthFormWrapper.styles.less';

interface AuthFormWrapperProp {
  className?: string;
  title: string;
  children: React.ReactNode;
  submitText: string;
  description: string;
  switchLink: string;
  switchText: string;
  onSubmit(): void;
}

export default function AuthFormWrapper({
  className,
  title,
  children,
  onSubmit,
  submitText,
  description,
  switchLink,
  switchText,
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

      <div className={classes.description}>
        <Text theme="muted" size="sm">
          {description}
        </Text>

        <Link className={classes.link} to={switchLink}>
          {switchText}
        </Link>
      </div>
    </form>
  );
}
