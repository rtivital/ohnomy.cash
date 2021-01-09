import React from 'react';
// import axios from 'axios';
import { Button } from '@mantine/core';
import useTranslations from '../../translations/use-translations';

// axios.get('http://localhost:4005/categories', {
//   headers: {
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjZjMmY4MjJlOTk1MjI5Y2ZiZWEzOCIsIm5hbWUiOiLQktC40YLQsNC70LjQuSIsImVtYWlsIjoicnRpdml0YWxAZ21haWwuY29tIiwiaWF0IjoxNjEwMDA3Mjg5LCJleHAiOjE2MTAzNjcyODl9.ZR_3_7RZ1FFs-QnJ4xEcxGXPvMcWdzGUNztcS_nxQS8',
//   },
// });

export default function HomePage() {
  const t = useTranslations();

  return (
    <div>
      <h1 style={{ fontSize: 50, fontWeight: 'bold', textAlign: 'center' }}>
        React Pages Boilerplate!
      </h1>
      <Button>{t('register')}</Button>
    </div>
  );
}
