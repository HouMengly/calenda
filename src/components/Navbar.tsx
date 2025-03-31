"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Kantumruy_Pro } from "next/font/google";
import Setting from "./Setting"; // Import the Setting component

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["300", "400", "700"],
});

// Khmer Numbers & Months
const khmerNumbers = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
const khmerMonths = [
  "មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា",
  "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"
];

const convertToKhmerNumbers = (num: number) => {
  return num
    .toString()
    .split("")
    .map((digit) => khmerNumbers[parseInt(digit, 10)] || digit)
    .join("");
};

export default function Navbar() {
  const pathname = usePathname();
  const inactiveLink = "text-2xl";
  const activeLink = inactiveLink + " text-[#CFA501] ";
  const [isHovered, setIsHovered] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false); // Toggle Setting Component

  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<string>(pathname);

  useEffect(() => {
    setCurrentDateTime(new Date());
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!currentDateTime) return null;

  const day = convertToKhmerNumbers(currentDateTime.getDate());
  const month = khmerMonths[currentDateTime.getMonth()];
  const year = convertToKhmerNumbers(currentDateTime.getFullYear());
  const time = currentDateTime.toLocaleTimeString("km-KH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <>
      <header className={`px-6 flex items-center overflow-hidden ${kantumruy.className}`}>
        {/* Left Side - Logo */}
        <div className="flex items-center mr-auto">
          <div className="w-[100px]">
            <Image src="/images/Gold_CDC_logo_V4.png" alt="Sponsor" width={80} height={80} />
          </div>
          <div className="flex flex-col items-center text-[#CFA501]">
            <p className="text-3xl pb-2.5">ក្រុមប្រឹក្សាអភិវឌ្ឍន៍កម្ពុជា</p>
            <p className="upline-text text-l">Council for the Development of Cambodia</p>
          </div>
        </div>

        {/* Center - Navigation */}
        <div className={`flex flex-col items-center pt-10 ${isHovered ? "pr-1" : "pr-33"} space-x-3`}>
          <span className={`p-4 text-4xl ${activeTab === "" ? activeLink : inactiveLink}`}>
            {activeTab === "/" ? "ព័ត៍មានកិច្ចប្រជំុ" : "ថ្មីៗពី ក.អ.ក"}
          </span>
          <div className="flex space-x-2">
            <Link href="/" className={pathname === "/" ? activeLink : inactiveLink} onClick={() => setActiveTab("/")}>
              <Icon icon="mdi:calendar-badge" width="32" height="32" />
            </Link>
            <Link href="/slider" className={pathname === "/slider" ? activeLink : inactiveLink} onClick={() => setActiveTab("/slider")}>
              <Icon icon="mdi:insert-photo" width="32" height="32" />
            </Link>
          </div>
        </div>

        {/* Right Side - Date & Time */}
        <div
          className="flex items-center ml-auto text-white text-3xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!isHovered ? (
            // Default View (Before Hover)
            <div className="flex flex-col items-center">
              <span className="text-md">ថ្ងៃទី {day} ខែ {month} ឆ្នាំ {year}</span>
              <span className="digital-clock">{time}</span>
            </div>
          ) : (
            // Hovered View (With Icons)
            <div className="flex space-x-4 items-center">
              <div className="flex flex-col items-center">
                <span className="text-md">ថ្ងៃទី {day} ខែ {month} ឆ្នាំ {year}</span>
                <span className="digital-clock">{time}</span>
              </div>
              <div className="flex space-x-4 cursor-pointer">
                <Icon icon="material-symbols:zoom-out-map" width="48" height="48" />
                <button onClick={() => setIsSettingOpen(true)} className="cursor-pointer">
                  <Icon icon="lucide:settings" width="48" height="48" />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Settings Modal */}
      {isSettingOpen && <Setting isOpen={isSettingOpen} onClose={() => setIsSettingOpen(false)} />}

      {/* Apply DS-Digital Font */}
      <style jsx global>{`
        .upline-text {
          display: inline-block;
          border-top: 3px solid #CFA501;
          padding-top: 5px; 
        }
        @font-face {
          font-family: 'DS-Digital';
          src: url('/fonts/ds_digital/DS-DIGII.TTF') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        .digital-clock {
          font-family: 'DS-Digital', monospace;
          font-size: 3.5rem;
          color: white;
        }
      `}</style>
    </>
  );
}
