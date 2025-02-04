"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setActiveLink, toggleSidebar } from "@/store/dashboard/sidebarSlice";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "@/public/images/loha.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ArrowRight, LogoutOutlined } from "@mui/icons-material";
import { setShowTour, setHasCompletedTour } from "@/store/onboarding/OnboardingSlice";
import { clearTokens } from "@/utils/cookie";
import { clearLocalStorage } from "@/utils/localStorage";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  href?: string;
  dataTour: string;
  subItems?: { name: string; href: string }[];
}

const mainMenuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    href: "/dashboard",
    dataTour: "dashboard",
  },
  {
    name: "Loans",
    icon: <RequestPageIcon />,
    dataTour: "loans",
    subItems: [
      { name: "Loan Requests", href: "/dashboard/new-loan" },
      { name: "Active Loans", href: "/dashboard/loan" },
      { name: "Closed Loans", href: "/dashboard/closed-loan" },
    ],
  },
  {
    name: "Borrower Profile",
    icon: <GroupIcon />,
    dataTour: "borrower-profile",
    subItems: [
      { name: "My Profile", href: "/dashboard/profile/personal-detail" },
      { name: "My Team", href: "/dashboard/team" },
      { name: "Schedule of Real Estate", href: "/dashboard/real-estate-schedule/owned" },
    ],
  },
];

const subMenuItems: MenuItem[] = [

  {
    name: "Broker Application",
    icon: <SettingsIcon />,
    href: "/dashboard/broker",
    dataTour: "broker-application",
  },
  {
    name: "Settings",
    icon: <SettingsIcon />,
    href: "/dashboard/settings",
    dataTour: "settings",
  },
  {
    name: "Membership",
    icon: <GroupIcon />,
    href: "/dashboard/membership",
    dataTour: "membership",
  },
  {
    name: "Refer a Friend",
    icon: <PersonAddAlt1Icon />,
    href: "/dashboard/refer",
    dataTour: "refer",
  },
];

function logoutUser() {
  clearTokens();
  clearLocalStorage();
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isOpen, activeLink } = useSelector((state: RootState) => state.sidebar);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleStartTour = () => {
    dispatch(setShowTour(true));
    dispatch(setHasCompletedTour(false));
    if (!isOpen) {
      dispatch(toggleSidebar());
    }
  };

  useEffect(() => {
    // Flatten all menu items
    const allItems = mainMenuItems
      .flatMap((item) => (item.subItems ? [item, ...item.subItems] : item))
      .concat(subMenuItems);

    const currentItem = allItems.find((item) => item.href === pathname);

    if (currentItem) {
      dispatch(setActiveLink(currentItem.name));

      const parentItem = mainMenuItems.find((menu) =>
        menu.subItems?.some((subItem) => subItem.href === pathname)
      );
      if (parentItem) {
        setOpenDropdown(parentItem.name);
      }
    }
  }, [pathname, dispatch]);

  const handleToggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const renderMenuItems = (items: MenuItem[]) => (
    <ul>
      {items.map((item) => (
        <li key={item.name} className="text-gray-600">
          {item.subItems ? (
            <div>
              <div
                className={`flex items-center px-4 py-2 mx-2 text-sm font-medium cursor-pointer ${activeLink.startsWith(item.name)
                  ? "bg-sky-100 text-primaryColor rounded-md border-r-4 border-r-sky-600"
                  : ""
                  }`}
                onClick={() => handleToggleDropdown(item.name)}
                data-tour={item.dataTour}
              >
                <span className="mr-3">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
                <ArrowDropDownIcon
                  className={`transform transition-transform ${openDropdown === item.name ? "rotate-180" : ""
                    }`}
                />
              </div>
              <ul className={`pl-8 ${openDropdown === item.name ? "block" : "hidden"}`}>
                {item.subItems.map((subItem) => (
                  <li key={subItem.name} className="relative">
                    <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-gray-400" />
                    <Link href={subItem.href} passHref legacyBehavior>
                      <a
                        className={`flex items-center px-4 py-2 mr-2 my-1 text-sm hover:bg-sky-100 ${activeLink.startsWith(subItem.name)
                          ? "bg-sky-100 text-primaryColor rounded-md border-r-4 border-r-sky-600"
                          : ""
                          } transition-colors duration-200`}
                      >
                        {!isOpen && item.icon}
                        {isOpen && <span>{subItem.name}</span>}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Link href={item.href || "#"} passHref legacyBehavior>
              <a
                className={`flex items-center px-4 py-2 my-2 mx-2 text-sm hover:bg-sky-100 ${activeLink.startsWith(item.name)
                  ? "bg-sky-100 text-primaryColor rounded-md border-r-4 border-r-sky-600"
                  : ""
                  } transition-colors duration-200`}
                data-tour={item.dataTour}
              >
                <span className="mr-3">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </a>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`bg-gray-200 text-black overflow-y-auto h-screen transition-all duration-300 ${isOpen ? "w-64" : "w-24"
        } min-h-screen flex flex-col`}
    >
      <div className="h-20 mx-2 flex items-center border-b-2">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component="div">
            <Link href="/" style={{ textDecoration: "none", color: "#000", fontWeight: "bold" }}>
              <Image src={Logo} alt="lend with loha" className="w-12" />
            </Link>
          </Typography>
        </Box>

        {isOpen && (
          <div className="ml-2 overflow-hidden">
            <h1 className="text-xl font-medium animate-fade-slide-in">
              Lend with <span className="block text-primaryColor">Aloha</span>
            </h1>
          </div>
        )}
      </div>
      <nav className="flex-1 mt-10 flex flex-col justify-between">
        <div>
          <h2 className={`px-4 py-2 text-sm font-light text-gray-500 ${isOpen ? "" : "sr-only"}`}>
            Main Menu
          </h2>
          {renderMenuItems(mainMenuItems)}
          <h2 className={`px-4 py-2 text-sm font-light text-gray-500 ${isOpen ? "" : "sr-only"}`}>
            Sub Menu
          </h2>
          {renderMenuItems(subMenuItems)}
        </div>

        <div className="flex flex-col  mx-5 mb-5">
          <Link
            href="/admin-dashboard"
            className={`${isOpen
              ? "px-4 py-2 flex items-center gap-2 text-start w-3/4 border-primaryColor text-primaryColor rounded relative group"
              : "hidden"
              }`}
          >
            <span>Admin</span>
            <span className="ml-auto transition-opacity duration-200 opacity-0 group-hover:opacity-100">
              <ArrowRight />
            </span>
          </Link>
          <button
            onClick={handleStartTour}
            className={`${isOpen
              ? "px-4 py-2 flex items-center gap-2 text-start w-3/4 border-primaryColor text-primaryColor rounded relative group"
              : "hidden"
              }`}
          >
            <span>Onboarding</span>
            <span className="ml-auto transition-opacity duration-200 opacity-0 group-hover:opacity-100">
              <ArrowRight />
            </span>
          </button>


          <Link href="/login" passHref legacyBehavior>
            <a
              className="flex items-center px-4 py-2 mx-2 text-sm text-red-600 hover:bg-red-100 rounded-md transition-colors duration-200"
              onClick={() => logoutUser()}
            >
              <span className="mr-3">
                <LogoutOutlined />
              </span>
              {isOpen && <span>Log Out</span>}
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
