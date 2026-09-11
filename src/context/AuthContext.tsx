import { createContext, useContext, useState, type ReactNode } from "react";

export interface User {
  companyName: string;
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;

  register: (userData: Omit<User, "companyName">) => boolean;

  login: (
    companyName: string,
    name: string,
    email: string,
    password: string,
  ) => {
    success: boolean;
    message: string;
  };

  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "expense-users"; // registers users
const AUTH_KEY = "expense-user"; // current login user

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(AUTH_KEY);

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser) as User;
    } catch {
      return null;
    }
  });

  const register = (userData: Omit<User, "companyName">): boolean => {
    const savedUsers = localStorage.getItem(USERS_KEY);

    let users: Omit<User, "companyName">[] = [];

    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers);

        if (Array.isArray(parsedUsers)) {
          users = parsedUsers;
        }
      } catch {
        users = [];
      }
    }

    const existingUser = users.find(
      (item) => item.email.toLowerCase() === userData.email.toLowerCase(), // check the email is already exsits
    );

    if (existingUser) {
      return false;
    }

    users.push(userData);

    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return true;
  };

  const login = (
    companyName: string,
    name: string,
    email: string,
    password: string,
  ) => {
    const savedUsers = localStorage.getItem(USERS_KEY);

    if (!savedUsers) {
      return {
        success: false,
        message: "Account not found. Please sign in first.",
      };
    }

    try {
      const users = JSON.parse(savedUsers) as Omit<User, "companyName">[];

      const existingUser = users.find(
        (item) =>
          item.name.toLowerCase() === name.trim().toLowerCase() &&
          item.email.toLowerCase() === email.trim().toLowerCase() &&
          item.password === password,
      );

      // User not found
      if (!existingUser) {
        return {
          success: false,
          message: "Invalid account details",
        };
      }

      // Add company name from Login page
      const loggedInUser: User = {
        ...existingUser,
        companyName: companyName.trim(),
      };

      // Set logged-in user
      setUser(loggedInUser);

      // Save logged-in user
      localStorage.setItem(AUTH_KEY, JSON.stringify(loggedInUser));

      return {
        success: true,
        message: "",
      };
    } catch {
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
