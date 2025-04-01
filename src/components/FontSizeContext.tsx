// contexts/FontSizeContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface FontSizeContextType {
  fontSize: string;
  setFontSize: (size: string) => void;
}

const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: '2XL',
  setFontSize: () => {},
});

export const FontSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontSize, setFontSize] = useState('2XL'); // Default value for SSR
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }
  }, []);
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('fontSize', fontSize);
    }
  }, [fontSize, isMounted]);
  
  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};