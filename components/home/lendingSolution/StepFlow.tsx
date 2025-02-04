import React from "react";

type StepProps = {
  step?: number;
  title: string;
  description: string;
  isActive?: boolean;
};

const StepCard: React.FC<StepProps> = ({ step, title, description, isActive }) => {
  return (
    <div
      className={`max-w-[320px] max-h-[205px] relative flex-1 p-6 text-homeSecondary ${
        isActive ? "bg-primaryColor" : "bg-primaryLight"
      } step-card`}
    >
      {/* Text Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-2">   {step ? `Step ${step}` : title}
        </h3>
        <p className="text-sm">{description}</p>
      </div>

      {/* Forward Arrow */}
      <div
        className={`step-arrow ${isActive ? "bg-primaryColor" : "bg-gray-800"}`}
      ></div>

      {/* Back Arrow */}
      <div
        className={`step-back-arrow ${isActive ? "bg-primaryColor" : "bg-gray-800"}`}
      ></div>
    </div>
  );
};

export default StepCard;
