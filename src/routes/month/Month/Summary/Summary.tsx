import React from 'react';
import { Transaction } from 'src/api/types';
import useTranslations from 'src/hooks/use-translations';
import SectionBody from '../SectionBody/SectionBody';
import SpendingsTable from './SpendingsTable';

interface SummaryProps {
  incomes: Transaction[];
  savings: Transaction[];
  spendings: Transaction[];
}

export default function Summary({ incomes, savings, spendings }: SummaryProps) {
  const t = useTranslations();

  return (
    <SectionBody title={t('summary')}>
      <SpendingsTable spendings={spendings} />
    </SectionBody>
  );
}
