/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef } from "react";
import axios from "../config/axiosconfig";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import btccode from "../assets/topbtc.jpg";
import ethcode from "../assets/topeth.jpg";
import usdtcode from "../assets/topusdt.jpg";
import xrplogo from "../assets/topxrp.jpg";

const WALLET_DATA: Record<string, { address: string; qr: string }> = {
  btc: {
    address: "bc1qhugch5kxtwzvchcxs9shud3ergufvcu7a2asqd",
    qr: btccode,
  },
  eth: {
    address: "0xF86e486D325595a66d4eDe3DDAA0d1Ec6591e000",
    qr: ethcode,
  },
  USDT: {
    address: "TWeKtQzKx2WMRRnXr6rf8Uvb443utXQx1K",
    qr: usdtcode,
  },
  XRP: {
    address: "rB2exMBfqy2AsgvfhJwfjQGAcuuc7am4c6",
    qr: xrplogo,
  },
};

const Deposit = () => {
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("Click to select");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };

  const walletData = WALLET_DATA[wallet];
  const walletAddress = walletData?.address;
  const walletQr = walletData?.qr;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast.success("Wallet address copied!");
    }
  };

  const handleDeposit = async () => {
    if (!amount || !wallet || !file) {
      toast.error("Fill all fields and upload payment proof.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Processing...");

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("mode", wallet);
      formData.append("image", file);

      await axios.post("user/deposit", formData, { headers });

      toast.success("Deposit submitted, awaiting confirmation.");
      setTimeout(() => navigate("/user/overview"), 5000);
    } catch (err: any) {
      toast.error("Something went wrong!");
      console.log(err);
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  const renderDepositForm = () => (
    <div className="w-full max-w-4xl p-6 md:p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Start Your Deposit</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Wallet</label>
            <select
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="w-full p-3 border rounded-md bg-gray-50"
            >
              <option value="">Select a wallet</option>
              {Object.keys(WALLET_DATA).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">Amount (USD)</label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border rounded-md bg-gray-50"
              placeholder="Enter amount"
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50  rounded-lg space-y-3">
          <h3 className="font-semibold">Summary</h3>
          <p>
            Payment Processor: <strong>{wallet || "-"}</strong>
          </p>
          <p>
            Amount: <strong>${amount || "0"}</strong>
          </p>
          <p>
            Fees: <strong>$0</strong>
          </p>
          <button
            className={`w-full py-3 rounded-md mt-4 text-white font-semibold ${
              amount
                ? "bg-purple-800 hover:bg-yellow-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!amount}
            onClick={() => setShowModal(true)}
          >
            Confirm & Deposit
          </button>
        </div>
      </div>
    </div>
  );

  const renderPaymentPage = () => (
    <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
      <button
        onClick={() => {
          setShowPaymentPage(false);
          setShowModal(false); // Optional: Reset modal state
        }}
        className="w-full mt-4 py-3 flex justify-start text-xl text-gray-800 font-semibold rounded-md"
      >
        ← Back
      </button>

      <p className="mb-4">🔹 Send the exact amount to the wallet below.</p>
      <div className="border p-4 rounded bg-gray-50 space-y-4">
        <div>
          <label className="font-semibold">{wallet} Wallet Address</label>
          <div className="relative">
            <input
              type="text"
              value={walletAddress || "Loading..."}
              className="w-full p-3 border rounded-md bg-gray-100 pr-24"
              readOnly
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md"
            >
              Copy
            </button>
          </div>
          {walletQr && (
            <div className="flex justify-center mt-4">
              <img
                src={walletQr}
                alt={`${wallet} QR code`}
                className="w-40 h-40 object-contain border p-2 rounded-md"
              />
            </div>
          )}
        </div>

        <div>
          <label className="font-semibold">Upload Payment Proof</label>
          <div
            className="p-3 border rounded-md bg-gray-50 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {fileName}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label className="font-semibold">Amount</label>
          <input
            type="text"
            value={`$${amount}`}
            className="w-full p-3 border rounded-md bg-gray-100"
            readOnly
          />
        </div>
      </div>

      <button
        onClick={handleDeposit}
        className="w-full mt-6 py-3 bg-[#3E0E7C] hover:bg-yellow-500 text-white font-semibold rounded-md flex justify-center"
      >
        {loading ? <ImSpinner9 className="animate-spin" /> : "Paid"}
      </button>
    </div>
  );

  const renderModal = () => (
    <div className="fixed inset-0 flex items-center justify-center  bg-[#0303034D] z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h3 className="text-xl font-bold text-center mb-4">
          Confirm Your Payment
        </h3>
        <p className="text-center text-gray-600 mb-6">
          Confirm payment of <strong>${amount}</strong> using{" "}
          <strong>{wallet}</strong>.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => {
              setShowModal(false);
              setShowPaymentPage(true);
            }}
            className="w-full py-2.5 bg-purple-800 hover:bg-yellow-500 text-white rounded-md"
          >
            Proceed to Payment
          </button>

          <button
            onClick={() => setShowModal(false)}
            className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex justify-center items-start py-8">
      {showPaymentPage ? renderPaymentPage() : renderDepositForm()}
      {showModal && renderModal()}
    </div>
  );
};

export default Deposit;
