export interface User {
  name: string;
}

export interface Budget {
  id: string; // Changed from number to string
  name: string;
  amount: number;
  createdAt: number;
  color: string;
}

export interface Expense {
  id: string; // Changed from number to string
  name: string;
  amount: number;
  budgetId: string;
  createdAt: number;
}

export interface IncomeSource {
  id: string; // Changed from number to string
  name: string;
  amount: number;
  createdAt: number;
  color: string;
}

export interface Income {
  id: string; // Changed from number to string
  name: string;
  amount: number;
  incomeSourceId: string;
  createdAt: number;
}
