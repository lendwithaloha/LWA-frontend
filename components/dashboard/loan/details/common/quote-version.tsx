import { EyeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface QuoteVersionProps {
  version: string;
  quoteName: string;
  date: string;
  showRequestButton: boolean;
}

const QuoteVersion: React.FC<QuoteVersionProps> = ({
  quoteName,
  date,
  showRequestButton,
}) => (
  <div className="flex items-center gap-4 py-2 relative">
    <div className="border-l border-black pl-4 ml-4">
      <Image
        src="/images/loan-icon.png"
        alt="File Icon"
        width={50}
        height={50}
      />
    </div>

    {/* Quote Details */}
    <div className="flex-1">
      <p className="text-sm font-semibold">{quoteName}</p>
      <p className="text-xs text-gray-500">{`Received on ${date}`}</p>
    </div>
    {/* Action Icons */}
    <div className="flex gap-2">
      <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300">
        <EyeIcon className="h-5 w-5 text-gray-600" />
      </button>
      <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300">
        <ArrowDownTrayIcon className="h-5 w-5 text-gray-600" />
      </button>
      {showRequestButton && (
        <button className="bg-primaryColor text-white px-4 py-2 rounded-md ">
          Request Revision
        </button>
      )}
    </div>
  </div>
);
export default QuoteVersion;
