import oc from 'open-color';
import { Category, Transaction } from 'src/api/types';

interface SpendingGroup {
  category: Category;
  amount: number;
}

export default function groupSpendings(spendings: Transaction[], unsortedLabel: string) {
  let total = 0;

  const grouped = spendings.reduce((acc, spending) => {
    if (!spending.category) {
      if (!('unsorted' in acc)) {
        acc.unsorted = {
          amount: 0,
          category: { id: 'unsorted', color: oc.gray[1], name: unsortedLabel },
        };
      }

      acc.unsorted.amount += spending.amount;
      total += spending.amount;
      return acc;
    }

    if (!(spending.category.id in acc)) {
      acc[spending.category.id] = {
        category: spending.category,
        amount: 0,
      };
    }

    acc[spending.category.id].amount += spending.amount;
    total += spending.amount;
    return acc;
  }, {} as Record<string, SpendingGroup>);

  return { groups: Object.values(grouped), total };
}
