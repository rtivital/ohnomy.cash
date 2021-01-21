import React from 'react';
import { useHistory } from 'react-router-dom';
import { Month } from 'src/api/types';
import MonthPicker from './MonthPicker/MonthPicker';
import Progress from './Progress/Progress';
import classes from './Navbar.styles.less';

interface NavbarProps {
  date?: Date;
  months: Month[];
}

export default function Navbar({ date, months }: NavbarProps) {
  const history = useHistory();

  return (
    <nav className={classes.navbar}>
      <MonthPicker
        value={date || new Date()}
        onChange={(value) => history.push(`/${value.getFullYear()}-${value.getMonth() + 1}`)}
        data={months}
      />

      <Progress />
    </nav>
  );
}
