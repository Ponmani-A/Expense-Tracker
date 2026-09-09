import { useMemo, useState } from "react";

import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { useTransactions } from "../context/TransactionContext";

import TransactionForm from "../components/Transactions/TransactionForm";

import type { Transaction } from "../types";

type TypeFilter = "all" | "income" | "expense";

type SortOption = "newest" | "oldest" | "high" | "low";

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

const ITEMS_PER_PAGE = 5;

const Transactions = () => {
  const { transactions, deleteTransaction } = useTransactions();

  const [showForm, setShowForm] = useState(false);

  const [editingTransaction, setEditingTransaction] = useState<
    Transaction | undefined
  >(undefined);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    const result = transactions.filter((transaction) => {
      const matchesSearch =
        !searchValue ||
        transaction.description.toLowerCase().includes(searchValue) ||
        transaction.category.toLowerCase().includes(searchValue);

      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "All" || transaction.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });

    return result.sort((a, b) => {
      if (sortOption === "newest") {
        return (
          new Date(`${b.date}T00:00:00`).getTime() -
          new Date(`${a.date}T00:00:00`).getTime()
        );
      }

      if (sortOption === "oldest") {
        return (
          new Date(`${a.date}T00:00:00`).getTime() -
          new Date(`${b.date}T00:00:00`).getTime()
        );
      }

      if (sortOption === "high") {
        return b.amount - a.amount;
      }

      return a.amount - b.amount;
    });
  }, [transactions, search, typeFilter, categoryFilter, sortOption]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const filteredIncome = filteredTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const filteredExpense = filteredTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    if (!date) {
      return "-";
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleAdd = () => {
    setEditingTransaction(undefined);

    setShowForm(true);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);

    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTransaction(undefined);
  };

  const handleDelete = () => {
    if (!deleteId) {
      return;
    }

    deleteTransaction(deleteId);

    setDeleteId(null);

    if (paginatedTransactions.length === 1 && safeCurrentPage > 1) {
      setCurrentPage(safeCurrentPage - 1);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setCategoryFilter("All");
    setSortOption("newest");
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleTypeChange = (value: TypeFilter) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortOption) => {
    setSortOption(value);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    Boolean(search.trim()) || typeFilter !== "all" || categoryFilter !== "All";

  return (
    <div className="box-border w-full min-w-0 max-w-full space-y-4 overflow-x-hidden sm:space-y-5 lg:space-y-6">
      {/* Page Header */}
      <div className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            Finance
          </p>

          <h1 className="mt-1 break-words text-2xl font-bold leading-tight text-gray-900 sm:text-3xl dark:text-white">
            Transactions
          </h1>

          <p className="mt-1 max-w-full text-sm leading-5 text-gray-500 dark:text-gray-400">
            Manage and track all your income and expenses.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:w-auto sm:px-5"
        >
          <Plus size={18} />
          Add Transaction
        </button>
      </div>

      {/* Summary */}
      <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {/* Count */}
        <div className="w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing Transactions
          </p>

          <p className="mt-2 break-words text-2xl font-bold text-gray-900 dark:text-white">
            {filteredTransactions.length}
          </p>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Matching current filters
          </p>
        </div>

        {/* Income */}
        <div className="w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Filtered Income
          </p>

          <p className="mt-2 break-words text-2xl font-bold text-emerald-600">
            {formatAmount(filteredIncome)}
          </p>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Based on current filters
          </p>
        </div>

        {/* Expense */}
        <div className="w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Filtered Expenses
          </p>

          <p className="mt-2 break-words text-2xl font-bold text-red-600">
            {formatAmount(filteredExpense)}
          </p>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Based on current filters
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="box-border w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 lg:p-5 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid w-full min-w-0 grid-cols-1 gap-3 lg:grid-cols-12">
          {/* Search */}
          <div className="relative w-full min-w-0 lg:col-span-5">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search transactions..."
              className="box-border w-full min-w-0 rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Type */}
          <div className="w-full min-w-0 lg:col-span-2">
            <select
              value={typeFilter}
              onChange={(event) =>
                handleTypeChange(event.target.value as TypeFilter)
              }
              className="box-border w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 sm:px-4 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="all">All Types</option>

              <option value="income">Income</option>

              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Category */}
          <div className="w-full min-w-0 lg:col-span-2">
            <select
              value={categoryFilter}
              onChange={(event) => handleCategoryChange(event.target.value)}
              className="box-border w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 sm:px-4 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="All">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="w-full min-w-0 lg:col-span-3">
            <select
              value={sortOption}
              onChange={(event) =>
                handleSortChange(event.target.value as SortOption)
              }
              className="box-border w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 sm:px-4 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="newest">Newest First</option>

              <option value="oldest">Oldest First</option>

              <option value="high">Amount: High to Low</option>

              <option value="low">Amount: Low to High</option>
            </select>
          </div>
        </div>

        {/* Clear */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <X size={15} />
            Clear filters
          </button>
        )}
      </div>

      {/* Transactions */}
      <div className="box-border w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        {/* Desktop Table */}
        <div className="hidden lg:block">
          <div className="w-full max-w-full overflow-x-auto overscroll-x-contain">
            <table className="w-full min-w-[720px] table-fixed">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500 xl:px-5 xl:py-4 xl:text-xs">
                    Transaction
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500 xl:px-5 xl:py-4 xl:text-xs">
                    Category
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500 xl:px-5 xl:py-4 xl:text-xs">
                    Date
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500 xl:px-5 xl:py-4 xl:text-xs">
                    Type
                  </th>

                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500 xl:px-5 xl:py-4 xl:text-xs">
                    Amount
                  </th>

                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500 xl:px-5 xl:py-4 xl:text-xs">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {paginatedTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="transition hover:bg-gray-50 dark:hover:bg-gray-800/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            transaction.type === "income"
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                              : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                          }`}
                        >
                          {transaction.type === "income" ? (
                            <ArrowUpRight size={18} />
                          ) : (
                            <ArrowDownLeft size={18} />
                          )}
                        </div>

                        <div className="max-w-[220px]">
                          <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                            {transaction.description || transaction.category}
                          </p>

                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Transaction
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {transaction.category}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(transaction.date)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          transaction.type === "income"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                        }`}
                      >
                        {transaction.type === "income" ? "Income" : "Expense"}
                      </span>
                    </td>

                    <td
                      className={`whitespace-nowrap px-5 py-4 text-right text-sm font-bold ${
                        transaction.type === "income"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}

                      {formatAmount(transaction.amount)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(transaction)}
                          aria-label="Edit transaction"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteId(transaction.id)}
                          aria-label="Delete transaction"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="w-full min-w-0 space-y-3 p-3 sm:p-4 lg:hidden">
          {paginatedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="box-border w-full min-w-0 rounded-xl border border-gray-200 p-3 sm:p-4 dark:border-gray-800"
            >
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      transaction.type === "income"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpRight size={18} />
                    ) : (
                      <ArrowDownLeft size={18} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                      {transaction.description || transaction.category}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                      {transaction.category}
                    </p>
                  </div>
                </div>

                <p
                  className={`shrink-0 text-sm font-bold ${
                    transaction.type === "income"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}

                  {formatAmount(transaction.amount)}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-3 dark:border-gray-800">
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      transaction.type === "income"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                    }`}
                  >
                    {transaction.type === "income" ? "Income" : "Expense"}
                  </span>

                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(transaction.date)}
                  </span>
                </div>

                <div className="flex shrink-0 gap-0.5 sm:gap-1">
                  <button
                    type="button"
                    onClick={() => handleEdit(transaction)}
                    aria-label="Edit transaction"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteId(transaction.id)}
                    aria-label="Delete transaction"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {paginatedTransactions.length === 0 && (
          <div className="flex w-full min-w-0 flex-col items-center justify-center px-4 py-12 text-center sm:px-5 sm:py-16">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              <Search size={25} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
              No transactions found
            </h3>

            <p className="mt-1 max-w-[320px] text-sm leading-5 text-gray-500 dark:text-gray-400">
              Try changing your search or filters, or add a new transaction.
            </p>

            <button
              type="button"
              onClick={hasActiveFilters ? clearFilters : handleAdd}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              {hasActiveFilters ? (
                <>
                  <X size={17} />
                  Clear Filters
                </>
              ) : (
                <>
                  <Plus size={17} />
                  Add Transaction
                </>
              )}
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="flex w-full min-w-0 flex-col gap-3 border-t border-gray-200 px-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 dark:border-gray-800">
            <p className="text-center text-xs text-gray-500 sm:text-left dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {Math.min(
                  startIndex + ITEMS_PER_PAGE,
                  filteredTransactions.length,
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {filteredTransactions.length}
              </span>
            </p>

            <div className="flex shrink-0 items-center justify-center gap-2">
              <button
                type="button"
                disabled={safeCurrentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <ChevronLeft size={17} />
              </button>

              <span className="min-w-[80px] text-center text-xs font-medium text-gray-600 dark:text-gray-300">
                Page {safeCurrentPage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={safeCurrentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <TransactionForm
          transaction={editingTransaction}
          onClose={handleCloseForm}
        />
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/50 p-3 sm:p-4">
          <div className="my-auto w-full max-w-sm rounded-2xl bg-white p-4 shadow-2xl sm:p-6 dark:bg-gray-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
              <Trash2 size={22} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
              Delete transaction?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              This action cannot be undone. Are you sure you want to delete this
              transaction?
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:w-auto dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 sm:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
