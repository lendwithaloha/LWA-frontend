"use client";

import React, { useEffect, useRef, useState } from "react";
// import RightSideNav from "@/components/dashboard/loan/application/RightSideNav";
import { useDispatch } from "react-redux";
import {
  IconButton,
  Drawer,
  Box,
  Divider,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { setLinks } from "@/store/slice/RightSideNav";
import { initialLinks } from "@/configs/sideNavLinks";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import RightSideNav with SSR disabled
const RightSideNav = dynamic(
  () => import("@/components/dashboard/loan/application/RightSideNav"),
  { ssr: false }
);

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [sideNavWidth, setSideNavWidth] = useState<number>(30); // Default width
  const [isMobileView, setIsMobileView] = useState<boolean>(false); // Default mobile view
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const resizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize links in Redux
    dispatch(setLinks(initialLinks));

    // Update mobile view detection and sidebar width after hydration
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    const handleResize = (event: PointerEvent) => {
      const newWidth =
        ((window.innerWidth - event.clientX) / window.innerWidth) * 100;
      if (newWidth >= 20 && newWidth <= 50) {
        setSideNavWidth(newWidth);
        localStorage.setItem("sideNavWidth", newWidth.toString());
      }
    };

    const stopResize = () => {
      window.removeEventListener("pointermove", handleResize);
      window.removeEventListener("pointerup", stopResize);
      document.body.style.userSelect = ""; // Re-enable text selection
    };

    const startResize = () => {
      window.addEventListener("pointermove", handleResize);
      window.addEventListener("pointerup", stopResize);
      document.body.style.userSelect = "none"; // Disable text selection
    };

    const resizerElement = resizerRef.current;

    if (resizerElement) {
      resizerElement.addEventListener("pointerdown", startResize);
    }

    return () => {
      if (resizerElement) {
        resizerElement.removeEventListener("pointerdown", startResize);
      }
      window.removeEventListener("pointermove", handleResize);
      window.removeEventListener("pointerup", stopResize);
    };
  }, []);

  const toggleDrawer = (open: boolean) => setDrawerOpen(open);

  const generateBreadcrumbs = () => {
    const pathSegments = pathname
      .split("/")
      .filter((segment) => segment)
      .slice(pathname.split("/").indexOf("application"));

    return pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLast = index === pathSegments.length - 1;
      const label = segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      return isLast ? (
        <Typography
          key={href}
          color="text.primary"
          className="font-medium capitalize"
        >
          {label}
        </Typography>
      ) : (
        <MuiLink
          key={href}
          href={href}
          underline="hover"
          color="inherit"
          className="capitalize"
        >
          {label}
        </MuiLink>
      );
    });
  };

  return (
    <div className="relative flex flex-col bg-gray-50 min-h-screen">
      {/* Mobile: Drawer and Breadcrumbs */}
      {isMobileView && (
        <div className="flex items-center bg-gray-100 border-b border-gray-200 p-4">
          <IconButton onClick={() => toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb" className="ml-2">
            {generateBreadcrumbs()}
          </Breadcrumbs>
        </div>
      )}

      {/* Drawer for mobile view */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        PaperProps={{
          sx: { width: "75%" },
        }}
      >
        <Box className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="font-heading text-gray-800">
              Navigation
            </Typography>
            <IconButton onClick={() => toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <RightSideNav />
        </Box>
      </Drawer>

      {/* Desktop: Breadcrumbs */}
      {!isMobileView && (
        <div className="p-4 bg-gray-100 border-b border-gray-200">
          <Breadcrumbs aria-label="breadcrumb">{generateBreadcrumbs()}</Breadcrumbs>
        </div>
      )}

      <div className="flex flex-grow">
        {/* Main Content */}
        <main
          className="p-4 md:p-8 flex-grow"
          style={{
            flexBasis: isMobileView ? "100%" : `calc(100% - ${sideNavWidth}%)`,
          }}
        >
          {children}
        </main>

        {/* Desktop Sidebar */}
        {!isMobileView && (
          <>
            <div
              ref={resizerRef}
              className="w-[5px] cursor-ew-resize bg-gray-200"
              style={{
                flexShrink: 0,
              }}
            />
            <aside
              className="relative border-l border-gray-200"
              style={{ width: `${sideNavWidth}%` }}
            >
              <RightSideNav />
            </aside>
          </>
        )}
      </div>
    </div>
  );
}
