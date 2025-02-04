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
import GroupIcon from "@mui/icons-material/Group";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  ArrowRight,
  ImportContactsTwoTone,
  LogoutOutlined,
} from "@mui/icons-material";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import {
  setShowTour,
  setHasCompletedTour,
} from "@/store/onboarding/OnboardingSlice";
import { clearTokens } from "@/utils/cookie";
import { clearLocalStorage } from "@/utils/localStorage";

const mainMenuItems = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    href: "/admin-dashboard",
    dataTour: "dashboard",
  },
  {
    name: "Loans",
    icon: <RequestPageIcon />,
    href: "/admin-dashboard/loan",
  },

  {
    name: "Borrower",
    icon: <GroupIcon />,
    dataTour: "borrower-profile",
    subItems: [
      {
        name: "All Borrowers",
        href: "/admin-dashboard/borrowers/all-borrowers",
      },
      {
        name: "Active Borrowers",
        href: "/admin-dashboard/borrowers/active-borrowers",
      },
      {
        name: "Inactive Borrowers",
        href: "/admin-dashboard/borrowers/inactives-borrowers",
      },
    ],
  },
  {
    name: "Loan Inquiries",
    icon: <GroupIcon />,
    dataTour: "loans",
    subItems: [
      {
        name: "Qoute Collection",
        href: "/admin-dashboard/loan-inquiries/qoute-collection",
      },
      {
        name: "Qoutes Out",
        href: "/admin-dashboard/loan-inquiries/qoutes-out",
      },

    ],
  },





];


const AdministrationItems = [
  {
    name: "Staff Management",
    icon: <DashboardIcon />,
    href: "/admin-dashboard/staff-management",
    dataTour: "dashboard",

  },

  {
    name: "Lender Management",
    icon: <ImportContactsTwoTone />,
    href: "/admin-dashboard/staff-management",
    dataTour: "staff-management",
  },
  {
    name: "Activity Log",
    icon: <RequestPageIcon />,
    href: "/admin-dashboard/activity-logs",
  },
  {
    name: "Configuration",
    icon: <ImportContactsTwoTone />,
    href: "/admin-dashboard/configuration/document-type",
    dataTour: "configuration",
  },

];






function logoutUser() {
  clearTokens();
  clearLocalStorage();
}

export const ASidebar: React.FC = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isOpen, activeLink } = useSelector(
    (state: RootState) => state.sidebar
  );
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleStartTour = () => {
    dispatch(setShowTour(true));
    dispatch(setHasCompletedTour(false));
    if (!isOpen) {
      dispatch(toggleSidebar());
    }
  };

  useEffect(() => {
    const allItems = [
      ...mainMenuItems.flatMap((item) =>
        item.subItems ? [item, ...item.subItems] : item
      ),
      ...AdministrationItems,
    ];
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

  

  const renderMenuItems = (items: typeof mainMenuItems) => (
    <ul>
      {items.map((item) => (
        <li key={item.name} className="text-gray-600">
          {item.subItems ? (
            <div>
              <div
                className={`flex items-center px-4 py-2 mx-2 text-sm font-medium cursor-pointer ${activeLink === item.name
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
              <ul
                className={`pl-8 ${openDropdown === item.name ? "block" : "hidden"
                  }`}
              >
                {item.subItems.map((subItem) => (
                  <li key={subItem.name} className="relative">
                    <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-8 bg-gray-400" />
                    <Link href={subItem.href} passHref legacyBehavior>
                      <a
                        className={`flex items-center px-4 py-2 mr-2 my-1 text-sm hover:bg-sky-100 ${activeLink === subItem.name
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
            <Link href={item.href} passHref legacyBehavior>
              <a
                className={`flex items-center px-4 py-2 my-2 mx-2 text-sm hover:bg-sky-100 ${activeLink === item.name
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


  const AdministrationMenu = (items: typeof AdministrationItems) => {
    return (
      <ul>
      {items.map((item) => (
        <li key={item.name} className="text-gray-600">
        
            <Link href={item.href} passHref legacyBehavior>
              <a
                className={`flex items-center px-4 py-2 my-2 mx-2 text-sm hover:bg-sky-100 ${activeLink === item.name
                  ? "bg-sky-100 text-primaryColor rounded-md border-r-4 border-r-sky-600"
                  : ""
                  } transition-colors duration-200`}
                data-tour={item.dataTour}
              >
                <span className="mr-3">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </a>
            </Link>
        </li>
      ))}
    </ul>
    );
  };

  return (
    <div
      className={`bg-gray-200 text-black h-screen overflow-y-auto transition-all duration-300 ${isOpen ? "w-64" : "w-24"
        } min-h-screen flex flex-col`}
    >
      <div className="h-20 mx-2 flex items-center border-b-2">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" component="div">
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "bold",
              }}
            >
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
          <h2
            className={`px-4 py-2 text-sm font-light text-gray-500 ${isOpen ? "" : "sr-only"
              }`}
          >
            Main Menu
          </h2>
          {renderMenuItems(mainMenuItems)}


          <h2
            className={`px-4 py-2 text-sm font-light text-gray-500 ${isOpen ? "" : "sr-only"
              }`}
          >
            Adminstration          </h2>
          {AdministrationMenu(AdministrationItems)}











        </div>

        <div className="flex flex-col gap-5 mx-5 mb-5">
          <Link
            href="/dashboard"
            className={`${isOpen
              ? "px-4 py-2 flex items-center gap-2 text-start w-3/4 border-primaryColor text-primaryColor rounded relative group"
              : "hidden"
              }`}
          >
            <span>Borrower</span>
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
          <Link
            href="/login"
            passHref
            legacyBehavior
            onClick={() => logoutUser()}
          >
            <a className="flex items-center px-4 py-2 mx-2 text-sm text-red-600 hover:bg-red-100 rounded-md transition-colors duration-200">
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

export default ASidebar;
