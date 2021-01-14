import React from 'react';
import cx from 'clsx';
import classes from './AddTransaction.styles.less';

interface AddTransactionProps {
  className?: string;
  children: string;
  onClick(): void;
}

export default function AddTransaction({ className, children, onClick }: AddTransactionProps) {
  return (
    <button className={cx(classes.addTransaction, className)} type="button" onClick={onClick}>
      + {children}
    </button>
  );
}
