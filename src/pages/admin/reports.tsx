// // import Footer from "@/components/Footer";
// // import FooterCard from "@/components/FooterCard";
// // import FooterTop from "@/components/FooterTop";
// // import Leaderboard from "@/components/Leaderboard";
// // import React from "react";

// // function reports() {
// //   return (
// //     <div className="bg-[url('/common/bg.png')]   bg-[rgb(255,247,226)]">
// //       <div className="container  mx-auto ">
// //         <Leaderboard />

// //         <footer>

// //           <FooterTop/>
// //           <Footer/>
// //         </footer>
// //       </div>
// //     </div>
// //   );
// // }

// // export default reports;

// // import Footer from "@/components/Footer";
// // import FooterCard from "@/components/FooterCard";
// // import FooterTop from "@/components/FooterTop";
// // import Leaderboard from "@/components/Leaderboard";
// // import React from "react";

// // function reports() {
// //   return (
// //     <div className="bg-[url('/common/bg.png')] bg-[rgb(255,247,226)] min-h-screen flex flex-col">
// //       <div className="container mx-auto flex-1 flex flex-col">
// //         <div className="flex-1">
// //           <Leaderboard />
// //         </div>

// //         <footer className="mt-auto">
// //           <FooterTop/>
// //           <Footer/>
// //         </footer>
// //       </div>
// //     </div>
// //   );
// // }

// // export default reports;


// import Footer from "@/components/Footer";
// import FooterCard from "@/components/FooterCard";
// import FooterTop from "@/components/FooterTop";
// import Leaderboard from "@/components/Leaderboard";
// import React, { useState, useEffect } from "react";

// function Reports() {
//   const [selectedView, setSelectedView] = useState("School");
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch data based on selected view
//   const fetchData = async (viewType) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const apiUrl =
//         viewType === "School"
//           ? "https://api.indiagategrainsofhope.com/school/stats"
//           : "https://api.indiagategrainsofhope.com/employee/stats";

//       const response = await fetch(apiUrl);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       setData(result);
//     } catch (err) {
//       setError(err.message);
//       console.error("Error fetching data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data when component mounts or selectedView changes
//   useEffect(() => {
//     fetchData(selectedView);
//   }, [selectedView]);

//   // Handle dropdown change
//   const handleViewChange = (event) => {
//     setSelectedView(event.target.value);
//   };

//   // Render data cards based on selected view
//   const renderCards = () => {
//     if (loading) {
//       return (
//         <div className="flex justify-center items-center py-8">
//           <div className="text-lg text-gray-600">Loading...</div>
//         </div>
//       );
//     }

//     if (error) {
//       return (
//         <div className="flex justify-center items-center py-8">
//           <div className="text-lg text-red-600">Error: {error}</div>
//         </div>
//       );
//     }

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//         {data.map((item) => (
//           <div
//             key={item.rank}
//             className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-2xl font-bold text-blue-600">
//                 #{item.rank}
//               </span>
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                 <span className="text-blue-600 font-bold">{item.rank}</span>
//               </div>
//             </div>

//             {selectedView === "School" ? (
//               <>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   {item.school_name}
//                 </h3>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Shares:</span>
//                   <span className="text-xl font-bold text-green-600">
//                     {item.share_by_school}
//                   </span>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   {item.employee_name}
//                 </h3>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Total Shares:</span>
//                   <span className="text-xl font-bold text-green-600">
//                     {item.total_share}
//                   </span>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="bg-[url('/common/bg.png')] bg-[rgb(255,247,226)] min-h-screen flex flex-col">
//       <div className="container mx-auto flex-1 flex flex-col px-4">
//         {/* Header with Dropdown */}
//         <div className="flex justify-between items-center py-6">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Reports Dashboard
//           </h1>

//           {/* Dropdown */}
//           <div className="relative">
//             <select
//               value={selectedView}
//               onChange={handleViewChange}
//               className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 font-medium"
//             >
//               <option value="School">School</option>
//               <option value="Employee">Employee</option>
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//               <svg
//                 className="fill-current h-4 w-4"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Current View Title */}
//         <div className="mb-4">
//           <h2 className="text-xl font-semibold text-gray-700">
//             {selectedView} Leaderboard
//           </h2>
//         </div>

//         {/* Data Cards */}
//         <div className="flex-1">{renderCards()}</div>

//         {/* Original Leaderboard Component (if you want to keep it) */}
//         {/* <div className="flex-1">
//           <Leaderboard />
//         </div> */}

//         <footer className="mt-auto">
//           <FooterTop />
//           <Footer />
//         </footer>
//       </div>
//     </div>
//   );
// }

// export default Reports;


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
        throw new Error(`HTTP error! status: ${response.status}`);
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
