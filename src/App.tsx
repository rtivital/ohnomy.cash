import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from './components/LocaleProvider/LocaleProvider';
import HomePage from './routes/home/HomePage';
import settings from '../settings';
import LoginRoute from './routes/auth/Login.route';
import RegisterRoute from './routes/auth/Register.route';

export default function App() {
  return (
    <LocaleProvider defaultLocale="ru">
      <BrowserRouter basename={settings.repoPath}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/auth/login" component={LoginRoute} />
          <Route path="/auth/register" component={RegisterRoute} />
        </Switch>
      </BrowserRouter>
    </LocaleProvider>
  );
}
