// import Image from "next/image";

// import React, { useState } from "react";

// function index() {
//   const [city, setCity] = useState("");
//   const [school, setSchool] = useState("");

//   const schoolsData = {
//     newyork: ["NY High School", "Manhattan Academy", "Brooklyn School"],
//     london: ["London Central School", "Oxford Academy", "Cambridge High"],
//     tokyo: ["Tokyo High School", "Shibuya Academy", "Osaka Institute"],
//   };
//   return (
//     <div className="container w-svw h-svh px-4 md:px-24 py-24 md:py-16 regular-text flex  items-center flex-col bg-[url('/common/mobilebg.png')] md:bg-[url('/common/bg.png')] bg-[rgba(255,247,226,0.78)] bg-no-repeat bg-cover">
//       <div className="flex justify-center items-center ">
//         <Image
//           src={`/common/india.png`}
//           alt={`India Gate logo`}
//           width={111}
//           height={154}
//           className=" cursor-pointer"
//         />
//         <Image
//           src={`/home/logo.png`}
//           alt={`India Gate logo`}
//           width={145}
//           height={154}
//           className=" cursor-pointer"
//         />
//       </div>
//       <small className="text-base md:text-2xl text-center mt-3">
//         An initiative by India Gate for #FreedomFromHunger
//       </small>

//       <div className="w-full flex flex-col gap-5 mt-20">
//         <div className="p-4 space-y-4 w-full max-w-md mx-auto">
//           {/* City Dropdown */}
//           <select
//             value={city}
//             onChange={(e) => {
//               setCity(e.target.value);
//               setSchool(""); // reset school when city changes
//             }}
//             className="text-white px-4 py-4 rounded-full w-full outline-none"
//             style={{ backgroundColor: "#6D4036" }}
//           >
//             <option value="" disabled>
//               Select City
//             </option>
//             <option value="newyork">New York</option>
//             <option value="london">London</option>
//             <option value="tokyo">Tokyo</option>
//           </select>

//           {/* School Dropdown */}
//           <select
//             value={school}
//             onChange={(e) => setSchool(e.target.value)}
//             className="text-white px-4 py-4 rounded-full w-full outline-none"
//             style={{ backgroundColor: "#6D4036" }}
//             disabled={!city} // disable until city is selected
//           >
//             <option value="" disabled>
//               Select Your School
//             </option>
//             {city &&
//               schoolsData[city].map((s, i) => (
//                 <option key={i} value={s}>
//                   {s}
//                 </option>
//               ))}
//           </select>
//         </div>
//         <button className="p-4  w-32 mx-auto bg-[#6D4036] ring rounded-full text-white hover:scale-90">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }

// export default index;


import Image from "next/image";
import React, { useState, useEffect } from "react";

function Index() {
  const [city, setCity] = useState("");
  const [school, setSchool] = useState("");
  const [cities, setCities] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingSchools, setLoadingSchools] = useState(false);
  const [error, setError] = useState(null);

  // Capitalize first letter of each word
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Fetch cities on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoadingCities(true);
        const response = await fetch(
          "https://api.indiagategrainsofhope.com/school_location/list"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCities(data.school_location || []);
      } catch (err) {
        setError("Failed to fetch cities");
        console.error("Error fetching cities:", err);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  // Fetch schools when city changes
  useEffect(() => {
    const fetchSchools = async () => {
      if (!city) {
        setSchools([]);
        return;
      }

      try {
        setLoadingSchools(true);
        const response = await fetch(
          "https://api.indiagategrainsofhope.com/school_name/list",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ location: city }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSchools(data.school_names || []);
      } catch (err) {
        setError("Failed to fetch schools");
        console.error("Error fetching schools:", err);
        setSchools([]);
      } finally {
        setLoadingSchools(false);
      }
    };

    fetchSchools();
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setSchool(""); // reset school when city changes
  };

  const handleSubmit = async () => {
    if (!city || !school) {
      alert("Please select both city and school");
      return;
    }

    try {
      setLoadingSchools(true); // Reuse loading state for submit button

      // Call the school ID API
      const response = await fetch(
        "https://api.indiagategrainsofhope.com/school_id/list",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            school_name: school,
            school_location: city,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
console.log("data",data)
      if (data?.school_id) {
        // Get the current base URL
        const baseUrl = window.location.origin;

        // Redirect to baseurl?share_id=school_id
        window.location.href = `${baseUrl}?share_id=${data.school_id}`;
      } else {
        throw new Error("School ID not found in response");
      }
    } catch (err) {
      setError("Failed to get school ID. Please try again.");
      console.error("Error getting school ID:", err);
    } finally {
      setLoadingSchools(false);
    }
  };

  return (
    <div className="container w-svw h-svh px-4 md:px-24 py-24 md:py-16 regular-text flex items-center flex-col bg-[url('/common/mobilebg.png')] md:bg-[url('/common/bg.png')] bg-[rgba(255,247,226,0.78)] bg-no-repeat bg-cover">
      <div className="flex justify-center items-center">
        <Image
          src={`/common/india.png`}
          alt={`India Gate logo`}
          width={111}
          height={154}
          className="cursor-pointer"
        />
        <Image
          src={`/home/logo.png`}
          alt={`India Gate logo`}
          width={145}
          height={154}
          className="cursor-pointer"
        />
      </div>
      <small className="text-base md:text-2xl text-center mt-3">
        An initiative by India Gate for #FreedomFromHunger
      </small>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="w-full flex flex-col gap-5 mt-20">
        <div className="p-4 space-y-4 w-full max-w-md mx-auto">
          {/* City Dropdown */}
          <select
            value={city}
            onChange={handleCityChange}
            className="text-white px-4 py-4 rounded-full w-full outline-none"
            style={{ backgroundColor: "#6D4036" }}
            disabled={loadingCities}
          >
            <option value="" disabled>
              {loadingCities ? "Loading cities..." : "Select City"}
            </option>
            {cities.map((cityName, i) => (
              <option key={i} value={cityName}>
                {capitalizeWords(cityName)}
              </option>
            ))}
          </select>

          {/* School Dropdown */}
          <select
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="text-white px-4 py-4 rounded-full w-full outline-none"
            style={{ backgroundColor: "#6D4036" }}
            disabled={!city || loadingSchools}
          >
            <option value="" disabled>
              {loadingSchools
                ? "Loading schools..."
                : !city
                ? "Select city first"
                : "Select Your School"}
            </option>
            {schools.map((schoolName, i) => (
              <option key={i} value={schoolName}>
                {capitalizeWords(schoolName)}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="p-4 w-32 mx-auto bg-[#6D4036] ring rounded-full text-white hover:scale-90 disabled:opacity-50 disabled:cursor-not-allowed transition-transform"
          disabled={!city || !school || loadingCities || loadingSchools}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Index;