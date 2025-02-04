"use client";

import React from "react";

export default function HoldbackProcessPDF() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <embed
        src="/files/loan-application/FastAPI_Backend_Implementation_Plan.pdf"
        type="application/pdf"
        className="flex-grow border"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
