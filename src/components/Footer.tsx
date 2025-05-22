"use client";

import React from "react";
import { Kantumruy_Pro } from "next/font/google";
import Image from "next/image";

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["300", "400", "700"],
});
const Footer = () => {

  
  return (
    <footer className={` footer absolute bottom-0 w-full bg-[rgba(58,62,139,0.43)] flex items-center overflow-hidden ${kantumruy.className}`}>
      <div className="flex bg-blue-900 items-center justify-center w-20% h-20% p-2">
        <Image src="/images/cdc News-logo-v1.png" alt="Logo" width={50} height={50} />
      </div>
      <div className="marquee flex items-center text-amber-50">
        <span className="marquee-text text-2xl whitespace-nowrap">
        ខ្លីៗអំពីគម្រោងវិនិយោគដែលបានអនុម័តដោយ ក្រុមប្រឹក្សាអភិវឌ្ឍន៍កម្ពុជា ក្នុងខែកុម្ភៈ ឆ្នាំ២០២៥ 
        | គម្រោងវិនិយោគសរុប៖ ៤៤គម្រោង ទុនវិនិយោគសរុប៖ ប្រមាណ ៣២១លានដុល្លារអាម៉េរិក 
        | បង្កើតការងារបាន៖ ប្រមាណ ២៥ពាន់កន្លែង​ 
        | គម្រោងវិនិយោគនៅក្រៅតំបន់សេដ្ឋកិច្ចពិសេស៖ ២១គម្រោង |
        </span>
      </div>

      {/* Additional Style for the Scrolling Effect */}
      <style jsx>{`
        .marquee {
          overflow: hidden;
          white-space: nowrap;
          
          flex-grow: 1;
        }

        .marquee-text {
          display: inline-block;
          animation: scroll 30s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
