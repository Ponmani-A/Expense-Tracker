import { Moon, Sun } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all duration-200 hover:bg-gray-100 sm:h-11 sm:w-11 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
    >
      {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
    </button>
  );
};

export default ThemeToggle;
