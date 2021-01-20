import React, { useState, useRef, useEffect, createContext } from 'react';
import client from 'src/api/client';
import { ScheduledRequest } from 'src/api/types';

export const ScheduledRequestsContext = createContext<{
  saving: boolean;
  addScheduledRequest(request: ScheduledRequest): void;
  requests: ScheduledRequest[];
  scheduled: ScheduledRequest[];
}>(null);

interface ScheduledRequestsProviderProps {
  children: React.ReactNode;
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

        client.sendScheduledRequests(requests, () => {
          setSaving(false);
          setScheduled([]);
        });
      }, 3500);
    }
  }, [requests]);

  const addScheduledRequest = (request: ScheduledRequest) => {
    window.clearTimeout(saveTimeoutRef.current);

    if (request.immediate) {
      setScheduled((current) => [...current, request]);
      client
        .sendScheduledRequest(request)
        .then(() => setScheduled((current) => current.filter((req) => req.id !== request.id)));
    } else {
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
    }
  };

  return (
    <ScheduledRequestsContext.Provider value={{ saving, addScheduledRequest, requests, scheduled }}>
      {children}
    </ScheduledRequestsContext.Provider>
  );
}
