import Image from "next/image";
import React, { useEffect, useState } from "react";

function FooterCard() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: "/footer/1.png", alt: "Card1" },
    { src: "/footer/2.png", alt: "Card2" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // 600ms interval

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);

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
          width={50}
          height={50}
          className="w-11 h-11 md:w-[50px] md:h-[50px] "
        />
        <div className="flex flex-col ">
          <h3 className=" bold-text text-xl md:text-3xl ">The Gap Between</h3>
          <h2 className=" bold-text text-3xl md:text-4xl -mt-1.5 ">
            Hunger & Hope
          </h2>
        </div>
      </div>

      {/* Image Section */}
      <div className="py-0 md:py-8 ">
        {/* Desktop: Equal 50% width with gap */}
        <div className="hidden md:flex md:gap-5 ">
          <div className="w-1/2 h-[430px]">
            <Image
              src={`/footer/1.png`}
              alt="card1"
              width={800}
              height={600}
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
          <div className="w-1/2 h-[430px]">
            <Image
              src={`/footer/2.png`}
              alt="card2"
              width={800}
              height={600}
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
        </div>

        {/* Mobile: Full screen single image with arrow navigation */}
        <div className="md:hidden relative overflow-hidden">
          <div className="w-full pt-6 relative">
            {/* Container for all images */}
            <div
              className="flex transition-transform duration-500 ease-in-out gap-[2px]"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            >
              {images.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0 min-w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="w-full h-full object-contain rounded-2xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Arrow button */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent ring-1 ring-[#6D4036] bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10"
            aria-label="Next image"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#6D4036]"
            >
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-4 gap-2 pb-5">
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
        Watch. Share. Support <br />— because hunger should never win. Through
        our Grains of Hope initiative, we nourish underprivileged children so
        they can learn, grow, and dream. Together, let’s give them not just a
        meal, but a chance to achieve something extraordinary.
      </h3>
    </div>
  );
}

export default FooterCard;
