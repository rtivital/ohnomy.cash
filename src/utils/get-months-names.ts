import upperFirst from './upper-first';

export default function getMonthsNames(locale: string, year: number) {
  return Array(12)
    .fill(0)
    .map((_, month) => ({
      label: upperFirst(new Date(year, month, 2).toLocaleString(locale, { month: 'long' })),
      value: new Date(year, month, 2).toISOString(),
    }));
}
