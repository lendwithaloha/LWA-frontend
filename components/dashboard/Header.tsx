"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/store/dashboard/sidebarSlice";
import { RootState } from "@/store/store";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  
  Box,
 
  Popover,
  List,
  ListItem,
  ListItemText,
  Badge,

} from "@mui/material";
import {
  Search as SearchIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useSearchParams, useRouter } from "next/navigation";
// import { getUserData } from "@/utils/localStorage";

interface Notification {
  title: string;
  message: string;
  timestamp: string;
  status: "seen" | "unseen";
}

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { activeLink } = useSelector((state: RootState) => state.sidebar);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("query") || ""
  );

  useEffect(() => {
    // Update the search query dynamically in the URL
    const handler = setTimeout(() => {
      if (searchTerm.trim()) {
        router.push(
          `/dashboard/search?query=${encodeURIComponent(searchTerm)}`
        );
      }
    }, 300); // Debounce delay

    return () => clearTimeout(handler);
  }, [searchTerm, router]);
  // Dummy Notification Data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      title: "Payment Reminder",
      message:
        "Your loan payment is due on Dec 09, 2024. Please make the payment to avoid penalties.",
      timestamp: "12:02 AM",
      status: "unseen",
    },
    {
      title: "Loan Application",
      message:
        "Your loan application has been successfully submitted. The results will be available shortly.",
      timestamp: "12:02 AM",
      status: "seen",
    },
    {
      title: "Profile Update",
      message: "Your profile information has been successfully updated.",
      timestamp: "12:02 AM",
      status: "unseen",
    },
  ]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);

    // Mark all notifications as seen
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.status === "unseen"
          ? { ...notification, status: "seen" }
          : notification
      )
    );
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const isNotificationOpen = Boolean(anchorEl);

  // Count unseen notifications
  const unseenCount = notifications.filter(
    (notification) => notification.status === "unseen"
  ).length;

  // const user = getUserData()?.first_name + " " + getUserData()?.last_name;
  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={1}
        sx={{
          borderBottom: "1px solid #ddd", // Light gray border
          px: 0, // Horizontal padding
          py: 0, // Vertical padding
          pr: 4,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, sm: 4, md: 2 },
          }}
        >
          {/* Left Section: Menu Icon */}
          <div className="flex space-x-1 items-center">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleToggleSidebar}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <div className="hidden md:flex text-xl">{activeLink}</div>
          </div>

          {/* Right Section: Content */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 2,
              flexGrow: 1,
            }}
          >
            {/* Search Bar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f1f3f4",
                borderRadius: 2,
                px: 1,
                py: 0.5,
                width: "100%",
                maxWidth: 400,
                border: "1px solid #ccc",
                transition: "all 0.3s ease",
              }}
            >
              <SearchIcon sx={{ mr: 1, color: "gray" }} />
              <InputBase
                placeholder="Search property address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>

            {/* Notification Icon with Badge */}
            <IconButton
              color="inherit"
              onClick={handleNotificationClick}
              sx={{ position: "relative" }}
            >
              <Badge
                badgeContent={unseenCount}
                color="error"
                overlap="circular"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Notification Popup */}
            <Popover
              open={isNotificationOpen}
              anchorEl={anchorEl}
              onClose={handleNotificationClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box sx={{ width: 300, p: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Notifications
                </Typography>
                {notifications.length > 0 ? (
                  <List>
                    {notifications.map((notification, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          mb: 1,
                          backgroundColor:
                            notification.status === "unseen"
                              ? "#f1f3f4"
                              : "transparent",
                          borderRadius: 1,
                          alignItems: "flex-start", // Align items at the start for separate rows
                        }}
                      >
                        <ListItemText
                          primary={
                            <>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {notification.title}
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {notification.message}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: "block", mt: 0.5 }}
                              >
                                {notification.timestamp}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography>No new notifications.</Typography>
                )}
              </Box>
            </Popover>

      

            {/* User Avatar
            <Link
              href="/dashboard/settings"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User Avatar"
              />
              <Box ml={1} sx={{ display: { xs: "none", md: "flex" } }}>
                <Typography variant="subtitle2">{user}</Typography>
              </Box>
            </Link> */}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
