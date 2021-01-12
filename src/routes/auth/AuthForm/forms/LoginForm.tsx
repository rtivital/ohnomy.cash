import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'xooks';
import { TextInput, PasswordInput } from '@mantine/core';
import axiosClient from '../../../../AxiosClient';
import useTranslations from '../../../../translations/use-translations';
import AuthFormWrapper from '../AuthFormWrapper/AuthFormWrapper';

export default function LoginForm() {
  const t = useTranslations();
  const history = useHistory();
  const [error, setError] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
      password: (value) => value.trim().length > 0,
    },
  });

  const handleSubmit = () => {
    axiosClient.client
      .post('/auth/login', form.values)
      .then((response) => {
        axiosClient.setToken(response.data.token);
        history.replace('/');
      })
      .catch(() => setError(true));
  };

  return (
    <AuthFormWrapper
      title={t('login')}
      submitText={t('login')}
      onSubmit={handleSubmit}
      switchLink="/auth/register"
      switchText={t('register')}
      description={t('does_not_have_an_accont')}
      error={error ? t('invalid_credentials') : null}
    >
      <TextInput
        required
        type="email"
        id="email"
        label={t('email')}
        placeholder={t('email')}
        value={form.values.email}
        onChange={(value) => form.setField('email', value)}
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
