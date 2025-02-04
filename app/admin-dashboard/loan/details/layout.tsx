import GrantorCard from "@/components/admin-dashboard/loan/details/grantor-card";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-1">{children}</div>
      <GrantorCard />
    </div>
  );
}
