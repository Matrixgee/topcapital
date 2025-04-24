// import { useSelector } from "react-redux";
import { FaInfoCircle, FaCopy, FaLink } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TradingViewWidget from "../components/Tradingviewidget";

const Overview = () => {
  // interface RootState {
  //   user: {
  //     user: {
  //       firstName: string;
  //       lastName: string;
  //       balance: string;
  //       totalProfit: string;
  //       totalBonus: string;
  //       referralBonus: string;
  //       totalInvestment: string;
  //       activePlan: string;
  //       totalDeposit: string;
  //       totalWithdraw: string;
  //     };
  //   };
  // }

  // const user = useSelector((state: RootState) => state.user.user);
  const referralLink = "https://www.fiamining.com/ref/";

  // console.log(user);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  const navigate = useNavigate();

  return (
    <div className="w-full h-[calc(100vh-5rem)] p-6 overflow-y-scroll scrollbar-thin scrollbar-hide ">
      {/* Welcome Message */}
      <div className="mb-8">
        <p className="text-gray-800">Welcome! ,</p>
        <h1 className="text-3xl font-bold text-gray-400">
          {/* {user.firstName} {user?.lastName} */}
        </h1>
        <p className="text-gray-500">
          At a glance summary of your investment account. Have fun!
        </p>
        <div className="w-full h-[20%] mt-4 flex justify-center items-center ">
          {/* <TradingViewWidgettwo /> */}
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { title: "Available Balance", amount: `$ ` },
          { title: "Total Invested", amount: `$ ` },
          { title: "Total Profits", amount: `$ ` },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-[#FAFFEF] text-black p-4 rounded-lg flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg">{card.title}</h3>
              <FaInfoCircle className="text-sm" />
            </div>
            <h2 className="text-2xl font-bold">{card.amount}</h2>
          </div>
        ))}
      </div>

      <div className="w-full h-[30rem] flex justify-center items-center p-5 mb-4">
        <TradingViewWidget />
      </div>

      {/* Detailed Balance Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Balance in Account */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Balance in Account
          </h3>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            {/* $ {user.balance} */}
          </h2>

          <button
            className="w-full mt-4 py-2 bg-purple-600 text-white rounded-md"
            onClick={() => navigate("/user/withdraw")}
          >
            Withdraw Funds
          </button>
        </div>

        {/* Confirmed Deposits */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">
            Confirmed Deposits
          </h3>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            {/* ${user.totalBonus} */}
          </h2>
          <hr className="my-4" />
          <p className="text-gray-600 flex justify-between">
            {/* <span>Bonus</span> <span>${user.totalBonus}</span> */}
          </p>
          <p className="text-gray-600 flex justify-between">
            {/* <span>Referral Bonus</span> <span>${user.referralBonus}</span> */}
          </p>

          <p className="text-sm text-gray-600 text-center mt-2">
            Earn up to 10% referral commission. Refer a friend now!
          </p>
          <button
            className="w-full mt-4 py-2 bg-purple-600 text-white rounded-md"
            onClick={() => navigate("/user/deposit")}
          >
            Deposit Funds
          </button>
        </div>

        {/* My Investment */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">My Investment</h3>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">${} - Total</h2>
          <hr className="my-4" />

          <button
            className="w-full mt-4 py-2 bg-purple-600 text-white rounded-md"
            onClick={() => navigate("/user/plans")}
          >
            Investment
          </button>
        </div>
      </div>

      {/* Referral Section */}
      <div className="bg-white p-6 h-[35%]   rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Refer Us and Earn
          </h3>
          <p className="text-gray-500 text-sm">
            Use the link below to invite your friends
          </p>
          <div className="flex items-center mt-2 border rounded-md p-2 bg-gray-100">
            <FaLink className="text-gray-600 mr-2" />
            <input
              type="text"
              value={referralLink}
              readOnly
              className="w-full bg-transparent text-blue-600 focus:outline-none"
            />
            <button onClick={copyToClipboard} className="ml-2 text-gray-600">
              <FaCopy />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
