"use client";

import { fetchSchedules } from "@/lib/api/scheduleService";
import { Schedule } from "@/lib/types/schedule";
import { Icon } from "@iconify/react";
import { Kantumruy_Pro } from "next/font/google";
import React, { useEffect, useState } from "react";
import { useFontSize } from "./FontSizeContext";

//   {
//     date: "07",
//     time: "08:30 - 09:30",
//     location: "DPM Office",
//     title:"ទទួលជួបមន្ត្រីបាលីហិតក្លឹប Cherdkiat ATTHAKOR ជាកិច្ចពិភាក្សាការងារ និងកិច្ចសហប្រតិបត្តិការ ផ្នែកការអភិវឌ្ឍន៍",
//     attendees: ["ឯកឧត្តម ស៊ុម ចានថុល"],
//     status: "upcoming",
//   },
//   {
//     date: "07",
//     time: "10:00 - 11:00",
//     location: "CIB Meeting Room",
//     title: "ជួបពិភាក្សាជាមួយលោក William Fong",
//     titleEn: "Meeting with Mr. William Fong",
//     attendees: ["ឯកឧត្តម ស៊ុម ចានថុល"],
//     status: "ongoing",
//   },
//   {
//     date: "07",
//     time: "14:30 - 15:30",
//     location: "CDC Hall",
//     title: "កិច្ចប្រជុំពិភាក្សាការងារជាមួយក្រុមហ៊ុន BYD AUTO",
//     titleEn: "Work discussion meeting with BYD AUTO",
//     attendees: ["ឯកឧត្តម ស៊ុម ចានថុល"],
//     status: "move to",
//   },
//   {
//     date: "07",
//     time: "14:30 - 15:30",
//     location: "CDC Hall",
//     title: "កិច្ចប្រជុំពិភាក្សាការងារជាមួយក្រុមហ៊ុន BYD AUTO",
//     titleEn: "Work discussion meeting with BYD AUTO",
//     attendees: ["ឯកឧត្តម ស៊ុម ចានថុល"],
//     status: "null",
//   },
//   {
//     date: "07",
//     time: "10:00 - 11:00",
//     location: "CIB Meeting Room",
//     title: "ជួបពិភាក្សាជាមួយលោក William Fong",
//     titleEn: "Meeting with Mr. William Fong",
//     attendees: ["ឯកឧត្តម ស៊ុម ចានថុល"],
//     status: "ongoing",
//   },
//   {
//     date: "07",
//     time: "14:30 - 15:30",
//     location: "CDC Hall",
//     title: "កិច្ចប្រជុំពិភាក្សាការងារជាមួយក្រុមហ៊ុន BYD AUTO",
//     titleEn: "Work discussion meeting with BYD AUTO",
//     attendees: ["ឯកឧត្តម ស៊ុម ចានថុល"],
//     status: "move to",
//   },
//   {
//     date: "07",
//     time: "14:30 - 15:30",
//     location: "CDC Hall",
//     title: "កិច្ចប្រជុំពិភាក្សាការងារជាមួយក្រុមហ៊ុន BYD AUTO",
//     titleEn: "Work discussion meeting with BYD AUTO",
//     attendees: ["ឯកឧត្តម ស៊ុម ចានថុល"],
//     status: "null",
//   },
// ];
const kantumruy = Kantumruy_Pro({
    subsets: ["khmer", "latin"],
    weight: ["300", "400", "700"],
  });

const Home: React.FC<any> = () => {

  //// Create size classes mapping
  const { fontSize } = useFontSize() as { fontSize: 'XL' | '2XL' | '3XL' | '4XL' };
  const sizeClasses: Record<'XL' | '2XL' | '3XL' | '4XL', string> = {
    'XL': 'text-xl',
    '2XL': 'text-2xl',
    '3XL': 'text-3xl',
    '4XL': 'text-4xl',
  };

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSchedules();
      console.log("Loaded data:", data);
      setSchedules(data);
    };
    
    loadData();
  }, []);

  return (
    <div className={`mx-auto px-16 py-8 w-full h-100% ${kantumruy.className} ${sizeClasses[fontSize]}`}>
      <div className="space-y-3">
        {schedules.map((schedule, index) => (  // Changed from data to schedules
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
                  {new Date(schedule.meeting_date).getDate().toString().padStart(2, '0')}
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
                    <span className="pl-4">
                      {schedule.meeting_halls?.kh_name || "No location"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Schedule Details */}
              <div className="flex flex-col col-span-16 space-x-3">
                <div className="flex-shrink-0 flex space-x-3">
                  <div
                    className={`flex items-center justify-center mt-1.25 ${
                      schedule.meeting_status.en_name === "Pending" 
                        ? "w-8 h-8 rounded-full animate-pulseColor"
                        : "w-8 h-8 rounded-full status-upcoming"
                    }`}
                  />
                  <h3 className={`text-white pt-2 ${sizeClasses[fontSize]}`}>
                    {schedule.agenda}
                  </h3>
                </div>
                
                <div className="flex items-start text-gray-400 pt-2">
                  <Icon icon="mdi:account-star-outline" width="32" height="32" />
                  <span className="pt-2 pl-4">
                    {schedule.meeting_participants
                      .map(p => p.user.kh_name)
                      .join(", ")}
                  </span>
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
  );
};

export default Home;
