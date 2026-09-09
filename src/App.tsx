import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./components/Layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/transactions"
          element={
            <MainLayout>
              <Transactions />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
