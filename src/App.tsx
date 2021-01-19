import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from './LocaleProvider';
import { ScheduledRequestsProvider } from './ScheduledRequestsProvider';
import settings from '../settings';
import LoginRoute from './routes/auth/Login.route';
import RegisterRoute from './routes/auth/Register.route';
import MonthRoute from './routes/month/Month.route';
import CreateMonthRoute from './routes/create-month/CreateMonth.route';
import PermissionsRoute from './routes/permissions/Permissions.route';

export default function App() {
  return (
    <LocaleProvider defaultLocale="ru">
      <ScheduledRequestsProvider>
        <BrowserRouter basename={settings.repoPath}>
          <Switch>
            <Route path="/auth/login" component={LoginRoute} />
            <Route path="/auth/register" component={RegisterRoute} />
            <Route path="/permissions" component={PermissionsRoute} />
            <Route path="/months/create" component={CreateMonthRoute} />
            <Route path="/months/edit/:id" component={() => <div>Edit month</div>} />
            <Route path="/:month?" component={MonthRoute} />
          </Switch>
        </BrowserRouter>
      </ScheduledRequestsProvider>
    </LocaleProvider>
  );
}
