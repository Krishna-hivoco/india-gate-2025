// import React from "react";

// interface LeaderboardCardProps {
//   classname?: string; // Correct type definition for the prop
// }

// function LeaderboardCard({ classname }: LeaderboardCardProps) {
//   return (
//     <div
//       className={`md:px-11 px-4 py-3 flex justify-between items-center ring-1 rounded-full ${classname}  `}
//     >
//       <strong>Rank</strong>
//       <strong>School Name</strong>
//       <strong>Share Count</strong>
//     </div>
//   );
// }
// function Leaderboard() {
//   return (
//     <div className="py-6 md:py-8 px-4 md:px-16 text-center max-w-3xl mx-auto ">
//       <h1 className="bold-text text-4xl md:text-5xl pb-6 md:pb-8">
//         Leaderboard
//       </h1>
//       <LeaderboardCard classname={"regular-text text-lg md:text-2xl"} />
//       <div className="flex flex-col gap-2 mt-5">
//         <LeaderboardCard classname={"regular-text text-lg md:text-xl"} />
//         <LeaderboardCard classname={"regular-text text-lg md:text-xl"} />
//         <LeaderboardCard classname={"regular-text text-lg md:text-xl"} />
//         <LeaderboardCard classname={"regular-text text-lg md:text-xl"} />
//         <LeaderboardCard classname={"regular-text text-lg md:text-xl"} />
//       </div>
//       <h3 className="text-center  text-xl md:text-2xl regular-text pt-5">
//         Watch. Share. Make a difference—because hunger should never win.
//         <br /> <b>Let's put meals on tables, together.</b>
//       </h3>
//     </div>
//   );
// }

// export default Leaderboard;


import React from "react";

interface LeaderboardCardProps {
  classname?: string;
  rank?: number;
  name?: string;
  shareCount?: number;
  isHeader?: boolean;
}

function LeaderboardCard({
  classname,
  rank,
  name,
  shareCount,
  isHeader = false,
}: LeaderboardCardProps) {
  return (
    <div
      className={`md:px-11 px-4 py-3 flex justify-between items-center ring-1 rounded-full ${classname}`}
    >
      {isHeader ? (
        <>
          <strong>Rank</strong>
          <strong>Name</strong>
          <strong>Share Count</strong>
        </>
      ) : (
        <>
          <span className="font-semibold">#{rank}</span>
          <span className="font-medium text-center flex-1 mx-4">{name}</span>
          <span className="font-bold ">{shareCount}</span>
        </>
      )}
    </div>
  );
}

interface LeaderboardProps {
  data: any[];
  selectedView: string;
  loading: boolean;
  error: string | null;
}

function Leaderboard({ data, selectedView, loading, error }: LeaderboardProps) {
  const getHeaderText = () => {
    return selectedView === "School" ? "School Name" : "Employee Name";
  };

  const renderTableRows = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="text-lg text-gray-600">Loading leaderboard...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="text-lg text-red-600">
            Error loading data: {error}
          </div>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="text-lg text-gray-600">No data available</div>
        </div>
      );
    }

    return data.map((item, index) => (
      <LeaderboardCard
        key={`${selectedView}-${item.rank}-${index}`}
        classname="regular-text text-lg md:text-xl hover:bg-gray-50 transition-colors duration-200"
        rank={item.rank}
        name={selectedView === "School" ? item.school_name : item.employee_name}
        shareCount={
          selectedView === "School" ? item.share_by_school : item.total_share
        }
        isHeader={false}
      />
    ));
  };

  return (
    <div className="py-6 md:py-8 px-4 md:px-16 text-center max-w-3xl mx-auto">
      <h1 className="bold-text text-4xl md:text-5xl pb-6 md:pb-8">
        {selectedView} Leaderboard
      </h1>

      {/* Header Row */}
      <div className="md:px-11 px-4 py-3 flex justify-between items-center ring-1 rounded-full regular-text text-lg md:text-2xl ">
        <strong>Rank</strong>
        <strong>{getHeaderText()}</strong>
        <strong>Share Count</strong>
      </div>

      {/* Data Rows */}
      <div className="flex flex-col gap-2 mt-5">{renderTableRows()}</div>

      <h3 className="text-center text-xl md:text-2xl regular-text pt-5">
        Watch. Share. Make a difference—because hunger should never win.
        <br /> <b>Let's put meals on tables, together.</b>
      </h3>
    </div>
  );
}

export default Leaderboard;