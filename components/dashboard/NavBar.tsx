import React, { useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";
import MenuIcon from "@mui/icons-material/Menu";
import { lightTheme } from "@/styles/theme";
import Logo from "@/public/images/loha.png";
import Image from "next/image";

type NavLink = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

const navLinks: NavLink[] = [

  { name: "Loan", href: "/dashboard/loan" },
  { name: "Broker Application", href: "/dashboard/broker" },

  { name: "Membership", href: "/dashboard/membership" },
  { name: "Settings", href: "/dashboard/settings" },
  {
    name: "New Loan",
    href: "/dashboard/new-loan",
    icon: <AddIcon className="text-[16px]" />,
  },
  {
    name: "Refer a Friend",
    href: "/dashboard/refer",
    icon: <ShareIcon className="text-[15px]" />,
  },
];

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Function to check if the link is active based on the pathname
  const isLinkActive = (linkHref: string): boolean => {
    return pathname.startsWith(linkHref);
  };

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={1}
        className="bg-[#f5f5f5]"
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left Section: Logo */}
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

          {/* Desktop Navigation Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              marginLeft: 3,
            }}
          >
            {navLinks.slice(0, 4).map((link) => (
              <Link
                href={link.href}
                key={link.name}
                style={{
                  marginRight: "1.5rem",
                  textDecoration: "none",
                  color: isLinkActive(link.href)
                    ? lightTheme.colors.primary
                    : "#555",
                  fontWeight: "normal",
                  fontFamily: lightTheme.fonts.heading,

                  borderBottom: isLinkActive(link.href)
                    ? "2px solid #1976d2"
                    : "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {link.icon && (
                  <span style={{ marginRight: "0.5rem" }}>{link.icon}</span>
                )}
                {link.name}
              </Link>
            ))}
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              marginLeft: 3,
            }}
          >
            {/* Separated Links for "New Loan" and "Refer a Friend" */}
            {navLinks.slice(4).map((link) => (
              <Link
                href={link.href}
                key={link.name}
                style={{
                  marginLeft: ".5rem",
                  marginRight: "0.56rem",
                  textDecoration: "none",
                  color: isLinkActive(link.href)
                    ? lightTheme.colors.primary
                    : "#555",
                  fontWeight: "normal",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="flex items-center justify-center">
                  {link.icon && (
                    <i
                      style={{
                        marginRight: "0.3rem",
                        marginLeft: "0.2rem",
                        color: lightTheme.colors.primary,
                      }}
                    >
                      {link.icon}
                    </i>
                  )}
                  <h1 className="text-sm">{link.name}</h1>
                </div>
              </Link>
            ))}

            {/* Profile Dropdown */}
            <Box
              onClick={handleMenuOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: lightTheme.colors.primary,
                fontWeight: "bold",
                marginLeft: "0.8rem",
                padding: "8px 12px",
                border: pathname === "/profile" ? "solid 1px " : "none",
                borderRadius: "8px",
              }}
            >
              Brian <ArrowDropDownIcon />
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 1,
                style: { marginTop: "1rem" },
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link
                  href="/profile"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  Brian Fung
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link
                  href="/sign-out"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  Sign Out
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile Menu Icon */}
          <Box
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ marginLeft: "auto" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: "300px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          {/* Username at the Top */}
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Brian Fung
          </Typography>

          <Divider />

          {/* Navigation Links */}
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.name} sx={{ padding: "10px 0" }}>
                {link.icon && <ListItemIcon>{link.icon}</ListItemIcon>}
                <Link
                  href={link.href}
                  passHref
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemText
                    primary={link.name}
                    sx={{
                      fontWeight: "normal",
                      color: isLinkActive(link.href)
                        ? lightTheme.colors.primary
                        : "#555",
                    }}
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Sign-Out Link at the Bottom */}
        <Box>
          <Divider />
          <List>
            <ListItem sx={{ padding: "10px 0" }}>
              <Link
                href="/sign-out"
                passHref
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemText primary="Sign Out" />
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
