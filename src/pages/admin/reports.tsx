

import Footer from "@/components/Footer";
import FooterCard from "@/components/FooterCard";
import FooterTop from "@/components/FooterTop";
import Leaderboard from "@/components/Leaderboard";
import React, { useState, useEffect } from "react";

function Reports() {
  const [selectedView, setSelectedView] = useState("School");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data based on selected view
  const fetchData = async (viewType:any) => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl =
        viewType === "School"
          ? "https://api.indiagategrainsofhope.com/school/stats"
          : "https://api.indiagategrainsofhope.com/employee/stats";

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP  error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err:any) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts or selectedView changes
  useEffect(() => {
    fetchData(selectedView);
  }, [selectedView]);

  // Handle dropdown change
  const handleViewChange = (event:any) => {
    setSelectedView(event.target.value);
  };

  return (
    <div className="bg-[url('/common/bg.png')] bg-[rgb(255,247,226)] min-h-screen flex flex-col">
      <div className="container mx-auto flex-1 flex flex-col">
        {/* Dropdown positioned at top right */}
        <div className="flex justify-end py-4 px-4 md:px-8">
          <div className="relative">
            <select
              value={selectedView}
              onChange={handleViewChange}
              className="appearance-none bg-[#6D4036] border border-[#6D4036] rounded-lg px-4 py-2 pr-8 shadow-sm focus:outline-none  text-white focus:ring-2 focus:ring-gray-400 font-medium min-w-[120px]"
            >
              <option value="School">School</option>
              <option value="Employee">Employee</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6D4036]">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Leaderboard Component */}
        <div className="flex-1">
          <Leaderboard
            data={data}
            selectedView={selectedView}
            loading={loading}
            error={error}
          />
        </div>

        <footer className="mt-auto">
          <FooterTop />
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default Reports;
