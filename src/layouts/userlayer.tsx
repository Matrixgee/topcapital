import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Userlayer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen w-screen max-w-[100vw] bg-gradient-to-b from-[#2A0F3D] to-[#1A0825]  max-h-[100vh] overflow-hidden flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className=" flex flex-col max-w-6xl mx-auto  w-full">
        <Topbar onMenuClick={toggleSidebar} />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Userlayer;
