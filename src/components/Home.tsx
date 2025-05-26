"use client";

import { Kantumruy_Pro } from "next/font/google";
import type React from "react";
import { useFontSize } from "./FontSizeContext";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import CompactStorageChart from "./StackChart";
import DashboardSection from "./StackChart";

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["300", "400", "700"],
}); // Assuming interfaces are in a types file

interface HomeComponentProps {
  data: ResponseData;
}

export default function Home({ data }: HomeComponentProps) {
  const { fontSize } = useFontSize() as {
    fontSize: "2XL" | "3XL" | "4XL" | "5XL";
  };
  function getRelativeTime(dateString: string): string {
    try {
      // Parse the date string
      const inputDate = new Date(dateString);
      if (isNaN(inputDate.getTime())) {
        throw new Error("Invalid date");
      }

      // Get current time
      const now = new Date();
      const diffInMs = now.getTime() - inputDate.getTime();
      const diffInSeconds = Math.floor(diffInMs / 1000);

      // Convert to appropriate unit
      const units = [
        { name: "ឆ្នាំ", seconds: 60 * 60 * 24 * 365 }, // Year
        { name: "ខែ", seconds: 60 * 60 * 24 * 30 }, // Month
        { name: "ថ្ងៃ", seconds: 60 * 60 * 24 }, // Day
        { name: "ម៉ោង", seconds: 60 * 60 }, // Hour
        { name: "នាទី", seconds: 60 }, // Minute
        { name: "វិនាទី", seconds: 1 }, // Second
      ];

      for (const unit of units) {
        const value = Math.floor(diffInSeconds / unit.seconds);
        if (value >= 1) {
          return `${value} ${unit.name}${value !== 1 ? "" : ""}មុន`;
        }
      }

      return "ឥឡូវនេះ";
    } catch (error) {
      console.error("Invalid date format:", error);
      return "កាលបរិច្ឆេទមិនត្រឹមត្រូវ";
    }
  }

  function calculatePercentage(total: number, value: number): number {
    try {
      if (value < 0 || total < 0) {
        throw new Error("Values cannot be negative");
      }
      const percentage = (value / total) * 100;
      return Number(percentage.toFixed(2)); // Round to 2 decimal places
    } catch (error) {
      console.error("Error calculating percentage:", error);
      return 0; // Return 0 for invalid inputs
    }
  }

  const sizeClasses: Record<"2XL" | "3XL" | "4XL" | "5XL", string> = {
    "2XL": "text-lg md:text-xl lg:text-2xl",
    "3XL": "text-xl md:text-2xl lg:text-3xl",
    "4XL": "text-2xl md:text-3xl lg:text-4xl",
    "5XL": "text-3xl md:text-4xl lg:text-5xl",
  };

  const titleSizeClasses: Record<"2XL" | "3XL" | "4XL" | "5XL", string> = {
    "2XL": "text-xl md:text-2xl lg:text-3xl",
    "3XL": "text-2xl md:text-3xl lg:text-4xl",
    "4XL": "text-3xl md:text-4xl lg:text-5xl",
    "5XL": "text-4xl md:text-5xl lg:text-6xl",
  };
  const getStarColor = (title: string) => {
    if (title === "អគ្គលេខាធិការរង") {
      return "bg-yellow-500";
    } else if (title === "អនុពន្តសភា") {
      return "bg-gray-500";
    }
    return "bg-amber-800"; // default color
  };
  const storageData = [
    { value: 60, name: "Images", itemStyle: { color: "#10b981" } },
    { value: 20, name: "Documents", itemStyle: { color: "#059669" } },
    { value: 30, name: "Videos", itemStyle: { color: "#34d399" } },
    { value: 25, name: "Others", itemStyle: { color: "#6ee7b7" } },
  ];
  return (
    <div
      className={`mx-auto px-2 h-[calc(100vh-160px)] sm:px-4 md:px-8 lg:px-16 py-4 md:py-8 w-full overflow-hidden ${kantumruy.className} ${sizeClasses[fontSize]}`}
    >
      <div className="bg-white/10 border-white/20 mb-8 rounded-2xl sticky z-10">
        <div className="p-3">
          <DashboardSection
            chartData={{
              innerLayer: [
                {
                  value: data.statistic.check_in || 0,
                  name: "ស្កេនចូល",
                  itemStyle: { color: "#22c55e" },
                },
                {
                  value: data.statistic.total - data.statistic.check_in,
                  name: "មិនទាន់ស្កេន",
                  itemStyle: { color: "#f97316" },
                },
              ],
              outerLayer: [
                {
                  value: data.statistic.check_out  || 0,
                  name: "ស្កេនចេញ",
                  itemStyle: { color: "#3b82f6" },
                },
              ],
            }}
            totalMembers={data.statistic.total  || 0}
            stats={[
              {
                icon: (
                  <Icon
                    icon="iconamoon:enter-thin"
                    width="32"
                    height="32"
                    color="green"
                  />
                ),
                value: data.statistic.check_in,
                percentage: calculatePercentage(
                  data.statistic.total,
                  data.statistic.check_in
                ),
                label: "ស្កេនចូល",
                bgColor: "bg-white/20",
              },
              {
                icon: (
                  <Icon
                    icon="mdi:user-clock"
                    width="32"
                    height="32"
                    color="gold"
                  />
                ),
                value: data.statistic.permission,
                label: "ច្បាប់",
                bgColor: "bg-white/20",
              },
              {
                icon: (
                  <Icon
                    icon="mdi:airplane-clock"
                    width="32"
                    height="32"
                    color="gold"
                  />
                ),
                value: data.statistic.mission,
                label: "បេសកកម្ម",
                bgColor: "bg-white/20",
              },
              {
                icon: (
                  <Icon
                    icon="fluent-mdl2:leave"
                    width="24"
                    height="24"
                    color="blue"
                  />
                ),
                value: data.statistic.check_out,
                percentage: calculatePercentage(
                  data.statistic.total,
                  data.statistic.check_out
                ),
                label: "ស្កេនចេញ",
                bgColor: "bg-white/20",
              },
            ]}
          />
        </div>
      </div>
      <div className="flex gap-4 h-[calc(100vh-700px)]">
        <div
          className="w-1/2 h-full overflow-y-auto overflow-x-hidden scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <h3 className="text-3xl mb-4 text-center">ថ្ងៃនេះ</h3>
          <div className="space-y-2">
            {data.todays.length === 0 && (
              <div className="flex justify-center items-center">
                មិនមានទិន្នន័យ
              </div>
            )}
            {data.todays.map((person, index) => {
              const starColor = getStarColor(person.position_name);

              return (
                <div key={person.id} className="bg-white/10 rounded-2xl">
                  <div className="p-4 flex items-center gap-4 m-2">
                    <div className="w-8 h-8 bg-white/10 backdrop-blur-md border-white/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="relative flex-shrink-0">
                      <Image
                        src={`${person.file_domain}${person.file_path}`}
                        alt={person.name_kh || "Profile"}
                        width={70}
                        height={70}
                        className="rounded-full w-[70px] h-[70px] object-cover object-top"
                      />
                      <Icon
                        icon="mdi:star"
                        width="28"
                        height="28"
                        className={`absolute rounded-full left-12 bottom-0 text-white ${starColor}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl truncate">
                          {person.name_kh}
                        </span>
                      </div>
                      <div className="text-xl mt-2">
                        {person.position_name} |{" "}
                        {getRelativeTime(person.terminal_log_datetime)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="min-h-full bg-white w-[1px] flex-shrink-0"></div>
        <div
          className="w-1/2 h-full overflow-y-auto overflow-x-hidden scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <h3 className="text-3xl mb-4 text-center">ម្សិលមិញ</h3>
          <div className="space-y-2">
            {data.yesterdays.length === 0 && (
              <div className="flex justify-center items-center">
                មិនមានទិន្នន័យ
              </div>
            )}
            {data.yesterdays.map((person, index) => {
              const starColor = getStarColor(person.position_name);

              return (
                <div key={person.id} className="bg-white/10 rounded-2xl">
                  <div className="p-4 flex items-center gap-4 m-2">
                    <div className="w-8 h-8 bg-white/10 backdrop-blur-md border-white/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="relative ml-2 flex-shrink-0">
                      <Image
                        src={`${person.file_domain}${person.file_path}`}
                        alt={person.name_kh || "Profile"}
                        width={70}
                        height={70}
                        className="rounded-full w-[70px] h-[70px] object-cover object-top"
                      />
                      <Icon
                        icon="mdi:star"
                        width="28"
                        height="28"
                        className={`absolute rounded-full left-12 bottom-0 text-white ${starColor}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl truncate">
                          {person.name_kh}
                        </span>
                      </div>
                      <div className="text-xl mt-2">
                        {person.position_name} | 8 ម៉ោង
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
