import Image from "next/image";
import React from "react";

function Footer() {
   const handleClick = (url:string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const icon = [
    { icon: "linkdin", link: "https://www.linkedin.com/company/krbl-limited" },
    { icon: "facebook", link: "https://www.facebook.com/indiagatefoods" },
    { icon: "insta", link: "https://www.instagram.com/indiagatefoods/" },
    { icon: "x", link: "https://x.com/IndiaGateFoods" },
    { icon: "youtube", link: "https://www.youtube.com/c/IndiaGateFoods" },
  ];
  return (
    <div className="py-4 px-4 md:px-16 bg-[rgba(109,64,54,0.5)]  w-full">
      <div className="flex justify-center items-center gap-6">
        {icon.map((e, id) => (
          <Image
            key={id}
            onClick={() => e.link && handleClick(e?.link)}
            src={`/footer/${e.icon}.svg`}
            alt={`${e}.svg`}
            width={24}
            height={24}
            className="cursor-pointer hover:scale-95"
          />
        ))}
      </div>
    </div>
  );
}

export default Footer;
