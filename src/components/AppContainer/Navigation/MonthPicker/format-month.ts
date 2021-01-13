interface FormatMonth {
  date: Date | string;
  locale: string;
  includeYear?: boolean;
}

export default function formatMonth({ date, locale, includeYear }: FormatMonth) {
  const parsedDate = new Date(date);
  const month = parsedDate.toLocaleDateString(locale, { month: 'long' });
  const year = parsedDate.getFullYear();
  return includeYear ? `${month} ${year}` : month;
}
