// components/Setting.tsx
"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Kantumruy_Pro } from "next/font/google";
import { useFontSize } from "./FontSizeContext";

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["300", "400", "700"],
});

export default function Setting({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { fontSize, setFontSize } = useFontSize();

  const handleSubmit = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className={`fixed inset-0 flex text-black items-center justify-end bg-black/25 ${kantumruy.className}`}>
      <div className="bg-white w-1/3 h-full">
        <div className="flex justify-between items-center border-b border-gray-300 pt-4 px-4 pb-2">
          <h2 className="text-3xl mb-3">ការកំណត់</h2>
          <button onClick={onClose}>
            <Icon icon="mdi:close" width="32" height="32" />
          </button>
        </div>

        <div className="m-4 space-y-4">
          <div>
            <label className="block text-gray-600 text-xl">ទំហំអក្សរ</label>
            <div className="relative">
              <select
                className="w-full border border-gray-300 rounded-xl p-2 mt-1 h-15 appearance-none cursor-pointer text-xl"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
              >
                <option value="2XL">តូច</option>
                <option value="3XL">មធ្យម</option>
                <option value="4XL">ធំ</option>
                <option value="5XL">ធំជាងគេ</option>
              </select>
              <Icon icon="ic:sharp-arrow-drop-down" width="24" height="24" className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" />
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              className="bg-[#112D64] text-white px-4 py-2 justify-end w-23 rounded-xl cursor-pointer"
              onClick={handleSubmit}
            >
              រួចរាល់
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}