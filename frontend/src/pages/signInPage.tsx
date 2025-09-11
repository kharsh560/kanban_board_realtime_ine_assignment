import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reduxStateManagementFiles/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useNotification } from "../utils/NotificationProvider";
import type { RootAuthState } from "../reduxStateManagementFiles/store";


export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {showNotification} = useNotification();

  const isLoggedIn = useSelector((state: RootAuthState) => state.auth.isLoggedIn);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      // alert("Signed in successfully!");
      showNotification("success", "Signed in successfully!");

      console.log(data);
      dispatch(login(data.user));
      navigate("/home")
      // You can redirect to dashboard here
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // if (isLoggedIn) {
  //   navigate("/home");
  // }

  return isLoggedIn ? (
    <Navigate to="/home" replace />
  ) : (
    <div className="flex h-screen items-center justify-center bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-gray-900 p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-2xl font-semibold text-white">
          Sign In
        </h1>

        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2 text-white transition hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="flex items-center justify-center bg-gray-950">
        <div className="bg-gray-900 p-8  shadow-md w-96 text-center">
          <h2 className="text-xl font-bold mb-4 text-white">Guest Credentials</h2>
          <div className="bg-gray-800 text-gray-200 p-4 rounded-md text-left">
            <p>
              <span className="font-semibold">Email:</span> kharsh@gmail.com
            </p>
            <p>
              <span className="font-semibold">Password:</span> 1234
            </p>
          </div>
        </div>
      </div>

      </form>
    </div>
  );
}
