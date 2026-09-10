import { LayoutDashboard, Receipt, LogOut, WalletCards, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  onNavigate?: () => void;
}

const Sidebar = ({ onNavigate }: SidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onNavigate?.();
    navigate("/login", { replace: true });
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: Receipt,
    },
  ];

  return (
    <aside className="flex h-full w-full flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      {/* Logo / Company */}
      <div className="flex h-20 shrink-0 items-center gap-3 border-b border-gray-200 px-5 dark:border-gray-800">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
          <WalletCards size={22} />
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-base font-bold text-gray-900 dark:text-white">
            {user?.companyName || "Expense Tracker"}
          </h1>

          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
            Expense Tracker
          </p>
        </div>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={onNavigate}
          aria-label="Close sidebar"
          className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 xl:hidden dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          <X size={18} />
        </button>
      </div>

      {/* User Info */}
      <div className="mx-4 mt-5 rounded-xl bg-gray-50 p-3 dark:bg-gray-800/60">
        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
          {user?.name || "User"}
        </p>

        <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
          {user?.email || ""}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-5">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Menu
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
                ].join(" ")
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300"
        >
          <LogOut size={19} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
