import React, { useState } from 'react';
import { useForm } from 'xooks';
import { useHistory } from 'react-router-dom';
import { TextInput, PasswordInput } from '@mantine/core';
import axiosClient from '../../../../api/client';
import useTranslations from '../../../../translations/use-translations';
import AuthFormWrapper from '../AuthFormWrapper/AuthFormWrapper';

export default function RegisterForm() {
  const history = useHistory();
  const t = useTranslations();
  const [error, setError] = useState(false);

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

  const handleSubmit = () => {
    axiosClient.axios
      .post('/auth/register', form.values)
      .then((response) => {
        axiosClient.setToken(response.data.token);
        history.replace('/');
      })
      .catch(() => setError(true));
  };

  return (
    <AuthFormWrapper
      title={t('register')}
      submitText={t('register')}
      onSubmit={handleSubmit}
      switchLink="/auth/login"
      switchText={t('login')}
      description={t('already_have_an_accont')}
      error={error ? t('invalid_credentials') : null}
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
