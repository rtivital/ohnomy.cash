import React from 'react';
import { TrashIcon } from '@modulz/radix-icons';
import { Table, Title, ActionIcon } from '@mantine/core';
import { Transaction } from 'src/api/types';
import useTranslations from 'src/translations/use-translations';
import SectionBody from '../SectionBody/SectionBody';

interface IncomesProps {
  data: Transaction[];
}

export default function Incomes({ data }: IncomesProps) {
  const t = useTranslations();

  const rows = data.map((transaction) => (
    <tr key={transaction.id}>
      <td>{transaction.amount}</td>
      <td>{transaction.description}</td>
      <td>
        <ActionIcon theme="danger">
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
