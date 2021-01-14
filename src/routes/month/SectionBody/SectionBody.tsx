import React from 'react';
import { Title } from '@mantine/core';
import classes from './SectionBody.styles.less';

interface SectionBodyProps {
  children: React.ReactNode;
  title: string;
}

export default function SectionBody({ children, title }: SectionBodyProps) {
  return (
    <div className={classes.sectionBody}>
      <Title order={4}>{title}</Title>
      <div className={classes.body}>{children}</div>
    </div>
  );
}
