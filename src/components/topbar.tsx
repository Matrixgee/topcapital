import { Menu, Search } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Topbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");

  const data = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="border-b border-gray-200 p-4 flex items-center sticky top-0 z-30 w-full shadow-sm bg-white">
      {/* Mobile Menu */}
      <div className="md:hidden px-3 flex py-2 justify-center items-center">
        <button onClick={onMenuClick} className="text-gray-700">
          <Menu size={24} />
        </button>
      </div>

      <div className="w-full h-full flex justify-between items-center">
        {/* Search Bar */}
        <div className="flex items-center bg-[#F5F4F2] gap-2 w-full max-w-md px-3 py-2 rounded-full shadow-inner">
          <input
            type="text"
            placeholder={`Search ${isAdmin ? "admin dashboard" : "account"}`}
            className="w-full text-sm bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400"
          />
          <Search className="text-gray-400" size={18} />
        </div>

        {/* User Profile Section */}
        <div className="hidden md:flex items-center gap-4 ml-6">
          {/* Profile Info */}
          <div className="flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-full hover:shadow-sm transition">
            <div
              className={`w-8 h-8 ${
                isAdmin ? "bg-indigo-100" : "bg-[#FFE6CC]"
              } text-black font-semibold rounded-full flex items-center justify-center text-sm`}
            >
              {isAdmin ? "A" : `${data.fullName[0].toUpperCase()}`}
            </div>
            <span className="text-sm text-gray-800 font-medium whitespace-nowrap">
              {isAdmin ? "Admin Panel" : `${data.fullName}`}
            </span>
            <IoIosArrowDown className="text-gray-600" />
          </div>
          {/* Notification Bell */}
          <div className="relative">
            <FaRegBell className="text-gray-600" size={18} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
