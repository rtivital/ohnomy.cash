import React, { useState, useEffect } from 'react';
import { ObjectID } from 'bson';
import { Table, ActionIcon, Text } from '@mantine/core';
import { TrashIcon } from '@modulz/radix-icons';
import client from 'src/api/client';
import { Category } from 'src/api/types';
import useTranslations from 'src/hooks/use-translations';
import { useScheduledRequests } from 'src/ScheduledRequestsProvider';
import AmountInput from 'src/components/AmountInput/AmountInput';
import DescriptionInput from 'src/routes/month/DescriptionInput/DescriptionInput';
import AddTransaction from 'src/routes/month/AddTransaction/AddTransaction';
import TransactionsSummary from 'src/routes/month/TransactionsSummary/TransactionsSummary';
import SectionBody from '../SectionBody/SectionBody';
import getTransactionsSum from '../get-transactions-sum';
import { BaseTransationEditorProps } from '../types';
import CategoryPicker from './CategoryPicker';
import DatePicker from './DatePicker/DatePicker';

interface SpendingsProps extends BaseTransationEditorProps {
  categories: Category[];
}

export default function Spendings({
  data,
  categories: initialCategories,
  onTransactionDelete,
  onTransactionUpdate,
  onTransactionCreate,
}: SpendingsProps) {
  const scheduledRequests = useScheduledRequests();
  const [focused, setFocused] = useState(-1);
  const [categories, setCategories] = useState(initialCategories);
  const t = useTranslations();

  useEffect(() => {
    client.updateCache('/categories', categories);
  }, [categories]);

  const handleCategoryCreate = (payload: Omit<Category, 'id'>) => {
    const category = { ...payload, id: new ObjectID().toHexString() };
    setCategories((current) => [...current, category]);
    scheduledRequests.addScheduledRequest({
      immediate: true,
      id: category.id,
      type: 'create',
      url: '/categories',
      payload: category,
    });
    return category;
  };

  const handleCategoryUpdate = (id: string, payload: Omit<Category, 'id'>) => {
    const category = { id, ...payload };
    setCategories((current) => {
      const copy = [...current];
      const index = current.findIndex((item) => item.id === id);
      copy[index] = category;
      return copy;
    });
    scheduledRequests.addScheduledRequest({
      id: category.id,
      type: 'update',
      url: '/categories',
      payload: category,
    });
  };

  const handleCategoryDelete = (id: string) => {
    setCategories((current) => current.filter((category) => category.id !== id));
    scheduledRequests.addScheduledRequest({
      id,
      type: 'delete',
      url: '/categories',
      payload: { id },
    });
  };

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
        <CategoryPicker
          index={index}
          value={transaction.category}
          onChange={(category) => onTransactionUpdate({ ...transaction, category })}
          data={categories}
          onCategoryCreate={handleCategoryCreate}
          onCategoryUpdate={handleCategoryUpdate}
          onCategoryDelete={handleCategoryDelete}
        />
      </td>
      <td>
        <DatePicker
          value={new Date(transaction.date)}
          onChage={(date) => onTransactionUpdate({ ...transaction, date: date.toISOString() })}
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
    <SectionBody title={t('spendings')}>
      {data.length > 0 ? (
        <Table style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: 130 }}>
                {t('spending')}, {t('currency', { capitalize: false })}
              </th>
              <th style={{ width: 130 }}>{t('category')}</th>
              <th style={{ width: 130 }}>{t('date')}</th>
              <th>{t('description')}</th>
              <th style={{ width: 40 }} />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      ) : (
        <Text theme="muted" style={{ textAlign: 'center' }}>
          {t('no_spendings')}
        </Text>
      )}

      <AddTransaction
        onClick={() => {
          onTransactionCreate('spending');
          setFocused(data.length);
        }}
      >
        {t('add_spending')}
      </AddTransaction>

      {data.length > 0 && <TransactionsSummary amount={getTransactionsSum(data)} />}
    </SectionBody>
  );
}
