import React, { useEffect, useState } from "react";
import { teamAgent, teamAgent as TeamAgentType } from "@/types/agent-team/team";

interface EditDialogProps {
    open: boolean;
    onClose: () => void;
    team?: TeamAgentType | null
    onUpdate?: (updatedTeam: teamAgent) => void
    teamType?: string | undefined;

}

const EditDialog: React.FC<EditDialogProps> = ({ open, onClose, team, onUpdate, teamType }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        phoneNumber: "",
        email: "",
        contactType: "",
    });

    useEffect(() => {
        if (team) {
            setFormData({
                firstName: team.firstName,
                lastName: team.lastName,
                companyName: team.companyName,
                phoneNumber: team.phoneNumber,
                email: team.email,
                contactType: team.contactType || "",
            });
        }
    }, [team]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        const updatedTeam: TeamAgentType = {
            ...team!,
            firstName: formData.firstName,
            lastName: formData.lastName,
            companyName: formData.companyName,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
        };

        onUpdate?.(updatedTeam);
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-[320px] md:max-w-3xl p-10 rounded-md shadow-lg">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xl font-bold">
                        {`Updating ${teamType || "Contact"}`} 
                    </h2>
                    <button
                        className="text-gray-500 hover:text-gray-800"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* First Name */}
                    <div>
                        <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-border-2 border-gray-500"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="mt-1 px-3 block w-full rounded-md border border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm h-10"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"

                            id="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="mt-1 px-3 block w-full rounded-md border border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm h-10"
                        />
                    </div>

                    {/* Company Name */}
                    <div>
                        <label
                            htmlFor="company-name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Company Name
                        </label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"

                            value={formData.companyName}
                            onChange={handleChange}
                            className="mt-1 px-3 block w-full rounded-md border border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm h-10"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"

                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 px-3 block w-full rounded-md border border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm h-10"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"

                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 px-3 block w-full rounded-md border border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm h-10"
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-primaryColor text-white px-6 py-2 rounded-md hover:bg-gray-800"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditDialog;
