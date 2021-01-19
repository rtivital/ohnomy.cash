import React from 'react';
import cx from 'clsx';
import { useHistory, useParams } from 'react-router-dom';
import MonthPicker from './MonthPicker/MonthPicker';
import Progress from './Progress/Progress';
import classes from './Navbar.styles.less';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const history = useHistory();

  const { month } = useParams<{ month: string }>();

  return (
    <nav className={cx(classes.navbar, className)}>
      <MonthPicker
        value={month ? new Date(month) : new Date()}
        onChange={(date) => history.push(`/${date.getFullYear()}-${date.getMonth() + 1}`)}
      />

      <Progress />
    </nav>
  );
}