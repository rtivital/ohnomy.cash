import { Transaction } from 'src/api/types';

export default function getTransactionsSum(transactions: Transaction[]) {
  return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
}
