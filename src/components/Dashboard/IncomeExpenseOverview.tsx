import { ArrowDownLeft, ArrowUpRight, BarChart3 } from "lucide-react";

import { useTransactions } from "../../context/TransactionContext";

const IncomeExpenseOverview = () => {
  const { totalIncome, totalExpense } = useTransactions();

  const total = totalIncome + totalExpense;

  const incomePercentage = total > 0 ? (totalIncome / total) * 100 : 0;
  const expensePercentage = total > 0 ? (totalExpense / total) * 100 : 0;

  const balance = totalIncome - totalExpense;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* =====================================
          HEADER
      ====================================== */}

      <div className="flex w-full min-w-0 items-center gap-3 border-b border-gray-200 px-4 py-4 sm:px-5 dark:border-gray-800">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <BarChart3 size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
            Income vs Expenses
          </h2>

          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
            Overall financial comparison
          </p>
        </div>
      </div>

      {/* =====================================
          CONTENT
      ====================================== */}

      <div className="w-full min-w-0 p-4 sm:p-5">
        {/* BALANCE */}

        <div className="w-full min-w-0 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/70">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Net Balance
          </p>

          <p
            className={`mt-2 break-words text-xl font-bold sm:text-2xl lg:text-3xl ${
              balance >= 0 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {formatAmount(balance)}
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
            Income minus total expenses
          </p>
        </div>

        {/* INCOME */}

        <div className="mt-5 w-full min-w-0">
          <div className="flex w-full min-w-0 items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <ArrowUpRight size={16} />
              </div>

              <span className="min-w-0 truncate text-sm font-medium text-gray-700 dark:text-gray-300">
                Income
              </span>
            </div>

            <span className="max-w-[55%] shrink-0 truncate text-right text-xs font-bold text-emerald-600 sm:max-w-none sm:text-sm">
              {formatAmount(totalIncome)}
            </span>
          </div>

          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-100 sm:h-3 dark:bg-gray-800">
            <div
              className="h-full max-w-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{
                width: `${Math.min(incomePercentage, 100)}%`,
              }}
            />
          </div>

          <p className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
            {incomePercentage.toFixed(1)}%
          </p>
        </div>

        {/* EXPENSE */}

        <div className="mt-5 w-full min-w-0">
          <div className="flex w-full min-w-0 items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                <ArrowDownLeft size={16} />
              </div>

              <span className="min-w-0 truncate text-sm font-medium text-gray-700 dark:text-gray-300">
                Expenses
              </span>
            </div>

            <span className="max-w-[55%] shrink-0 truncate text-right text-xs font-bold text-red-600 sm:max-w-none sm:text-sm">
              {formatAmount(totalExpense)}
            </span>
          </div>

          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-100 sm:h-3 dark:bg-gray-800">
            <div
              className="h-full max-w-full rounded-full bg-red-500 transition-all duration-500"
              style={{
                width: `${Math.min(expensePercentage, 100)}%`,
              }}
            />
          </div>

          <p className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
            {expensePercentage.toFixed(1)}%
          </p>
        </div>

        {/* INSIGHT */}

        <div className="mt-6 w-full min-w-0 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          {totalIncome === 0 && totalExpense === 0 ? (
            <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
              Add income and expenses to see your financial overview.
            </p>
          ) : totalIncome >= totalExpense ? (
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
              Your income is currently higher than your expenses.
              <span className="font-semibold text-emerald-600">
                {" "}
                You're maintaining a positive balance.
              </span>
            </p>
          ) : (
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
              Your expenses are currently higher than your income.
              <span className="font-semibold text-red-600">
                {" "}
                Consider reviewing your spending.
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseOverview;
