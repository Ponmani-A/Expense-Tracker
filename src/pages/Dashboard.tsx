import { useState } from "react";

import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  Plus,
  ReceiptText,
  Wallet,
} from "lucide-react";

import { useTransactions } from "../context/TransactionContext";

import TransactionForm from "../components/Transactions/TransactionForm";

import ExpenseCategoryChart from "../components/Dashboard/ExpenseCategoryChart";

import IncomeExpenseOverview from "../components/Dashboard/IncomeExpenseOverview";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  const { transactions, totalIncome, totalExpense, balance } =
    useTransactions();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      // convert indian format ex:5000 resu:50,000.00
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
      // chage the date  format
      day: "2-digit", //// date format ex:2026-09-11 result:11 sep 2026
      month: "short",
      year: "numeric",
    });
  };

  const recentTransactions = transactions.slice(0, 5);

  const currentMonth = new Date().getMonth();

  const currentYear = new Date().getFullYear();

  const thisMonthTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(`${transaction.date}T00:00:00`); //Date object

    return (
      transactionDate.getMonth() === currentMonth && // check transaction month and current month
      transactionDate.getFullYear() === currentYear
    );
  });

  const thisMonthIncome = thisMonthTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const thisMonthExpense = thisMonthTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <div className="box-border w-full min-w-0 max-w-full space-y-4 overflow-x-hidden sm:space-y-6">
      <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium leading-5 text-indigo-600 sm:text-sm dark:text-indigo-400">
            Overview
          </p>

          <h1 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl dark:text-white">
            Welcome back
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:w-auto sm:px-5 sm:py-3"
        >
          <Plus size={18} />
          Add Transaction
        </button>
      </div>
      <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {/* Balance */}
        <div className="box-border w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-3.5 sm:p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex w-full min-w-0 items-center justify-between gap-2.5 sm:gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                Total Balance
              </p>

              <h2 className="mt-2 break-words text-lg font-bold leading-tight text-gray-900 sm:text-2xl dark:text-white">
                {formatAmount(balance)}
              </h2>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:h-11 sm:w-11 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Wallet size={20} className="sm:hidden" />
              <Wallet size={21} className="hidden sm:block" />
            </div>
          </div>

          <div className="mt-4 flex w-full min-w-0 flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="shrink-0 rounded-full bg-indigo-50 px-2 py-1 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              Overall
            </span>

            <span>Current available balance</span>
          </div>
        </div>

        {/* Income */}
        <div className="box-border w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-3.5 sm:p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex w-full min-w-0 items-center justify-between gap-2.5 sm:gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                Total Income
              </p>

              <h2 className="mt-2 break-words text-lg font-bold leading-tight text-emerald-600 sm:text-2xl">
                {formatAmount(totalIncome)}
              </h2>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 sm:h-11 sm:w-11 dark:bg-emerald-500/10 dark:text-emerald-400">
              <ArrowUpRight size={20} className="sm:hidden" />
              <ArrowUpRight size={21} className="hidden sm:block" />
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            All recorded income
          </p>
        </div>

        {/* Expense */}
        <div className="box-border w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-3.5 sm:col-span-2 sm:p-5 xl:col-span-1 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex w-full min-w-0 items-center justify-between gap-2.5 sm:gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                Total Expenses
              </p>

              <h2 className="mt-2 break-words text-lg font-bold leading-tight text-red-600 sm:text-2xl">
                {formatAmount(totalExpense)}
              </h2>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 sm:h-11 sm:w-11 dark:bg-red-500/10 dark:text-red-400">
              <ArrowDownLeft size={20} className="sm:hidden" />
              <ArrowDownLeft size={21} className="hidden sm:block" />
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            All recorded expenses
          </p>
        </div>
      </div>

      {/* This Month */}
      <div className="box-border w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex w-full min-w-0 items-center gap-2.5 border-b border-gray-200 px-3.5 py-3.5 sm:gap-3 sm:px-6 sm:py-4 dark:border-gray-800">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:h-10 sm:w-10 dark:bg-indigo-500/10 dark:text-indigo-400">
            <CalendarDays size={19} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              This Month
            </h2>

            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              Current month's financial activity
            </p>
          </div>
        </div>

        <div className="grid w-full min-w-0 grid-cols-1 gap-3 p-3.5 sm:grid-cols-3 sm:gap-4 sm:p-6">
          <div className="box-border w-full min-w-0 rounded-xl bg-gray-50 p-3.5 sm:p-4 dark:bg-gray-800/70">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Transactions
            </p>

            <p className="mt-2 text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
              {thisMonthTransactions.length}
            </p>
          </div>

          <div className="box-border w-full min-w-0 rounded-xl bg-emerald-50 p-3.5 sm:p-4 dark:bg-emerald-500/10">
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Monthly Income
            </p>

            <p className="mt-2 break-words text-lg font-bold text-emerald-600 sm:text-xl">
              {formatAmount(thisMonthIncome)}
            </p>
          </div>

          <div className="box-border w-full min-w-0 rounded-xl bg-red-50 p-3.5 sm:p-4 dark:bg-red-500/10">
            <p className="text-xs text-red-700 dark:text-red-400">
              Monthly Expenses
            </p>

            <p className="mt-2 break-words text-lg font-bold text-red-600 sm:text-xl">
              {formatAmount(thisMonthExpense)}
            </p>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
        <ExpenseCategoryChart />
        <IncomeExpenseOverview />
      </div>

      {/* Recent Transactions */}
      <div className="box-border w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex w-full min-w-0 items-center justify-between gap-3 border-b border-gray-200 px-3.5 py-3.5 sm:gap-4 sm:px-6 sm:py-4 dark:border-gray-800">
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Recent Transactions
            </h2>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Your latest financial activity
            </p>
          </div>
        </div>

        {recentTransactions.length === 0 ? (
          <div className="flex w-full min-w-0 flex-col items-center justify-center px-3.5 py-12 text-center sm:px-5 sm:py-16">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              <ReceiptText size={25} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
              No transactions yet
            </h3>

            <p className="mt-1 max-w-[320px] text-sm leading-5 text-gray-500 dark:text-gray-400">
              Add your first income or expense to start tracking your finances.
            </p>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Plus size={17} />
              Add Transaction
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex w-full min-w-0 items-center justify-between gap-2 px-3.5 py-3 sm:gap-3 sm:px-6 sm:py-4"
              >
                <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${
                      transaction.type === "income"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpRight size={18} className="sm:hidden" />
                    ) : (
                      <ArrowDownLeft size={18} className="sm:hidden" />
                    )}
                    {transaction.type === "income" ? (
                      <ArrowUpRight size={19} className="hidden sm:block" />
                    ) : (
                      <ArrowDownLeft size={19} className="hidden sm:block" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                      {transaction.description || transaction.category}
                    </p>

                    <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-500 dark:text-gray-400">
                      <span className="max-w-[9rem] truncate sm:max-w-none">
                        {transaction.category}
                      </span>

                      <span className="hidden sm:inline">•</span>

                      <span className="shrink-0">
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </div>
                </div>

                <p
                  className={`shrink-0 text-right text-sm font-bold ${
                    transaction.type === "income"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}

                  {formatAmount(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form */}
      {showForm && <TransactionForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default Dashboard;
