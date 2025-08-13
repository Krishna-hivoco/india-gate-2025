import Image from "next/image";
import React from "react";

function FooterTop() {
   const openTermsInBrowser = () => {
     // Open with specific parameters to force inline viewing
     window.open(
       "/documents/terms-and-conditions.pdf#toolbar=1&navpanes=1&scrollbar=1&view=FitH",
       "_blank"
     );
   };

  return (
    <div className="flex flex-col md:flex-row gap-5  justify-center md:justify-between items-center px-4 md:px-16 regular-text md:pb-0 pb-5">
      <div className="flex flex-col md:flex-row gap-5 md:gap-24 items-center">
        <Image
          src={`/common/india.png`}
          alt={`india gate logo`}
          width={72}
          height={100}
        />
        <strong
          onClick={() => openTermsInBrowser()}
          className="underline text-lg cursor-pointer"
        >
          Terms and Conditions
        </strong>
      </div>
      <small className="text-base regula">
        An initiative by India Gate for #FreedomFromHunger
      </small>
    </div>
  );
}

export default FooterTop;
