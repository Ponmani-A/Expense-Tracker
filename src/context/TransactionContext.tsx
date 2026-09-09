import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Transaction } from "../types";

interface TransactionContextType {
  transactions: Transaction[];

  addTransaction: (transaction: Omit<Transaction, "id">) => void;

  updateTransaction: (id: string, transaction: Omit<Transaction, "id">) => void;

  deleteTransaction: (id: string) => void;

  totalIncome: number;
  totalExpense: number;
  balance: number;
}

interface TransactionProviderProps {
  children: ReactNode;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "expense-transactions";

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return [];
    }

    try {
      const parsedData = JSON.parse(savedData);

      if (Array.isArray(parsedData)) {
        return parsedData;
      }

      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };

    setTransactions((current) => [newTransaction, ...current]);
  };

  const updateTransaction = (
    id: string,
    transaction: Omit<Transaction, "id">,
  ) => {
    setTransactions((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...transaction,
              id: item.id,
            }
          : item,
      ),
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((current) => current.filter((item) => item.id !== id));
  };

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        totalIncome,
        totalExpense,
        balance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error("useTransactions must be used inside TransactionProvider");
  }

  return context;
};
