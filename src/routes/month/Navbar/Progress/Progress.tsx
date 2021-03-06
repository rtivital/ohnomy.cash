import React from 'react';
import { Text } from '@mantine/core';
import useTranslations from 'src/hooks/use-translations';
import useScheduledRequests from 'src/hooks/use-scheduled-requests';
import classes from './Progress.styles.less';

export default function Progress() {
  const t = useTranslations();
  const scheduledRequests = useScheduledRequests();
  const allClear =
    scheduledRequests.requests.length === 0 && scheduledRequests.scheduled.length === 0;

  return (
    <div className={classes.progress}>
      {allClear && (
        <Text theme="success" size="sm">
          {t('all_changes_saved')}
        </Text>
      )}

      {scheduledRequests.requests.length > 0 && (
        <Text size="sm" theme="muted">
          {`${t('unsaved_chages')}: ${scheduledRequests.requests.length}`}
        </Text>
      )}

      {scheduledRequests.scheduled.length > 0 && (
        <Text size="sm" theme="muted">
          {`${t('saving_chages')}: ${scheduledRequests.scheduled.length}`}
        </Text>
      )}
    </div>
  );
}
