// contexts/FontSizeContext.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';

interface FontSizeContextType {
  fontSize: string;
  setFontSize: (size: string) => void;
}

const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: 'XL',
  setFontSize: () => {},
});

export const FontSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontSize, setFontSize] = useState('XL');
  
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