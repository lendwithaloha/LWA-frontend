"use client"

import { redirect } from "next/navigation";
const page = () => {
  redirect("/dashboard/loan/id/application/general-info/provide-loan-details");
};

export default page;