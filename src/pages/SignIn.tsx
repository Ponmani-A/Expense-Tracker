import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, Mail, User, WalletCards } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const registered = register({
      name: name.trim(),
      email: email.trim(),
      password,
    });

    if (!registered) {
      setError("This email is already registered. Please login.");
      return;
    }

    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-8 dark:bg-gray-950">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
            <WalletCards size={28} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Expense Tracker
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Create your account
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7 dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6">
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Enter your details
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter your name"
                  className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email"
                  className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-11 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/50 dark:bg-red-500/10">
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="h-11 w-full rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.99]"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Create your account and manage your finances easily
        </p>
      </div>
    </div>
  );
};

export default SignIn;
