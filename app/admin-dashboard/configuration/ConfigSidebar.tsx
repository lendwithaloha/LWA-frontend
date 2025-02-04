'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Avatar } from '@mui/material';

const tabs = [
  { id: 0, label: 'Document Type', href: '/admin-dashboard/configuration/document-type' },
  { id: 1, label: 'Declaration', href: '/admin-dashboard/configuration/declaration' },

];

const ConfigSidebar: React.FC = () => {
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
      <div className="hidden lg:flex  flex-col">
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

export default ConfigSidebar;
