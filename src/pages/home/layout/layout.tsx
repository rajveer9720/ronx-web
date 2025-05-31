// src/layouts/RootLayout.tsx
import React from "react";
import "../css/style.css";
import Header from "./Header";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-950 font-inter text-base text-gray-200 antialiased">
      <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
