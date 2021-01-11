import React from 'react';
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';
import classes from './AuthForm.styles.less';

const forms = {
  login: LoginForm,
  register: RegisterForm,
};

interface AuthFormProps {
  type: 'login' | 'register';
}

export default function AuthForm({ type }: AuthFormProps) {
  const Form = forms[type];
  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <Form />
      </div>
    </div>
  );
}
