import { useContext } from 'react';
import { ScheduledRequestsContext } from 'src/providers/ScheduledRequestsProvider';

export default function useScheduledRequests() {
  const context = useContext(ScheduledRequestsContext);

  if (!context) {
    throw new Error('ScheduledRequestsProvider not found');
  }

  return context;
}
