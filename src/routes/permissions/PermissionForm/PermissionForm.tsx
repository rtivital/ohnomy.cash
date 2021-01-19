import React, { useState } from 'react';
import { TextInput, Button, Title, ElementsGroup } from '@mantine/core';
import useTranslations from 'src/hooks/use-translations';

interface PermissionFormProps {
  onSubmit(email: string): void;
}

export default function PermissionForm({ onSubmit }: PermissionFormProps) {
  const t = useTranslations();
  const [email, setEmail] = useState('');

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: 50 }}>
      <Title order={3}>{t('add_permission')}</Title>

      <TextInput
        style={{ marginTop: 20 }}
        value={email}
        onChange={setEmail}
        label={t('email')}
        placeholder={t('email')}
      />
      <ElementsGroup position="right" style={{ marginTop: 20 }}>
        <Button onClick={() => onSubmit(email)}>{t('add_permission')}</Button>
      </ElementsGroup>
    </div>
  );
}
