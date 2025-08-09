import React from "react";

interface LeaderboardCardProps {
  classname?: string; // Correct type definition for the prop
}

function LeaderboardCard({ classname }: LeaderboardCardProps) {
  return (
    <div
      className={`md:px-11 px-4 py-3 flex justify-between items-center ring-1 rounded-full ${classname}  `}
    >
      <strong>Rank</strong>
      <strong>School Name</strong>
      <strong>Share Count</strong>
    </div>
  );
}
function Leaderboard() {
  return (
    <div className="py-6 md:py-8 px-4 md:px-16 text-center max-w-3xl mx-auto ">
      <h1 className="bold-text text-4xl md:text-5xl pb-6 md:pb-8">
        Leaderboard
      </h1>
      <LeaderboardCard classname={"regular-text text-lg md:text-2xl"} />
      <div className="flex flex-col gap-2 mt-5">
        <LeaderboardCard classname={"regular-text text-lg md:text-xl"} />
        <LeaderboardCard classname={"regular-text text-lg md:text-xl"} />
        <LeaderboardCard classname={"regular-text text-lg md:text-xl"} />
        <LeaderboardCard classname={"regular-text text-lg md:text-xl"} />
        <LeaderboardCard classname={"regular-text text-lg md:text-xl"} />
      </div>
      <h3 className="text-center  text-xl md:text-2xl regular-text pt-5">
        Watch. Share. Make a difference—because hunger should never win.
        <br /> <b>Let's put meals on tables, together.</b>
      </h3>
    </div>
  );
}

export default Leaderboard;
