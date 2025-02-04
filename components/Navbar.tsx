"use client";
// components/Navbar.tsx
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppBar, Toolbar, IconButton, Button, Modal, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "./Logo";

const TEXT_VALUES = {
  brand: "Lend with Aloha",
  home: "Home",
  solutions: "Solutions",
  about: "About",
  contact: "Contact",
  signUp: "Sign Up",
  logIn: "Log In",
};

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
  });

  const isActive = (path: string) =>
    pathname === path
      ? "text-primaryColor border-b-2 border-b-primaryColor pb-2"
      : "text-gray-800 hover:text-blue-600";

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar className="flex justify-between px-4 md:px-8">
          {/* Brand Logo */}
          <div className="w-1/3">
            <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-between w-full">
            <div className="space-x-6">
              <Link href="/" className={isActive("/")}>
                {TEXT_VALUES.home}
              </Link>
              <Link href="/solutions" className={isActive("/solutions")}>
                {TEXT_VALUES.solutions}
              </Link>
              <Link href="/about" className={isActive("/about")}>
                {TEXT_VALUES.about}
              </Link>
              <Link href="/contact" className={isActive("/contact")}>
                {TEXT_VALUES.contact}
              </Link>
            </div>

            <div className="space-x-6 flex">
              <Link href="/register">
                {" "}
                <div className="flex items-center px-8 py-2 text-primaryColor hover:bg-slate-200 hover:cursor-pointer font-semibold rounded-3xl">
                  {TEXT_VALUES.signUp}
                </div>
              </Link>
              <Link href="/login">
                <div className="flex items-center px-8 py-2 text-white bg-primaryColor hover:bg-slate-200 hover:text-primaryColor hover:cursor-pointer font-semibold rounded-3xl">
                  {TEXT_VALUES.logIn}
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <IconButton edge="end" color="inherit" onClick={toggleMobileMenu}>
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>

        {/* Mobile Popup Menu */}
        <Modal open={mobileMenuOpen} onClose={toggleMobileMenu}>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "50%",
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              p: 2,
            }}
          >
            {/* Close Button */}
            <div className="flex justify-end">
              <IconButton onClick={toggleMobileMenu}>
                <CloseIcon />
              </IconButton>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col items-start px-6 space-y-4">
              <Link
                href="/"
                className={isActive("/")}
                onClick={toggleMobileMenu}
              >
                {TEXT_VALUES.home}
              </Link>
              <Link
                href="/solutions"
                className={isActive("/solutions")}
                onClick={toggleMobileMenu}
              >
                {TEXT_VALUES.solutions}
              </Link>
              <Link
                href="/about"
                className={isActive("/about")}
                onClick={toggleMobileMenu}
              >
                {TEXT_VALUES.about}
              </Link>
              <Link
                href="/contact"
                className={isActive("/contact")}
                onClick={toggleMobileMenu}
              >
                {TEXT_VALUES.contact}
              </Link>
            </nav>

            {/* Buttons */}
            <div className="flex flex-col px-6 mt-4 space-y-2">
              <Link href="/login">
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={toggleMobileMenu}
                >
                  {TEXT_VALUES.signUp}
                </Button>{" "}
              </Link>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={toggleMobileMenu}
              >
                {TEXT_VALUES.logIn}
              </Button>
            </div>
          </Box>
        </Modal>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
