import oc from 'open-color';
import React, { useState } from 'react';
// import axios from 'axios';
import { nanoid } from 'nanoid';
import { Button } from '@mantine/core';
import { TagPicker } from '@mantine/tag-picker';
import useTranslations from '../../translations/use-translations';

// axios.get('http://localhost:4005/categories', {
//   headers: {
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjZjMmY4MjJlOTk1MjI5Y2ZiZWEzOCIsIm5hbWUiOiLQktC40YLQsNC70LjQuSIsImVtYWlsIjoicnRpdml0YWxAZ21haWwuY29tIiwiaWF0IjoxNjEwMDA3Mjg5LCJleHAiOjE2MTAzNjcyODl9.ZR_3_7RZ1FFs-QnJ4xEcxGXPvMcWdzGUNztcS_nxQS8',
//   },
// });

type TagPickerWrapperProps = Omit<
  React.ComponentProps<typeof TagPicker>,
  | 'value'
  | 'onChange'
  | 'data'
  | 'colors'
  | 'description'
  | 'createLabel'
  | 'deleteLabel'
  | 'noValueLabel'
  | 'onTagCreate'
  | 'onTagDelete'
  | 'onTagUpdate'
>;

const defaultData = [
  { id: '1', name: 'Pets', color: oc.indigo[0] },
  { id: '2', name: 'Home', color: oc.red[0] },
  { id: '3', name: 'Subscriptions', color: oc.teal[0] },
];

function TagPickerWrapper(props: TagPickerWrapperProps) {
  const [value, onChange] = useState(null);
  const [data, setData] = useState(defaultData);

  return (
    <TagPicker
      value={value}
      onChange={onChange}
      data={data}
      searchPlaceholder="Search categories"
      colors={['blue', 'red'].map((theme) => ({ name: theme, color: oc[theme][0] }))}
      description="Select category or create new one"
      createLabel="+ Create new category"
      deleteLabel="Delete category"
      noValueLabel="Not selected"
      onTagCreate={(values) => setData((current) => [...current, { ...values, id: nanoid() }])}
      onTagDelete={(id) => setData((current) => current.filter((item) => item.id !== id))}
      onTagUpdate={(id, values) =>
        setData((current) => {
          const copy = [...current];
          const index = current.findIndex((item) => item.id === id);
          copy[index] = { id, ...values };
          return copy;
        })
      }
      {...props}
    />
  );
}

export default function HomePage() {
  const t = useTranslations();

  return (
    <div>
      <TagPickerWrapper />
      <Button>{t('register')}</Button>
    </div>
  );
}
