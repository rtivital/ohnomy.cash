import React, { useState } from 'react';
import { TrashIcon } from '@modulz/radix-icons';
import { Table, Text, ActionIcon } from '@mantine/core';
import AmountInput from 'src/components/AmountInput/AmountInput';
import DescriptionInput from 'src/components/DescriptionInput/DescriptionInput';
import AddTransaction from 'src/components/AddTransaction/AddTransaction';
import TransactionsSummary from 'src/components/TransactionsSummary/TransactionsSummary';
import useTranslations from 'src/translations/use-translations';
import getTransactionsSum from '../get-transactions-sum';
import SectionBody from '../SectionBody/SectionBody';
import { BaseTransationEditorProps } from '../types';

export default function Savings({
  data,
  onTransactionDelete,
  onTransactionUpdate,
  onTransactionCreate,
}: BaseTransationEditorProps) {
  const t = useTranslations();
  const [focused, setFocused] = useState(-1);

  const rows = data.map((transaction, index) => (
    <tr key={transaction.id}>
      <td>
        <AmountInput
          focus={focused === index}
          value={transaction.amount.toString()}
          onFocus={() => setFocused(-1)}
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
    <SectionBody title={t('savings')}>
      {data.length > 0 ? (
        <Table style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: 130 }}>
                {t('saving')}, {t('currency', { capitalize: false })}
              </th>
              <th>{t('description')}</th>
              <th style={{ width: 40 }} />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      ) : (
        <Text theme="muted" style={{ textAlign: 'center' }}>
          {t('no_savings')}
        </Text>
      )}

      <AddTransaction
        onClick={() => {
          onTransactionCreate('saving');
          setFocused(data.length);
        }}
      >
        {t('add_saving')}
      </AddTransaction>

      {data.length > 0 && <TransactionsSummary amount={getTransactionsSum(data)} />}
    </SectionBody>
  );
}
