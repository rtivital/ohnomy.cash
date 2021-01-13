import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from './LocaleProvider';
import HomePage from './routes/home/HomePage';
import settings from '../settings';
import LoginRoute from './routes/auth/Login.route';
import RegisterRoute from './routes/auth/Register.route';
import AppContainer from './components/AppContainer/AppContainer';

export default function App() {
  return (
    <LocaleProvider defaultLocale="ru">
      <BrowserRouter basename={settings.repoPath}>
        <Switch>
          <Route path="/auth/login" component={LoginRoute} />
          <Route path="/auth/register" component={RegisterRoute} />
          <Route path="/:month?">
            <AppContainer>
              <Switch>
                <Route path="/:month?" component={HomePage} />
              </Switch>
            </AppContainer>
          </Route>
        </Switch>
      </BrowserRouter>
    </LocaleProvider>
  );
}
