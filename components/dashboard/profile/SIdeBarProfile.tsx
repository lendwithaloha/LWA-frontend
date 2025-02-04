'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Avatar } from '@mui/material';

const tabs = [
  { id: 0, label: 'My Account', href: '/dashboard/profile/personal-detail' },
  { id: 1, label: 'Declaration', href: '/dashboard/profile/declaration' },
  { id: 2, label: 'Documents', href: '/dashboard/profile/document' },
  { id: 3, label: 'Security', href: '/dashboard/profile/setting' },
];

const ProfileSideBar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="lg:sticky lg:top-4">
      {/* Horizontal tabs in mobile, vertical in desktop */}
      <div className="lg:hidden flex justify-center gap-2 mb-4 overflow-x-auto scrollbar-hide bg-white shadow-sm py-2 rounded-lg">
        {tabs.map((tab) => (
          <Link key={tab.id} href={tab.href} passHref>
            <span
              className={`px-3 py-2 whitespace-nowrap rounded-md cursor-pointer text-sm
              ${pathname === tab.href
                ? 'bg-sky-100 text-sky-600 font-medium'
                : 'hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex justify-center items-center flex-col">
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: "grey.300",
            mx: "auto",
          }}
          className="mb-6"
        />
        <nav className="flex flex-col gap-2 w-48">
          {tabs.map((tab) => (
            <Link key={tab.id} href={tab.href} passHref>
              <span
                className={`px-4  py-2 flex justify-center rounded-md transition-colors duration-200 ease-in-out cursor-pointer
                ${pathname === tab.href
                  ? 'bg-sky-100 text-sky-600 font-medium'
                  : 'hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ProfileSideBar;
