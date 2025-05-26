"use client"

import { Kantumruy_Pro } from "next/font/google"
import type React from "react"
import { useFontSize } from "./FontSizeContext"
import Image from "next/image"
import { Icon } from "@iconify/react/dist/iconify.js"
import CompactStorageChart from "./StackChart"
import DashboardSection from "./StackChart"

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["300", "400", "700"],
})

export default function Home() {
  const { fontSize } = useFontSize() as { fontSize: "2XL" | "3XL" | "4XL" | "5XL" }

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
  const Today = {
    leader: [
      {
        rank: 1,
        name: "ហ៊ាង សុទ្ធាយុត្តិ",
        title: "អគ្គលេខាធិការរង",
        times: "10 ម៉ោងមុន",
        avatar: "/images/photo.jpg",
        hasAward: true,
      },
      {
        rank: 2,
        name: "បូរ៉ាត មុនីរ័តន៍",
        title: "អនុពន្តសភា",
        times: "8 ម៉ោងមុន",
        avatar: "/images/photo.jpg",
        hasAward: true,
      },
      {
        rank: 3,
        name: "ខួច គឿន",
        title: "អនុប្រធានាយកដ្ឋាន",
        times: "7 ម៉ោងមុន",
        avatar: "/images/photo.jpg",
        hasAward: true,
      },
    ],
    members: [
      { rank: 4, times: "5 ម៉ោងមុន", avatar: "/images/image.png" },
      { rank: 5, times: "5 ម៉ោងមុន", avatar: "/images/image.png" },
      { rank: 6, times: "5 ម៉ោងមុន", avatar: "/images/image.png" },
      { rank: 7, times: "5 ម៉ោងមុន", avatar: "/images/image.png" },
      { rank: 8, times: "5 ម៉ោងមុន", avatar: "/images/image.png" },
      { rank: 9, times: "5 ម៉ោងមុន", avatar: "/images/image.png" },
      { rank: 10, times: "5 ម៉ោងមុន", avatar: "/images/image.png" },
    ]
  }
  const yesterday = {
    leader: [
      {
        rank: 1,
        name: "ហ៊ាង សុទ្ធាយុត្តិ ",
        title: "អគ្គលេខាធិការរង",
        times: "10 ម៉ោងមុន",
        avatar: "/images/photo.jpg",
        hasAward: true,
      },
      {
        rank: 2,
        name: "បូរ៉ាត មុនីរ័តន៍ ",
        title: "អនុពន្តសភា",
        times: "8 ម៉ោងមុន",
        avatar: "/images/photo.jpg",
        hasAward: true,
      },
      {
        rank: 3,
        name: "ខួច គឿន",
        title: "អនុប្រធានាយកដ្ឋាន",
        times: "7 ម៉ោងមុន",
        avatar: "/images/photo.jpg",
        hasAward: true,
      },
    ],
    members: [
      { rank: 4, times: "5 ម៉ោងមុន", avatar: "/images/image.png" },
      { rank: 5, times: "5 ម៉ោងមុន", avatar: "/images/image.png" },
      { rank: 6, times: "5 ម៉ោងមុន", avatar: "/images/image.png" },
      { rank: 7, times: "5 ម៉ោងមុន", avatar: "/images/image.png" },
      { rank: 8, times: "5 ម៉ោងមុន", avatar: "/images/image.png" },
      { rank: 9, times: "5 ម៉ោងមុន", avatar: "/images/image.png" },
      { rank: 10, times: "5 ម៉ោងមុន", avatar: "/images/image.png" },
    ]
  }
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
  ]
  return (
    <div
      className={` mx-auto px-2 sm:px-4 md:px-8 lg:px-16 py-4 md:py-8 w-full h-full ${kantumruy.className} ${sizeClasses[fontSize]}`}
    >
      <div className="bg-white/10 border-white/20 mb-8 rounded-2xl sticky top-48 z-10">
        <div className="p-3">
          <DashboardSection />
        </div>
      </div>

      {/* Rankings */}
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leadership Rankings */}
          <div className="lg:border-r border-white lg:pr-8 pb-4 mb-4">
            <h3 className="text-3xl mb-4 text-center sticky  bg-amber-700 z-10 py-2">ថ្ងៃនេះ</h3>
            <div className="overflow-y-auto max-h-[80vh]">
              <div className="space-y-3">
                {Today.leader.map((person) => {
                  const starColor = getStarColor(person.title);

                  return (
                    <div key={person.rank} className="bg-white/10 rounded-2xl">
                      <div className="p-4 flex items-center gap-4 m-2">
                        <div className="w-8 h-8 bg-white/10 backdrop-blur-md border-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                          {person.rank}
                        </div>
                        <div className="relative ml-2">
                          <Image
                            src={person.avatar || "/placeholder.svg"}
                            alt={person.name || "Profile"}
                            width={70}
                            height={70}
                            className="rounded-full"
                          />
                          <Icon
                            icon="mdi:star"
                            width="28"
                            height="28"
                            className={`absolute rounded-full left-12 bottom-0 text-white ${starColor}`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-3xl">{person.name}</span>
                          </div>
                          <div className="text-xl mt-2">
                            {person.title} | {person.times}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="space-y-3">
              {Today.members.map((person) => (
                <div key={person.rank}>
                  <div className="p-4 flex items-center gap-4 m-2">
                    <div className="w-8 h-8 bg-white/10 border-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      {person.rank}
                    </div>
                    <Image
                      src={person.avatar || "/placeholder.svg"}
                      alt={"Profile"}
                      width={55}
                      height={55}
                      className="rounded-full ml-2"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{person.times}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Executive Rankings */}
          <div className="lg:pr-8 pb-4 mb-4">
            <h3 className="text-3xl mb-4 text-center">ម្សិលមិញ</h3>
            <div className="space-y-3">
              {yesterday.leader.map((person) => {
                const starColor = getStarColor(person.title);
                return (
                  <div key={person.rank} className="bg-white/10 rounded-2xl">
                    <div className="p-4 flex items-center gap-4 m-2">
                      <div className="w-8 h-8 bg-white/10 backdrop-blur-md border-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                        {person.rank}
                      </div>
                      <div className="relative ml-2">
                        <Image
                          src={person.avatar || "/placeholder.svg"}
                          alt={person.name || "Profile"}
                          width={70}
                          height={70}
                          className="rounded-full"
                        />
                        <Icon
                          icon="mdi:star"
                          width="28"
                          height="28"
                          className={`absolute rounded-full left-12 bottom-0 text-white ${starColor}`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl">{person.name}</span>
                        </div>
                        <div className="text-xl mt-2">
                          {person.title} | {person.times}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-3">
              {yesterday.members.map((person) => (
                <div key={person.rank}>
                  <div className="p-4 flex items-center gap-4 m-2">
                    <div className="w-8 h-8 bg-white/10 backdrop-blur-md border-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                      {person.rank}
                    </div>
                    <Image
                      src={person.avatar || "/placeholder.svg"}
                      alt={"Profile"}
                      width={55}
                      height={55}
                      className="rounded-full ml-2"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{person.times}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};