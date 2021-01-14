import React, { useEffect, useReducer } from 'react';
import { Transaction } from 'src/api/types';
import client from 'src/api/client';
import Spendings from './Spendings/Spendings';
import Savings from './Savings/Savings';
import Incomes from './Incomes/Incomes';
import Summary from './Summary/Summary';
import { transactionsReducer } from './transactions.reducer';
import classes from './Month.styles.less';

interface MonthContainerProps {
  transactions: Transaction[];
  cacheUrl: string;
}

export default function MonthContainer({ transactions, cacheUrl }: MonthContainerProps) {
  const [state, dispatch] = useReducer(transactionsReducer, { transactions, apiUpdates: [] });

  const handleTransactionDelete = (transaction: Transaction) => {
    dispatch({ type: 'DELETE_TRANSACTION', transaction });
  };

  useEffect(() => {
    client.updateCache(cacheUrl, state.transactions);
  }, [state]);

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <Incomes data={state.transactions} onTransactionDelete={handleTransactionDelete} />
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
