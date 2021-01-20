import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from './providers/LocaleProvider';
import { ScheduledRequestsProvider } from './providers/ScheduledRequestsProvider';
import LoginRoute from './routes/auth/Login.route';
import RegisterRoute from './routes/auth/Register.route';
import MonthRoute from './routes/month/Month.route';
import CreateMonthRoute from './routes/months/CreateMonth.route';
import EditMonthRoute from './routes/months/EditMonth.route';
import PermissionsRoute from './routes/permissions/Permissions.route';

export default function App() {
  return (
    <LocaleProvider defaultLocale="ru">
      <ScheduledRequestsProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/auth/login" component={LoginRoute} />
            <Route path="/auth/register" component={RegisterRoute} />
            <Route path="/permissions" component={PermissionsRoute} />
            <Route path="/months/create" component={CreateMonthRoute} />
            <Route path="/months/edit/:id" component={EditMonthRoute} />
            <Route path="/:month?" component={MonthRoute} />
          </Switch>
        </BrowserRouter>
      </ScheduledRequestsProvider>
    </LocaleProvider>
  );
}
