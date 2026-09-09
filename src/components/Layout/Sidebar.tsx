import { LayoutDashboard, ReceiptText, WalletCards } from "lucide-react";

import { NavLink } from "react-router-dom";

interface SidebarProps {
  onNavigate?: () => void;
}

const Sidebar = ({ onNavigate }: SidebarProps) => {
  const menuItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Transactions",
      path: "/transactions",
      icon: ReceiptText,
    },
  ];

  return (
    <aside className="h-full w-full min-w-0 overflow-hidden border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex min-h-screen min-w-0 flex-col">
        {/* Logo */}
        <div className="flex h-20 min-w-0 shrink-0 items-center gap-3 border-b border-gray-200 px-4 sm:px-5 dark:border-gray-800">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <WalletCards size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-bold text-gray-900 dark:text-white">
              Expense Tracker
            </h1>

            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              Personal Finance
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-5 sm:px-4 sm:py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex min-h-11 w-full min-w-0 items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition sm:px-4 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`
                }
              >
                <Icon size={19} className="shrink-0" />

                <span className="min-w-0 truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-gray-200 p-3 sm:p-4 dark:border-gray-800">
          <p className="truncate text-center text-xs text-gray-400">
            © 2026 Expense Tracker
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
