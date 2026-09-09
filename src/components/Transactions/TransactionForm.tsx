import { useEffect, useState, type FormEvent } from "react";

import { X } from "lucide-react";

import { useTransactions } from "../../context/TransactionContext";

import type { Transaction, TransactionType } from "../../types";

interface TransactionFormProps {
  onClose: () => void;
  transaction?: Transaction;
}

const categories = [
  "Food",
  "Shopping",
  "Transport",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Salary",
  "Business",
  "Other",
];

const TransactionForm = ({ onClose, transaction }: TransactionFormProps) => {
  const { addTransaction, updateTransaction } = useTransactions();

  const isEditMode = Boolean(transaction);

  const getToday = () => new Date().toISOString().split("T")[0];

  const [type, setType] = useState<TransactionType>(
    transaction?.type ?? "expense",
  );

  const [amount, setAmount] = useState(
    transaction ? String(transaction.amount) : "",
  );

  const [category, setCategory] = useState(transaction?.category ?? "Food");

  const [description, setDescription] = useState(
    transaction?.description ?? "",
  );

  const [date, setDate] = useState(transaction?.date ?? getToday());

  const [error, setError] = useState("");

  useEffect(() => {
    if (!transaction) return;

    setType(transaction.type);
    setAmount(String(transaction.amount));
    setCategory(transaction.category);
    setDescription(transaction.description);
    setDate(transaction.date);
  }, [transaction]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const numericAmount = Number(amount);

    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!category) {
      setError("Please select a category.");
      return;
    }

    if (!date) {
      setError("Please select a date.");
      return;
    }

    const data = {
      type,
      amount: numericAmount,
      category,
      description: description.trim(),
      date,
    };

    if (transaction) {
      updateTransaction(transaction.id, data);
    } else {
      addTransaction(data);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-4">
      <div className="flex max-h-[96vh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl dark:bg-gray-900">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6 dark:border-gray-800">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
              {isEditMode ? "Edit Transaction" : "Add Transaction"}
            </h2>

            <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
              {isEditMode
                ? "Update your transaction details"
                : "Add a new income or expense"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div className="space-y-5 p-4 sm:p-6">
            {/* Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Transaction Type
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setType("income")}
                  className={`min-h-12 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                    type === "income"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  Income
                </button>

                <button
                  type="button"
                  onClick={() => setType("expense")}
                  className={`min-h-12 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                    type === "expense"
                      ? "border-red-500 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  Expense
                </button>
              </div>
            </div>

            {/* Amount + Category */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Amount */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Amount
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="0.00"
                    className="min-h-12 w-full rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-4 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="min-h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>

              <input
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Enter description"
                className="min-h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="min-h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2 sm:flex sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="order-2 min-h-12 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:order-1 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="order-1 min-h-12 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 sm:order-2"
              >
                {isEditMode ? "Save Changes" : "Add Transaction"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
