import { ArrowDownLeft, PieChart } from "lucide-react";

import { useTransactions } from "../../context/TransactionContext";

const ExpenseCategoryChart = () => {
  const { transactions, totalExpense } = useTransactions();

  /* ---------------------------------
     EXPENSE CATEGORY DATA
  ---------------------------------- */

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense",
  );

  const categoryTotals: Record<string, number> = {};

  expenseTransactions.forEach((transaction) => {
    categoryTotals[transaction.category] =
      (categoryTotals[transaction.category] || 0) + transaction.amount;
  });

  const categoryData = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="box-border w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* =====================================
          HEADER
      ====================================== */}

      <div className="flex w-full min-w-0 items-center justify-between gap-2 border-b border-gray-200 px-3 py-3.5 sm:gap-3 sm:px-5 sm:py-4 dark:border-gray-800">
        <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
            <PieChart size={19} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold leading-5 text-gray-900 sm:text-base dark:text-white">
              Expense by Category
            </h2>

            <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
              Where your money is going
            </p>
          </div>
        </div>

        <div className="min-w-0 max-w-[42%] shrink-0 text-right">
          <p className="text-[11px] text-gray-500 sm:text-xs dark:text-gray-400">
            Total
          </p>

          <p className="mt-0.5 max-w-full truncate text-xs font-bold text-red-600 sm:text-base">
            ₹{totalExpense.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* =====================================
          CONTENT
      ====================================== */}

      <div className="box-border w-full min-w-0 p-3 sm:p-5">
        {categoryData.length === 0 ? (
          <div className="flex min-h-[200px] flex-col items-center justify-center px-2 text-center sm:min-h-[220px]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              <ArrowDownLeft size={21} />
            </div>

            <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              No expenses yet
            </p>

            <p className="mt-1 max-w-[260px] text-xs leading-5 text-gray-500 dark:text-gray-400">
              Add an expense to see category analytics.
            </p>
          </div>
        ) : (
          <div className="w-full min-w-0 space-y-4 sm:space-y-5">
            {categoryData.map(({ category, amount }) => {
              const percentage =
                totalExpense > 0 ? (amount / totalExpense) * 100 : 0;

              return (
                <div key={category} className="w-full min-w-0">
                  <div className="flex w-full min-w-0 items-start justify-between gap-2.5 sm:gap-3">
                    <p className="min-w-0 flex-1 truncate text-sm font-medium text-gray-700 dark:text-gray-300">
                      {category}
                    </p>

                    <div className="min-w-0 max-w-[52%] shrink-0 items-center justify-end gap-1.5 sm:flex sm:max-w-none sm:gap-3">
                      <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">
                        {percentage.toFixed(0)}%
                      </span>

                      <span className="max-w-[110px] truncate text-right text-xs font-semibold text-gray-900 sm:max-w-none sm:text-sm dark:text-white">
                        ₹{amount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 h-2 w-full max-w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-full max-w-full rounded-full bg-indigo-600 transition-all duration-500"
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseCategoryChart;
