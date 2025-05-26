import { Kantumruy_Pro } from 'next/font/google';
import React from 'react'

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["300", "400", "700"],
}); 

const loading = () => {
  return (
    <div className={`flex justify-center items-center text-2xl ${kantumruy.className}`}>សូមរង់ចាំ...</div>
  )
}

export default loading