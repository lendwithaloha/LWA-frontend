"use client";

import React, { useState } from "react";
import ProfileSettingPage from "./profile/ProfileSetting";
import { useCreateBorrowerMutation } from "@/store/slice/authSlices/authSlices";

const SetupProfile = () => {
  const [isProfileComplete] = useState(false);
  const [showProfileSetting, setShowProfileSetting] = useState(false);
  const [createBorrower] = useCreateBorrowerMutation()


  const handleSetupProfile = async () => {
    try {
      setShowProfileSetting(true); 
      const response = await createBorrower({}).unwrap(); 
      console.log("Borrower created successfully:", response); 
    } catch (error) {
      console.log("Error creating borrower:", error); 
      
    }
  };
  

  return (
    <div className="relative w-full">
      {!showProfileSetting ? (
        <div className="bg-blue-100 border border-blue-300 text-primaryColor px-6 py-4 mx-4 mt-6 rounded-lg flex flex-wrap md:flex-nowrap justify-between items-center space-y-4 md:space-y-0">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <h2 className="text-lg md:text-xl font-semibold text-center md:text-left">
              {isProfileComplete
                ? "Profile Completed!"
                : "Set Up My Borrower Profile"}
            </h2>
            <p className="text-sm text-center md:text-left">
              {isProfileComplete
                ? "Your borrower profile is complete. You&apos;re all set for future applications!"
                : "Complete Your Borrower Profile to Save Time on Future Applications!"}
            </p>
          </div>

          {/* Button Section */}
          {!isProfileComplete && (
            <div className="w-full md:w-auto flex justify-center">
              <button
                onClick={handleSetupProfile}
                className="bg-primaryColor hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-auto"
              >
                Set Up Profile
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="fixed  top-50 left-50 inset-0 bg-black bg-opacity-50  z-50 min-h-screen overflow-auto">
          <ProfileSettingPage setShowProfileSetting={setShowProfileSetting} />
        </div>
      )}
    </div>
  );
};

export default SetupProfile;
