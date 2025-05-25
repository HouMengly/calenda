"use client"

import { fetchSchedules } from "@/lib/api/scheduleService"
import type { Schedule } from "@/lib/types/schedule"
import { Icon } from "@iconify/react"
import { Kantumruy_Pro } from "next/font/google"
import type React from "react"
import { useEffect, useState } from "react"
import { useFontSize } from "./FontSizeContext"
import Image from "next/image"

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["300", "400", "700"],
})

const Home: React.FC<{ lcd_id: string }> = ({ lcd_id }) => {
  const { fontSize } = useFontSize() as { fontSize: "2XL" | "3XL" | "4XL" | "5XL" }
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const sizeClasses: Record<"2XL" | "3XL" | "4XL" | "5XL", string> = {
    "2XL": "text-lg md:text-xl lg:text-2xl",
    "3XL": "text-xl md:text-2xl lg:text-3xl",
    "4XL": "text-2xl md:text-3xl lg:text-4xl",
    "5XL": "text-3xl md:text-4xl lg:text-5xl",
  }

  const titleSizeClasses: Record<"2XL" | "3XL" | "4XL" | "5XL", string> = {
    "2XL": "text-xl md:text-2xl lg:text-3xl",
    "3XL": "text-2xl md:text-3xl lg:text-4xl",
    "4XL": "text-3xl md:text-4xl lg:text-5xl",
    "5XL": "text-4xl md:text-5xl lg:text-6xl",
  }

  useEffect(() => {
    if (!lcd_id) {
      setError("LCD ID is required.")
      setLoading(false)
      return
    }

    const loadSchedules = async () => {
      try {
        setLoading(true)
        const data = await fetchSchedules(lcd_id)
        setSchedules(data)
        console.log("Loaded schedules:", data)
      } catch (err) {
        setError("Failed to load schedules")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadSchedules()
  }, [lcd_id])

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )

  if (error)
    return (
      <div className="text-center p-4 md:p-8 text-red-500">
        <div className="text-2xl md:text-4xl mb-4">⚠️</div>
        <div className="text-sm md:text-base">{error}</div>
      </div>
    )

  if (schedules.length === 0)
    return (
      <div className="text-center p-4 md:p-8 text-gray-400">
        <div className="text-2xl md:text-4xl mb-4">📅</div>
        <div className="text-sm md:text-base">No schedules found</div>
      </div>
    )

  return (
    <div
      className={` mx-auto px-2 sm:px-4 md:px-8 lg:px-16 py-4 md:py-8 w-full h-full ${kantumruy.className} ${sizeClasses[fontSize]}`}
    >
      <div className="space-y-2 md:space-y-3">
        {Array.isArray(schedules) &&
          schedules.map((schedule, index) => (
            <div key={index} className="border border-amber-50 rounded-lg p-3 md:p-6">
              {/* Mobile Layout (< md) */}
              <div className="block md:hidden space-y-4">
                {/* Date and Status Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <div className="text-gray-300 text-xs mb-1">
                        {schedule.day_of_week === "Monday" && "ច័ន្ទ"}
                        {schedule.day_of_week === "Tuesday" && "អង្គារ"}
                        {schedule.day_of_week === "Wednesday" && "ពុធ"}
                        {schedule.day_of_week === "Thursday" && "ព្រហស្បតិ៍"}
                        {schedule.day_of_week === "Friday" && "សុក្រ"}
                        {schedule.day_of_week === "Saturday" && "សៅរ៍"}
                        {schedule.day_of_week === "Sunday" && "អាទិត្យ"}
                      </div>
                      <div className="text-2xl text-white font-bold">
                        {new Date(schedule.meeting_start_date).getDate().toString().padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center">
                    {schedule.meeting_status.en_name === "Postponed" ? (
                      <span className="text-yellow-500 text-xs px-2 py-1 rounded-full bg-yellow-500/10">
                        {schedule.meeting_status.kh_name}
                      </span>
                    ) : (
                      <div
                        className={`w-3 h-3 rounded-full ${
                          schedule.meeting_status.en_name === "Pending"
                            ? "animate-pulseColor"
                            : schedule.meeting_status.en_name === "Confirmed"
                              ? "bg-green-500"
                              : "bg-red-500"
                        }`}
                      />
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-white ${titleSizeClasses[fontSize]} leading-tight`}>{schedule.agenda}</h3>

                {/* Time and Location */}
                <div className="space-y-2">
                  <div className="flex items-center text-gray-300 text-sm">
                    <Icon icon="mdi:clock-time-five-outline" width="20" height="20" />
                    <span className="pl-2">
                      {schedule.start_time.substring(0, 5)} - {schedule.end_time.substring(0, 5)}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Icon icon="mdi:location-on-outline" width="20" height="20" />
                    <span className="pl-2">{schedule.meeting_halls?.kh_name || "No location"}</span>
                  </div>
                </div>

                {/* Participants */}
                <div className="flex items-start text-gray-400">
                  <Icon icon="mdi:account-star-outline" width="20" height="20" className="mt-1" />
                  <div className="pl-2 flex flex-col gap-2">
                    <span className="text-2xl">{schedule.creator.kh_name}</span>
                    <div className="flex -space-x-2">
                      {schedule.meeting_participants.slice(0, 6).map((p, idx) => (
                        <Image
                          key={`avatar-${idx}`}
                          width={32}
                          height={32}
                          src="https://file-v4-api.uat.camcyber.com/static/avatar.png"
                          alt={p.user.kh_name}
                          className="w-8 h-8 rounded-full border border-gray-600"
                          title={p.user.kh_name}
                        />
                      ))}
                      {(() => {
                        const extraCount =
                          schedule.meeting_participants.filter(
                            (p) => p.participantType.en_name !== "Leader" && p.is_invited,
                          ).length - 6
                        return extraCount > 0 ? (
                          <div className="w-8 h-8 rounded-full border border-gray-600 bg-gray-600 text-white flex items-center justify-center text-xs">
                            +{extraCount}
                          </div>
                        ) : null
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout (>= md) */}
              <div className="hidden md:block">
                <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-24 gap-4 lg:gap-6">
                  {/* Date Section */}
                  <div className="lg:col-span-2 xl:col-span-2 text-center lg:border-r border-amber-50 lg:pr-4 xl:pr-6">
                    <div className="text-gray-300 text-2xl mb-2">
                      {schedule.day_of_week === "Monday" && "ច័ន្ទ"}
                      {schedule.day_of_week === "Tuesday" && "អង្គារ"}
                      {schedule.day_of_week === "Wednesday" && "ពុធ"}
                      {schedule.day_of_week === "Thursday" && "ព្រហស្បតិ៍"}
                      {schedule.day_of_week === "Friday" && "សុក្រ"}
                      {schedule.day_of_week === "Saturday" && "សៅរ៍"}
                      {schedule.day_of_week === "Sunday" && "អាទិត្យ"}
                    </div>
                    <div className="text-4xl lg:text-5xl xl:text-6xl text-white font-bold">
                      {new Date(schedule.meeting_start_date).getDate().toString().padStart(2, "0")}
                    </div>
                  </div>

                  {/* Time & Location Section */}
                  <div className="lg:col-span-3 xl:col-span-4 lg:border-r border-amber-50 lg:pr-4 justify-between items-center flex-col">
                    <div className="flex flex-col space-y-3 ">
                      <div className="flex items-center text-gray-300">
                        <Icon icon="mdi:clock-time-five-outline" width="24" height="24" className="lg:w-8 lg:h-8" />
                        <span className="pl-2 lg:pl-4 text-xl lg:text-2xl">
                          {schedule.start_time.substring(0, 5)} - {schedule.end_time.substring(0, 5)}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Icon icon="mdi:location-on-outline" width="24" height="24" className="lg:w-8 lg:h-8" />
                        <span className="pl-2 lg:pl-4 text-sm lg:text-2xl">
                          {schedule.meeting_halls?.kh_name || "No location"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Details */}
                  <div className="lg:col-span-7 xl:col-span-18 flex flex-col gap-3">
                    <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
                      {schedule.meeting_status.en_name === "Postponed" ? (
                        <span className="text-yellow-500 mt-1 w-fit text-center text-sm lg:text-base px-2 py-1 rounded-full bg-yellow-500/10">
                          {schedule.meeting_status.kh_name}
                        </span>
                      ) : (
                        <div
                          className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full mt-1.5 ${
                            schedule.meeting_status.en_name === "Pending"
                              ? "animate-pulseColor"
                              : schedule.meeting_status.en_name === "Confirmed"
                                ? "bg-green-500"
                                : "bg-red-500"
                          }`}
                        />
                      )}
                      <h3 className={`text-white ${titleSizeClasses[fontSize]} leading-tight`}>{schedule.agenda}</h3>
                    </div>

                    {/* Participants */}
                    <div className="flex items-start text-gray-400 pt-2">
                      <Icon icon="mdi:account-star-outline" width="24" height="24" className="lg:w-8 lg:h-8" />
                      <div className="pl-2 lg:pl-4 flex gap-2 flex-wrap items-center">
                        <span className="pr-2 lg:pr-4 text-xl lg:text-2xl">{schedule.creator.kh_name}</span>
                        <div className="flex -space-x-2 lg:-space-x-4">
                          {schedule.meeting_participants.slice(0, 8).map((p, idx) => (
                            <Image
                              key={`avatar-${idx}`}
                              width={40}
                              height={40}
                              src="https://file-v4-api.uat.camcyber.com/static/avatar.png"
                              alt={p.user.kh_name}
                              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-gray-600"
                              title={p.user.kh_name}
                            />
                          ))}
                          {(() => {
                            const extraCount =
                              schedule.meeting_participants.filter(
                                (p) => p.participantType.en_name !== "Leader" && p.is_invited,
                              ).length - 8
                            return extraCount > 0 ? (
                              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-gray-600 bg-gray-600 text-white flex items-center justify-center text-xs">
                                +{extraCount}
                              </div>
                            ) : null
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <style jsx>{`
        @keyframes pulseColor {
          0%, 100% { 
            background-color: #10b981; 
          }
          50% { 
            background-color: #ef4444; 
          }
        }
        .animate-pulseColor {
          animation: pulseColor 1.5s infinite;
        }
      `}</style>
    </div>
  )
}

export default Home
