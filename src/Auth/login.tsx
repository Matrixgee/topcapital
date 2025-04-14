// Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/inputfield";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual login logic
      // const response = await loginUser(formData);
      // if (response.success) {
      //   navigate("/dashboard");
      // } else {
      //   setError(response.message);
      // }

      // Placeholder for demo purposes
      setTimeout(() => {
        navigate("/dashboard");
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError("Authentication failed. Please try again.");
      console.log(err);

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
            <label className="block text-gray-200 text-sm font-medium mb-2">
              Email Address
            </label>
            <InputField
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(value) => handleChange("email", value)}
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-200 text-sm font-medium">
                Password
              </label>
              <a
                href="#"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-purple-300 hover:text-purple-200"
              >
                Forgot Password?
              </a>
            </div>
            <InputField
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(value) => handleChange("password", value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-md font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors
              ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
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
