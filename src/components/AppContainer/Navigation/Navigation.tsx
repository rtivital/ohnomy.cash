import React from 'react';
import cx from 'clsx';
import MonthPicker from './MonthPicker/MonthPicker';
import classes from './Navigation.styles.less';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  return (
    <nav className={cx(classes.navigation, className)}>
      <MonthPicker value={new Date()} onChange={(f) => f} />
    </nav>
  );
}
