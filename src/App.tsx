import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/Layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";

import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();

  const hasRegisteredAccount = Boolean(localStorage.getItem("expense-users"));

  return (
    <BrowserRouter>
      <Routes>
        {/* Sign In */}
        <Route
          path="/signin"
          element={user ? <Navigate to="/" replace /> : <SignIn />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            user ? (
              <MainLayout>
                <Dashboard />
              </MainLayout>
            ) : (
              <Navigate
                to={hasRegisteredAccount ? "/login" : "/signin"}
                replace
              />
            )
          }
        />

        {/* Transactions */}
        <Route
          path="/transactions"
          element={
            user ? (
              <MainLayout>
                <Transactions />
              </MainLayout>
            ) : (
              <Navigate
                to={hasRegisteredAccount ? "/login" : "/signin"}
                replace
              />
            )
          }
        />

        {/* Unknown route */}
        <Route
          path="*"
          element={
            <Navigate
              to={hasRegisteredAccount ? "/login" : "/signin"}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
