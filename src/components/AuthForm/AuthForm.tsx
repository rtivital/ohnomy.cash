import React, { useState } from 'react';
import TextInput from '../TextInput/TextInput';

export default function AuthForm() {
  const [type, setType] = useState<'login' | 'register'>('login');
  const [values, setValue] = useState({
    email: '',
    password: '',
    name: '',
  });

  const onFieldChange = (field: string, value: string) =>
    setValue((current) => ({ ...current, [field]: value }));

  const toggleType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  return (
    <div>
      <h1>{type === 'login' ? 'Войти' : 'Зарегистрироваться'}</h1>
      {type === 'register' && (
        <TextInput
          placeholder="Имя"
          id="name"
          type="text"
          label="Имя"
          value={values.name}
          onChange={(value) => onFieldChange('name', value)}
        />
      )}
      <TextInput
        placeholder="Почта"
        id="email"
        type="email"
        label="Почта"
        value={values.email}
        onChange={(value) => onFieldChange('email', value)}
      />
      <TextInput
        placeholder="Пароль"
        id="password"
        type="password"
        label="Пароль"
        value={values.password}
        onChange={(value) => onFieldChange('password', value)}
      />
      <div>
        <div>{type === 'login' ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}</div>
        <button type="button" onClick={toggleType}>
          {type === 'login' ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </div>
    </div>
  );
}
