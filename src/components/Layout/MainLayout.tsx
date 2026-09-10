import { useState, type ReactNode } from "react";

import { X } from "lucide-react";

import Sidebar from "./Sidebar";
import Header from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden bg-gray-50 dark:bg-gray-950">
      {/* Desktop sidebar: 1280px+ */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 xl:block">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="min-h-screen w-full min-w-0 xl:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="w-full min-w-0 overflow-x-hidden">
          <div className="mx-auto w-full max-w-[1600px] min-w-0 px-3 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-7 xl:px-10 xl:py-8">
            {children}
          </div>
        </main>
      </div>

    
      {sidebarOpen && (
        <div className="fixed inset-0 z-[100] xl:hidden">
        
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={closeSidebar}
            className="absolute inset-0 h-full w-full bg-black/50 backdrop-blur-sm"
          />

        
          <div className="relative z-10 h-full w-[280px] max-w-[85vw] animate-[slideIn_0.2s_ease-out]">
            <div className="relative h-full">
              <Sidebar onNavigate={closeSidebar} />

              <button
                type="button"
                onClick={closeSidebar}
                aria-label="Close menu"
                className="absolute right-3 top-5 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
