import {
  Home,
  Repeat,
  Settings,
  LogOut,
  BanknoteArrowUp,
  X,
  BanknoteArrowDown,
  Boxes,
  ScrollText,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../assets/toplogo.png";

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
};

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      <div
        className={`bg-[#240338] text-white h-full   w-64 p-4 flex flex-col justify-between fixed top-0 left-0 z-40 transition-transform transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:block`}
      >
        {/* Top - Logo and Nav */}
        <div className="p-4">
          <div className="mb-2 flex px-4 py-2  items-center justify-between">
            <div className="flex items-center">
              <img
                src={logo}
                alt=""
                className="w-full  max-w-[3rem] h-[80%] object-contain"
              />
            </div>
            <button
              className="md:hidden w-8 h-8 rounded-md border border-gray-700 flex justify-center items-center hover:bg-gray-800 transition-colors"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="space-y-6">
            <div>
              <p className="text-gray-400 uppercase mb-3 text-xs font-medium px-3">
                Main
              </p>
              <div className="space-y-1 text-sm">
                <NavItem
                  to="/user/overview"
                  icon={<Home size={18} />}
                  label="Overview"
                  onClick={onClose}
                />
                <NavItem
                  to="/user/deposit"
                  icon={<BanknoteArrowUp size={18} />}
                  label="Deposit"
                  onClick={onClose}
                />
                <NavItem
                  to="/user/withdraw"
                  icon={<BanknoteArrowDown size={18} />}
                  label="Withdrawal"
                  onClick={onClose}
                />
                <NavItem
                  to="/user/packages"
                  icon={<Boxes size={18} />}
                  label="Packages"
                  onClick={onClose}
                />
                <NavItem
                  to="/user/plans"
                  icon={<ScrollText size={18} />}
                  label="Plans"
                  onClick={onClose}
                />
                <NavItem
                  to="/user/history"
                  icon={<Repeat size={18} />}
                  label="History"
                  onClick={onClose}
                />
              </div>
            </div>

            <div>
              <p className="text-gray-400 uppercase mb-3 text-xs font-medium px-3">
                Account
              </p>
              <div className="space-y-1">
                <NavItem
                  to="/settings"
                  icon={<Settings size={18} />}
                  label="Settings"
                  onClick={onClose}
                />
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom - Account and Logout with toggle */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-medium">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                John Doe
              </p>
              <p className="text-xs text-gray-400 truncate">
                john.doe@example.com
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center mt-4 ">
            <div className="px-4 py-3 bg-white rounded-lg flex items-center gap-2">
              <LogOut size={16} className="text-black" />
              <span className="text-xs text-black font-medium">Log out</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const NavItem = ({
  to,
  icon,
  label,
  onClick,
  active = false,
  badge,
}: NavItemProps) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg ${
          isActive || active
            ? "bg-[#3E0E7C] text-yellow-400 font-medium"
            : "text-gray-300 hover:bg-gray-900/60 hover:text-yellow-400 transition-all"
        } group relative`
      }
    >
      <span
        className={`text-gray-400 group-hover:text-yellow-400 transition-colors ${
          active || active ? "text-yellow-400" : ""
        }`}
      >
        {icon}
      </span>
      <span>{label}</span>

      {badge && (
        <span className="ml-auto bg-yellow-400 text-black text-xs font-medium px-2 py-0.5 rounded-full min-w-[20px] text-center">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default Sidebar;
