// import Footer from "@/components/Footer";
// import FooterCard from "@/components/FooterCard";
// import FooterTop from "@/components/FooterTop";
// import Leaderboard from "@/components/Leaderboard";
// import React from "react";

// function reports() {
//   return (
//     <div className="bg-[url('/common/bg.png')]   bg-[rgb(255,247,226)]">
//       <div className="container  mx-auto ">
//         <Leaderboard />

//         <footer>

//           <FooterTop/>
//           <Footer/>
//         </footer>
//       </div>
//     </div>
//   );
// }

// export default reports;

import Footer from "@/components/Footer";
import FooterCard from "@/components/FooterCard";
import FooterTop from "@/components/FooterTop";
import Leaderboard from "@/components/Leaderboard";
import React from "react";

function reports() {
  return (
    <div className="bg-[url('/common/bg.png')] bg-[rgb(255,247,226)] min-h-screen flex flex-col">
      <div className="container mx-auto flex-1 flex flex-col">
        <div className="flex-1">
          <Leaderboard />
        </div>

        <footer className="mt-auto">
          <FooterTop/>
          <Footer/>
        </footer>
      </div>
    </div>
  );
}

export default reports;
