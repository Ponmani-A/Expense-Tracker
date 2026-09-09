import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import App from "./App";

import { ThemeProvider } from "./context/ThemeContext";

import { TransactionProvider } from "./context/TransactionContext";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </ThemeProvider>
  </StrictMode>,
);
