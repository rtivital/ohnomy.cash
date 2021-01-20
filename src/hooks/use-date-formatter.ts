import { useLocale } from './use-locale';

interface FormatMonth {
  date: Date | string;
  locale: string;
  includeYear?: boolean;
}

function formatMonth({ date, locale, includeYear }: FormatMonth) {
  const parsedDate = new Date(date);
  const month = parsedDate.toLocaleDateString(locale, { month: 'long' });
  const year = parsedDate.getFullYear();
  return includeYear ? `${month} ${year}` : month;
}

export default function useDateFormatter() {
  const locale = useLocale();
  return ({ date, includeYear }: Omit<FormatMonth, 'locale'>) =>
    formatMonth({ date, locale, includeYear });
}
