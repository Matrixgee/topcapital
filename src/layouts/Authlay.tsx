import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

const AuthLayout = () => {
  const location = useLocation();
  const [animateIn, setAnimateIn] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get page title based on current route
  const pageTitle = useMemo(() => {
    const path = location.pathname;
    if (path.includes("login")) return "Login";
    if (path.includes("register")) return "Register";
    if (path.includes("forgot-password")) return "Reset Password";
    if (path.includes("verify-email")) return "Verify Email";
    return "Authentication";
  }, [location.pathname]);

  console.log(pageTitle);

  useEffect(() => {
    // Preload the logo image
    const img = new Image();

    img.onload = () => setImageLoaded(true);

    // Start animation after a short delay to ensure smooth transition
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-[100dvh] bg-gradient-to-b from-[#2A0F3D] to-[#1A0825] flex justify-between items-center flex-col py-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-600 opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Logo Header */}
      <div
        className={`w-full max-w-md px-4  transition-all  duration-700 ease-out transform ${
          animateIn && imageLoaded
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-8"
        }`}
      ></div>

      {/* Page Title */}
      <div
        className={`w-full max-w-md px-4 text-center transition-all duration-700 ease-out delay-200 transform ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      ></div>

      {/* Main Content Area */}
      <div
        className={`w-full max-w-md flex-grow flex items-center justify-center transition-all duration-700 ease-out delay-300 transform ${
          animateIn
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        <Outlet />
      </div>

      {/* Footer */}
      <div
        className={`w-full max-w-md px-6 transition-all duration-700 ease-out delay-500 transform ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="border-t border-gray-800 mt-6 pt-6">
          <p className="text-center text-gray-400 text-sm">
            Copyright © {new Date().getFullYear()} TOPCAPITALMINING.
            <br className="md:hidden" /> All Rights Reserved.
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
