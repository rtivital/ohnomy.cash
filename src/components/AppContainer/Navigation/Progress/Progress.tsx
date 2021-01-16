import React from 'react';
import { Text } from '@mantine/core';
import useTranslations from 'src/translations/use-translations';
import { useScheduledRequests } from 'src/ScheduledRequestsProvider';
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
