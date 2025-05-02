import React, { useState, useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Modal, Form } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";

interface User {
  firstName: string;
  lastName: string;
  balance: string;
  email: string;
  status: string;
  dateRegistered: string;
  _id: string;
}

const AllUsers: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const navigate = useNavigate();
  const userToken = localStorage.getItem("token"); // Store token locally if needed

  const url = `${import.meta.env.VITE_DEVE_URL}/all-users`;

  const FetchUsers = async () => {
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const users = res.data?.data ?? [];
      setAllUsers(users);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchUsers();
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = Array.isArray(allUsers)
    ? allUsers.slice(indexOfFirstUser, indexOfLastUser)
    : [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <div className="w-full h-[100vh] overflow-y-scroll phone:scroll-hidden">
      <div className="w-1/3 h-20 mt-5 flex justify-start px-7 items-center phone:w-[90%]">
        <p className="text-2xl">Top Capital Users List</p>
      </div>
      <div className="UserAction w-full h-20 flex justify-between items-center px-10">
        <button className="w-[12%] h-1/2 text-white rounded-md bg-green-400 max-md:w-[30%]">
          Message All
        </button>
        <button
          className="w-[10%] h-1/2 bg-red-500 rounded-md flex justify-center gap-1 items-center text-white max-md:w-[30%]"
          onClick={showModal}
        >
          <IoAddCircleOutline /> Add User
        </button>
      </div>
      <div className="w-full h-[calc(100vh-10rem)] flex justify-center items-center">
        <div className="w-11/12 h-full bg-white shadow-lg">
          <div className="w-[50%] h-[15%] flex justify-between px-5 items-center max-md:w-[100%] phone:gap-2">
            <select
              name="sort"
              id="sort"
              className="w-[30%] h-3/5 rounded-md border px-3 max-md:w-[40%]"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <div className="w-[50%] h-[60%] max-md:w-[60%]">
              <input
                type="text"
                placeholder="Search by name or email"
                className="w-full bg-slate-200 h-full rounded-md outline-none px-4"
              />
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-scroll scrollbar-thin h-[50rem] phone:h-[75rem]">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="w-full bg-gray-100 border-b">
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Client Name
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Account Balance
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Date Reg
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 border-b">
                    <td className="py-3 px-4">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="py-3 px-4">
                      ${parseFloat(user.balance).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      {user.status === "Active" ? (
                        <span className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-xs">
                          {user.status}
                        </span>
                      ) : (
                        <span className="bg-red-200 text-red-800 py-1 px-3 rounded-full text-xs">
                          {user.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">{user.dateRegistered}</td>
                    <td className="py-3 px-4">
                      <button
                        className="bg-[#050c1b] text-white px-4 py-1 rounded-md"
                        onClick={() =>
                          navigate(`/admin/userdetails/${user._id}`)
                        }
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="pagination mt-4 flex justify-between items-center">
              <div>
                <button
                  onClick={() => paginate(1)}
                    disabled={currentPage === 1}
                  className="px-3 py-2 rounded-md bg-gray-200"
                >
                  <RxTrackPrevious />
                </button>
                <button
                  onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  className="px-3 py-2 rounded-md bg-gray-200 ml-2"
                >
                  <RxTrackPrevious />
                </button>
                <button
                  onClick={() => paginate(currentPage + 1)}
                    disabled={
                      currentPage ===
                      Math.ceil(allUsers.length ?? 0 / usersPerPage)
                    }
                  className="px-3 py-2 rounded-md bg-gray-200 ml-2"
                >
                  <RxTrackNext />
                </button>
              </div>
              <div>
                Page {currentPage} of{" "}
                {Math.ceil(allUsers.length / usersPerPage)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal title="Add User" open={isModalVisible} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="userForm">
          {/* Add your form fields here */}
        </Form>
      </Modal>
    </div>
  );
};

export default AllUsers;
