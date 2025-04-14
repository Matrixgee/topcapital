import React, { useState } from "react";
import { Textbox } from "react-inputs-validation";
import PhoneInput from "react-phone-number-input";
import { FiEye, FiEyeOff, FiUser, FiLock } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import "react-phone-number-input/style.css";
import "./style.css";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "phone";
  required?: boolean;
  check?: boolean;
  value: string;
  onChange: (value: string) => void;
  name?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = "Enter text",
  type = "text",
  required = false,
  check = true,
  onChange,
  value,
  name,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Get the appropriate icon based on input type
  const getIcon = () => {
    switch (type) {
      case "text":
        return <FiUser size={18} />;
      case "email":
        return <MdOutlineMailOutline size={18} />;
      case "password":
        return <FiLock size={18} />;
      default:
        return null;
    }
  };

  if (type === "phone") {
    return (
      <div className="relative">
        {label && (
          <label className="block text-gray-200 text-sm font-medium mb-2">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <PhoneInput
          value={value}
          onChange={(value) => onChange(value || "")}
          placeholder={placeholder}
          className={`w-full h-[47px] px-[12px]  text-gray-100 rounded border border-solid 
            ${isFocused ? "border-purple-400" : "border-gray-500"} 
            focus:border-purple-400 outline-none transition-colors`}
        />
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-gray-200 text-sm font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Left Icon */}
        {(type === "text" || type === "email" || type === "password") && (
          <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
            {getIcon()}
          </div>
        )}

        <Textbox
          value={value}
          classNameInput={`w-full h-[47px] ${
            type === "text" || type === "email" || type === "password"
              ? "pl-10"
              : "pl-4"
          } pr-12 
            bg-transparent text-gray-100 rounded border border-solid 
            ${isFocused ? "border-purple-400" : "border-gray-500"} 
            placeholder:text-gray-400 text-[14px] outline-none transition-colors`}
          attributesInput={{
            type: type === "password" && showPassword ? "text" : type,
            placeholder,
            name,
            // onFocus: () => setIsFocused(true),
            // onBlur: () => setIsFocused(false),
          }}
          onChange={(value: string) => {
            onChange(value);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          validationOption={{
            required: required,
            check,
            customFunc: (value: string) => {
              if (required && !value) {
                return "This field is required.";
              }
              if (
                type === "email" &&
                value &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
              ) {
                return "Please enter a valid email address.";
              }
              return true;
            },
          }}
        />

        {/* Password Toggle Icon */}
        {type === "password" && (
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 px-2 text-gray-400 hover:text-gray-300 focus:outline-none"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );

  // Toggle Password Visibility
  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }
};

export default InputField;

// Add this to your style.css file
/*

*/
