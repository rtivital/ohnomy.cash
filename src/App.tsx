import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from './providers/LocaleProvider';
import { ScheduledRequestsProvider } from './providers/ScheduledRequestsProvider';
import ErrorBoundaries from './providers/ErrorBoundaries';
import LoginRoute from './routes/auth/Login.route';
import RegisterRoute from './routes/auth/Register.route';
import MonthRoute from './routes/month/Month.route';
import CreateMonthRoute from './routes/months/CreateMonth.route';
import EditMonthRoute from './routes/months/EditMonth.route';
import PermissionsRoute from './routes/permissions/Permissions.route';
import AuthProvider from './providers/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <LocaleProvider defaultLocale="ru">
        <ErrorBoundaries>
          <ScheduledRequestsProvider>
            <BrowserRouter>
              <Switch>
                <Route path="/auth/login" component={LoginRoute} />
                <Route path="/auth/register" component={RegisterRoute} />
                <Route path="/permissions" component={PermissionsRoute} />
                <Route path="/months/create" component={CreateMonthRoute} />
                <Route path="/months/edit/:month" component={EditMonthRoute} />
                <Route path="/:month?" component={MonthRoute} />
              </Switch>
            </BrowserRouter>
          </ScheduledRequestsProvider>
        </ErrorBoundaries>
      </LocaleProvider>
    </AuthProvider>
  );
}
