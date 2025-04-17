const Withdraw = () => {
  return (
    <div className="w-full  h-full overflow-y-scroll flex items-center flex-col px-10 max-md:px-4 py-16 max-md:flex max-md:justify-center max-md:items-center ">
      <div className="w-1/2 max-md:w-full h-max bg-white rounded px-20 max-md:px-5 py-10 flex flex-col gap-5 items-center">
        <p className="text-2xl font-semibold text-[rgb(54,74,99)] text-center phone:text-xl">
          Request New Withdrawal
        </p>
        <div className="w-full h-max flex flex-col gap-2">
          <p className="text-sm text-[rgb(52,67,87)] font-medium">
            Amount <span className="text-xs ">(USD)</span>
          </p>
          <input
            type="number"
            className="w-full h-14 border border-[rgb(128,148,174)] outline-1 pl-2 outline-[#0238ac] rounded"
            placeholder="Input amount here..."
          />
        </div>
        <div className="w-full h-max flex flex-col gap-2">
          <p className="text-sm text-[rgb(52,67,87)] font-medium">
            Payment Type
          </p>
          <select
            name="paymentType"
            className="w-full h-14 border border-[rgb(128,148,174)] outline-1 outline-[#0238ac] rounded"
          >
            <option value="">Select Payment Type</option>
            <option value="Bitcoin">Bitcoin</option>
            <option value="Ethereum">Ethereum</option>
          </select>
        </div>
        <div className="w-full h-max flex flex-col gap-2">
          <p className="text-sm text-[rgb(52,67,87)] font-medium">
            Wallet Address
          </p>
          <input
            type="text"
            className="w-full h-14 border border-[rgb(128,148,174)] outline-1 pl-2 outline-[#0238ac] rounded"
            placeholder="Enter wallet address here..."
          />
        </div>
        <button className="w-full h-14 bg-purple-600 transition-all duration-300 hover:bg-[#0238ac] text-white rounded text-sm font-semibold">
          WITHDRAW
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
