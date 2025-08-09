import Image from "next/image";
import React, { useState } from "react";

function FooterCard() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: "/footer/Card1.png", alt: "Card1" },
    { src: "/footer/Card2.png", alt: "Card2" },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  return (
    <div className="px-4 md:px-16 py-11">
      {/* Header */}
      <div className="flex gap-4 items-center">
        <Image
          src={`/footer/analytics.svg`}
          alt="analytics icon"
          width={45}
          height={45}
          className="w-8 h-8 md:w-[45px] md:h-[45px]"
        />
        <h2 className=" bold-text text-4xl md:text-5xl">
          The Gap We Must Fill
        </h2>
      </div>

      {/* Image Section */}
      <div className="py-0 md:py-8 ">
        {/* Desktop: Equal 50% width with gap */}
        <div className="hidden md:flex ">
          <div className="w-1/2 h-[430px]">
            <Image
              src={`/footer/card1.png`}
              alt="Card1"
              width={800}
              height={600}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-1/2 h-[430px]">
            <Image
              src={`/footer/card2.png`}
              alt="Card2"
              width={800}
              height={600}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Mobile: Full screen single image with arrow navigation */}
        <div className="md:hidden relative">
          <div className="w-full h-[364px]">
            <Image
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              width={800}
              height={600}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Arrow button */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200"
            aria-label="Next image"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-700"
            >
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? "bg-gray-800"
                    : "bg-gray-300 hover:bg-gray-500"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <h3 className="text-center  text-xl md:text-2xl regular-text">
        Watch. Share. Make a difference—because hunger should never win.
        <br /> <b>Let's put meals on tables, together.</b>
      </h3>
    </div>
  );
}

export default FooterCard;
