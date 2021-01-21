import React from 'react';
import { Table } from '@mantine/core';
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

  return (
    <Table>
      <tbody>
        <tr>
          <td>{t('month_incomes')}</td>
          <td>{format(incomesTotal)}</td>
        </tr>

        <tr>
          <td>{t('incomes_spendings_diff')}</td>
          <td>{format(incomesTotal - spendingsTotal)}</td>
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
          <td style={{ fontWeight: 'bold' }}>
            {format(props.month.balance + incomesTotal - spendingsTotal - savingsTotal)}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
