"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Icon } from "@iconify/react"
import { Kantumruy_Pro } from "next/font/google"
import Setting from "./Setting" // Import the Setting component

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["300", "400", "700"],
})

// Khmer Numbers & Months
const khmerNumbers = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"]
const khmerMonths = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"]

const convertToKhmerNumbers = (num: number) => {
  return num
    .toString()
    .split("")
    .map((digit) => khmerNumbers[Number.parseInt(digit, 10)] || digit)
    .join("")
}

export default function Navbar() {
  const pathname = usePathname()
  const inactiveLink = "text-2xl"
  const activeLink = inactiveLink + " text-[#CFA501] "
  const [isHovered, setIsHovered] = useState(false)
  const [isSettingOpen, setIsSettingOpen] = useState(false)
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null)
  const [activeTab, setActiveTab] = useState<string>(pathname)
  const [lcdId, setLcdId] = useState<string>("")
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Load LCD ID from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLcdId = localStorage.getItem("lcdId")
      if (savedLcdId) {
        setLcdId(savedLcdId)
      }
    }
  }, [])

  useEffect(() => {
    setCurrentDateTime(new Date())
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("mozfullscreenchange", handleFullscreenChange)
    document.addEventListener("MSFullscreenChange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange)
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        // Enter fullscreen
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen()
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
          await (document.documentElement as any).webkitRequestFullscreen()
        } else if ((document.documentElement as any).mozRequestFullScreen) {
          await (document.documentElement as any).mozRequestFullScreen()
        } else if ((document.documentElement as any).msRequestFullscreen) {
          await (document.documentElement as any).msRequestFullscreen()
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen()
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen()
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen()
        }
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error)
    }
  }

  if (!currentDateTime) return null

  const day = convertToKhmerNumbers(currentDateTime.getDate())
  const month = khmerMonths[currentDateTime.getMonth()]
  const year = convertToKhmerNumbers(currentDateTime.getFullYear())
  const time = currentDateTime.toLocaleTimeString("km-KH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })

  return (
    <>
      {/* Desktop Header */}
      <header className={`flex py-6 px-4 xl:px-6 items-center relative ${kantumruy.className}`}>
        {/* Left Side - Logo */}
        <div className="flex items-center mr-auto">
          <div className="w-16 xl:w-[100px]">
            <Link href="/" className={pathname === "/" ? activeLink : inactiveLink} onClick={() => setActiveTab("/")}>
              <Image
                src="/images/Gold_CDC_logo_V4.png"
                alt="CDC Logo"
                width={80}
                height={80}
                className="w-12 h-12 xl:w-20 xl:h-20"
              />
            </Link>
          </div>
          <Link href="/" className={pathname === "/" ? activeLink : inactiveLink} onClick={() => setActiveTab("/")}>
            <div className="flex flex-col items-center text-[#CFA501]">
              <p className="text-3xl pb-2.5">ក្រុមប្រឹក្សាអភិវឌ្ឍន៍កម្ពុជា</p>
              <p className="upline-text text-base">Council for the Development of Cambodia</p>
            </div>
          </Link>
        </div>

        {/* Center - Navigation */}
        <div className="flex flex-col items-center pt-6 xl:pt-10 absolute left-1/2 transform -translate-x-1/2">
          <span className="p-4 text-4xl text-white text-center">
            {pathname.startsWith("/lcd") ? "ព័ត៍មានកិច្ចប្រជំុ" : "ថ្មីៗពី ក.អ.ក"}
          </span>
          <div className="flex space-x-2">
            {lcdId && (
              <Link
                href={`/lcd/${lcdId}`}
                className={pathname.startsWith("/lcd") ? activeLink : inactiveLink}
                onClick={() => setActiveTab(`/lcd/${lcdId}`)}
              >
                <Icon icon="mdi:calendar-badge" width="28" height="28" className="xl:w-8 xl:h-8" />
              </Link>
            )}
            <Link
              href="/slider"
              className={pathname === "/slider" ? activeLink : inactiveLink}
              onClick={() => setActiveTab("/slider")}
            >
              <Icon icon="mdi:insert-photo" width="28" height="28" className="xl:w-8 xl:h-8" />
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
              <span className="text-md">
                ថ្ងៃទី {day} ខែ {month} ឆ្នាំ {year}
              </span>
              <span className="digital-clock">{time}</span>
            </div>
          ) : (
            // Hovered View (With Icons)
            <div className="flex space-x-2 xl:space-x-4 items-center">
              <div className="flex flex-col items-center">
                <span className="text-md">
                  ថ្ងៃទី {day} ខែ {month} ឆ្នាំ {year}
                </span>
                <span className="digital-clock">{time}</span>
              </div>
              <div className="flex space-x-2 xl:space-x-4 cursor-pointer">
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-[#CFA501] transition-colors duration-200"
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  <Icon
                    icon={isFullscreen ? "material-symbols:zoom-in-map" : "material-symbols:zoom-out-map"}
                    width="36"
                    height="36"
                    className="xl:w-12 xl:h-12"
                  />
                </button>
                <button
                  onClick={() => setIsSettingOpen(true)}
                  className="text-white hover:text-[#CFA501] transition-colors duration-200"
                  title="Settings"
                >
                  <Icon icon="lucide:settings" width="36" height="36" className="xl:w-12 xl:h-12" />
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

        /* Fullscreen styles */
        :fullscreen {
          background-color: black;
        }
        
        :-webkit-full-screen {
          background-color: black;
        }
        
        :-moz-full-screen {
          background-color: black;
        }
        
        :-ms-fullscreen {
          background-color: black;
        }
      `}</style>
    </>
  )
}
