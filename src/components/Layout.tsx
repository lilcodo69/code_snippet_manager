import React from "react";

import NavBar from "./NavBar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white relative">
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>
      <div className="absolute container top-[9.1rem]">
      <main className="  ">{children}</main>

      </div>

    </div>
  );
};

export default Layout;
