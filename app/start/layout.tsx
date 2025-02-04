"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import Logo from "@/public/images/loha.png";
import Image from "next/image";

import { usePathname } from "next/navigation";
export default function Layout({ children }: { children: React.ReactNode }) {
  const router = usePathname();
  // Check if the current page is the portfolio page
  if (router.includes("/rental-portfolio")) {
    return <>{children}</>; // No layout for portfolio page
  }

  return (
    // <AuthGuard>
    <div>
      <div className="w-full bg-gray-50 px-5 flex justify-between border-b-2">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h1" component="div">
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              <Image src={Logo} alt="lend with loha" className="w-14" />
            </Link>
          </Typography>
        </Box>
        <div></div>
      </div>
      <main>
        <div>{children}</div>
      </main>
    </div>
    // </AuthGuard>
  );
}
