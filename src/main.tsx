import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import { ThemeProvider } from "./context/ThemeContext";

import { TransactionProvider } from "./context/TransactionContext";

import { AuthProvider } from "./context/AuthContext";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <TransactionProvider>
          <App />
        </TransactionProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
