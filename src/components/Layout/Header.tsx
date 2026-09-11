import { Menu, WalletCards, User } from "lucide-react";

import ThemeToggle from "../UI/ThemeToggle";
import { useAuth } from "../../context/AuthContext";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full min-w-0 items-center justify-between border-b border-gray-200 bg-white/95 px-3 backdrop-blur sm:h-20 sm:px-5 md:px-6 lg:px-8 dark:border-gray-800 dark:bg-gray-900/95">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-100 sm:h-11 sm:w-11 xl:hidden dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Menu size={20} />
        </button>

        <div className="hidden min-w-0 items-center gap-3 xl:flex">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <WalletCards size={20} />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-gray-900 dark:text-white">
              {user?.companyName || "Expense Tracker"}
            </h2>

            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              Expense Tracker
            </p>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 min-w-0 max-w-[45%] -translate-x-1/2 xl:hidden">
        <h2 className="truncate text-sm font-bold text-gray-900 sm:text-base dark:text-white">
          {user?.companyName || "Expense Tracker"}
        </h2>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <User size={18} />
          </div>

          <div className="hidden min-w-0 md:block">
            <p className="max-w-[160px] truncate text-sm font-semibold text-gray-900 dark:text-white">
              {user?.name || "User"}
            </p>

            <p className="max-w-[180px] truncate text-xs text-gray-500 dark:text-gray-400">
              {user?.email || ""}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
