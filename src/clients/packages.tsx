import React, { useState } from "react";

// import { userDeposit } from "../Global/Slice";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const plans = [
  {
    name: "SILVER PLAN",
    interest: "15%",
    termDays: 7,
    minDeposit: 3000,
    maxDeposit: 4999,
    totalReturn: 14000,
    addon: "25% Profit Daily on $3,000 - $4,999",
  },
  {
    name: "SUPER PLAN",
    interest: "30%",
    termDays: 7,
    minDeposit: 5000,
    maxDeposit: 9999,
    totalReturn: 31000,
    addon: "Earn 30% Profit Daily on $5,000 - $9,999",
  },
  {
    name: "GOLD PLAN",
    interest: "35%",
    termDays: 7,
    minDeposit: 10000,
    maxDeposit: 19999,
    totalReturn: 69000,
    addon: "Earn 35% Profit Daily on $10,000 - $19,999",
  },
];

const Packages: React.FC = () => {
  //   const userToken = useSelector((state: any) => state.user.token);
  //   const userId = useSelector((state: any) => state.user.user?._id);
  //   const dispatch = useDispatch();

  const [amounts, setAmounts] = useState<{ [key: string]: number }>(
    plans.reduce((acc, plan) => {
      acc[plan.name] = plan.minDeposit;
      return acc;
    }, {} as { [key: string]: number })
  );

  const handleInputChange = (planName: string, value: number) => {
    setAmounts({
      ...amounts,
      [planName]: value,
    });
  };

  const handleJoinPlan = async (plan: (typeof plans)[0]) => {
    const amount = amounts[plan.name];
    const loadingToast = toast.loading("Joining plan...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEVE_URL}/api/user/invest/}`,
        {
          planName: plan.name,
          amount,
          duration: `${plan.termDays} Days`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer `,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to join plan");
      }

      const result = response.data.data;
      // dispatch(result.deposit);
      console.log(result.deposit);

      toast.success("Successfully joined the plan", {
        id: loadingToast,
      });
    } catch (error) {
      console.error("Error joining plan:", error);
      toast.error("Error joining plan", {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="w-full h-[calc(100vh-5rem)] p-4 md:p-8    overflow-y-scroll scrollbar-thin scrollbar-hide">
      <Toaster />
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-500">
          Available Packages
        </h1>
        <p className="text-gray-400">Choose your investment plan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-[#1a2035] to-[#0d1224] rounded-xl p-6 shadow-lg border border-[#2a3152] hover:border-[#3a4a8a] transition-all"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-2">{plan.name}</h2>
              <p className="text-gray-400 text-sm">
                Enjoy entry level of invest earn money.
              </p>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#4ade80]">
                  {plan.interest}
                </p>
                <p className="text-gray-400 text-sm">Daily Interest</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{plan.termDays}</p>
                <p className="text-gray-400 text-sm">Term Days</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Deposit:</span>
                <span className="text-white">
                  ${plan.minDeposit} - ${plan.maxDeposit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Return:</span>
                <span className="text-white">${plan.totalReturn}</span>
              </div>
            </div>

            <div className="bg-[#1e253a] p-3 rounded-lg mb-6">
              <p className="text-[#4ade80] text-sm text-center">{plan.addon}</p>
            </div>

            <div className="space-y-3">
              <input
                type="number"
                value={amounts[plan.name]}
                onChange={(e) =>
                  handleInputChange(plan.name, parseInt(e.target.value))
                }
                className="w-full p-3 bg-[#1a2035] border border-[#2a3152] rounded-lg text-white"
                min={plan.minDeposit}
                max={plan.maxDeposit}
                placeholder={`Enter amount (${plan.minDeposit}-${plan.maxDeposit})`}
              />
              <button
                onClick={() => handleJoinPlan(plan)}
                className="w-full py-3 bg-[#3E0E7C] text-white rounded-lg font-medium hover:opacity-90 transition-all"
              >
                SELECT PLAN
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
