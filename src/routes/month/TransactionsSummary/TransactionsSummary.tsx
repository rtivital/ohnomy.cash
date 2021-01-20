import React from 'react';
import cx from 'clsx';
import { Table, Text } from '@mantine/core';
import useTranslations from 'src/hooks/use-translations';
import useNumberFormatter from 'src/hooks/use-number-formatter';
import classes from './TransactionsSummary.styles.less';

interface TransactionsSummaryProps {
  className?: string;
  amount: number;
}

export default function TransactionsSummary({ className, amount }: TransactionsSummaryProps) {
  const t = useTranslations();
  const { format } = useNumberFormatter();

  return (
    <Table className={cx(classes.transactionsSummary, className)}>
      <tbody>
        <tr>
          <td style={{ width: 130 }}>{format(amount)}</td>
          <td>
            <Text bold size="sm">
              {t('total')}
            </Text>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
