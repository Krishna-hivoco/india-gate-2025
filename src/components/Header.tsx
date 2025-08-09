import Image from "next/image";
import React, { useState } from "react";

function Header() {
  const menu = ["ABOUT", "FILM", "IMPACT", "SHARE"];
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="flex justify-between text-2xl items-start md:items-center px-4 lg:px-16 py-6 pb-3 md:py-6 regular-text ">
      {/* Logo */}
      <Image
        src={`/common/india.png`}
        alt={`India Gate logo`}
        width={72}
        height={100}
        className="w-12 h-17 md:w-[72px] md:h-[100px] cursor-pointer"
      />

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-16 items-center">
        {menu.map((item, id) => (
          <span
            key={id}
            className="cursor-pointer hover:text-red-600 font-medium"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Mobile Menu Icon (3 dots) */}
      <div className="lg:hidden flex items-center">
        <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <span className="text-3xl font-bold">⋮</span>
        </button>
      </div>

      {/* Optional: Mobile dropdown menu */}
      {showMobileMenu && (
        <div className="absolute top-20  right-4 text-xl bg-white shadow-md rounded-md p-4 flex flex-col gap-2 lg:hidden z-50">
          {menu.map((item, id) => (
            <span
              key={id}
              className="cursor-pointer hover:text-red-600 font-medium "
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Header;
