import React from 'react';
import { Table } from '@mantine/core';
import { Transaction } from 'src/api/types';
import useTranslations from 'src/hooks/use-translations';
import useNumberFormatter from 'src/hooks/use-number-formatter';
import CategoryBadge from 'src/components/CategoryBadge/CategoryBadge';
import TransactionsSummary from '../TransactionsSummary/TransactionsSummary';
import groupSpendings from './group-spendings';

interface SpendingsTableProps {
  spendings: Transaction[];
}

export default function SpendingsTable({ spendings }: SpendingsTableProps) {
  const { format } = useNumberFormatter();
  const t = useTranslations();
  const data = groupSpendings(spendings, t('without_category'));

  const rows = data.groups.map(({ category, amount }) => (
    <tr key={category.id}>
      <td>{format(amount)}</td>
      <td>
        <CategoryBadge data={category} />
      </td>
    </tr>
  ));

  return (
    <div>
      <Table style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th style={{ width: 130 }}>
              {t('spending')}, {t('currency', { capitalize: false })}
            </th>
            <th>{t('category')}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>

      <TransactionsSummary amount={data.total} />
    </div>
  );
}
