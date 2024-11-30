import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { Budget, Expense, User } from "./data/interfaces"; // Используем ваш существующий интерфейс

// Типы для контекста
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
}

// Создаём контекст
const AppContext = createContext<AppContextType | undefined>(undefined);

// Провайдер контекста
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedBudgets = localStorage.getItem("budgets");
    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    }

    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ user, setUser, budgets, setBudgets, expenses, setExpenses }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Хук для использования контекста
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext должен использоваться внутри AppProvider");
  }
  return context;
};
