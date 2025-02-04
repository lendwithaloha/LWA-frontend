import Origination from "@/components/dashboard/loan/activeLoanTable";
import ChatModal from "@/components/dashboard/loan/chat-modal";

const pages = () => {
  return (
    <div className="relative p-2">
      <Origination />
      <ChatModal />
    </div>
  );
};

export default pages;
