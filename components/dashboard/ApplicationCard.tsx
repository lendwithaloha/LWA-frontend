import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ApplicationCard = () => {
    const applications = [
        {
            option: "Prime Capital Loans",
            strategy: "Fix and Flip",
            escrowClosingDate: "12/03/2024",
            submissionDate: "12/03/2024",
        },
        {
            option: "Prime Capital Loans",
            strategy: "Fix and Flip",
            escrowClosingDate: "12/03/2024",
            submissionDate: "12/03/2024",
        },
    ];

    return (
        <div className="mt-6 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Applications</h2>
            <div className="space-y-4">
                {applications.map((app, index) => (
                    <div
                        key={index}
                        className="flex flex-wrap md:flex-nowrap items-center justify-between p-4 border-b-2 rounded-lg bg-gray-50"
                    >
                        {/* Left Section */}
                        <div className="flex flex-col w-full md:w-auto mb-4 md:mb-0">
                            <span className="font-semibold text-gray-800">{app.option}</span>
                            <span className="text-sm text-gray-600">Option</span>
                        </div>

                        {/* Middle Section */}
                        <div className="flex flex-col w-full md:w-auto mb-4 md:mb-0">
                            <span className="font-semibold text-gray-800">{app.strategy}</span>
                            <span className="text-sm text-gray-600">Strategy</span>
                        </div>

                        {/* Center Section */}
                        <div className="flex w-full md:w-auto justify-between space-x-10 md:space-x-20">
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-800">
                                    {app.escrowClosingDate}
                                </span>
                                <span className="text-sm text-gray-600">
                                    Escrow Closing Date
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-800">
                                    {app.submissionDate}
                                </span>
                                <span className="text-sm text-gray-600">Submission Date</span>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex w-full md:w-auto items-center justify-between space-x-4 mt-4 md:mt-0">
                            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium shadow w-full md:w-auto">
                                Quote Collection
                            </button>
                            <ArrowForwardIosIcon className="text-gray-500" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApplicationCard;
