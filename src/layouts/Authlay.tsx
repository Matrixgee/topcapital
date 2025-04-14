import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  return (
    <div className="w-full min-h-[100dvh] bg-gradient-to-b from-[#2A0F3D] to-[#1A0825] flex justify-between items-center flex-col py-6">
      {/* Logo Header */}
      <div
        className={`w-full max-w-md px-4 cursor-pointer transition-all duration-700 ease-out transform ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
        onClick={() => navigate("/")}
      >
        <div className="mx-auto flex justify-center">
          <img
            src="/logo-placeholder.svg"
            alt="Logo"
            className="h-16 object-contain"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`w-full max-w-md flex-grow flex items-center justify-center transition-all duration-700 ease-out delay-300 transform ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <Outlet />
      </div>

      {/* Footer */}
      <div
        className={`w-full transition-all duration-700 ease-out delay-500 transform ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-center text-gray-400 text-sm py-4">
          Copyright © {new Date().getFullYear()} TOPCAPITALMINING. All Rights
          Reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
