"use client";

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import YouTube from "react-youtube";
import { useEffect, useState } from "react";
import {
  generateUniqueId,
  getMainStats,
  insertSchoolShare,
  insertUTM,
  updatePlayVideo,
} from "@/lib/api";
import Header from "@/components/Header";
import FooterCard from "@/components/FooterCard";
import FooterTop from "@/components/FooterTop";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
export default function Home() {
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const share_id = searchParams.get("share_id");
  const sources = searchParams.get("utm_source") || "direct";
  const [infoCurrentShareId, setinfoCurrentShareId] = useState(null);
  // Loading effect
  useEffect(() => {
    const handleLoad = () => {
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    handleLoad();

    // Check if page is already loaded
    // if (document.readyState === "complete") {
    //   handleLoad();
    // } else {
    //   window.addEventListener("load", handleLoad);
    //   return () => window.removeEventListener("load", handleLoad);
    // }
  }, []);

  const [mainStats, setMainStats] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent updates after unmount

    const fetchStats = async () => {
      const data = await getMainStats();
      if (isMounted) setMainStats(data);
    };

    // Initial fetch
    fetchStats();

    // Fetch every 2 minutes
    const intervalId = setInterval(fetchStats, 2 * 60 * 1000);

    // Cleanup on unmount
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [infoCurrentShareId]);

  useEffect(() => {
    insertUTM(sources);
  }, [searchParams]);
  const [device_id, setdevice_id] = useState(null);
  useEffect(() => {
    const storedId = localStorage.getItem("device_id");
    if (!storedId) {
      const newId = generateUniqueId();
      localStorage.setItem("device_id", newId);
      setdevice_id(newId);
      console.log("Generated and saved new device_id:", newId);
    } else {
      setdevice_id(storedId);
      console.log("Existing device_id found:", storedId);
    }
  }, []);

  const handleVideoPlay = async () => {
    await updatePlayVideo(device_id, share_id);
  };

  const handleShare = async () => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Share");
    }
    if (typeof window !== "undefined") {
      window.gtag_report_conversion();
    }
    // Generate share ID first
    const info = await insertSchoolShare(device_id, share_id);
    console.log("Share info received:", info); // Debug log
    setinfoCurrentShareId(info);

    // Check if we have a valid share_id
    const actualShareId =
      info?.share_id || info?.id || info?.shareId || "default";
    console.log("Using share_id:", actualShareId); // Debug log

    const shareData = {
      title: "#FreedomFromHunger - 1 Share = 1 Meal",
      text: "Thank you for sharing our Grains of Hope campaign video. Your support has helped provide a meal to a child in need, bringing us one step closer to #FreedomFromHunger. Together, we’re turning awareness into action, and making a real difference.",
      url: `https://indiagategrainsofhope.com/?share_id=${actualShareId}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Content shared successfully via native share");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log("Native share failed, showing popup");
          setShowSharePopup(true);
        }
      }
    } else {
      setShowSharePopup(true);
    }
  };

  const handleSocialShare = async (platform) => {
    // Generate share ID first
    const info = await insertSchoolShare(device_id, share_id);
    console.log("Share info received:", info); // Debug log
    setinfoCurrentShareId(info);

    // Check if we have a valid share_id
    const actualShareId =
      info?.share_id || info?.id || info?.shareId || "default";
    console.log("Using share_id:", actualShareId); // Debug log

    // Create shareData with the actual share_id
    const shareData = {
      title: "#FreedomFromHunger - 1 Share = 1 Meal",
      text: "Thank you for sharing our Grains of Hope campaign video. Your support has helped provide a meal to a child in need, bringing us one step closer to #FreedomFromHunger. Together, we’re turning awareness into action, and making a real difference.",
      url: `https://indiagategrainsofhope.com/?share_id=${actualShareId}`,
    };

    const socialShares = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(
        `${shareData.text}\n${shareData.url}`
      )}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareData.url
      )}&quote=${encodeURIComponent(shareData.text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${shareData.text}\n${shareData.url}`
      )}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareData.url
      )}&summary=${encodeURIComponent(shareData.text)}`,
      instagram: `https://www.instagram.com/`,
      snapchat: `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(
        shareData.url
      )}`,
    };

    if (platform === "instagram") {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert("Link copied to clipboard! You can paste it in Instagram.");
      window.open(socialShares[platform], "_blank");
    } else {
      window.open(socialShares[platform], "_blank");
    }
    setShowSharePopup(false);
  };

  const desktopOpts = {
    height: "330",
    width: "550",
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
    },
  };

  const mobileOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
    },
  };

  return (
    <div className=" bg-[url('/common/mobilebg.png')] md:bg-[url('/common/bg.png')] bg-[rgba(255,247,226,0.78)] bg-no-repeat bg-cover">
      {/* Loading Popup */}
      {isLoading && (
        <div className="fixed inset-0  z-[9999] flex items-center justify-center bg-[url('/common/mobilebg.png')] md:bg-[url('/common/bg.png')] bg-[rgba(255,247,226,0.78)] bg-no-repeat bg-cover">
          <div className="text-center">
            {/* Loading Logo */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <div className="absolute inset-0 rounded-full border-4 border-[#6D4036] opacity-20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#6D4036] animate-spin"></div>
                <div className="absolute inset-2 rounded-full bg-[#FFF7E2] flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#6D4036]">#GH</span>
                </div>
              </div>
            </div>

            {/* Loading Text */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#6D4036]">
                Loading #GrainsOfHope
              </h2>
              <p className="text-gray-600">Preparing to make a difference...</p>
            </div>

            {/* Loading Bar */}
            <div className="mt-6 w-64 mx-auto">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#6D4036] h-2 rounded-full animate-pulse"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>

            {/* Animated Dots */}
            <div className="mt-4 flex justify-center space-x-1">
              <div
                className="w-2 h-2 bg-[#6D4036] rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-[#6D4036] rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-[#6D4036] rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Main content section - exactly screen height */}
      <div
        className={` md:h-screen  transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="h-full flex flex-col">
          <header className="flex-shrink-0">
            <Header />
          </header>

          <section className="flex-1  ">
            {/* <div className="hidden lg:block">
              
              <div className="container mx-auto h-full gap-6 flex items-center justify-between px-16  ">
            
                <div className="flex-1 flex  bg-[#682E21] h-[350px] gap-10  rounded-[18px] items-end pr-10">
                  <Image
                    src={`/home/ab.png`}
                    alt={`ab`}
                    width={200}
                    height={364}
                    priority
                  />
                  <div className=" flex items-center h-full">
                    <p className="text-lg md:text-xl regular-text text-white">
                      At India Gate, through our Grains of Hope initiative, we
                      proudly fill many plates every day — but we aim to reach
                      more hungry children. For every share of this video, we’ll
                      provide one meal to a child in need. Your simple act can
                      spark change and bring us closer to a future where every
                      child enjoys #FreedomFromHunger.
                    </p>
                  </div>
                </div>

               
                <div className="flex-shrink-0">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <YouTube
                      videoId="E6nKlNYRv5o"
                      opts={desktopOpts}
                      onPlay={handleVideoPlay}
                      onPause={(event) => console.log("Video paused")}
                      onEnd={(event) => console.log("Video ended")}
                    />
                  </div>
                </div>
              </div>
             

              <div className="flex text-center container  py-1 w-md mx-auto  mt-5  flex-col">
                <strong className="bold-text text-center text-2xl w-full ">
                  1 SHARE = 1 MEAL
                </strong>
                <div className="flex justify-center items-center flex-row-reverse gap-3">
                  <div
                    onClick={handleShare}
                    className="w-1/2 ring bg-[#6D4036] flex justify-center items-center h-14 rounded-full mt-2"
                  >
                    <button className="cursor-pointer text-white text-2xl bold-text">
                      Share
                    </button>
                    <Image
                      src={`/home/share.svg`}
                      alt={`share`}
                      width={24}
                      height={124}
                    />
                  </div>

                  <div
                    className="w-1/2 ring-1   text-[#6D4036] ring-[#6D4036] flex flex-col justify-center h-14 items-center  rounded-full mt-2"
                    style={{ backgroundColor: "rgba(109, 64, 54, 0.1)" }}
                  >
                    <strong className=" text-3xl">
                      {" "}
                      {mainStats?.share_count ? mainStats?.share_count : 123405}
                    </strong>
                    <span className="text-xs regular-text">
                      Shares & counting
                    </span>
                  </div>
                </div>
              </div>
            </div> */}

            <div className=" w-[1200px] mx-auto hidden lg:block">
              <div className=" bg-[#682E21]  rounded-[18px] flex justify-center gap-10 pr-10 ">
                <div className=" flex items-end">
                  <Image
                    src={`/home/ab.png`}
                    alt={`ab`}
                    width={450}
                    height={400}
                    priority
                    className="overflow-hidden h-[400px]   rounded-[18px]"
                  />
                </div>
                <div className="flex-shrink-0 py-7 -ml-8">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <YouTube
                      videoId="E6nKlNYRv5o"
                      opts={desktopOpts}
                      onPlay={handleVideoPlay}
                      onPause={(event) => console.log("Video paused")}
                      onEnd={(event) => console.log("Video ended")}
                    />
                  </div>
                  <div className="flex text-center container  py-1 w-md mx-auto  mt-5  flex-col">
                    <div className="flex justify-center items-center flex-row-reverse gap-3">
                      <div
                        onClick={handleShare}
                        className="w-1/2 ring bg-white text-[#6D4036] flex justify-center items-center h-14 rounded-full mt-2 gap-2"
                      >
                        <button className="cursor-pointer  text-3xl bold-text">
                          Share
                        </button>
                        <Image
                          src={`/home/share-red.svg`}
                          alt={`share`}
                          width={22}
                          height={22}
                          className=""
                        />
                      </div>

                      <div className="w-1/2 ring-1   text-white ring-white flex flex-col justify-center h-14 items-center  rounded-full mt-2">
                        <strong className=" text-3xl">
                          {" "}
                          {mainStats?.share_count
                            ? mainStats?.share_count
                            : 123405}
                        </strong>
                        <span className="text-xs regular-text">
                          Shares & counting
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[550px] py-7">
                  <strong className="bold-text  text-2xl text-white  ">
                    1 SHARE = 1 MEAL
                  </strong>
                  <p className="text-lg md:text-xl regular-text text-white">
                    At India Gate, through our Grains of Hope initiative, we
                    proudly fill many plates every day — but we aim to reach
                    more hungry children. For every share of this video, we’ll
                    provide one meal to a child in need. Your simple act can
                    spark change and bring us closer to a future where every
                    child enjoys #FreedomFromHunger.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden mx-auto h-full flex flex-col container  px-4   gap-4">
              {/* Top row - AB image and text content */}
              <div className="flex  gap-[2px] items-center   bg-[#682E21] rounded-[18px] pt-3 pr-4 ">
                <div className="flex-shrink-0 overflow-hidden ">
                  <Image
                    src={`/home/ab.png`}
                    alt={`ab`}
                    width={145}
                    height={200}
                    priority
                    className="overflow-hidden rounded-[18px]"
                  />
                </div>
                <div className="flex-1 flex items-center   text-center flex-col gap-3 pb-2">
                  {/* <Image
                    src={`/home/logo.png`}
                    alt={`logo`}
                    width={150}
                    height={155}
                    priority
                  /> */}
                  <p className="text-sm regular-text text-white text-left ">
                    At India Gate, through our Grains of Hope initiative, we
                    proudly fill many plates every day — but we aim to reach
                    more hungry children. For every share of this video, we’ll
                    provide one meal to a child in need. Your simple act can
                    spark change and bring us closer to a future where every
                    child enjoys #FreedomFromHunger.
                  </p>
                </div>
              </div>
              <div className="flex text-center container  py-1 w-full  flex-col">
                <strong className="bold-text text-center text-2xl w-full ">
                  1 SHARE = 1 MEAL
                </strong>
                <div className="flex justify-center items-center flex-row-reverse gap-3">
                  <div
                    onClick={handleShare}
                    className="w-1/2 ring bg-[#6D4036] flex justify-center items-center h-14 rounded-full mt-2"
                  >
                    <button className="cursor-pointer text-white text-2xl bold-text">
                      Share
                    </button>
                    <Image
                      src={`/home/share.svg`}
                      alt={`share`}
                      width={24}
                      height={124}
                    />
                  </div>

                  <div
                    className="w-1/2 ring-1   text-[#6D4036] ring-[#6D4036] flex flex-col justify-center h-14 items-center  rounded-full mt-2"
                    style={{ backgroundColor: "rgba(109, 64, 54, 0.1)" }}
                  >
                    <strong className=" text-3xl">
                      {" "}
                      {mainStats?.share_count ? mainStats?.share_count : 123405}
                    </strong>
                    <span className="text-xs regular-text">
                      Shares & counting
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom - Video with rounded corners */}
              <div className="flex-shrink-0 pb-4 ">
                <div className="rounded-2xl overflow-hidden shadow-lg w-full">
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <div className="absolute inset-0">
                      <YouTube
                        videoId="E6nKlNYRv5o"
                        opts={mobileOpts}
                        onPlay={handleVideoPlay}
                        onPause={(event) => console.log("Video paused")}
                        onEnd={(event) => console.log("Video ended")}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Share Popup */}
      {showSharePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 m-4 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Share #GrainsOfHope
              </h3>
              <button
                onClick={() => setShowSharePopup(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <p className="text-gray-600 mb-6 text-sm">
              Share this initiative to help put meals on tables
            </p>

            <div className="grid grid-cols-3 gap-4">
              {/* WhatsApp */}
              <button
                onClick={() => handleSocialShare("whatsapp")}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600">WhatsApp</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleSocialShare("facebook")}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600">Facebook</span>
              </button>

              {/* Twitter/X */}
              <button
                onClick={() => handleSocialShare("twitter")}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600">X (Twitter)</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => handleSocialShare("linkedin")}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center mb-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600">LinkedIn</span>
              </button>

              {/* Instagram */}
              <button
                onClick={() => handleSocialShare("instagram")}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center mb-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600">Instagram</span>
              </button>

              {/* Snapchat */}
              <button
                onClick={() => handleSocialShare("snapchat")}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.958 1.404-5.958s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.346-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.017.001z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600">Snapchat</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer section - starts after screen height */}
      <div
        className={` transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="container mx-auto">
          <footer>
            <FooterCard />
            <FooterTop />
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
}
