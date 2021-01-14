import React from 'react';
import useTranslations from 'src/translations/use-translations';
import SectionBody from '../SectionBody/SectionBody';

export default function Summary() {
  const t = useTranslations();
  return <SectionBody title={t('summary')}>Summary</SectionBody>;
}
