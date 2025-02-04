"use client";

import React, { ReactNode } from "react";
import SettingSideBar from "@/components/dashboard/setting/SettingSideBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative  flex border-2 h-[830px] border-gray-6  m-6  rounded  ">
      {/* Sidebar */}
      <SettingSideBar />

      {/* Main Content Area */}
      <div className="flex-1  ">{children}</div>
    </div>
  );
};

export default Layout;
