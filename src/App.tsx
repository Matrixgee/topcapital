/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Routes } from "./Routes/routes";

const App = () => {
  const [loading, setLoading] = useState(true);
  const baseUrl = `${import.meta.env.VITE_DEVE_URL}`;

  console.log(baseUrl);

  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        await fetch(baseUrl);
        console.log("Server awakened");
      } catch (error) {
        console.error("Error waking up server:", error);
      } finally {
        setLoading(false);
      }
    };
    wakeUpServer();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return <RouterProvider router={Routes} />;
};

export default App;
