import { Transaction } from 'src/api/types';

export interface BaseTransationEditorProps {
  data: Transaction[];
  onTransactionDelete(transaction: Transaction): void;
  onTransactionUpdate(transaction: Transaction): void;
  onTransactionCreate(type: Transaction['type']): void;
}
