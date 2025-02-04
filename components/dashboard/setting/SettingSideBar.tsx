"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const tabs = [
  { id: 0, label: "Account", href: "/dashboard/settings/account" },
  { id: 1, label: "Theme", href: "/dashboard/settings/theme" },
  { id: 2, label: "Documents", href: "/dashboard/settings/document" },
];

const SettingSideBar: React.FC = () => {
  const pathname = usePathname();

  const activePath =
    pathname === "/dashboard/settings"
      ? "/dashboard/settings/account"
      : pathname;

  return (
    <div className="sticky p-5 w-[268px]  border-r-2 border-gray-6 flex flex-col gap-2.5">
      {tabs.map((tab) => (
        <Link key={tab.id} href={tab.href} passHref legacyBehavior>
          <a
            className={`rounded-md w-full p-2.5 text-left hover:bg-gray-200 ${
              activePath === tab.href ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            {tab.label}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default SettingSideBar;
