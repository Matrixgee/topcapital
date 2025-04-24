import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiPlusCircle } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
// import { setInvestments } from "../Global/Slice";

const Plans: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  interface Plan {
    _id: string;
    investmentAmount: number;
    startDate: string;
    duration: number;
    status: string;
  }

  const [plans, setPlans] = useState<Plan[]>([]); // Keep as array
  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  //   const token = useSelector((state: any) => state.user.token);

  useEffect(() => {
    if (plans.length === 0) {
      getHandle();
    }
  }, []);

  const getHandle = async () => {
    setIsLoading(true);
    try {
      toast.loading("Fetching your investment plans...");
      const response = await axios.get(
        `${import.meta.env.VITE_DEVE_URL}users-plans`,
        {
          headers: {
            Authorization: `Bearer `,
          },
        }
      );

      console.log(response.data); // Inspect the API response structure

      if (response.data && Array.isArray(response.data)) {
        // Ensure it's an array
        setPlans(response.data); // Update local state with fetched plans
        // dispatch(setInvestments(response.data)); // Optionally dispatch to store
        toast.dismiss();
        toast.success("Investment plans fetched successfully");
      } else {
        setPlans([]); // Reset plans to empty array if data isn't an array
        toast.dismiss();
        toast.error("No investment plans found");
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.dismiss();
      toast.error("Failed to fetch investment plans");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full h-[100vh] scrollbar-thin scrollbar-hide overflow-y-scroll">
        <div className="w-full h-max flex flex-col px-10 phone:px-4 py-8 gap-3">
          {isLoading ? (
            <p className="text-[whitesmoke] text-xl font-semibold">
              Loading your investment plans...
            </p>
          ) : Array.isArray(plans) && plans.length > 0 ? (
            <>
              <p className="text-[whitesmoke] text-xl font-semibold">
                My Investment ({plans.length})
              </p>
              <div className="w-full h-max flex flex-col mt-5 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan._id}
                    className="w-full h-max flex flex-col gap-2 overflow-y-auto"
                  >
                    <p className="text-[rgb(54,74,99)] text-lg font-semibold">
                      Plan # {plan._id?.slice(-3).toUpperCase()}
                    </p>
                    <div className="w-full phone:w-max h-28 border border-gray-500 rounded bg-gray-300 flex flex-col">
                      <div className="w-full h-1/2 border-b border-b-gray-500 flex">
                        <div className="w-1/6 phone:w-24 text-center h-full text-sm flex items-center justify-center font-semibold border-r border-r-gray-500">
                          Amount Deposited
                        </div>
                        <div className="w-1/6 phone:w-24 text-center h-full text-sm flex items-center justify-center font-semibold border-r border-r-gray-500">
                          Created At
                        </div>
                        <div className="w-1/6 phone:w-24 text-center h-full text-sm flex items-center justify-center font-semibold border-r border-r-gray-500">
                          Duration
                        </div>
                        <div className="w-1/6 phone:w-24 text-center h-full text-sm flex items-center justify-center font-semibold border-r border-r-gray-500">
                          Status
                        </div>
                      </div>
                      <div className="w-full h-1/2 flex">
                        <div className="w-1/6 phone:w-24 text-center text-sm h-full flex items-center justify-center border-r border-r-gray-500">
                          ${plan.investmentAmount}
                        </div>
                        <div className="w-1/6 phone:w-24 text-center text-sm h-full flex items-center justify-center border-r border-r-gray-500">
                          {new Date(plan.startDate).toLocaleDateString()}
                        </div>
                        <div className="w-1/6 phone:w-24 text-center text-sm h-full flex items-center justify-center border-r border-r-gray-500">
                          {plan.duration} days
                        </div>
                        <div className="w-1/6 text-green-500 font-bold phone:w-24 text-center text-sm h-full flex items-center justify-center border-r border-r-gray-500">
                          {plan.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-400 text-xl font-semibold phone:text-lg">
                My Investment (0)
              </p>
              <div className="w-full h-max border border-[#023e8a] bg-[#F2F3F4] rounded">
                <div className="w-full h-24 flex flex-col items-center justify-center gap-2">
                  <p className="text-[#0A1128]">You do not have any plans</p>
                  <div onClick={() => navigate("/user/testing")}>
                    <button className="w-max h-max flex items-center gap-2 bg-[#3E0E7C] rounded text-white px-6 py-2 text-sm font-semibold">
                      <FiPlusCircle />
                      Continue to Invest
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Plans;
