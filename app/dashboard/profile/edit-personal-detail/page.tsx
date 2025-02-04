"use client";
import { ProfileDetail } from "@/components/dashboard/profile/PersonalDetail";
import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

function Page() {
  const { formData } = useSelector((state: RootState) => state.profile);

  return <ProfileDetail formData={formData} />;
}

export default Page;
