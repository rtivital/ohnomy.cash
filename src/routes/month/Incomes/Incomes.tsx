import React from 'react';
import { TrashIcon } from '@modulz/radix-icons';
import { Table, Title, ActionIcon } from '@mantine/core';
import AmountInput from 'src/components/AmountInput/AmountInput';
import DescriptionInput from 'src/components/DescriptionInput/DescriptionInput';
import AddTransaction from 'src/components/AddTransaction/AddTransaction';
import { Transaction } from 'src/api/types';
import useTranslations from 'src/translations/use-translations';
import { nanoid } from 'nanoid';
import SectionBody from '../SectionBody/SectionBody';

interface IncomesProps {
  data: Transaction[];
  date: string;
  onTransactionDelete(transaction: Transaction): void;
  onTransactionUpdate(transaction: Transaction): void;
  onTransactionCreate(transaction: Transaction): void;
}

export default function Incomes({
  data,
  date,
  onTransactionDelete,
  onTransactionUpdate,
  onTransactionCreate,
}: IncomesProps) {
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
      <td>
        <DescriptionInput
          placeholder={t('description')}
          value={transaction.description}
          onChange={(value) => onTransactionUpdate({ ...transaction, description: value })}
        />
      </td>
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
        <Table style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: 120 }}>
                {t('income')}, {t('currency', { capitalize: false })}
              </th>
              <th>{t('description')}</th>
              <th style={{ width: 40 }} />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <AddTransaction
          onClick={() =>
            onTransactionCreate({
              id: `create-${nanoid()}`,
              amount: 0,
              description: '',
              date,
              type: 'income',
              category: null,
            })
          }
        >
          {t('add_income')}
        </AddTransaction>
      </SectionBody>
    </div>
  );
}
