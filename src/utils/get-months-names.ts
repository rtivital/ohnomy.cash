import upperFirst from './upper-first';

export default function getMonthsNames(locale: string) {
  return Array(12)
    .fill(0)
    .map((_, month) => ({
      label: upperFirst(new Date(2000, month).toLocaleString(locale, { month: 'long' })),
      value: month.toString(),
    }));
}
