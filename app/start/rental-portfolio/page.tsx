"use client";
import React, { useState } from "react";
import ReusableButton from "@/components/common_btn";
import { NavItem } from "@/components/start/NavItem";
import { dropdownContent } from "@/utils/model/drop-down-content";
import {
  Box,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import Logo from "@/public/images/loha.png";
import Image from "next/image";
import { Close } from "@mui/icons-material";

export default function RentalPortfolioQuote() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Box className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="flex max-md:flex-col max-md:items-start items-center justify-between px-4 py-3 border-b md:px-6">
        {/* Logo and Hamburger Menu */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Image src={Logo} alt="lend with loha" className="w-14" />
          <button
            className="block text-gray-600 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {!isMenuOpen ? "☰" : <Close />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col mt-4 space-y-4 md:mt-0 md:flex md:flex-row md:space-y-0 md:space-x-6`}
        >
          <NavItem text="Products" content={dropdownContent.products} />

          <NavItem text="Solutions" content={dropdownContent.solutions} />
          <NavItem
            text="Programs/Partners"
            content={dropdownContent.programs}
          />
          <NavItem text="Why Us" content={dropdownContent.whyUs} />
          <NavItem text="Resources" content={dropdownContent.resources} />
        </div>

        {/* Right Actions */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col  items-center max-md:items-start mt-4 space-y-4 md:mt-0 md:flex md:flex-row md:space-y-0 md:space-x-4`}
        >
          <span className="text-gray-600">Refer A Friend</span>
          <span className="text-gray-600">Sign In</span>
          <ReusableButton label="See Your Rate" />
        </div>
      </nav>

      {/* Main Content */}
      <Box className="flex flex-wrap px-4 py-8 max-w-7xl mx-auto md:flex-nowrap">
        {/* Left Section */}
        <Box className="w-full mb-6 md:w-1/2 md:pr-12">
          <Typography variant="h3" className="text-gray-700 mb-4">
            Get a Rental Portfolio Loan Quote
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600 mb-6">
            Streamline your rental business with ease and confidence
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-4">
            Do you have 5+ rental property loans? Please fill out the form so
            our team can start helping you navigate your options.
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            If you have less than 5 properties and are interested in a Single
            Asset Rental Loan, please get started{" "}
            <span className="text-[#00B8A9] cursor-pointer">here</span>.
          </Typography>
        </Box>

        {/* Right Section - Form */}
        <Box className="w-full bg-white p-6 rounded-lg shadow-sm md:w-1/2 md:p-8">
          <form className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <TextField fullWidth label="First Name" variant="outlined" />
              <TextField fullWidth label="Last Name" variant="outlined" />
            </div>
            <TextField fullWidth label="Email" variant="outlined" />
            <TextField fullWidth label="Phone Number" variant="outlined" />

            <FormControl fullWidth>
              <Typography variant="body2" className="mb-2">
                Are you a Broker?
              </Typography>
              <RadioGroup row>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="body2" className="mb-2">
                How many properties are you looking to finance in a portfolio
                (blanket) loan at this time?
              </Typography>
              <Select displayEmpty input={<OutlinedInput />} defaultValue="">
                <MenuItem value="">Select...</MenuItem>
                <MenuItem value="5-10">5-10</MenuItem>
                <MenuItem value="11-20">11-20</MenuItem>
                <MenuItem value="21+">21+</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="body2" className="mb-2">
                What state(s) are the properties located in? (Press shift to
                select multiple)
              </Typography>
              <Select
                multiple
                displayEmpty
                input={<OutlinedInput />}
                defaultValue={[]}
              >
                <MenuItem value="AL">AL</MenuItem>
                <MenuItem value="AK">AK</MenuItem>
                <MenuItem value="AZ">AZ</MenuItem>
                <MenuItem value="AR">AR</MenuItem>
                <MenuItem value="CA">CA</MenuItem>
                {/* Add more states as needed */}
              </Select>
            </FormControl>

            <Typography>
              What is the approximate total value of the properties you&apos;re
              looking to finance in a portfolio loan?
            </Typography>
            <TextField fullWidth multiline rows={2} variant="outlined" />

            <TextField
              fullWidth
              label="How many total rental properties do you own?"
              variant="standard"
              type="number"
            />
            <Typography className="text-sm">
              All fields required. By submitting this contact form, I agree to
              receive information about Company&apos;s products by email and phone. I
              understand I can opt-out any time.
            </Typography>
            <ReusableButton label="Contact me" />
          </form>
        </Box>
      </Box>
    </Box>
  );
}
