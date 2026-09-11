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

/* --------------------------------
   DEFAULT / SAMPLE TRANSACTIONS
--------------------------------- */

const defaultTransactions: Transaction[] = [
  {
    id: "default-1",
    type: "income",
    amount: 50000,
    category: "Salary",
    description: "Monthly Salary",
    date: "2026-09-01",
  },
  {
    id: "default-2",
    type: "income",
    amount: 10000,
    category: "Business",
    description: "Freelance Income",
    date: "2026-09-05",
  },
  {
    id: "default-3",
    type: "expense",
    amount: 2500,
    category: "Food",
    description: "Groceries",
    date: "2026-09-03",
  },
  {
    id: "default-4",
    type: "expense",
    amount: 1200,
    category: "Transport",
    description: "Fuel",
    date: "2026-09-04",
  },
  {
    id: "default-5",
    type: "expense",
    amount: 3500,
    category: "Bills",
    description: "Electricity Bill",
    date: "2026-09-06",
  },
  {
    id: "default-6",
    type: "expense",
    amount: 1800,
    category: "Shopping",
    description: "Clothing",
    date: "2026-09-07",
  },
  {
    id: "default-7",
    type: "expense",
    amount: 900,
    category: "Entertainment",
    description: "Movie",
    date: "2026-09-08",
  },
];

/* --------------------------------
   TRANSACTION PROVIDER
--------------------------------- */

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    // store the transaction data
    const savedData = localStorage.getItem(STORAGE_KEY);

    /*
        If LocalStorage already has data,
        use that data.
      */

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);

        if (Array.isArray(parsedData)) {
          return parsedData;
        }
      } catch {
        console.error("Failed to parse transaction data");
      }
    }

    /*
        If LocalStorage is empty,
        load default/sample transactions.
      */

    return defaultTransactions;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    // add new transaction
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };

    setTransactions((current) => [newTransaction, ...current]);
  };

  const updateTransaction = (
    //Existing transaction update
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
    .filter((transaction) => transaction.type === "income") // only income transaction
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
