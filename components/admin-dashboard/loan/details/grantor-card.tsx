"use client";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import ContactCard from "./contact-card";
import GrantorDrawer from "./grantor-drawer";
import { useState } from "react";
export default function GrantorCard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="w-full lg:w-80 p-4 flex flex-col items-center bg-gray-200 h-max">
      <UserCircleIcon className="size-28 text-gray-800" />

      <h2 className="font-handwriting text-2xl mb-1">Austin Water</h2>
      <p className="text-gray-500 text-sm mb-6">Full name</p>

      <div className="w-full text-center mb-6">
        <div className="mb-4">
          <span className="font-handwriting text-2xl">800</span>
          <p className="text-gray-500 text-sm">Credit Score</p>
        </div>
        <div>
          <span className="font-handwriting text-2xl">800</span>
          <p className="text-gray-500 text-sm">LWA ID Number</p>
        </div>
      </div>
      <ContactCard email="austin@gmail.com" phone="+1 234 3432" />
      <button
        className="w-full bg-primaryColor text-white py-2 rounded-md font-handwriting mb-3"
        onClick={() => setDrawerOpen(true)}
      >
        Guarantor Profile
      </button>

      <button className="w-full bg-primaryColor text-white py-2 rounded-md font-handwriting">
        Send Message
      </button>
      <GrantorDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
