import React from 'react';
import cx from 'clsx';
import classes from './Navigation.styles.less';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  return <nav className={cx(classes.navigation, className)}>Navigation</nav>;
}
