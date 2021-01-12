import React from 'react';
import { useForm } from 'xooks';
import { TextInput, PasswordInput } from '@mantine/core';
import useTranslations from '../../../../translations/use-translations';
import AuthFormWrapper from '../AuthFormWrapper/AuthFormWrapper';

export default function RegisterForm() {
  const t = useTranslations();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
      password: (value) => value.trim().length > 0,
      name: (value) => value.trim().length >= 2,
    },
  });

  return (
    <AuthFormWrapper
      title={t('register')}
      submitText={t('register')}
      onSubmit={() => {}}
      switchLink="/auth/login"
      switchText={t('login')}
      description={t('already_have_an_accont')}
    >
      <TextInput
        required
        id="name"
        label={t('name')}
        placeholder={t('name')}
        value={form.values.name}
        onChange={(value) => form.setField('name', value)}
      />

      <TextInput
        required
        type="email"
        id="email"
        label={t('email')}
        placeholder={t('email')}
        value={form.values.email}
        onChange={(value) => form.setField('email', value)}
        style={{ marginTop: 15 }}
      />

      <PasswordInput
        required
        id="password"
        label={t('password')}
        placeholder={t('password')}
        value={form.values.password}
        onChange={(value) => form.setField('password', value)}
        style={{ marginTop: 15 }}
      />
    </AuthFormWrapper>
  );
}
