import { useLocale } from './use-locale';

export function formatNumber(number: number | string, locale: string) {
  return Intl.NumberFormat(locale).format(
    typeof number === 'number' ? number : parseInt(number, 10)
  );
}

export function extractFormattedNumber(string: string) {
  const negative = string[0] === '-';
  return parseInt(string.replace(/[^0-9]/g, ''), 10) * (negative ? -1 : 1);
}

export default function useNumberFormatter() {
  const locale = useLocale();

  return {
    format: (number: number | string) => formatNumber(number, locale),
    extract: extractFormattedNumber,
  };
}
