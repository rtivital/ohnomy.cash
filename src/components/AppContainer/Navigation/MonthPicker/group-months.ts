import { Month } from 'src/api/types';

export default function groupMonths(months: Month[]): (readonly [string, Month[]])[] {
  const grouped = months.reduce((acc, month) => {
    const year = new Date(month.date).getFullYear();

    if (!(year in acc)) {
      acc[year] = [];
    }

    acc[year].push(month);
    return acc;
  }, {} as Record<string, Month[]>);

  const years = Object.keys(grouped);
  years.forEach((year) => {
    grouped[year].sort((a, b) => new Date(a.date).getMonth() - new Date(b.date).getMonth());
  });

  years.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  return years.map((year) => [year, grouped[year]] as const);
}
