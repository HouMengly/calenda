"use client";

import { Icon } from "@iconify/react";
import { Kantumruy_Pro } from "next/font/google";
import React from "react";

const schedules = [
  {
    date: "07",
    time: "08:30 - 09:30",
    location: "DPM Office",
    title:"ទទួលជួបមន្ត្រីបាលីហិតក្លឹប Cherdkiat ATTHAKOR ជាកិច្ចពិភាក្សាការងារ និងកិច្ចសហប្រតិបត្តិការ ផ្នែកការអភិវឌ្ឍន៍",
    attendees: ["ឯកឧត្តម ស៊ុម ចានថុល"],
    status: "upcoming",
  },
  {
    date: "07",
    time: "10:00 - 11:00",
    location: "CIB Meeting Room",
    title: "ជួបពិភាក្សាជាមួយលោក William Fong",
    titleEn: "Meeting with Mr. William Fong",
    attendees: ["ឯកឧត្តម ស៊ុម ចានថុល"],
    status: "ongoing",
  },
  {
    date: "07",
    time: "14:30 - 15:30",
    location: "CDC Hall",
    title: "កិច្ចប្រជុំពិភាក្សាការងារជាមួយក្រុមហ៊ុន BYD AUTO",
    titleEn: "Work discussion meeting with BYD AUTO",
    attendees: ["ឯកឧត្តម ស៊ុម ចានថុល"],
    status: "move to",
  },
  {
    date: "07",
    time: "14:30 - 15:30",
    location: "CDC Hall",
    title: "កិច្ចប្រជុំពិភាក្សាការងារជាមួយក្រុមហ៊ុន BYD AUTO",
    titleEn: "Work discussion meeting with BYD AUTO",
    attendees: ["ឯកឧត្តម ស៊ុម ចានថុល"],
    status: "null",
  },
  {
    date: "07",
    time: "10:00 - 11:00",
    location: "CIB Meeting Room",
    title: "ជួបពិភាក្សាជាមួយលោក William Fong",
    titleEn: "Meeting with Mr. William Fong",
    attendees: ["ឯកឧត្តម ស៊ុម ចានថុល"],
    status: "ongoing",
  },
  {
    date: "07",
    time: "14:30 - 15:30",
    location: "CDC Hall",
    title: "កិច្ចប្រជុំពិភាក្សាការងារជាមួយក្រុមហ៊ុន BYD AUTO",
    titleEn: "Work discussion meeting with BYD AUTO",
    attendees: ["ឯកឧត្តម ស៊ុម ចានថុល"],
    status: "move to",
  },
  {
    date: "07",
    time: "14:30 - 15:30",
    location: "CDC Hall",
    title: "កិច្ចប្រជុំពិភាក្សាការងារជាមួយក្រុមហ៊ុន BYD AUTO",
    titleEn: "Work discussion meeting with BYD AUTO",
    attendees: ["ឯកឧត្តម ស៊ុម ចានថុល"],
    status: "null",
  },
];
const kantumruy = Kantumruy_Pro({
    subsets: ["khmer", "latin"],
    weight: ["300", "400", "700"],
  });

const Home = () => {
  
  return (
    <div className={`mx-auto px-16 py-8 w-full h-100% ${kantumruy.className}`}>
      <div className="space-y-3">
        {schedules.map((schedule, index) => (
          <div key={index} className=" border border-amber-50 rounded-lg p-6">
            <div className="grid grid-cols-24 gap-6">
              {/* Date Section */}
              <div className="col-span-2 text-center border-r border-amber-50 pr-6">
                <div className="text-sm text-gray-300 mt-1">{schedule.date}</div>
                <div className="text-4xl font-bold text-white">
                  {schedule.date}
                </div>
              </div>

              {/* Time & Location Section */}
              <div className="col-span-4 border-r border-amber-50 pr-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Icon icon="mdi:clock-time-five-outline" width="24" height="24" />
                    <span className="text-lg pl-4">{schedule.time}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Icon icon="mdi:location-on-outline" width="24" height="24" />
                    <span className="text-lg pl-4">{schedule.location}</span>
                  </div>
                </div>
              </div>

              {/* Schedule Details */}
              <div className="flex flex-col col-span-16 space-x-3">
                <div className="flex-shrink-0 flex space-x-3">
                  <div
                    className={`flex items-center justify-center mt-1.25 ${
                    schedule.status === "ongoing" ? "w-4 h-4 rounded-full animate-pulseColor"
                      : schedule.status === "move to" ? ""
                      : schedule.status === "upcoming" ? "w-4 h-4 rounded-full status-upcoming"
                      : ""
                    }`}
                    >
                  </div>
                  {schedule.status === "move to" && (<span className="text-2xs text-[#CFA501]">លើកទៅ</span>)}
                  <h3 className="text-white text-xl">
                    {schedule.title}
                  </h3>
                </div>
                {/* Attendees */}
                <div className="flex items-start text-sm text-gray-400">
                      <Icon icon="mdi:account-star-outline" width="24" height="24" />
                      <span className="pt-1 pl-4">{schedule.attendees.join(", ")}</span>
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
