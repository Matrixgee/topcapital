import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/inputfield";
import axios from "../config/axiosconfig";
import toast from "react-hot-toast";

interface Country {
  country: string;
  code: string;
}

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  country: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    country: "",
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries"
        );
        const data = await response.json();
        const sortedCountries = data.data.sort((a: Country, b: Country) =>
          a.country.localeCompare(b.country)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
        // Fallback
        setCountries([
          { country: "United States", code: "US" },
          { country: "United Kingdom", code: "GB" },
          { country: "Canada", code: "CA" },
          { country: "Australia", code: "AU" },
          { country: "Germany", code: "DE" },
          { country: "France", code: "FR" },
          { country: "Japan", code: "JP" },
          { country: "Brazil", code: "BR" },
          { country: "India", code: "IN" },
          { country: "China", code: "CN" },
        ]);
      }
    };
    fetchCountries();
  }, []);

  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is edited
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};
    let isValid = true;

    // Required field validation
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key as keyof RegisterFormData] = "This field is required";
        isValid = false;
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    // Password confirmation
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const {
      firstName,
      lastName,
      email,
      userName,
      password,
      phoneNumber,
      country,
      confirmPassword,
    } = formData;

    const fullName = `${firstName} ${lastName}`;
    const data = {
      fullName: fullName,
      email,
      userName,
      password,
      confirmPassword: confirmPassword,
      phone: phoneNumber,
      country,
    };

    const loadingToast = toast.loading("Please wait...");
    try {
      const response = await axios.post("/user/signup", data);
      console.log("Registration Response:", response.data);
      toast.success("Registration Successful!");
      navigate("/auth/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.error || "Registration failed");
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl px-6">
      <div className="bg-[#3A1F4D] rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <InputField
                label="First Name"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(value) => handleChange("firstName", value)}
                required
                error={errors.firstName}
              />
            </div>

            {/* Last Name */}
            <div>
              <InputField
                label="Last Name"
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(value) => handleChange("lastName", value)}
                required
                error={errors.lastName}
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <InputField
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
                required
                error={errors.email}
              />
            </div>
            <div className="md:col-span-2">
              <InputField
                label="User Name"
                type="text"
                placeholder="Enter your UserName"
                value={formData.userName}
                onChange={(value) => handleChange("userName", value)}
                required
                error={errors.userName}
              />
            </div>

            {/* Country Selection */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Country
              </label>
              <select
                className="w-full h-12 px-4 py-2 rounded-md bg-transparent
                border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                required
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option
                    key={country.code || country.country}
                    value={country.country}
                  >
                    {country.country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-400">{errors.country}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="md:col-span-2">
              <InputField
                label="Phone Number"
                type="phone"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={(value) => handleChange("phoneNumber", value)}
                required
                error={errors.phoneNumber}
              />
            </div>

            {/* Password */}
            <div>
              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(value) => handleChange("password", value)}
                required
                error={errors.password}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <InputField
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(value) => handleChange("confirmPassword", value)}
                required
                error={errors.confirmPassword}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                className="mt-1 mr-2 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                required
              />
              <span className="text-sm text-gray-300">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-purple-300 hover:text-purple-200">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-300 hover:text-purple-200">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 mt-6 rounded-md font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors
              ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Already have an account?{" "}
            <a
              href="#"
              onClick={() => navigate("/auth/login")}
              className="text-purple-300 hover:text-purple-200 font-medium"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
