"use client"

import { fetchSchedules } from "@/lib/api/scheduleService"
import type { Schedule } from "@/lib/types/schedule"
import { Icon } from "@iconify/react"
import { Kantumruy_Pro } from "next/font/google"
import type React from "react"
import { useEffect, useState } from "react"
import { useFontSize } from "./FontSizeContext"

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
    "2XL": "text-2xl",
    "3XL": "text-3xl",
    "4XL": "text-4xl",
    "5XL": "text-5xl",
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )

  if (error)
    return (
      <div className="text-center p-8 text-red-500">
        <div className="text-4xl mb-4">⚠️</div>
        <div>{error}</div>
      </div>
    )

  if (schedules.length === 0)
    return (
      <div className="text-center p-8 text-gray-400">
        <div className="text-4xl mb-4">📅</div>
        <div>No schedules found</div>
      </div>
    )

  return (
    <div className={`mx-auto px-16 py-8 w-full h-full ${kantumruy.className} ${sizeClasses[fontSize]}`}>
      <div className="space-y-3">
        {Array.isArray(schedules) &&
          schedules.map((schedule, index) => (
            <div key={index} className="border border-amber-50 rounded-lg p-6">
              <div className="grid grid-cols-24 gap-6">
                {/* Date Section */}
                <div className="col-span-2 text-center border-r border-amber-50 pr-6">
                  <div className="text-gray-300 mt-1 mb-2">
                    {schedule.day_of_week === "Monday" && "ច័ន្ទ"}
                    {schedule.day_of_week === "Tuesday" && "អង្គារ"}
                    {schedule.day_of_week === "Wednesday" && "ពុធ"}
                    {schedule.day_of_week === "Thursday" && "ព្រហស្បតិ៍"}
                    {schedule.day_of_week === "Friday" && "សុក្រ"}
                    {schedule.day_of_week === "Saturday" && "សៅរ៍"}
                    {schedule.day_of_week === "Sunday" && "អាទិត្យ"}
                  </div>
                  <div className="text-6xl text-white">
                    {new Date(schedule.meeting_start_date).getDate().toString().padStart(2, "0")}
                  </div>
                </div>

                {/* Time & Location Section */}
                <div className="col-span-4 border-r border-amber-50 pr-4">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center text-gray-300">
                      <Icon icon="mdi:clock-time-five-outline" width="32" height="32" />
                      <span className="pl-4">
                        {schedule.start_time.substring(0, 5)} - {schedule.end_time.substring(0, 5)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Icon icon="mdi:location-on-outline" width="32" height="32" />
                      <span className="pl-4">{schedule.meeting_halls?.kh_name || "No location"}</span>
                    </div>
                  </div>
                </div>

                {/* Schedule Details */}
                <div className="flex flex-col col-span-18 gap-3">
                  <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
                    {schedule.meeting_status.en_name === "Postponed" ? (
                      <span className="text-yellow-500 mt-1.25 w-fit text-center text-base">
                        {schedule.meeting_status.kh_name}
                      </span>
                    ) : (
                      <div
                        className={`w-4 h-4 rounded-full mt-1.25 ${schedule.meeting_status.en_name === "Pending"
                            ? "rounded-full animate-pulseColor"
                            : schedule.meeting_status.en_name === "Confirmed"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                      />
                    )}
                    <h3 className={`text-white ${sizeClasses[fontSize]}`}>
                      {schedule.agenda}
                    </h3>
                  </div>

                  {/* participant */}
                  <div className="flex items-start text-gray-400 pt-2">
                    <Icon icon="mdi:account-star-outline" width="32" height="32" />
                    <div className="pl-4 flex gap-2 flex-wrap items-center">
                      <span className="pr-4">{schedule.creator.kh_name}</span>
                      {/* Show invited avatars up to 10 */}
                      <div className="flex -space-x-4">
                        {schedule.meeting_participants.slice(0, 10).map((p, idx) => (
                          <img
                            key={`avatar-${idx}`}
                            src={p.user.avatar || "/placeholder.svg?height=40&width=40"}
                            alt={p.user.kh_name}
                            className="w-10 h-10 rounded-full border"
                            title={p.user.kh_name}
                          />
                        ))}

                        {/* Show +N avatar if more than 10 invited non-leaders */}
                        {(() => {
                          const extraCount =
                            schedule.meeting_participants.filter(
                              (p) => p.participantType.en_name !== "Leader" && p.is_invited,
                            ).length - 10
                          return extraCount > 0 ? (
                            <div className="w-10 h-10 rounded-full border bg-gray-600 text-white flex items-center justify-center text-xs">
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
          ))}
      </div>
      <style>
        {`.animate-pulseColor{
          0%, 100% { background-color: green; }
          50% { background-color: red; }
          animation: pulseColor 1.5s infinite;
          }
          .status-upcoming {
            background-color: #CFA501;
            }`}
      </style>
    </div>
  )
}

export default Home
