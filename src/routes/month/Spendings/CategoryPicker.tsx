import oc from 'open-color';
import React from 'react';
import { nanoid } from 'nanoid';
import { TagPicker, TagPickerTag } from '@mantine/tag-picker';
import useTranslations from 'src/translations/use-translations';

export const OPEN_COLOR_THEMES = [
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange',
] as const;

interface CategoryPickerProps {
  data: TagPickerTag[];
  value: TagPickerTag;
  onChange(value: TagPickerTag): void;
  onCategoryCreate(values: TagPickerTag): void;
  onCategoryDelete(id: string): void;
  onCategoryUpdate(id: string, values: Omit<TagPickerTag, 'id'>): void;
}

export default function CategoryPicker({
  value,
  onChange,
  data,
  onCategoryCreate,
  onCategoryUpdate,
  onCategoryDelete,
}: CategoryPickerProps) {
  const t = useTranslations();

  return (
    <TagPicker
      value={value}
      onChange={onChange}
      data={data}
      searchPlaceholder={t('search_categories')}
      colors={OPEN_COLOR_THEMES.map((theme) => ({ name: t(theme), color: oc[theme][0] }))}
      description={t('select_or_create_category')}
      createLabel={`+ ${t('create_category')}`}
      deleteLabel={t('delete_category')}
      noValueLabel={t('category_not_selected')}
      onTagCreate={(values) => onCategoryCreate({ ...values, id: `category-created-${nanoid()}` })}
      onTagDelete={onCategoryDelete}
      onTagUpdate={onCategoryUpdate}
    />
  );
}
