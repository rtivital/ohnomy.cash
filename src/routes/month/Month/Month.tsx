import React from 'react';
import { Category, Transaction } from 'src/api/types';
import Spendings from './Spendings/Spendings';
import Incomes from './Incomes/Incomes';
import Savings from './Savings/Savings';
import Summary from './Summary/Summary';
import { BaseTransationEditorProps } from '../types';
import classes from './Month.styles.less';

interface MonthProps extends Omit<BaseTransationEditorProps, 'data'> {
  categories: Category[];
  incomes: Transaction[];
  savings: Transaction[];
  spendings: Transaction[];
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
        <Spendings {...handlers} data={props.spendings} categories={props.categories} />
      </div>

      <div className={classes.column}>
        <div className={classes.section}>
          <Incomes {...handlers} data={props.incomes} />
        </div>

        <div className={classes.section}>
          <Savings {...handlers} data={props.savings} />
        </div>
        <div className={classes.section}>
          <Summary incomes={props.incomes} savings={props.savings} spendings={props.spendings} />
        </div>
      </div>
    </div>
  );
}
