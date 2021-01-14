import React from 'react';
import { TrashIcon } from '@modulz/radix-icons';
import { Table, Title, ActionIcon } from '@mantine/core';
import AmountInput from 'src/components/AmountInput/AmountInput';
import { Transaction } from 'src/api/types';
import useTranslations from 'src/translations/use-translations';
import SectionBody from '../SectionBody/SectionBody';

interface IncomesProps {
  data: Transaction[];
  onTransactionDelete(transaction: Transaction): void;
  onTransactionUpdate(transaction: Transaction): void;
}

export default function Incomes({ data, onTransactionDelete, onTransactionUpdate }: IncomesProps) {
  const t = useTranslations();

  const rows = data.map((transaction) => (
    <tr key={transaction.id}>
      <td>
        <AmountInput
          value={transaction.amount.toString()}
          onChange={(value) =>
            onTransactionUpdate({
              ...transaction,
              amount: Number.isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10),
            })
          }
        />
      </td>
      <td>{transaction.description}</td>
      <td>
        <ActionIcon theme="danger" onClick={() => onTransactionDelete(transaction)}>
          <TrashIcon />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <div>
      <Title order={4}>{t('incomes')}</Title>
      <SectionBody>
        <Table>
          <thead>
            <tr>
              <th>{t('income')}</th>
              <th>{t('description')}</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </SectionBody>
    </div>
  );
}
