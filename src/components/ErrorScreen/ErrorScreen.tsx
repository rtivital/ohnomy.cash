import React from 'react';
import { ErrorNotification } from '@mantine/core';
import useTranslations from 'src/hooks/use-translations';
import classes from './ErrorScreen.styles.less';

interface ErrorScreenProps {
  error: Error;
}

export default function ErrorScreen({ error }: ErrorScreenProps) {
  const t = useTranslations();

  return (
    <div className={classes.wrapper}>
      <ErrorNotification
        className={classes.error}
        title={t('error_occured')}
        description={t('try_reloading')}
        error={error}
      />
    </div>
  );
}
