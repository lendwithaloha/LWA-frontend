"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Disclosure } from "@headlessui/react";
// import { RightNavProvider } from "@/context/sideNav/RightSideNav";

export default function LoanDetailLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const id = useSearchParams().get("id");
  const pathname = usePathname();

  const navLinks = [
    { name: "Overview", href: `/dashboard/loan/id/overview?id=${id}` },
    { name: "Application", href: `/dashboard/loan/id/application?id=${id}` },
    { name: "Loan Terms", href: `/dashboard/loan/id/terms?id=${id}` },
    { name: "Documents", href: `/dashboard/loan/id/documents?id=${id}` },
    { name: "My Team", href: `/dashboard/loan/id/team?id=${id}` },
  ];

  // Function to determine if the link is active

  return (
    <div>
      <Disclosure as="nav" className="bg-[#c8defd]">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-[90%]">
          <div className="relative flex h-12 justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navLinks.slice(0, 5).map((link) => {
                  console.log(pathname.split("?")[0]);
                  console.log(link.href.split("?")[0]);

                  console.log(
                    pathname.split("?")[0].trim().toLowerCase() ===
                      link.href.split("?")[0].trim().toLowerCase()
                  );
                  // Check if this link is active
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm ${
                        pathname
                          .split("?")[0]
                          .trim()
                          .toLowerCase()
                          .startsWith(
                            link.href.split("?")[0].trim().toLowerCase()
                          )
                          ? "border-primaryColor text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
      {/* <RightNavProvider> */}
      <main>{children}</main>
      {/* </RightNavProvider> */}
    </div>
  );
}
