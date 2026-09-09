import { Menu, WalletCards } from "lucide-react";

import ThemeToggle from "../UI/ThemeToggle";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full min-w-0 items-center justify-between border-b border-gray-200 bg-white/95 px-3 backdrop-blur sm:h-20 sm:px-5 md:px-6 lg:px-8 dark:border-gray-800 dark:bg-gray-900/95">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-100 sm:h-11 sm:w-11 xl:hidden dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Menu size={20} />
        </button>

        {/* Desktop Logo + Title */}
        <div className="hidden items-center gap-3 xl:flex">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <WalletCards size={20} />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Expense Tracker
            </h2>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Manage your finances
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Title */}
      <div className="absolute left-1/2 min-w-0 -translate-x-1/2 xl:hidden">
        <h2 className="truncate text-sm font-bold text-gray-900 sm:text-base dark:text-white">
          Expense Tracker
        </h2>
      </div>

      {/* Right - Theme Toggle */}
      <div className="shrink-0">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
