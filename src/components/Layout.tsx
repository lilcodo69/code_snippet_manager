import React from "react";
import { Navbar } from "./NavBar";



type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar/>

      <main className="container mx-auto flex-1 p-4 pt-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;

