import React, { useEffect, useReducer } from 'react';
import { ObjectId } from 'bson';
import { Transaction } from 'src/api/types';
import client from 'src/api/client';
import { useScheduledRequests } from 'src/ScheduledRequestsProvider';
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
  const scheduledRequests = useScheduledRequests();
  const [state, dispatch] = useReducer(transactionsReducer, { transactions, apiUpdates: [] });

  const handleTransactionDelete = (transaction: Transaction) => {
    dispatch({ type: 'DELETE_TRANSACTION', transaction });
    scheduledRequests.addScheduledRequest({
      id: transaction.id,
      type: 'delete',
      url: '/transactions',
      payload: { id: transaction.id },
    });
  };

  const handleTransactionUpdate = (transaction: Transaction) => {
    dispatch({ type: 'UPDATE_TRANSACTION', transaction });
    scheduledRequests.addScheduledRequest({
      id: transaction.id,
      type: 'update',
      url: '/transactions',
      payload: transaction,
    });
  };

  const handleTransactionCreate = (type: Transaction['type']) => {
    const transaction = {
      id: new ObjectId().toHexString(),
      amount: 0,
      description: '',
      date,
      type,
      category: null,
    };

    dispatch({ type: 'ADD_TRANSACTION', transaction });
    scheduledRequests.addScheduledRequest({
      id: transaction.id,
      type: 'create',
      url: '/transactions',
      payload: transaction,
    });
  };

  useEffect(() => {
    client.updateCache(cacheUrl, state.transactions);
  }, [state]);

  return (
    <div className={classes.container}>
      <div className={classes.column}>
        <Spendings
          data={state.transactions.filter((transaction) => transaction.type === 'spending')}
          onTransactionDelete={handleTransactionDelete}
          onTransactionUpdate={handleTransactionUpdate}
          onTransactionCreate={handleTransactionCreate}
        />
      </div>
      <div className={classes.column}>
        <div className={classes.section}>
          <Incomes
            data={state.transactions.filter((transaction) => transaction.type === 'income')}
            onTransactionDelete={handleTransactionDelete}
            onTransactionUpdate={handleTransactionUpdate}
            onTransactionCreate={handleTransactionCreate}
          />
        </div>

        <div className={classes.section}>
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
    </div>
  );
}
