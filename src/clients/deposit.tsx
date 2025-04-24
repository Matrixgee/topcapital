/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
// import { useDispatch, useSelector } from "react-redux";
// import { userDeposit } from "../Global/Slice";
import { useNavigate } from "react-router-dom";

export interface Gateway {
  walletAddress: string;
  walletType: string;
  walletImage: File | null;
}

const Deposit = () => {
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [agree, setAgree] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [loading, setloading] = useState(false);
  const [selectedFileName, setSelectedFileName] =
    useState<string>("Click to select");
  const [file, setFile] = useState<File | null>(null);

  const [mode, setMode] = useState<string>("");
  const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setSelectedFileName(file.name);
    }
  };

  // interface RootState {
  //   user: {
  //     user: {
  //       _id: string;
  //       firstName: string;
  //       lastName: string;
  //     };
  //     token: string;
  //   };
  // }

  // const user = useSelector((state: RootState) => state.user.user);
  // console.log(user);

  // const userToken = useSelector((state: RootState) => state.user.token);

  const [gateWay, setGateWay] = useState<Gateway | null>(null);

  const headers = {
    Authorization: `Bearer `,
    "Content-Type": "multipart/form-data",
  };

  const getAllwallet = async (walletType: string) => {
    try {
      const res = await axios.get(
        `https://express-trade-profit.onrender.com/api/v1/user/one-wallet/${walletType}`,
        { headers }
      );

      setGateWay(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Cannot get wallet");
    }
  };

  useEffect(() => {
    getAllwallet("");
  }, []);

  // const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleWalletChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWallet = e.target.value;
    setWallet(selectedWallet);
    getAllwallet(selectedWallet);
    setMode(selectedWallet);
  };

  const fullName = ` {user.lastName}`;

  const HandleDeposit = async () => {
    if (!amount || !agree) {
      toast.error("Please fill out all the required fields");
      return;
    }
    setloading(true);
    const toastloadingId = toast.loading("Please wait...");

    try {
      const data = new FormData();
      if (file) {
        data.append("proofOfPayment", file);
      } else {
        toast.error("Please upload a payment proof");
        return;
      }

      data.append("amount", String(amount));
      data.append("user", "hlo");
      data.append("fullName", fullName);
      data.append("paymentMode", mode);
      const res = await axios.post(
        `https://express-trade-profit.onrender.com/api/v1/user/payment`,
        data,
        { headers }
      );
      // dispatch(res.data.data);
      console.log(res.data);

      toast.success("Deposit pending, awaiting confirmation..");
      setTimeout(() => {
        navigate("/user/overview");
      }, 5000);
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastloadingId);
      setloading(false);
    }
  };

  const HandleCopyAddress = () => {
    navigator.clipboard.writeText(gateWay?.walletAddress ?? "");

    toast.success("Wallet Address copied to clipboard");
  };

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex justify-center items-start  py-8 overflow-y-scroll scrollbar-thin">
      {/* Main Content Container */}
      {!showPaymentPage ? (
        // Deposit Form
        <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-lg shadow-lg mx-4">
          <h2 className="text-2xl font-bold mb-6">Ready to get started?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Deposit Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Choose a wallet to pay from
                </label>
                <select
                  value={wallet}
                  onChange={handleWalletChange}
                  className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select a wallet</option>
                  <option value="Bitcoin">BITCOIN</option>
                  <option value="Ethereum">ETHEREUM</option>
                  <option value="USDT">USDT</option>
                  <option value="XRP">XRP</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Enter your amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full p-3 border rounded-md bg-gray-50 pr-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="0"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                    USD
                  </span>
                </div>
              </div>

              <div className="flex items-start pt-2">
                <input
                  type="checkbox"
                  id="terms-agree"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  className="mt-1 mr-2 h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="terms-agree" className="text-gray-700">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>

            {/* Deposit Summary */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Your Deposit Details
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Fees</span>
                  <span className="font-medium text-gray-900">$0</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Processor</span>
                  <span className="font-medium text-gray-900">{wallet}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount</span>
                  <span className="font-bold text-gray-900">
                    ${amount || "0"}
                  </span>
                </div>
              </div>
              <button
                className={`w-full mt-6 py-3 rounded-md text-white font-medium transition ${
                  agree && amount
                    ? "bg-[#3E0E7C] hover:bg-yellow-400"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!agree || !amount}
                onClick={() => setShowModal(true)}
              >
                Confirm & Deposit
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Payment Page
        <div className="w-full max-w-3xl bg-white p-6 md:p-8 rounded-lg shadow-lg mx-4 my-8">
          <p className="text-gray-700 mb-4">
            🔹 Copy and send this exact amount to the payment address below.
          </p>

          <div className="border p-4 rounded-md bg-gray-50 space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                {gateWay?.walletType} Payment Address*
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={gateWay?.walletAddress || "Loading..."}
                  className="w-full p-3 border rounded-md bg-gray-100 pr-24"
                  readOnly
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-white bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-md transition"
                  onClick={() => HandleCopyAddress()}
                >
                  Copy Address
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Upload Proof of Payment
              </label>
              <div
                className="w-full p-3 border rounded-md bg-gray-50 cursor-pointer text-center"
                onClick={() => fileInput?.click()}
              >
                {selectedFileName}
              </div>
              <input
                type="file"
                ref={(input) => setFileInput(input)}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Amount *
              </label>
              <input
                type="text"
                value={`$${amount}`}
                className="w-full p-3 border rounded-md bg-gray-100"
                readOnly
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">
            Your Deposit Details
          </h3>

          <div className="bg-gray-50 p-4 rounded-md space-y-3 text-gray-600 border border-gray-200">
            <div className="flex justify-between">
              <span>Wallet Name</span>
              <span className="font-medium">{gateWay?.walletType}</span>
            </div>
            <div className="flex justify-between">
              <span>Depositor Name</span>
              <span className="font-medium">
                {/* {user.firstName} {user.lastName} */}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Deposited Amount</span>
              <span className="font-medium">${amount}</span>
            </div>
            <div className="flex justify-between">
              <span>Fees</span>
              <span className="font-medium">$0</span>
            </div>
          </div>

          <button
            className="w-full mt-8 py-3 bg-[#3E0E7C] hover:bg-yellow-500 flex justify-center items-center text-white font-medium rounded-md transition"
            onClick={HandleDeposit}
          >
            {loading ? <ImSpinner9 className="animate-spin" /> : "Paid"}
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Note: Click "Paid" if you have made the payment and wait for the
            system to confirm your deposit!
          </p>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-100 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-center mb-4">
              Confirm Your Payment
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Confirm payment of <b>${amount}</b> using <b>{wallet}</b>.
            </p>
            <div className="space-y-3">
              <button
                className="w-full py-2.5 bg-[#3E0E7C] hover:bg-yellow-500 text-white rounded-md transition"
                onClick={() => {
                  setShowModal(false);
                  setShowPaymentPage(true);
                }}
              >
                Proceed to Payment
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposit;
