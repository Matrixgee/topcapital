/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "../config/axiosconfig";
import { setAllHistory } from "../global/userslice";

const History = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const Token = useSelector((state: any) => state.user.Token);
  // const [transactions, settransactions] = useState([]);

  const transactions = useSelector((state: any) => state.user.AllHistory);

  const dispatch = useDispatch();

  const headers = {
    Authorization: `Bearer ${Token}`,
  };

  const getAlltransactions = async () => {
    // const toastloadingid = toast.loading("please wait....");

    try {
      const response = await axios.get("/user/history", { headers });
      dispatch(setAllHistory(response.data.data));
      // toast.success(response.data.message);
      console.log(response);
    } catch (error: any) {
      console.error(error.response.message);
      console.log(error);
      toast.error(error.response.message);
    } finally {
      // toast.dismiss(toastloadingid);
    }
  };

  useEffect(() => {
    getAlltransactions();
  }, []);

  const filteredTransactions = transactions
    .filter(
      (transaction: any) =>
        transaction.type !== "earn" && transaction.method !== "transfer"
    )
    .map((transaction: any) => {
      const formattedType =
        transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1);

      return {
        ...transaction,
        type: formattedType,
        createdAt:
          transaction.status === "pending" ? null : transaction.createdAt,
      };
    });

  return (
    <div className="w-full h-full  scrollbar-thin scrollbar-none overflow-y-scroll">
      {/* Header */}
      <div className="w-full h-[10%] flex justify-between  items-center px-8 max-md:px-5">
        <p className="font-semibold text-xl">Transaction history</p>
        <div
          className="w-[20%] h-full flex text-purple-700 justify-center items-center gap-1 cursor-pointer"
          onClick={handleBack}
        >
          <MdArrowBack size={22} />
          <p className="text-[16px] font-semibold">Back</p>
        </div>
      </div>
      <div className="w-full h-[90%]  flex flex-col justify-center items-center">
        <div className="w-[90%] h-[19%]  bg-purple-700 rounded-sm  px-3 flex justify-between items-center">
          <p className=" font-semibold text-lg text-white">Transactions</p>
        </div>
        <div className="w-[90%] h-[80%]">
          <Table
            columns={[
              { key: "method", title: "Method" },
              { key: "type", title: "Type" },
              { key: "amount", title: "Amount" },
              { key: "createdAt", title: "Date" },
              { key: "status", title: "Status" },
            ]}
            data={filteredTransactions}
          />
        </div>
      </div>
    </div>
  );
};

export default History;
