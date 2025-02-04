"use client";
import React from "react";
import Logo from "../Logo";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Footer from "./Footer";
import SocialMediaIcons from "./SocialMediaIcons";

const InformationSection = () => {
  return (
    <div className="bg-homeWhite py-">
      {/* Container */}
      <div className="flex flex-col  mx-16 mb-6 md:flex-row md:justify-between px-6 md:px-16 lg:px-24 gap-8">
        {/* Logo and Social Icons */}
        <div className="flex flex-col items-start gap-6">
          <Logo />
          <SocialMediaIcons />
        </div>

        {/* Solutions Section */}
        <div className="flex flex-col gap-4 text-homeSecondary">
          <h1 className="text-lg font-bold text-homePrimary">Solutions</h1>
          <ul className="space-y-1">
            <li>Fix and Flip</li>
            <li>BRRRR Method</li>
            <li>New Construction</li>
            <li>DSCR Loans</li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="flex flex-col gap-4 text-homeSecondary">
          <h1 className="text-lg font-bold text-homePrimary">Company</h1>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>FAQs</li>
            <li>Teams</li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="flex flex-col gap-4 text-homeSecondary">
          <h1 className="text-lg font-bold text-homePrimary">Contact Us</h1>
          <div className="space-y-2">
            {/* Phone */}
            <div className="flex items-start gap-2">
              <PhoneIcon className="text-homePrimary" />
              <span>(808) 123-4567</span>
            </div>
            {/* Email */}
            <div className="flex items-start gap-2">
              <EmailIcon className="text-homePrimary" />
              <span>info@lendwithaloha.com</span>
            </div>
            {/* Address */}
            <div className="flex items-start gap-2">
              <LocationOnIcon className="text-homePrimary" />
              <span>123 Aloha Lane, Honolulu, HI 96813</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InformationSection;
