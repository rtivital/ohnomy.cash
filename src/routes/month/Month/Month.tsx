import React from 'react';
import { Category, Month as MonthType, Transaction } from 'src/api/types';
import Spendings from './Spendings/Spendings';
import Incomes from './Incomes/Incomes';
import Savings from './Savings/Savings';
import Summary from './Summary/Summary';
import { BaseTransactionEditorProps } from '../types';
import classes from './Month.styles.less';

interface MonthProps extends Omit<BaseTransactionEditorProps, 'data'> {
  categories: Category[];
  incomes: Transaction[];
  savings: Transaction[];
  spendings: Transaction[];
  currentMonth: MonthType;
}

export default function Month(props: MonthProps) {
  const handlers = {
    onTransactionDelete: props.onTransactionDelete,
    onTransactionUpdate: props.onTransactionUpdate,
    onTransactionCreate: props.onTransactionCreate,
  };

  return (
    <div className={classes.container}>
      <div className={classes.column}>
        <Spendings
          {...handlers}
          data={props.spendings}
          categories={props.categories}
          month={new Date(props.currentMonth.date)}
        />
      </div>

      <div className={classes.column}>
        <div className={classes.section}>
          <Incomes {...handlers} data={props.incomes} />
        </div>

        <div className={classes.section}>
          <Savings {...handlers} data={props.savings} />
        </div>
        <div className={classes.section}>
          <Summary
            month={props.currentMonth}
            incomes={props.incomes}
            savings={props.savings}
            spendings={props.spendings}
          />
        </div>
      </div>
    </div>
  );
}
