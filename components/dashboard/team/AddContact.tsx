import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTeam } from "@/store/slice/team/teamSlice";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const AddContactModal: React.FC<ModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    contactType: "",
  });

  if (!open) return null;


  const isFormValid = Object.values(formData).every((value) => value !== "");


  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {


    if (isFormValid) {
      dispatch(addTeam(formData));

      onClose(); // Close the modal
      setFormData({
        firstName: "",
        lastName: "",
        companyName: "",
        phoneNumber: "",
        email: "",
        contactType: "",
      });
    }


  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-[320px]  md:max-w-3xl xl p-6 rounded-md shadow-lg">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-bold">Adding Contact</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 px-2 block w-full rounded-md border border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm h-10"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 px-2 block w-full rounded-md border border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm h-10"
            />
          </div>

          {/* Company Name */}
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              required

              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 px-2 block w-full rounded-md border border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm h-10"
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
              id="phoneNumber"
              required

              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 px-2 block w-full rounded-md border border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm h-10"
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
              required

              value={formData.email}
              onChange={handleChange}
              className="mt-1 px-2 block w-full rounded-md border border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm h-10"
            />
          </div>

          {/* Contact Type */}
          <div>
            <label
              htmlFor="contactType"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Type
            </label>
            <select
              id="contactType"
              required

              value={formData.contactType}
              onChange={handleChange}
              className="mt-1 px-2 block w-full rounded-md border border-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm h-10"
            >
              <option value="">Choose</option>
              <option value="partner">Partner</option>
              <option value="tax advisor">Tax Advisor</option>
              <option value="attorney">Attorney</option>
              <option value="financial advisor">Financial Advisor</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 ml-4">
          <button
            disabled={!isFormValid}
            onClick={handleSubmit}
            className="w-1/2 text-white px-6 py-2 rounded-md bg-primaryColor hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;
