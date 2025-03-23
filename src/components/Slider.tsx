"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import React from "react";

// Array of Slide Data
const slides = [
  { id: 1, image: "/images/slide1.jpg" },
  { id: 2, image: "/images/slide2.jpg" },
  { id: 3, image: "/images/slide3.jpg" },
  { id: 4, image: "/images/slide4.jpg" },
  { id: 5, image: "/images/slide5.jpg" },
];

export default function Slider() {
  return (
    <div className="flex justify-center items-center h-[80vh] overflow-hidden">
      {/* Swiper Container */}
      <Swiper
        slidesPerView={3}
        spaceBetween={50}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="w-[100%] lg:w-[80%]"
      >
        {/* Render Slides */}
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div
                className={`flex justify-center items-center transition-all duration-500 ${
                  isActive ? "scale-100 " : "scale-40 opacity-100"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  width={800}
                  height={800}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Styling */}
      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          background-color: white !important; /* White dots */
          width: 12px;
          height: 12px;
          opacity: 1;
          transition: all 0.3s ease;
          
        }

        /* Active bullet styles */
        :global(.swiper-pagination-bullet-active) {
          background-color: gold !important; /* Gold dot */
          width: 12px;
          height: 12px;
          opacity: 1;
          border-radius: 50%;
          position: relative;
          
        }

        /* Ring circle around the dot */
        :global(.swiper-pagination-bullet-active::before) {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          width: 20px;
          height: 20px;
          border: 1px solid gold;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
