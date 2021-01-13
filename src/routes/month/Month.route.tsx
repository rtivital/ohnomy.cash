import React from 'react';
import { Transaction } from 'src/api/types';
import Spendings from './Spendings/Spendings';
import Savings from './Savings/Savings';
import Incomes from './Incomes/Incomes';
import Summary from './Summary/Summary';
import classes from './Month.styles.less';

const mockdata: Transaction[] = [
  {
    type: 'income',
    amount: 1000,
    description: 'Зарплата',
    id: '1',
    date: new Date().toString(),
    category: null,
  },
  {
    type: 'income',
    amount: 10000,
    description: 'Кэшбэк',
    id: '2',
    date: new Date().toString(),
    category: null,
  },
  {
    type: 'income',
    amount: 10000,
    description: 'Отпускные',
    id: '2',
    date: new Date().toString(),
    category: null,
  },
];

export default function MonthRoute() {
  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <Incomes data={mockdata} />
      </div>
      <div className={classes.section}>
        <Spendings />
      </div>
      <div className={classes.section}>
        <Savings />
      </div>
      <div className={classes.section}>
        <Summary />
      </div>
    </div>
  );
}
