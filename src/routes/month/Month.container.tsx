import React, { useEffect, useReducer } from 'react';
import { ObjectId } from 'bson';
import { Category, Transaction, Month as MonthType } from 'src/api/types';
import client from 'src/api/client';
import useScheduledRequests from 'src/hooks/use-scheduled-requests';
import Month from './Month/Month';
import Navbar from './Navbar/Navbar';
import { transactionsReducer } from './transactions.reducer';

interface MonthContainerProps {
  transactions: Transaction[];
  categories: Category[];
  months: MonthType[];
  currentMonth: MonthType;
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
  months,
  currentMonth,
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

  const handleTransactionCreate = (type: Transaction['type'], transactionDate?: Date) => {
    transactionDate && transactionDate.setHours(23);

    const transaction = {
      id: new ObjectId().toHexString(),
      amount: 0,
      description: '',
      date: transactionDate ? transactionDate.toISOString() : date,
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
    <>
      <Navbar date={new Date(date)} months={months} />
      <Month
        currentMonth={currentMonth}
        categories={categories}
        onTransactionDelete={handleTransactionDelete}
        onTransactionUpdate={handleTransactionUpdate}
        onTransactionCreate={handleTransactionCreate}
        spendings={state.transactions.filter((transaction) => transaction.type === 'spending')}
        savings={state.transactions.filter((transaction) => transaction.type === 'saving')}
        incomes={state.transactions.filter((transaction) => transaction.type === 'income')}
      />
    </>
  );
}
