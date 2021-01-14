import { Transaction } from 'src/api/types';

const TYPES = {
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  APPLY_API_UPDATE: 'APPLY_API_UPDATE',
} as const;

interface ApiUpdate {
  type: 'create' | 'update' | 'delete';
  transaction: Transaction;
}

export interface TransactionsState {
  transactions: Transaction[];
  apiUpdates: ApiUpdate[];
}

type ValueOf<T> = T[keyof T];

interface TransactionAction {
  type: ValueOf<typeof TYPES>;
  transaction: Transaction;
}

export function transactionsReducer(
  state: TransactionsState,
  action: TransactionAction
): TransactionsState {
  switch (action.type) {
    case TYPES.ADD_TRANSACTION: {
      return {
        transactions: [...state.transactions, action.transaction],
        apiUpdates: [...state.apiUpdates, { type: 'create', transaction: action.transaction }],
      };
    }

    case TYPES.DELETE_TRANSACTION: {
      const { id } = action.transaction;
      return {
        transactions: state.transactions.filter((transaction) => transaction.id !== id),
        apiUpdates: [
          ...state.apiUpdates.filter((update) => update.transaction.id !== id),
          { type: 'delete', transaction: action.transaction },
        ],
      };
    }

    case TYPES.UPDATE_TRANSACTION: {
      const { id } = action.transaction;
      const index = state.transactions.findIndex((transaction) => transaction.id === id);
      const transactions = [...state.transactions];
      transactions[index] = action.transaction;

      return {
        transactions,
        apiUpdates: [
          ...state.apiUpdates.filter((update) => update.transaction.id !== id),
          { type: 'update', transaction: action.transaction },
        ],
      };
    }

    case TYPES.APPLY_API_UPDATE: {
      const { id } = action.transaction;
      return {
        ...state,
        apiUpdates: state.apiUpdates.filter((update) => update.transaction.id !== id),
      };
    }

    default:
      throw new Error('Unknown action type');
  }
}
