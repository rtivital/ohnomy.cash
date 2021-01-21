import React from 'react';
import useTranslations from 'src/hooks/use-translations';
import SectionBody from '../SectionBody/SectionBody';
import SpendingsTable from './SpendingsTable';
import SummaryTable, { SummaryTableProps } from './SummaryTable';

export default function Summary(props: SummaryTableProps) {
  const t = useTranslations();

  return (
    <SectionBody title={t('summary')}>
      <SpendingsTable spendings={props.spendings} />
      <SummaryTable {...props} />
    </SectionBody>
  );
}
