import { Transaction } from 'src/api/types';

export default function sortTransactionsByDate(transactions: Transaction[]) {
  const clone = [...transactions];
  clone.sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate());
  return clone;
}
