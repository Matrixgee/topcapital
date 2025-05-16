/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "../config/axiosconfig";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../global/adminslice"; // Adjust the import according to your project structure

interface CreditDebitModalProps {
  isOpen: boolean;
  onClose: () => void;
  _id: string | undefined;
}

const CreditDebitModal: React.FC<CreditDebitModalProps> = ({
  isOpen,
  onClose,
  _id,
}) => {
  const [amount, setAmount] = useState<number | undefined>();
  const [where, setWhere] = useState<string>("Account Balance");
  const [creditLoading, setCreditLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userToken = useSelector((state: any) => state.user.token);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleWhereChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWhere(e.target.value);
  };

  const handleCreditDebitUser = async (type: string) => {
    if (
      !amount ||
      (type !== "Credit" && type !== "Debit") ||
      (where !== "Total Profit" &&
        where !== "Account Balance" &&
        where !== "Total Bonus")
    ) {
      alert("All fields are required");
      return;
    }
    if (!_id) {
      alert("Invalid user ID");
      return;
    }
    const toastLoadingId = toast.loading("Please wait...");
    setCreditLoading(true);
    try {
      const url = `/balance-update/${_id}`;
      const token = userToken;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const data = { amount, type, where };
      const response = await axios.post(url, data, { headers });
      dispatch(setAllUsers(response.data)); // Adjust according to your data structure
      toast.success(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error("Error handling credit/debit:", error);
      toast.error("An error occurred");
    } finally {
      setCreditLoading(false);
      toast.dismiss(toastLoadingId);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-medium mb-4">Credit/Debit User</h2>
        <div className="mb-4">
          <label className="block font-medium">Amount:</label>
          <input
            type="number"
            className="border p-2 rounded-md w-full"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Where:</label>
          <select
            className="border p-2 rounded-md w-full"
            value={where}
            onChange={handleWhereChange}
          >
            <option value="Account Balance">Account Balance</option>
            <option value="Total Profit">Total Profit</option>
            <option value="Total Bonus">Total Bonus</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="py-2 px-4 bg-green-500 text-white rounded-md mr-2"
            onClick={() => handleCreditDebitUser("Credit")}
            disabled={creditLoading}
          >
            Credit
          </button>
          <button
            className="py-2 px-4 bg-red-500 text-white rounded-md mr-2"
            onClick={() => handleCreditDebitUser("Debit")}
            disabled={creditLoading}
          >
            Debit
          </button>
          <button
            className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditDebitModal;
