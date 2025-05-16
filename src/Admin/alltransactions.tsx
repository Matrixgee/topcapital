/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../config/axiosconfig";
import { setAllTransactions } from "../global/adminslice";
import { toast, Toaster } from "react-hot-toast";
import {
  EyeIcon,
  TrashIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  DocumentDuplicateIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";

interface Transaction {
  _id: string;
  mode: string;
  firstName: string;
  lastName: string;
  email: string;
  amount: number;
  status: "approved" | "pending" | "rejected" | string;
  createdAt: string;
  image: string;
}

const statusColors = {
  approved: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

const AllTransactions = () => {
  const adminTransactions = useSelector(
    (state: any) => state.admin.alltransactions
  );
  const AdminToken = useSelector((state: any) => state.admin.token);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<{
    id: string;
    action: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  // For filtering and sorting
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const openProofOfPayment = (url: string) => {
    window.open(url, "_blank");
  };

  const getAllTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/admin/allTransactions`, {
        headers: { Authorization: `Bearer ${AdminToken}` },
      });
      dispatch(setAllTransactions(response.data.data));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Failed to fetch transactions");
      setLoading(false);
      toast.error("Failed to fetch transactions. Please try again.");
    }
  };

  useEffect(() => {
    getAllTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, AdminToken]);

  const confirmDeposit = async (transactionId: string) => {
    try {
      await axios.put(
        `/admin/approveDeposit/${transactionId}`,
        {},
        { headers: { Authorization: `Bearer ${AdminToken}` } }
      );
      getAllTransactions();
      toast.success("Deposit approved successfully");
    } catch (error) {
      console.error("Error confirming deposit:", error);
      toast.error("Failed to approve deposit");
    }
  };

  const handleDecline = async (transactionId: string) => {
    try {
      await axios.put(
        `/admin/declineDeposit/${transactionId}`,
        {},
        { headers: { Authorization: `Bearer ${AdminToken}` } }
      );
      getAllTransactions();
      toast.success("Deposit declined successfully");
    } catch (error) {
      console.error("Error declining deposit:", error);
      toast.error("Failed to decline deposit");
    }
  };

  const showConfirmModal = (transactionId: string, action: string) => {
    setCurrentTransaction({ id: transactionId, action });
    setConfirmModal(true);
  };

  const handleConfirmAction = () => {
    if (currentTransaction) {
      if (currentTransaction.action === "approve") {
        confirmDeposit(currentTransaction.id);
      } else {
        handleDecline(currentTransaction.id);
      }
      setConfirmModal(false);
    }
  };

  // Sorting function
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Default to descending for new sort field
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Filter and sort transactions
  const filteredTransactions = adminTransactions
    .filter((transaction: Transaction) => {
      if (!searchQuery) return true;

      const query = searchQuery.toLowerCase();
      return (
        transaction._id.toLowerCase().includes(query) ||
        `${transaction.firstName} ${transaction.lastName}`
          .toLowerCase()
          .includes(query) ||
        transaction.email.toLowerCase().includes(query) ||
        transaction.mode.toLowerCase().includes(query) ||
        transaction.status.toLowerCase().includes(query)
      );
    })
    .sort((a: any, b: any) => {
      if (!sortField) return 0;

      // Handle different fields differently
      let comparison = 0;

      if (sortField === "name") {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        comparison = nameA.localeCompare(nameB);
      } else if (sortField === "date") {
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortField === "amount") {
        comparison = a.amount - b.amount;
      } else {
        // For other string fields
        const fieldA = String(a[sortField]).toLowerCase();
        const fieldB = String(b[sortField]).toLowerCase();
        comparison = fieldA.localeCompare(fieldB);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-red-700 flex items-center justify-center h-screen ">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Error Loading Data</h3>
          <p>{error}</p>
          <button
            onClick={getAllTransactions}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-5rem)] p-6 overflow-y-scroll ">
      <div className="bg-gray-50 min-h-screen pb-12">
        <Toaster position="top-right" />

        {/* Header area */}
        <div className=" shadow-sm bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Deposit Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage and process client deposit transactions
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Controls row */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            {/* Action buttons */}
            <div className="flex space-x-2 overflow-x-scroll w-full">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                <DocumentDuplicateIcon className="h-4 w-4 mr-2" />
                Copy
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                CSV
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                <FunnelIcon className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Total Deposits
              </div>
              <div className="text-2xl font-semibold text-gray-800">
                $
                {adminTransactions
                  .reduce((sum: number, tx: Transaction) => sum + tx.amount, 0)
                  .toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Pending Approval
              </div>
              <div className="text-2xl font-semibold text-amber-600">
                {
                  adminTransactions.filter(
                    (tx: Transaction) => tx.status === "pending"
                  ).length
                }
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Approved Deposits
              </div>
              <div className="text-2xl font-semibold text-green-600">
                {
                  adminTransactions.filter(
                    (tx: Transaction) => tx.status === "approved"
                  ).length
                }
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("_id")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>ID</span>
                        {sortField === "_id" && (
                          <ArrowsUpDownIcon className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Client</span>
                        {sortField === "name" && (
                          <ArrowsUpDownIcon className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("amount")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Amount</span>
                        {sortField === "amount" && (
                          <ArrowsUpDownIcon className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("mode")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Method</span>
                        {sortField === "mode" && (
                          <ArrowsUpDownIcon className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Status</span>
                        {sortField === "status" && (
                          <ArrowsUpDownIcon className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("date")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Date</span>
                        {sortField === "date" && (
                          <ArrowsUpDownIcon className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentTransactions.length > 0 ? (
                    currentTransactions.map((transaction: Transaction) => (
                      <tr key={transaction._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{transaction._id?.slice(-6).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {transaction.firstName} {transaction.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {transaction.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${transaction.amount.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {transaction.mode}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex uppercase items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              statusColors[
                                transaction.status as keyof typeof statusColors
                              ] || "bg-gray-100 text-gray-800 border-gray-200"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() =>
                                openProofOfPayment(transaction.image)
                              }
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                              title="View Proof of Payment"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            {transaction.status === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    showConfirmModal(transaction._id, "approve")
                                  }
                                  className="text-green-600 hover:text-green-900 transition-colors duration-200"
                                  title="Approve Deposit"
                                >
                                  <CheckCircleIcon className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() =>
                                    showConfirmModal(transaction._id, "decline")
                                  }
                                  className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                  title="Decline Deposit"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredTransactions.length > 0 && (
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {Math.min(
                          indexOfFirstTransaction + 1,
                          filteredTransactions.length
                        )}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(
                          indexOfLastTransaction,
                          filteredTransactions.length
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {filteredTransactions.length}
                      </span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400"
                            : "bg-white text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          // Logic to show pagination centered around current page
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === pageNum
                                  ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}
                      <button
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                          currentPage === totalPages
                            ? "bg-gray-100 text-gray-400"
                            : "bg-white text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation Modal */}
        {confirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Confirm{" "}
                {currentTransaction?.action === "approve"
                  ? "Approval"
                  : "Decline"}
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to{" "}
                {currentTransaction?.action === "approve"
                  ? "approve"
                  : "decline"}{" "}
                this deposit? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setConfirmModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAction}
                  className={`px-4 py-2 rounded-md text-white ${
                    currentTransaction?.action === "approve"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {currentTransaction?.action === "approve"
                    ? "Approve"
                    : "Decline"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTransactions;
