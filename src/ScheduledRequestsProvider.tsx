import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import client from 'src/api/client';

const ScheduledRequestsContext = createContext<{
  saving: boolean;
  addScheduledRequest(request: ScheduledRequest): void;
  requests: ScheduledRequest[];
  scheduled: ScheduledRequest[];
}>({
  saving: false,
  addScheduledRequest: (f) => f,
  requests: [],
  scheduled: [],
});

interface ScheduledRequestsProviderProps {
  children: React.ReactNode;
}

interface ScheduledRequest {
  id: string;
  type: 'create' | 'update' | 'delete';
  payload: any;
  url: string;
}

const METHODS = {
  create: 'POST',
  update: 'PUT',
  delete: 'DELETE',
} as const;

export function useScheduledRequests() {
  const context = useContext(ScheduledRequestsContext);

  if (!context) {
    throw new Error('ScheduledRequestsContext not found');
  }

  return context;
}

async function sendRequests(requests: ScheduledRequest[], onFinish: () => void) {
  const savingRequests = requests.map((request) =>
    client.axios({
      url: request.url,
      method: METHODS[request.type],
      data: request.payload,
    })
  );

  await Promise.all(savingRequests);
  onFinish();
}

export function ScheduledRequestsProvider({ children }: ScheduledRequestsProviderProps) {
  const saveTimeoutRef = useRef(-1);
  const [requests, setRequests] = useState<ScheduledRequest[]>([]);
  const [scheduled, setScheduled] = useState<ScheduledRequest[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (requests.length > 0) {
      saveTimeoutRef.current = window.setTimeout(() => {
        setSaving(true);
        setScheduled(requests);
        setRequests([]);
        sendRequests(requests, () => {
          setSaving(false);
          setScheduled([]);
        });
      }, 3500);
    }
  }, [requests]);

  const addScheduledRequest = (request: ScheduledRequest) => {
    window.clearTimeout(saveTimeoutRef.current);

    setRequests((currentRequests) => {
      const intersectedRequest = currentRequests.find((req) => req.id === request.id);

      if (!intersectedRequest) {
        return [...currentRequests, request];
      }

      if (intersectedRequest.type === 'create' && request.type === 'update') {
        return currentRequests
          .filter((req) => req.id !== request.id)
          .concat({
            ...request,
            type: 'create',
          });
      }

      if (intersectedRequest.type === 'create' && request.type === 'delete') {
        return currentRequests.filter((req) => req.id !== request.id);
      }

      if (intersectedRequest.type === 'update' && request.type === 'delete') {
        return currentRequests.filter((req) => req.id !== request.id);
      }

      if (intersectedRequest.type === 'update' && request.type === 'update') {
        return currentRequests.filter((req) => req.id !== request.id).concat(request);
      }

      return currentRequests;
    });
  };

  return (
    <ScheduledRequestsContext.Provider value={{ saving, addScheduledRequest, requests, scheduled }}>
      {children}
    </ScheduledRequestsContext.Provider>
  );
}
