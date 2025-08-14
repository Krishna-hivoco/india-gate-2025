import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

function Header() {
  const menu = ["ABOUT", "FILM", "IMPACT", "SHARE"];
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null); // ✅ type added

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    }

    if (showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileMenu]);

  return (
    <div className=" text-2xl  px-4 lg:px-16 py-4 pb-4 md:py-6  regular-text">
      {/* Logo */}

      <div className=" flex md:justify-between justify-end -mt-3">
        <Image
          src={`/common/india.png`}
          alt={`India Gate logo`}
          width={65}
          height={90}
          className="cursor-pointer hidden md:block"
        />
        <div className="flex  justify-end">
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

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <span className="text-3xl font-bold">⋮</span>
            </button>
          </div>

          {/* Mobile dropdown menu */}
          {showMobileMenu && (
            <div
              ref={menuRef}
              className="absolute top-20 right-4 text-xl bg-white shadow-md rounded-md p-4 flex flex-col gap-2 lg:hidden z-50"
            >
              {menu.map((item, id) => (
                <span
                  key={id}
                  onClick={() => setShowMobileMenu(false)}
                  className="cursor-pointer hover:text-red-600 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className=" flex flex-col  items-center  -mt-5 md:-mt-16">
        <div className="flex">
          {" "}
          <Image
            src={`/common/india.png`}
            alt={`India Gate logo`}
            width={65}
            height={90}
            className="cursor-pointer md:hidden block"
          />
          <Image
            src={`/home/logo.png`}
            alt={`India Gate logo`}
            width={85}
            height={85}
            className=" cursor-pointer md:w-32 md:h-32 "
          />
        </div>
        <p className="regular-text text-xs md:text-base md:hidden block">
          An initiative by India Gate for #FreedomFromHunger
        </p>
      </div>
    </div>
  );
}

export default Header;
