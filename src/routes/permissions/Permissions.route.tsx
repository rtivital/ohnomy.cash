import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Text } from '@mantine/core';
import client from 'src/api/client';
import PermissionForm from './PermissionForm/PermissionForm';

export default function PermissionsRoute() {
  const history = useHistory();
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    client.axios
      .get('/permissions')
      .then((response) => setPermissions(response.data))
      .catch(() => history.push('/'));
  }, []);

  const items = permissions.map((permission) => (
    <Text key={permission.email}>{permission.email}</Text>
  ));

  const handleSubmit = (email: string) => {
    client.axios
      .post('/permissions', { email })
      .then(() => client.axios.get('/permissions'))
      .then((response) => setPermissions(response.data))
      .catch(() => history.push('/'));
  };

  return (
    <div>
      {items}
      <PermissionForm onSubmit={handleSubmit} />
    </div>
  );
}
