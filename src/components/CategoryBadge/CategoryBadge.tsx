import React from 'react';
import cx from 'clsx';
import { Category } from 'src/api/types';
import classes from './CategoryBadge.styles.less';

interface CategoryBadgeProps {
  data: Category;
  className?: string;
}

export default function CategoryBadge({ data, className }: CategoryBadgeProps) {
  return (
    <div className={cx(classes.categoryBadge, className)} style={{ backgroundColor: data.color }}>
      {data.name}
    </div>
  );
}
