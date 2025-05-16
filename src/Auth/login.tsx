/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputField from "../components/inputfield";
import axios from "../config/axiosconfig";
import toast from "react-hot-toast";
import { setUser, setToken } from "../global/userslice";
import { setAdmin, setAdminToken } from "../global/adminslice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Please wait...");
    setLoading(true);
    setError("");

    const payload: Record<string, string> = { password };
    if (identifier.includes("@")) {
      payload.email = identifier;
    } else {
      payload.userName = identifier;
    }

    try {
      const response = await axios.post("/user/login", payload);

      const { token, data } = response.data;

      // ✅ Update Redux store
      dispatch(setUser(data));
      dispatch(setToken(token));
      dispatch(setAdminToken(token));
      dispatch(setAdmin(data));
      // Local storage (optional backup)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data));

      if (data?.isAdmin) {
        navigate("/admin/allusers");
        toast.success("Login successful, Welcome Admin");
      } else {
        navigate("/user/overview");
        toast.success(`Login successful, Welcome ${data?.fullName}`);
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-6">
      <div className="bg-[#3A1F4D] rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Sign In
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <InputField
              label="Username or Email"
              type="text"
              placeholder="Enter your username or email"
              value={identifier}
              onChange={(value) => {
                setIdentifier(value);
                if (error) setError("");
              }}
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-200 text-sm font-medium">
                Password
              </label>
            </div>
            <InputField
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(value) => {
                setPassword(value);
                if (error) setError("");
              }}
              required
            />
          </div>

          <div className="mb-8">
            <a
              href="#"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-purple-300 hover:text-purple-200"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-md font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={() => navigate("/auth/register")}
              className="text-purple-300 hover:text-purple-200 font-medium"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
