"use client";

import React, { useRef, useState } from "react";

import { ZodError } from "zod";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { ProfileDetail } from "./PersonalDetail";
import UploadFile from "./UploadDocument";
import { SetTeamPreference } from "./SetTeamPreference";
import DeclarationsForm from "./Declaration";
import AddRealEstateSchedule from "./AddRealEstateSchedule";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { CircularProgress } from "@mui/material";


import {
  setCurrentStep,
  updateFormData,
} from "@/store/slice/profile/profile-setup";
import {
  declarationsSchema,
  guarantorDetailsSchema,
  uploadDocumentsSchema,
} from "@/client-validation/profileSchemas";
import { useGetGuarantorDetailsQuery, useUpdateGuarantorDetailsMutation } from "@/store/slice/profile-api/profileDetail";
import { createGuarantorDetails } from "@/utils/guarantorUtils";


type ProfileProps = {
  setShowProfileSetting: (value: boolean) => void;
};

const ProfileSettingPage: React.FC<ProfileProps> = ({
  setShowProfileSetting,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const declarationsFormRef = useRef<HTMLFormElement>(null);

  const { formData, currentStep } = useSelector(
    (state: RootState) => state.profile
  );
  const [updateGuarantorDetails, { isLoading }] = useUpdateGuarantorDetailsMutation();
  const { refetch } = useGetGuarantorDetailsQuery();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };


  const handleDeclarationSubmit = async () => {
    if (declarationsFormRef.current) {
      await declarationsFormRef.current.triggerSubmit();
    }
  };


  const SaveAndUpdateGuarantorForm = async () => {
    const guarantorDetails = createGuarantorDetails(formData);



    try {
      await updateGuarantorDetails(guarantorDetails).unwrap();
      refetch()
      if (currentStep < steps.length) dispatch(setCurrentStep(currentStep + 1));
    } catch (error) {

      console.log("Failed to update guarantor details:", error);
    }
  }

  const validateFields = (): boolean => {
    try {
      if (currentStep === 1) guarantorDetailsSchema.parse(formData);
      if (currentStep === 2) declarationsSchema.parse(formData);


      // if (currentStep === 3) uploadDocumentsSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
        return false;
      }
      console.error("Unexpected error during validation:", err);
      return false;
    }
  };

  const steps = [
    { id: 1, label: "Guarantor Details" },
    { id: 2, label: "Declarations" },
    { id: 3, label: "Upload Documents" },
    { id: 4, label: "Set Team Preferences" },
    { id: 5, label: "Add Real Estate Schedule" },
  ];

  const handleNext = async () => {
    if (!validateFields()) return;
    if (currentStep === 2) {
      await handleDeclarationSubmit()
    }


    if (currentStep === 1) {
      await SaveAndUpdateGuarantorForm()
    }


    else if (currentStep < steps.length) {
      dispatch(setCurrentStep(currentStep + 1));
    } else {
      console.log("Final submission:", formData);
    }

  };

  const handleBack = () => {
    if (currentStep > 1) dispatch(setCurrentStep(currentStep - 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProfileDetail
            formData={formData}
            SaveAndUpdateGuarantorForm={SaveAndUpdateGuarantorForm}
            errors={errors}
          />
        );
      case 2:
        return <DeclarationsForm formData={formData} ref={declarationsFormRef} />;
      case 3:
        return <UploadFile />;
      case 4:
        return <SetTeamPreference formData={formData} handleInputChange={handleInputChange} />;
      case 5:
        return <AddRealEstateSchedule />;
      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-gray-50 rounded-lg w-full max-w-[95%] lg:max-w-5xl p-4 sm:p-6 mx-2 sm:mx-4 relative flex flex-col h-[95vh]">
        {/* Close Button and Header */}
        <div className="flex justify-between items-start mb-4 sm:mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Set Up Your Borrower Profile
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Complete Your Borrower Profile to Save Time on Future
              Applications!
            </p>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            onClick={() => setShowProfileSetting(false)}
            aria-label="Close modal"
          >
            <CloseSharpIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Progress Counter */}
        <div className="md:hidden text-center mb-4">
          <div className="grid grid-cols-[auto_1fr] items-center gap-4 mx-10">
            {/* Counter */}
            <div className="relative w-16 h-16">
              <svg className="w-full h-full transform rotate-[-90deg]" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="4"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeDasharray="100"
                  strokeDashoffset={`${100 - (currentStep / steps.length) * 100}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-600">
                {currentStep}/{steps.length}
              </div>
            </div>
            {/* Label */}
            <p className="text-lg font-semibold text-gray-900 truncate">
              {steps[currentStep - 1].label}
            </p>
          </div>
        </div>




        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 flex-grow overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="hidden md:block lg:w-1/4 bg-white rounded-lg p-4 overflow-y-auto border-r">
            <ul className="space-y-4">
              {steps.map((step) => (
                <li
                  key={step.id}
                  className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${currentStep === step.id
                    ? "bg-blue-100 text-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold ${currentStep === step.id
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-white text-gray-700"
                      }`}
                  >
                    {step.id}
                  </div>
                  <span className="text-sm font-medium">{step.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step Content */}
          <div className="w-full lg:w-3/4 flex flex-col flex-grow overflow-hidden bg-white">
            <div className="flex-1 overflow-y-auto p-4">
              {renderStepContent()}
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="mt-4 flex justify-between py-3 px-4 border-t border-gray-200">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-4 py-2 rounded transition-colors duration-200 ${currentStep === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                Previous
              </button>
              <button
                disabled={isLoading}
                onClick={handleNext}
                className={`px-4 py-2 ${!isLoading ? "bg-blue-500" : "bg-gray-50"} text-white rounded hover:${!isLoading ? "bg-blue-600" : "bg-gray-400"} transition-colors duration-200`}
              >
                {currentStep === steps.length
                  ? "Done"
                  : isLoading
                    ? <CircularProgress size={24} />
                    : "Next"
                }

              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingPage;