import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Routes } from "./Routes/routes";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<
    "idle" | "connecting" | "error" | "ready"
  >("idle");
  const baseUrl = "https://express-trade-profit.onrender.com";

  useEffect(() => {
    const wakeUpServer = async () => {
      setStatus("connecting");

      try {
        // Add timeout to fetch to prevent it from hanging indefinitely
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const response = await fetch(baseUrl, {
          signal: controller.signal,
          method: "HEAD", // Use HEAD method for faster response
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          console.log("Server awakened successfully");
          setStatus("ready");
        } else {
          console.warn("Server response not OK:", response.status);
          setStatus("error");
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          console.warn("Server wake-up request timed out");
        } else {
          console.error("Error waking up server:", error);
        }
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    wakeUpServer();

    // Fallback timer in case the fetch never resolves or takes too long
    const maxWaitTime = 60000; // Reduced to 60 seconds from 120 seconds
    const timer = setTimeout(() => {
      console.warn("Maximum wait time reached, proceeding anyway");
      setLoading(false);
    }, maxWaitTime);

    return () => clearTimeout(timer);
  }, [baseUrl]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#25063b] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#635a9a] mb-4"></div>
        <p className="text-gray-300 text-lg">
          {status === "connecting"
            ? "Loading Application"
            : status === "error"
            ? "Still trying to connect..."
            : "Loading application..."}
        </p>
        <p className="text-gray-400 text-sm mt-2">
          This may take a moment if the server is spinning up
        </p>
      </div>
    );
  }

  // If we had a server error but proceeded anyway, we could show a toast or notification here
  if (status === "error") {
    // Could integrate with a toast library here if you're using one
    console.warn(
      "Proceeding with application despite server connection issues"
    );
  }

  return <RouterProvider router={Routes} />;
};

export default App;
