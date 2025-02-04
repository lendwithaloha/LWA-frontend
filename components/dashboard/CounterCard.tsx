import React from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";

interface CounterCardProps {
  icon: React.ReactElement<SvgIconProps>;
  title: string;
  count: string | number;
}

const CounterCard: React.FC<CounterCardProps> = ({ icon, title, count }) => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
      {/* Icon Section */}
      <div className="text-primaryColor flex-shrink-0">
        {React.cloneElement(icon, { style: { fontSize: "2.5rem" } })}
      </div>

      {/* Content Section */}
      <div className="flex flex-col">
        <h3 className="text-base sm:text-lg font-medium text-gray-600">{title}</h3>
        <p className="text-xl sm:text-2xl font-bold text-gray-900">{count}</p>
      </div>
    </div>
  );
};

export default CounterCard;
