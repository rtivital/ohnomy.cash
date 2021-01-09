import React from 'react';
import cx from 'clsx';
import classes from './AuthFormWrapper.styles.less';

interface AuthFormWrapperProp {
  className?: string;
}

export default function AuthFormWrapper({ className }: AuthFormWrapperProp) {
  return <div className={cx(classes.authFormWrapper, className)}>AuthFormWrapper</div>;
}
