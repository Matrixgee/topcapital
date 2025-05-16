/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import axios from "../config/axiosconfig";
import CreditDebitModal from "../components/creditdebitmodal";
import ConfirmSuspendModal from "../components/confirmsuspendmodal";
import ConfirmUnsuspendModal from "../components/confrimunsuspend";
import ConfirmDeleteModal from "../components/confirmdeletemodal";

import { setOneUser } from "../global/adminslice";

interface RootState {
  admin: {
    token: string;
    oneUser: any;
  };
}

const UserDetails = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modals, setModals] = useState({
    creditDebit: false,
    suspend: false,
    unsuspend: false,
    delete: false,
    clear: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const AdminToken = useSelector((state: RootState) => state.admin.token);
  const oneUser = useSelector((state: RootState) => state.admin.oneUser);
  const { _id } = useParams<{ _id: string }>();

  const headers = {
    Authorization: `Bearer ${AdminToken}`,
  };

  const toggleModal = (name: keyof typeof modals, value?: boolean) => {
    setModals((prev) => ({
      ...prev,
      [name]: value !== undefined ? value : !prev[name],
    }));
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/admin/getOne/${_id}`, { headers });
      dispatch(setOneUser(res.data.data));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const verifyUser = async () => {
    try {
      await axios.put(`/admin/verifyUser/${_id}`, {}, { headers });
      fetchUser();
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const suspendUser = async () => {
    try {
      await axios.put(`/admin/suspendUser/${_id}`, {}, { headers });
      fetchUser();
    } catch (error) {
      console.error("Error suspending user:", error);
    }
  };

  const unsuspendUser = async () => {
    try {
      await axios.put(`/admin/unsuspendUser/${_id}`, {}, { headers });
      fetchUser();
    } catch (error) {
      console.error("Error unsuspending user:", error);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`/admin/deleteOneUser/${_id}`, { headers });
      navigate(-1);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const getStatusColor = () => {
    switch (oneUser?.status) {
      case "approved":
        return "bg-green-500 uppercase";
      case "suspended":
        return "bg-red-500 uppercase";
      case "pending":
        return "bg-yellow-500 uppercase";
      default:
        return "bg-gray-400 uppercase";
    }
  };

  useEffect(() => {
    fetchUser();
  }, [_id, AdminToken]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (dropdownOpen && !target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  if (!oneUser) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-5rem)] p-6 overflow-y-scroll">
      <div className="min-h-screen bg-white pb-12">
        {/* Fixed Header Section */}
        <div className="sticky top-0 z-10 bg-white shadow-md w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="font-medium text-xl md:text-2xl text-gray-800">
                {oneUser.fullName}
              </h1>
              <div className="dropdown-container relative flex gap-2 items-center self-end md:self-auto">
                <button
                  className="py-2 px-4 md:px-6 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
                <button
                  className="flex items-center gap-1 px-3 md:px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Actions <FaCaretDown />
                </button>

                {dropdownOpen && (
                  <ul className="absolute top-12 right-0 w-40 bg-white border rounded shadow-lg z-50">
                    {oneUser.status === "suspended" ? (
                      <li
                        onClick={() => {
                          toggleModal("unsuspend", true);
                          setDropdownOpen(false);
                        }}
                        className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-gray-700"
                      >
                        Unsuspend
                      </li>
                    ) : (
                      <li
                        onClick={() => {
                          toggleModal("suspend", true);
                          setDropdownOpen(false);
                        }}
                        className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-gray-700"
                      >
                        Suspend
                      </li>
                    )}
                    <li
                      onClick={() => {
                        toggleModal("creditDebit", true);
                        setDropdownOpen(false);
                      }}
                      className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-gray-700"
                    >
                      Credit/Debit
                    </li>
                    <li
                      onClick={() => {
                        verifyUser();
                        setDropdownOpen(false);
                      }}
                      className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-gray-700"
                    >
                      Verify User
                    </li>
                    <li
                      onClick={() => {
                        toggleModal("delete", true);
                        setDropdownOpen(false);
                      }}
                      className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-gray-700"
                    >
                      Delete User
                    </li>
                    <li
                      onClick={() => {
                        toggleModal("clear", true);
                        setDropdownOpen(false);
                      }}
                      className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-gray-700"
                    >
                      Clear Account
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* User Summary - Responsive grid that scrolls horizontally on mobile */}
          <div className="bg-white border rounded-lg shadow-sm p-4 mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-3">
              Account Overview
            </h2>
            <div className="flex flex-nowrap overflow-x-auto pb-2 gap-4 md:flex-wrap md:overflow-visible">
              {[
                {
                  label: "Account Balance",
                  value: `$${oneUser.accountBalance}`,
                },
                {
                  label: "User Status",
                  value: oneUser.status,
                  colorClass: getStatusColor(),
                },
                {
                  label: "Profit",
                  value: `$${oneUser.totalProfit}`,
                },
                {
                  label: "Inv. Plans",
                  value:
                    oneUser.investmentPlan > 0
                      ? "Has Inv Plans"
                      : "No Inv Plans",
                },
                {
                  label: "Referral Bonus",
                  value: `$${oneUser.referralBonus}`,
                },
                {
                  label: "KYC",
                  value: oneUser.isVerified ? "Verified" : "Not Verified",
                  colorClass: oneUser.isVerified
                    ? "bg-green-500"
                    : "bg-red-500",
                },

                {
                  label: "Trade Mode",
                  value: oneUser.login ? "On" : "Off",
                  colorClass: oneUser.login ? "bg-green-500" : "bg-red-500",
                },
              ].map(({ label, value, colorClass }, idx) => (
                <div
                  key={idx}
                  className="flex flex-col min-w-[150px] md:w-[22%]"
                >
                  <span className="text-sm text-gray-600">{label}</span>
                  <span
                    className={`text-lg font-semibold mt-1 ${
                      colorClass
                        ? `text-white px-2 py-1 rounded ${colorClass}`
                        : ""
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* User Info */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              User Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "First Name", value: oneUser.fullName },

                { label: "Email Address", value: oneUser.email },
                { label: "Phone", value: oneUser.phone || "Not provided" },
                {
                  label: "Country",
                  value: oneUser.nationality || "Not provided",
                },
                {
                  label: "Date Joined",
                  value: new Date(oneUser.createdAt).toLocaleDateString(),
                },
              ].map((field, index) => (
                <div key={index} className="bg-gray-50 rounded-md p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={field.value}
                    className="p-2 border rounded w-full bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modals */}
        <CreditDebitModal
          _id={_id!}
          isOpen={modals.creditDebit}
          onClose={() => toggleModal("creditDebit", false)}
        />
        <ConfirmSuspendModal
          isOpen={modals.suspend}
          onClose={() => toggleModal("suspend", false)}
          onConfirm={suspendUser}
        />
        <ConfirmUnsuspendModal
          isOpen={modals.unsuspend}
          onClose={() => toggleModal("unsuspend", false)}
          onConfirm={unsuspendUser}
        />
        <ConfirmDeleteModal
          isOpen={modals.delete}
          onClose={() => toggleModal("delete", false)}
          onConfirm={deleteUser}
        />
      </div>
    </div>
  );
};

export default UserDetails;
