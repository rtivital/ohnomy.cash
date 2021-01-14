import React from 'react';
import cx from 'clsx';
import { Table, Text } from '@mantine/core';
import useTranslations from 'src/translations/use-translations';
import classes from './TransactionsSummary.styles.less';

interface TransactionsSummaryProps {
  className?: string;
  amount: number;
}

export default function TransactionsSummary({ className, amount }: TransactionsSummaryProps) {
  const t = useTranslations();

  return (
    <Table className={cx(classes.transactionsSummary, className)}>
      <tr>
        <td style={{ width: 120 }}>{amount}</td>
        <td>
          <Text bold size="sm">
            {t('total')}
          </Text>
        </td>
      </tr>
    </Table>
  );
}
