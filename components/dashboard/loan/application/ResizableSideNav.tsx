"use client";

import React, { useEffect, useRef, useState } from "react";
import RightSideNav from "@/components/dashboard/loan/application/RightSideNav";

export default function ResizableSideNav() {
  const [sideNavWidth, setSideNavWidth] = useState(30); // Initial width percentage
  const resizerRef = useRef<HTMLDivElement>(null);

  // Handle resizing logic
  useEffect(() => {
    const resizer = resizerRef.current; // Copy the current value of the ref

    const handleResize = (event: PointerEvent) => {
      let newWidth =
        ((window.innerWidth - event.clientX) / window.innerWidth) * 100;
      newWidth = Math.max(20, Math.min(newWidth, 50)); // Clamp width between 20% and 50%
      setSideNavWidth(newWidth);
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

    if (resizer) {
      resizer.addEventListener("pointerdown", startResize);
    }

    return () => {
      if (resizer) {
        resizer.removeEventListener("pointerdown", startResize);
      }
      window.removeEventListener("pointermove", handleResize);
      window.removeEventListener("pointerup", stopResize);
    };
  }, []);

  return (
    <div
      className="relative min-h-[100vh] z-0 border-l-0 lg:border-l-2 mt-4 lg:mt-0"
      style={{
        width: `${Math.max(20, Math.min(sideNavWidth, 50))}%`,
      }}
    >
      {/* Resizer */}
      <div
        ref={resizerRef}
        className="absolute top-0 left-0 h-full w-[5px] cursor-ew-resize bg-gray-200"
      />
      <RightSideNav />
    </div>
  );
}
