import React, { useReducer } from 'react';
import { Transaction } from 'src/api/types';
import Spendings from './Spendings/Spendings';
import Savings from './Savings/Savings';
import Incomes from './Incomes/Incomes';
import Summary from './Summary/Summary';
import { transactionsReducer } from './transactions.reducer';
import classes from './Month.styles.less';

interface MonthContainerProps {
  transactions: Transaction[];
}

export default function MonthContainer({ transactions }: MonthContainerProps) {
  const [state, dispatch] = useReducer(transactionsReducer, { transactions, apiUpdates: [] });

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <Incomes data={state.transactions} />
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
