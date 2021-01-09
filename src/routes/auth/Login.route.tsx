import React from 'react';
import LoginForm from './AuthForm/forms/LoginForm';
import RegisterForm from './AuthForm/forms/RegisterForm';

export default function LoginRoute() {
  return (
    <div>
      <LoginForm />
      <RegisterForm />
    </div>
  );
}
