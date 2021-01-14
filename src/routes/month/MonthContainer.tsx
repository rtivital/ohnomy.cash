import React, { useEffect, useReducer } from 'react';
import { nanoid } from 'nanoid';
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
  date: string;
}

export default function MonthContainer({ transactions, cacheUrl, date }: MonthContainerProps) {
  const [state, dispatch] = useReducer(transactionsReducer, { transactions, apiUpdates: [] });

  const handleTransactionDelete = (transaction: Transaction) =>
    dispatch({ type: 'DELETE_TRANSACTION', transaction });

  const handleTransactionUpdate = (transaction: Transaction) =>
    dispatch({ type: 'UPDATE_TRANSACTION', transaction });

  const handleTransactionCreate = (type: Transaction['type']) =>
    dispatch({
      type: 'ADD_TRANSACTION',
      transaction: {
        id: `create-${nanoid()}`,
        amount: 0,
        description: '',
        date,
        type,
        category: null,
      },
    });

  useEffect(() => {
    client.updateCache(cacheUrl, state.transactions);
  }, [state]);

  return (
    <div className={classes.container}>
      <div className={classes.section} style={{ maxWidth: 380 }}>
        <Incomes
          data={state.transactions.filter((transaction) => transaction.type === 'income')}
          onTransactionDelete={handleTransactionDelete}
          onTransactionUpdate={handleTransactionUpdate}
          onTransactionCreate={handleTransactionCreate}
        />
      </div>

      <div className={classes.section}>
        <Spendings />
      </div>

      <div className={classes.section} style={{ maxWidth: 380 }}>
        <Savings
          data={state.transactions.filter((transaction) => transaction.type === 'saving')}
          onTransactionDelete={handleTransactionDelete}
          onTransactionUpdate={handleTransactionUpdate}
          onTransactionCreate={handleTransactionCreate}
        />
      </div>

      <div className={classes.section}>
        <Summary />
      </div>
    </div>
  );
}
