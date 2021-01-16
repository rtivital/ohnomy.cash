import React from 'react';
import cx from 'clsx';
import { useHistory, useParams } from 'react-router-dom';
import MonthPicker from './MonthPicker/MonthPicker';
import Progress from './Progress/Progress';
import classes from './Navigation.styles.less';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const history = useHistory();

  const { month } = useParams<{ month: string }>();

  return (
    <nav className={cx(classes.navigation, className)}>
      <MonthPicker
        value={month ? (month === 'create-month' ? month : new Date(month)) : new Date()}
        onChange={(date) => history.push(`/${date.getFullYear()}-${date.getMonth() + 1}`)}
      />

      <Progress />
    </nav>
  );
}
