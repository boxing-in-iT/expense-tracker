import {
  Budget,
  Expense,
  Income,
  IncomeSource,
  User,
} from "../data/interfaces";

const generateRandomColor = (key: string) => {
  const existingBudgetLength = fetchData(key)?.length ?? 0;
  return `hsl(${existingBudgetLength * 34}, 65%, 50%)`;
};

export const fetchData = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string);
};

export const getAllMatchingItems = ({ category, key, value }: any) => {
  const data = fetchData(category) ?? [];
  return data.filter((item: any) => item[key] === value);
};

export const createBudget = ({
  name,
  amount,
}: {
  name: string;
  amount: number;
}) => {
  const newItem: Budget = {
    id: crypto.randomUUID(),
    name: name,
    amount: amount,
    createdAt: Date.now(),
    color: generateRandomColor("budgets"),
  };

  const existingBudgets = fetchData("budgets") ?? [];
  localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );

  return newItem;
};

export const createIncomeSource = ({ name }: { name: string }) => {
  const newItem: IncomeSource = {
    id: crypto.randomUUID(),
    name: name,
    amount: 0,
    createdAt: Date.now(),
    color: generateRandomColor("incomeSources"),
  };

  const existingIncomeSources = fetchData("incomeSources") ?? [];
  localStorage.setItem(
    "incomeSources",
    JSON.stringify([...existingIncomeSources, newItem])
  );

  return newItem;
};

export const createExpense = ({
  name,
  amount,
  budgetId,
}: {
  name: string;
  amount: number;
  budgetId: string;
}) => {
  const newItem: Expense = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
  return newItem;
};

export const createIncome = ({
  name,
  amount,
  incomeSourceId,
}: {
  name: string;
  amount: number;
  incomeSourceId: string;
}) => {
  const newItem: Income = {
    id: crypto.randomUUID(),
    name: name,
    // createdAt: Date.now(),
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).getTime(),
    amount: +amount,
    incomeSourceId: incomeSourceId,
  };
  const existingIncome = fetchData("income") ?? [];
  localStorage.setItem("income", JSON.stringify([...existingIncome, newItem]));
  return newItem;
};

export const saveUserToLocalStorage = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const calculateSpentByBudget = (budgetId: string): number => {
  const expenses: Expense[] = fetchData("expenses") ?? [];

  const budgetSpent = expenses.reduce((acc: number, expense: Expense) => {
    if (expense.budgetId !== budgetId) return acc;

    return acc + expense.amount;
  }, 0);

  return budgetSpent;
};

export const calculatePercentangle = (amount: number, total: number) => {
  return ((amount / total) * 100).toFixed(2);
};

export const formatDateToLocaleString = (epoch: number) =>
  new Date(epoch).toLocaleDateString();

export const deleteItem = ({ key, id }: any) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item: any) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

export const logout = () => {
  deleteItem({ key: "user", id: null });
  deleteItem({ key: "budgets", id: null });
  deleteItem({ key: "expenses", id: null });
  deleteItem({ key: "incomeSources", id: null });
  deleteItem({ key: "income", id: null });
};

// export const formatPercentage = (amt) => {
//   return amt.toLocaleString(undefined, {
//     style: "percent",
//     minimumFractionDigits: 0,
//   });
// };
