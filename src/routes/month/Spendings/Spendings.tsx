import React from 'react';
import useTranslations from 'src/translations/use-translations';
import SectionBody from '../SectionBody/SectionBody';

export default function Spendings() {
  const t = useTranslations();
  return <SectionBody title={t('spendings')}>Spendings</SectionBody>;
}
