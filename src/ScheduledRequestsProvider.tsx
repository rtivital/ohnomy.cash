import React, { useState, useRef, useContext, createContext } from 'react';
import client from 'src/api/client';

const ScheduledRequestsContext = createContext<{
  saving: boolean;
  addScheduledRequest(request: ScheduledRequest): void;
  requests: ScheduledRequest[];
}>({
  saving: false,
  addScheduledRequest: (f) => f,
  requests: [],
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

export function ScheduledRequestsProvider({ children }: ScheduledRequestsProviderProps) {
  const saveTimeoutRef = useRef(-1);
  const [requests, setRequests] = useState<ScheduledRequest[]>([]);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    saveTimeoutRef.current = window.setTimeout(async () => {
      setSaving(true);

      const savingRequests = requests.map((request) =>
        client.axios({
          method: METHODS[request.type],
          data: request.payload,
        })
      );

      setRequests([]);

      await Promise.all(savingRequests);
      setSaving(false);
    }, 5000);
  };

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

    handleSave();
  };

  return (
    <ScheduledRequestsContext.Provider value={{ saving, addScheduledRequest, requests }}>
      {children}
    </ScheduledRequestsContext.Provider>
  );
}
