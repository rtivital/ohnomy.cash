import React from 'react';
import { Table, Text } from '@mantine/core';
import useTranslations from 'src/hooks/use-translations';
import useNumberFormatter from 'src/hooks/use-number-formatter';
import { Month, Transaction } from 'src/api/types';
import getTransactionsSum from 'src/utils/get-transactions-sum';

export interface SummaryTableProps {
  month: Month;
  incomes: Transaction[];
  savings: Transaction[];
  spendings: Transaction[];
}

export default function SummaryTable(props: SummaryTableProps) {
  const t = useTranslations();
  const { format } = useNumberFormatter();
  const spendingsTotal = getTransactionsSum(props.spendings);
  const savingsTotal = getTransactionsSum(props.savings);
  const incomesTotal = getTransactionsSum(props.incomes);
  const balance = props.month.balance + incomesTotal - spendingsTotal - savingsTotal;
  const diff = incomesTotal - spendingsTotal;

  return (
    <Table style={{ tableLayout: 'fixed' }}>
      <tbody>
        <tr>
          <td style={{ width: 250 }}>{t('month_incomes')}</td>
          <td>{format(incomesTotal)}</td>
        </tr>

        <tr>
          <td>{t('incomes_spendings_diff')}</td>
          <td>
            <Text size="sm" theme={diff < 0 ? 'danger' : null}>
              {format(diff)}
            </Text>
          </td>
        </tr>

        <tr>
          <td>{t('month_savings')}</td>
          <td>{format(savingsTotal)}</td>
        </tr>

        <tr>
          <td>{t('savings_month_start')}</td>
          <td>{format(props.month.savings)}</td>
        </tr>

        <tr>
          <td>{t('total_savings')}</td>
          <td>{format(props.month.savings + savingsTotal)}</td>
        </tr>

        <tr>
          <td>{t('balance_month_start')}</td>
          <td>{format(props.month.balance)}</td>
        </tr>

        <tr>
          <td>{t('balance_month_end')}</td>
          <td>
            <Text size="sm" theme={balance >= 0 ? 'success' : 'danger'}>
              {format(balance)}
            </Text>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
