import React from 'react';
import classes from './SectionBody.styles.less';

interface SectionBodyProps {
  children: React.ReactNode;
}

export default function SectionBody({ children }: SectionBodyProps) {
  return <div className={classes.sectionBody}>{children}</div>;
}
