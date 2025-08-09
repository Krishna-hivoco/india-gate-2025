import Image from "next/image";
import React from "react";

function Footer() {
  const icon = ["whatsapp", "Facebook", "Insta", "x", "youtube"];
  return (
    <div className="py-4 px-4 md:px-16 bg-[rgba(109,64,54,0.5)]  w-full">
      <div className="flex justify-center items-center gap-6">
        {icon.map((e, id) => (
          <Image
            key={id}
            src={`/footer/${e}.svg`}
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
