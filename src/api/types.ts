export interface Month {
  id: string;
  date: string;
  balance: number;
  savings: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Transaction {
  id: string;
  category: Category;
  type: 'saving' | 'income' | 'spending';
  amount: number;
  date: string;
  description: string;
}
