import ChatModal from "@/components/dashboard/loan/chat-modal";
import Closed from "@/components/dashboard/loan/Closed";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-2">
        <Closed />
      </div>
      <ChatModal />
    </Suspense>
  );
};

export default page;
