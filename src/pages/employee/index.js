import Image from "next/image";
import React, { useState, useEffect } from "react";

function Index() {
  const [employee, setEmployee] = useState("");
  const [school, setSchool] = useState("");

  const [loadingSchools, setLoadingSchools] = useState(false);
  const [error, setError] = useState(null);

  // Capitalize first letter of each word
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleEmployeeChange = (e) => {
    setEmployee(e.target.value);
  };

  const handleSubmit = async () => {
    if (!employee) {
      alert("Please select employee type");
      return;
    }

    const baseUrl = window.location.origin;

    window.location.href = `${baseUrl}?share_id=${employee}`;
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
            value={employee}
            onChange={handleEmployeeChange}
            className="text-white px-4 py-4 rounded-full w-full outline-none"
            style={{ backgroundColor: "#6D4036" }}
          >
            <option value="" disabled>
              Select Employee type
            </option>
            <option value={"empho_team251976"}>HO Team</option>
            <option value={"empplant_team391725"}>Plant Team</option>
            <option value={"empfield_sales179921"}>Field Sales</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="p-4 w-32 mx-auto bg-[#6D4036] ring rounded-full text-white hover:scale-90 disabled:opacity-50 disabled:cursor-not-allowed transition-transform"
          disabled={!employee}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Index;
