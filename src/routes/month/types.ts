import { Transaction } from 'src/api/types';

export interface BaseTransactionEditorProps {
  data: Transaction[];
  onTransactionDelete(transaction: Transaction): void;
  onTransactionUpdate(transaction: Transaction): void;
  onTransactionCreate(type: Transaction['type'], date?: Date): void;
}
