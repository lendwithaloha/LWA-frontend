"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateActive } from "@/store/slice/RightSideNav";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Define the type for navigation items
interface NavItemProps {
  key: string;
  route: string;
  active?: boolean;
  expand?: boolean;
  children?: NavItemProps[]; // Allow nested items
}

interface NavItemComponentProps {
  item: NavItemProps;
  onUpdateActive: (path: string) => void;
}

// Component to handle navigation links
const NavItem = ({ item, onUpdateActive }: NavItemComponentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Update the expanded state on the client side only
  useEffect(() => {
    setIsExpanded(!!item.expand);
  }, [item.expand]);

  if (!item.children) {
    return (
      <Link
        href={item.route}
        className={classNames(
          item.active ? "border-l-4 border-primaryColor" : "hover:bg-gray-50",
          "flex items-center rounded-md bg-gray-50 py-2 pl-10 pr-2 text-sm/6 font-semibold text-gray-700"
        )}
        onClick={() => onUpdateActive(item.route)}
      >
        {item.key}
      </Link>
    );
  }

  return (
    <Disclosure as="div" defaultOpen={isExpanded}>
      {({ open }) => (
        <>
          <DisclosureButton
            onClick={() => onUpdateActive(item.route)}
            className="group bg-gray-50 flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold text-gray-700"
          >
            <ChevronRightIcon
              aria-hidden="true"
              className={`size-5 shrink-0 text-gray-400 ${
                open ? "rotate-90 text-gray-500" : ""
              }`}
            />
            <span>{item.key}</span>
          </DisclosureButton>
          <DisclosurePanel as="ul" className="mt-1 px-2">
            {item.children?.map((subItem: NavItemProps) => (
              <li key={subItem.key}>
                <Link
                  href={subItem.route}
                  className={classNames(
                    subItem.active
                      ? "bg-gray-50 border-l-2 border-l-primaryColor"
                      : "hover:bg-gray-50",
                    "flex items-center justify-between py-2 -ml-2 pl-9 pr-2 text-sm/6 text-gray-700"
                  )}
                  onClick={() => onUpdateActive(subItem.route)}
                >
                  {subItem.key}
                </Link>
              </li>
            ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default function RightSideNav() {
  const links = useSelector((state: RootState) => state.sideNav.links);
  const dispatch = useDispatch();

  const handleUpdateActive = (path: string) => {
    dispatch(updateActive(path));
  };

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto overflow-x-hidden">
      <ul role="list" className="flex flex-1 flex-col">
      {links.map((item) => (
          <li key={item.key}>
            <NavItem item={item} onUpdateActive={handleUpdateActive} />
          </li>
        ))}
      </ul>
    </div>
  );
}
