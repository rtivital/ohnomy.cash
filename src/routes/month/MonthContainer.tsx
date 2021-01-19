import React, { useEffect, useReducer } from 'react';
import { ObjectId } from 'bson';
import { Category, Transaction } from 'src/api/types';
import client from 'src/api/client';
import { useScheduledRequests } from 'src/ScheduledRequestsProvider';
import Month from './Month';
import { transactionsReducer } from './transactions.reducer';

interface MonthContainerProps {
  transactions: Transaction[];
  categories: Category[];
  cacheUrl: string;
  date: string;
}

function transformTransactionCategory(transaction: Transaction) {
  return transaction.category ? { ...transaction, category: transaction.category.id } : transaction;
}

export default function MonthContainer({
  transactions,
  categories,
  cacheUrl,
  date,
}: MonthContainerProps) {
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
      payload: transformTransactionCategory(transaction),
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
      payload: transformTransactionCategory(transaction),
    });
  };

  useEffect(() => {
    client.updateCache(cacheUrl, state.transactions);
  }, [state]);

  return (
    <Month
      categories={categories}
      onTransactionDelete={handleTransactionDelete}
      onTransactionUpdate={handleTransactionUpdate}
      onTransactionCreate={handleTransactionCreate}
      spendings={state.transactions.filter((transaction) => transaction.type === 'spending')}
      savings={state.transactions.filter((transaction) => transaction.type === 'saving')}
      incomes={state.transactions.filter((transaction) => transaction.type === 'income')}
    />
  );
}
